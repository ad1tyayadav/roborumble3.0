"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function LoginPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    // If already signed in, go to dashboard
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* If signed in, redirect to dashboard */}
      <SignedIn>
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
          <div className="text-white">Redirecting to dashboard...</div>
        </div>
      </SignedIn>

      {/* If not signed in, show Clerk sign-in */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
