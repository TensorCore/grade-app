// Create new User
import prisma from "../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;
    const user = await prisma.user.create({
        data: {
            name: data?.name,
            username: data?.username,
            role: data?.role,
            password: data.password,
        },
    });
    res.json(user);
}
