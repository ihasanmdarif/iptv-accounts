"use client";
import { FileText, Home, PackageCheck, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const items = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Applications",
      href: "/applications",
      icon: PackageCheck,
    },
    {
      label: "Resumes",
      href: "/resume",
      icon: FileText,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const pathName = usePathname();
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {items.map((item) => {
        //check pathname to see if the link is active
        const isActive = item.href === pathName;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              {
                "bg-muted": isActive,
              }
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
