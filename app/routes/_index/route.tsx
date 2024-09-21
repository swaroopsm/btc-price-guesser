import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { Start } from './components';
import { commitSession, getSession, getCurrentUser } from '~/sessions';
import { findOrCreatePlayer } from '~/.server/game';

export const loader: LoaderFunction = async ({ request }) => {
  const currentUser = await getCurrentUser(request.headers.get('Cookie'));

  if (currentUser) {
    return redirect('/play');
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const session = await getSession(request.headers.get('Cookie'));
  const name = String(formData.get('name'));
  const player = await findOrCreatePlayer({ name })


  session.set('id', player.id);

  return redirect('/play', {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
};


export default function Index() {
  return <Start />
}
