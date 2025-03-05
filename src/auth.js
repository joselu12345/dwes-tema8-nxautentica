import NextAuth from 'next-auth'
import Google from '@auth/core/providers/google'
import Github from '@auth/core/providers/github'
import Credentials from '@auth/core/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { getUserByEmail, getUserById } from './lib/data'


const credentialsConfig = {
    // LOGIN ACTION -> AUTHORIZE -> JWT -> SESSION
    async authorize(credentials) {
        const user = await getUserByEmail(credentials.email)
        return user  
    },
}


const options = {
    providers: [
        Credentials(credentialsConfig),
        Google,
        Github
    ],
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
        signOut: '/logout',
    },
    callbacks: {
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await getUserById(token.sub)
            if (!user) return token;

            token.role = user?.role
            return token
        },

        async session({ session, token }) {
            session.user.id = token?.sub
            session.user.role = token?.role
            return session
        }
    }

}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth(options)