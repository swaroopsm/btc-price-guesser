import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
import { commitSession, getCurrentPlayer, getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const currentPlayer = await getCurrentPlayer(request.headers.get("Cookie"));

  if (!currentPlayer) {
    const session = await getSession(request.headers.get("Cookie"));

    session.flash("error", "You've been logged out, please login again!");

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({
    player: {
      id: currentPlayer.id,
      name: currentPlayer.name,
      score: currentPlayer.score,
      createdAt: currentPlayer.createdAt,
      updatedAt: currentPlayer.updatedAt,
    },
  });
};

export default function Auth() {
  const data = useLoaderData<typeof loader>();

  if (data?.player) {
    return (
      <Outlet
        context={{
          player: data.player,
        }}
      />
    );
  }

  return null;
}
