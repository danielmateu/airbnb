import { Listing, User } from "@prisma/client"

export type SafeListing = Omit<
    Listing,
    'createdAt' | 'updatedAt' | 'user' | 'userId'> & {
        createdAt: string
        user: SafeUser
    }


export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'> & {
        createdAt: string
        updatedAt: string
        emailVerified: string | null
    }