import { sendRequest } from "@/utils/api"
import NextAuth, { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.NO_SECRET,
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                // if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }

                const res = await sendRequest<IBackendRes<JWT>>(
                    {
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/auth/login`,
                        method: "POST",
                        body: { username: credentials?.username, password: credentials?.password }
                    }

                )
                if (res && res.data) {
                    return res.data as any
                }
                else {
                    return null
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),



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
