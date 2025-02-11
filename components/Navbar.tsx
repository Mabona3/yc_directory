import React from 'react';
import { auth } from '@/auth';
import NavbarClient from './NavbarClient';

const Navbar = async () => {
  const session = await auth();

  return <NavbarClient session={session} />;
};

export default Navbar;

