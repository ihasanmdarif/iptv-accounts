import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Button asChild className="h-7 gap-1" size="sm">
        <Link href="/resume/create">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create Resume
          </span>
        </Link>
      </Button>
    </div>
  );
};
export default Page;
