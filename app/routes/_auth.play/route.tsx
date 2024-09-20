
import { ActionFunction, redirect } from "@remix-run/node"
import { getSession } from "~/sessions"

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const session = await getSession();
  const name = String(formData.get('name'));

  console.log({ name })

  session.set('name', String(formData.get('name')));

  console.log('========')
  return redirect('/play')
};

export default function Start() {
  return 'Lets play!'
}
