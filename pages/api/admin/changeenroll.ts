// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const data = req.body;

  //   @ts-ignore  --Can't augment default session type
  if (session.role != "ADMIN" && session.id != body.adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const classes = await prisma.classes.update({
    where: {
        id: data.classId,
    },
  });

  res.status(200).json({ classes });
}
