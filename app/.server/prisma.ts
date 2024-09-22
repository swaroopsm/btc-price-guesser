import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient().$extends({
  result: {
    player: {
      incrementScore: {
        needs: { score: true, id: true },
        compute: ({ id, score }) => {
          return () =>
            prisma.player.update({
              where: { id },
              data: {
                score: score + 1,
              },
            });
        },
      },
      decrementScore: {
        needs: { score: true, id: true },
        compute: ({ id, score }) => {
          return () =>
            prisma.player.update({
              where: { id },
              data: {
                score: score - 1,
              },
            });
        },
      },
    },
  },
});
