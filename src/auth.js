import NextAuth from 'next-auth'
import Google from '@auth/core/providers/google'
import Github from '@auth/core/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'


const options = {
    providers: [
    Google,
    Github
    ],
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' }
}

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth(options)