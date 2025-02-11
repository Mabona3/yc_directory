'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, signIn } from 'next-auth/react';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

interface NavbarClientProps {
  session?: {
    user?: {
      name?: string;
      image?: string;
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
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className='size-6 sm:hidden'/> 
              </Link>
              <button onClick={handleSignOut}>
                <span className='max-sm:hidden'>Logout</span>
                <LogOut className='size-6 sm:hidden'/>
              </button>
              <Link href={`/user/${session.id}`}>
                <Avatar className='size-10 inline-block rounded-full'>
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
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
