import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "POST" &&
    req.method !== "DELETE" &&
    req.method !== "GET"
  ) {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    // For GET Method
    if (req.method === "GET") {
      const bookmarkedPosts = await prisma.post.findMany({
        where: {
          bookmarkedIds: {
            has: currentUser.id,
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(bookmarkedPosts);
    }

    // POST and DELETE method starts here
    const { postId } = req.body;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updatedBookmarkedIds = [...(post.bookmarkedIds || [])];

    if (req.method === "POST") {
      updatedBookmarkedIds.push(currentUser.id);

      // Send Notification
      try {
        await prisma.notification.create({
          data: {
            body: `${currentUser.name} bookmarked your post`,
            userId: post.userId,
            redirectUrl: `/posts/${post.id}`,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "DELETE") {
      updatedBookmarkedIds = updatedBookmarkedIds.filter(
        (id) => id !== currentUser.id
      );
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        bookmarkedIds: updatedBookmarkedIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
