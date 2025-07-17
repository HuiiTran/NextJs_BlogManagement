"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ChartPie, FileText, LogIn, UserRoundCog, Users } from "lucide-react";
export default function DashSidebar() {
  const [tab, setTab] = useState("");
  const searchParams = useSearchParams();
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  if (!isSignedIn) {
    return null;
  }
  if (isSignedIn && user.publicMetadata?.isAdmin) {
    return (
      <Sidebar className="w-full md:w-56">
        <SidebarItems>
          <SidebarItemGroup className="flex flex-col gap-1">
            {user.publicMetadata?.isAdmin && (
              <Link href="/dashBoard?tab=dash">
                <SidebarItem
                  active={tab === "dash" || !tab}
                  icon={ChartPie}
                  as="div"
                >
                  Dashboard
                </SidebarItem>
              </Link>
            )}
            <Link href="/dashBoard?tab=profile">
              <SidebarItem
                active={tab === "profile"}
                icon={UserRoundCog}
                label={user?.publicMetadata?.isAdmin ? "Admin" : "User"}
                labelColor="dark"
                as="div"
              >
                Profile
              </SidebarItem>
            </Link>
            {user?.publicMetadata?.isAdmin && (
              <Link href="/dashBoard?tab=posts">
                <SidebarItem active={tab === "posts"} icon={FileText} as="div">
                  Posts
                </SidebarItem>
              </Link>
            )}
            {user?.publicMetadata?.isAdmin && (
              <Link href="/dashBoard?tab=users">
                <SidebarItem active={tab === "users"} icon={Users} as="div">
                  Users
                </SidebarItem>
              </Link>
            )}
            <SidebarItem icon={LogIn} className="cursor-pointer">
              <SignOutButton />
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    );
  } else
    return (
      <>
        <h1 className="text-center py-10 text-5xl">
          You are not authorized to view this page
        </h1>
      </>
    );
}
