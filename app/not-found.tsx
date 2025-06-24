// pages/404.tsx
import { Button } from "@/components/ui/button"; // Using shadcn/ui for styling
import Link from "next/link";
import { HomeIcon } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 opacity-50">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/">
        <Button>
            Go Back Home
        </Button>
      </Link>
    </div>
  );
}
