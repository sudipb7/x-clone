import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    let verificationStatus;

    if (req.method === "POST") {
      verificationStatus = true;
    }
    if (req.method === "DELETE") {
      verificationStatus = false;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        verified: verificationStatus,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
