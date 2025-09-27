import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { routes } from "@/lib/routes";

export default async function SignInPage() {
  const user = await currentUser();

  if (user) {
    redirect(routes.home);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8">
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="text-ceramic-white h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium sm:h-12 sm:px-5 sm:text-base">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
