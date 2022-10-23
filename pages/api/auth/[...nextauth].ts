import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";

interface User {
  id: String,
  username: String,
  role: String,
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const userDB = await prisma.user.findUnique({
          where: {
            username: credentials?.username.toUpperCase(),
          },
        });
        console.log(userDB)
        if (userDB?.password === credentials?.password && userDB != null && credentials != null) { 
            return {id: userDB.id, username: userDB.username, role: userDB.role, name: userDB?.name}
        } else {
            return null; // Return null if user not found
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.name = user?.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if(token) {
        session.id = token.id;
        session.username = token.username;
        session.role = token.role;
        session.name = token?.name;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};

export default NextAuth(authOptions);
