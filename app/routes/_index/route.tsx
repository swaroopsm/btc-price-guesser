import {
  ActionFunction,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Start } from "./components";
import { commitSession, getSession, getCurrentPlayerId } from "~/sessions";
import { findOrCreatePlayer } from "~/.server/game";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const currentPlayerId = await getCurrentPlayerId(
    request.headers.get("Cookie")
  );

  if (currentPlayerId) {
    return redirect("/play");
  }

  const session = await getSession(request.headers.get("Cookie"));
  const error = session.get("error");

  return json(
    {
      error,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const name = String(formData.get("name"));
  const player = await findOrCreatePlayer({ name });

  session.set("id", player.id);

  return redirect("/play", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <Start error={data?.error} />;
}
