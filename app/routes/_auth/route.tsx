import { LoaderFunction } from "@remix-run/node"
import { Outlet, redirect } from "@remix-run/react"
import { getCurrentUser } from "~/sessions"

export const loader: LoaderFunction = async ({ request }) => {
  const currentUser = getCurrentUser(request.headers.get('Cookie'));

  if (!currentUser) {
    return redirect('/');
  }

  return null
}

export default function Auth() {
  return <Outlet />
}
