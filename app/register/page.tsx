"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignedIn, SignedOut, RedirectToSignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    // If already signed in, go to onboarding
    if (isLoaded && isSignedIn) {
      router.replace("/onboarding");
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
      {/* If signed in, redirect to onboarding */}
      <SignedIn>
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
          <div className="text-white">Redirecting...</div>
        </div>
      </SignedIn>

      {/* If not signed in, show Clerk sign-up */}
      <SignedOut>
        <RedirectToSignUp />
      </SignedOut>
    </>
  );
}