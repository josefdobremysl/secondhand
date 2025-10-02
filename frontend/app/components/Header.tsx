import React from "react";
import { User, Bell, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo vlevo */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-bold">
              M
            </div>
            <span className="hidden font-semibold text-gray-800 sm:inline">MyProject</span>
          </a>

          {/* Menu ikon */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">3</span>
            </button>

            <button
              aria-label="Account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <User size={18} />
            </button>

            <button
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
