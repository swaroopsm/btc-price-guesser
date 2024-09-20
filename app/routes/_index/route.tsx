import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { Start } from './components';
import { commitSession, getSession } from '~/sessions';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('name')) {
    return redirect('/play');
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const session = await getSession(request.headers.get('Cookie'));
  const name = String(formData.get('name'));

  session.set('name', name);

  return redirect('/play', {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
};


export default function Index() {
  return <Start />
}
