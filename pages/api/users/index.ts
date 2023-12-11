import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const users = await prisma.user.findMany({
      where: {
        id: { not: currentUser.id },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
