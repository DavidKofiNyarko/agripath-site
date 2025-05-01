'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/client";
import { User } from "@supabase/supabase-js";

type UserMenuProps = {
  user: User | null;
};

export default function UserMenu({ user }: UserMenuProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const supabase = await createClient()
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        return;
      }
      
      setUserMenuOpen(false);
      
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Link href="/login" className="text-gray-700 hover:text-green-600">
          Sign In
        </Link>
        <Link
          href="/signup"
          className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition duration-300"
        >
          Become an Investor
        </Link>
      </>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
          {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
        </div>
        <span className="max-w-[120px] truncate">{user.email}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={userMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
        </svg>
      </button>
      
      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Dashboard
          </Link>
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Profile
          </Link>
          <Link href="/investments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            My Investments
          </Link>
          <button 
            onClick={handleSignOut}
            disabled={loading}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
} 