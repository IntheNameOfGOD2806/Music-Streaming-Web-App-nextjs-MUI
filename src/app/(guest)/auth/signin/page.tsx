
import "./page.scss";

import AuthForm from "@/components/auth/auth-form";

import { getProviders } from "next-auth/react";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignIn() {
   const session= await getServerSession(authOptions);
   if(session){
    redirect("/")
   }
  const providers: any =
    (await getProviders()) || {};
  if (providers === undefined) {
    return;
  }
  return <AuthForm providers={providers}></AuthForm>;
}
