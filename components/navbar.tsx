'use client';

import { Home, Search, BookOpen, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: BookOpen, label: 'Magazine', href: '/magazine' },
    { icon: Shuffle, label: 'Random', href: '/random' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/60 backdrop-blur-lg border-t z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1"
              >
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full h-full flex flex-col items-center justify-center gap-1 rounded-none',
                    isActive && 'bg-primary/10 text-primary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}