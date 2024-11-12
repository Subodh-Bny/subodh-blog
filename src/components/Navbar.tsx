// app/components/Navbar.tsx
"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ThemeButton";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(30);
    setTimeout(() => {
      setProgress(70);
    }, 100);
    setTimeout(() => {
      setProgress(100);
    }, 800);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0);
    }, 900);
  }, [pathname]);

  return (
    <nav className="bg-background/50 sticky top-0 z-50 backdrop-blur border-b ">
      <LoadingBar progress={progress} color="green" />
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              NextBlog
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              href="/"
              className="hover:text-primary hover:brightness-125 hover:scale-105 transition-all duration-200 ease-in-out"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-primary hover:brightness-125 hover:scale-105 transition-all duration-200 ease-in-out"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="hover:text-primary hover:brightness-125 hover:scale-105 transition-all duration-200 ease-in-out"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary hover:brightness-125 hover:scale-105 transition-all duration-200 ease-in-out"
            >
              Contact
            </Link>
            <div className="flex gap-2">
              <Button variant={"outline"}>Login</Button>
              <Button variant={"outline"}>Signup</Button>
              <ModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex gap-2 items-center">
            <ModeToggle />
            <Sheet>
              <SheetTrigger>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>NextBlog</SheetTitle>
                  <SheetDescription className="flex flex-col  space-y-4 items-center">
                    <Link href="/" className=" ">
                      Home
                    </Link>
                    <Link href="/about" className=" ">
                      About
                    </Link>
                    <Link href="/blog" className=" ">
                      Blog
                    </Link>
                    <Link href="/contact" className=" ">
                      Contact
                    </Link>
                    <span className="flex flex-col gap-2 items-center">
                      <Button variant={"outline"}>Login</Button>
                      <Button variant={"outline"}>Signup</Button>
                    </span>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
