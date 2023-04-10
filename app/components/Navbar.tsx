'use client';
/** Libraries **/
import { useRef, useEffect } from 'react';
import Link from 'next/link';

/** Functional **/
import { useLiboStore } from '@store/liboStore';

const Navbar = ({
  hideHome = false,
  hideLatestRelease = false,
}: {
  hideHome?: boolean;
  hideLatestRelease?: boolean;
}) => {
  const latestRelease = useLiboStore((state) => state.latestRelease);
  const navbarRef = useRef<HTMLElement>(null);
  let prevScrollPos = 0;

  const navBarItems = [
    {
      name: 'HOME',
      href: '/',
      hide: hideHome,
    },
    {
      name: 'LATEST RELEASE',
      href: `/releases/${latestRelease?.id}`,
      hide: hideLatestRelease,
    },
  ];

  const hideNavbar = () => {
    const currentScrollPos = window.pageYOffset;
    if (navbarRef.current === null) return;

    if (prevScrollPos > currentScrollPos) {
      navbarRef.current.style.transform = 'translateY(0px)';
    } else {
      navbarRef.current.style.transform = 'translateY(-100px)';
    }
    prevScrollPos = currentScrollPos;
  };

  useEffect(() => {
    window.addEventListener('scroll', hideNavbar);
    return () => window.removeEventListener('scroll', hideNavbar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className="fixed top-6 right-6 bg-libonatiDarkBlack bg-opacity-80 rounded-3xl py-2 z-50 backdrop-blur-md shadow-md transition-transform duration-300 ease-in-out"
      ref={navbarRef}
    >
      <ul className="flex">
        {navBarItems.map((item, idx) => {
          if (item.hide) return null;
          return (
            <li
              key={idx}
              className="first:border-0 border-l-2 border-l-libonatiGold-20 border-opacity-10 px-5"
            >
              <Link
                href={item.href}
                className="relative text-libonatiGold flex gap-1 group hover:text-libonatiGold-40 font-[500]"
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
