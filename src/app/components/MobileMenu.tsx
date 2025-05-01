'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/client";
import { User } from "@supabase/supabase-js";

type MobileMenuProps = {
  user: User | null;
};

export default function MobileMenu({ user }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
      
      setMenuOpen(false);
      
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button 
        className="flex items-center"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden">
          <Link href="/" className="text-slate-950 hover:text-green-600">Home</Link>
          <Link href="/projects" className="text-slate-950 hover:text-green-600">Projects</Link>
          <Link href="/about" className="text-slate-950 hover:text-green-600">About Us</Link>
          <Link href="/contact" className="text-slate-950 hover:text-green-600">Contact</Link>
          <hr className="border-gray-200" />
          
          {!user ? (
            <>
              <Link href="/login" className="text-gray-700 hover:text-green-600">Sign In</Link>
              <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-2xl text-center hover:bg-green-700 transition duration-300">
                Become an Investor
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 py-2">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                  {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-gray-700 truncate">{user.email}</span>
              </div>
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600">Dashboard</Link>
              <Link href="/profile" className="text-gray-700 hover:text-green-600">Profile</Link>
              <Link href="/investments" className="text-gray-700 hover:text-green-600">My Investments</Link>
              <button 
                onClick={handleSignOut}
                disabled={loading}
                className="text-left text-gray-700 hover:text-green-600 disabled:opacity-50"
              >
                {loading ? "Signing out..." : "Sign out"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
} 