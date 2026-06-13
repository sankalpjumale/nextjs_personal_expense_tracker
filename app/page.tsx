import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function Home() {

  const {userId} = await auth()
  if(userId) redirect('/dashboard')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Personal Expence Tracker</h1>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/sign-in">Sign-In</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/sign-up">Sign-Up</Link>
        </Button>
      </div>
    </div>
  );
}
