import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const originalPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!originalPost) {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
        parentId: postId,
      },
    });

    let updatedReplies = [...(originalPost.replies || [])];
    updatedReplies.push(comment.id);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        replies: updatedReplies,
      },
    });

    return res.status(200).json({ comment, updatedPost });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
