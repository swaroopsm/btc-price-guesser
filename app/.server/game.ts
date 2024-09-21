import { prisma } from "./prisma";

export const findOrCreatePlayer = async (payload: { name: string }) => {
  return prisma.player.upsert({
    where: {
      id: undefined,
      name: payload.name,
    },
    update: {},
    create: {
      name: payload.name,
    },
  });
};
