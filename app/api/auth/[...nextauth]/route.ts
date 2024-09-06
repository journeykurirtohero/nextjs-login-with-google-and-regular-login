//app/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { verifyPassword } from "@/lib/auth-server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ username: credentials?.username });
        if (user && await verifyPassword(credentials!.password, user.password)) {
          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
            role: user.role,
            namaRekening: user.namaRekening,
            nomorRekening: user.nomorRekening,
            namaBank: user.namaBank,
            nohp: user.nohp,
          };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await dbConnect();
        let existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          existingUser = new User({
            email: user.email,
            username: user.name,
            googleId: profile.sub,
            namaRekening: "",
            nomorRekening: "",
            namaBank: "",
            nohp: "",
            role: "user",
            profileCompleted: false
          });
          await existingUser.save();
        } else if (!existingUser.googleId) {
          existingUser.googleId = profile.sub;
          existingUser.profileCompleted = existingUser.profileCompleted || false;
          await existingUser.save();
        }
        user.id = existingUser._id.toString();
        (user as any).profileCompleted = existingUser.profileCompleted;
        (user as any).namaRekening = existingUser.namaRekening;
        (user as any).nomorRekening = existingUser.nomorRekening;
        (user as any).namaBank = existingUser.namaBank;
        (user as any).nohp = existingUser.nohp;
        return true;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.profileCompleted = (user as any).profileCompleted;
        token.namaRekening = (user as any).namaRekening;
        token.nomorRekening = (user as any).nomorRekening;
        token.namaBank = (user as any).namaBank;
        token.nohp = (user as any).nohp;
      }
      // Tambahkan ini untuk menangani pembaruan sesi
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session.user as any).profileCompleted = token.profileCompleted as boolean;
        (session.user as any).namaRekening = token.namaRekening as string;
        (session.user as any).nomorRekening = token.nomorRekening as string;
        (session.user as any).namaBank = token.namaBank as string;
        (session.user as any).nohp = token.nohp as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/api/auth/error',
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };