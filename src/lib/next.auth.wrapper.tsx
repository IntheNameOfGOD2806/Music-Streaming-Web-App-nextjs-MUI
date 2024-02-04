 "use client";
import { SessionProvider } from "next-auth/react";

export const NextAuthWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
