import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const {username, password } = credentials as {
            username: string;
            password: string;
        };
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", username: "TEST", password: "123" };

        if (username === user.username && password === user.password) {
            console.log(user)
            return {id: user.id, name: user.username}
        } else {
            return null; // Return null if user not found
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
