import { TrophyIcon } from "@heroicons/react/24/solid";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createGuest, getGuest, getUserInfo } from "./data-service";
import { compare, hashSync } from "bcryptjs";
import { redirect } from "next/navigation";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if user exists
        user = await getGuest(credentials.email);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          //return false;
          // return Promise.resolve(null);
          return null;
          //redirect("/login");
          throw new Error("User not foundxx.");
        }

        const passwordMatch = await compare(
          credentials.password,
          user.password
        );

        console.log(user);

        // return user object with the their profile data
        if (passwordMatch) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    // async jwt(token, user) {
    //   console.log("token222222", token, "aaa", user);
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      session.user.name = guest.fullName;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/api/auth/error",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
