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
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    const replies = await Promise.all(
      post.replies.map((id: string) =>
        prisma.post.findUnique({
          where: {
            id,
          },
          include: {
            user: {
              include: {
                posts: true,
              },
            },
          },
        })
      )
    );

    return res.status(200).json({ ...post, replies });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
