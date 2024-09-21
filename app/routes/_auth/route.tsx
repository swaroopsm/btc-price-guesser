import { LoaderFunction } from "@remix-run/node"
import { Outlet, redirect } from "@remix-run/react"
import { getSession } from "~/sessions"

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('name')) {
    return redirect('/');
  }

  return null
}

export default function Auth() {
  return <Outlet />
}
