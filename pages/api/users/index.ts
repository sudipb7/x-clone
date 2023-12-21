import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const userCount = await prisma.user.count();

    const users = await prisma.user.findMany({
      take: 6,
      skip: Math.floor(Math.random() * userCount),
      orderBy: {
        verified: "desc",
      },
      select: {
        id: true,
        name: true,
        username: true,
        verified: true,
        profileImage: true,
        bio: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
