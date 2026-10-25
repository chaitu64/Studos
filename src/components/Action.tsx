import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ActionProps {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}

export default function Action({ href, children, secondary = false }: ActionProps) {
  return (
    <Link className={secondary ? 'action secondary' : 'action'} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
