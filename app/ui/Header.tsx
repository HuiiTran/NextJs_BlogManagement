"use client";
import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchBar from "./SearchBar";
const Header = () => {
  const path = usePathname();
  return (
    <Navbar className="border-b-2 border-gray-200">
      <Link
        href="/homePage"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        Blog
      </Link>
      <div className="flex items-center gap-3">
        <SearchBar />
      </div>
      <div className="flex gap-2 md:order-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="cursor-pointer relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              <SignInButton mode="modal" />
            </span>
          </div>
        </SignedOut>

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link href="/homePage">
          <NavbarLink active={path === "/homePage"} as={"div"}>
            Home
          </NavbarLink>
        </Link>
        <Link href="/aboutPage">
          <NavbarLink active={path === "/aboutPage"} as={"div"}>
            About
          </NavbarLink>
        </Link>
        <SignedIn>
          <Link href="/dashBoard">
            <NavbarLink active={path === "/dashBoard"} as={"div"}>
              Dashboard
            </NavbarLink>
          </Link>
          <Link href="/dashBoard/createPost">
            <NavbarLink active={path === "/dashBoard/createPost"} as={"div"}>
              Create Post
            </NavbarLink>
          </Link>
        </SignedIn>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
