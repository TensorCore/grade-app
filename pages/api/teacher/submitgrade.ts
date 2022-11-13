// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import prisma from "../../../lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if(!session) {
    res.status(401).json({error: "Unauthorized"});
    return;
  }

  const body = req.body;

  //   @ts-ignore  --Can't augment default session type
  if((session.role != "TEACHER" && session.role != "ADMIN") && session.id != body.teacherId) {
    res.status(401).json({error: "Unauthorized"});
    return;
}
  const editGrade = await prisma.userInClasses.update({
    where: {
        userId_classId: {
            userId: body.studentId,
            classId: body.classId,
        }
    },
    data: {
        grade: parseInt(body.grade),
    },
    });


  res.status(200).json({ editGrade });
}
