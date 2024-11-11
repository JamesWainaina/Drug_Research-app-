import { loginUser } from '@/lib/actions/user.action'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"},
            } as any,
            async authorize(credentials) {
                if (credentials?.email && credentials?.password) {
                    const user = await loginUser(credentials.email, credentials.password);
                    if (user) {
                        return user;
                    }else {
                        return null;
                    }
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token}:{ session: any; token: JWT} ) {
            if (token) {
                session.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export {handler as GET, handler as POST};