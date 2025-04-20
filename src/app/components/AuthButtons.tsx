"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return(
    <div className="flex items-center justify-center min-h-screen">
      {session ? (
      <div>
        <Button onClick={() => signOut()}>Logout</Button>
        <p>Welcome, {session.user?.name}</p>
      </div>
    ) : (
      <div >
        <Button onClick={() => signIn("google")}>Sign In with Google</Button>
      </div>)}
    </div>
    
  );
}
