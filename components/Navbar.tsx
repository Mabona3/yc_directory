import React from 'react';
import NavbarClient from './NavbarClient';
import { auth } from '@/auth';

const Navbar = async () => {
  const session = await auth();

  return <NavbarClient session={session} />;
};

export default Navbar;

