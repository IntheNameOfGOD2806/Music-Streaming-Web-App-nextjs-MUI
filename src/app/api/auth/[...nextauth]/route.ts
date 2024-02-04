import { sendRequest } from "@/utils/api"
import NextAuth, { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.NO_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        // ...add more providers here

    ],
    callbacks: {
        jwt: async ({ token, user, account, profile, trigger }) => {
            // console.log(token, user, account, profile, trigger);
            if (trigger === "signIn" && account?.provider === "github") {
                const res = await sendRequest<IBackendRes<JWT>>(
                    {
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/auth/social-media`,
                        method: "POST",
                        body: { type: "GITHUB", username: user.email }
                    }

                )
                if (res.data) {
                    token.access_token = res.data.access_token
                    token.refresh_token = res.data.refresh_token
                    token.user = res.data?.user
                }

            }
            return token
        },
        session: ({ session, token, user }) => {
            if (token) {

                session.access_token = token.access_token
                session.refresh_token = token.refresh_token
                session.user = token.user
            }
            return session
        },
    },

}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
