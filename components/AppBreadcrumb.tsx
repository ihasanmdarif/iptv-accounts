"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

export const AppBreadcrumb = () => {
  const pathName = usePathname();
  const pathnames = pathName.split("/").filter((x) => x);

  const isHome = pathnames.length === 1 && pathnames[0] === "dashboard";

  return isHome ? null : (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathnames.map((name, index) => {
          const url = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={url} className="capitalize">
                    {name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {
                // Add a separator if the current item is not the last one
                index === pathnames.length - 1 ? null : <BreadcrumbSeparator />
              }
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
