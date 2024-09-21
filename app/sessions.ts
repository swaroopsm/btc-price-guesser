import { createCookieSessionStorage } from "@remix-run/node";
import { prisma } from "./.server/prisma";

type SessionData = {
  id: number;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",

        // all of these are optional
        // domain: "remix.run",
        // Expires can also be set (although maxAge overrides it when used in combination).
        // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
        //
        // expires: new Date(Date.now() + 60_000),
        httpOnly: true,
        maxAge: 60 * 60,
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1"],
        secure: true,
      },
    }
  );

const getCurrentUserId = async (cookie: string | null) => {
  const session = await getSession(cookie);
  return session.get('id');
};

const getCurrentUser = async (cookie: string | null) => {
  const session = await getSession(cookie);
  const id = session.get('id');

  if (!id) { return null }

  return prisma.player.findFirst({ where: { id: id } })
}

export { getSession, commitSession, destroySession, getCurrentUser, getCurrentUserId };
