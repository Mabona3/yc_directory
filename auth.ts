import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import process from "node:process";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [ GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  })],
  callbacks: {
    async signIn ({ user: { name, email, image }, profile: {id, login, bio } }) {
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        })
      }
      return true;
    },
    async jwt({token, account, profile}) {
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY,{ id: profile?.id }) ;
        token.id = user?._id;
      }

      return token;
    },
    async session ({ session, token }) {
      Object.assign(session, { id: token.id});
      return session
    },
  }
})
