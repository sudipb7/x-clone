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
    const { parentId } = req.query;

    if (!parentId || typeof parentId !== "string") {
      throw new Error("Invalid ID");
    }

    const replies = await prisma.post.findMany({
      where: {
        parentId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(replies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
