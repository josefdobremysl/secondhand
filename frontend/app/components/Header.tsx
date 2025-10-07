"use client";  

import React from "react";
import { User, Bell, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-300 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo left */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="/LOGO.png"
              alt="Logo"
              className="h-12 w-25 rounded-md object-cover"
            />
          </a>

          {/* Menu icons */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Heart"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <Heart size={18} />
            </button>

            <button
              aria-label="Notifications"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-xs text-white">3</span>
            </button>

            <button
              aria-label="Account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={() => router.push("/login")}

            >
              <User size={18} />
            </button>


          </div>
        </div>
      </div>
    </header>
  );
}
