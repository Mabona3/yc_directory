'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, signIn } from 'next-auth/react';

interface NavbarClientProps {
  session?: {
    user?: {
      name?: string;
    };
    id?: string;
  } | null;
}

const NavbarClient: React.FC<NavbarClientProps> = ({ session }) => {
  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async () => {
    await signIn('github');
  };

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <button onClick={handleSignOut}>Log out</button>
              <Link href={`/user/${session.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <button onClick={handleSignIn}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarClient;
