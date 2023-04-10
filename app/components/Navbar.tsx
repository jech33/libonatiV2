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
    const scrollingElement = document.scrollingElement;
    if (!scrollingElement) return;
    if (navbarRef.current === null) return;

    const scrollHeight = scrollingElement.scrollHeight - window.innerHeight;
    const currentScrollPos = window.scrollY;

    /* This code block is checking if the user has scrolled to the top of the page. If the current
    scroll position is less than or equal to 0, it sets the transform style of the navbar to
    'translateY(0px)', which means it will be positioned at the top of the screen. It also sets the
    previous scroll position to 0 and returns, so that the rest of the code block is not executed. */
    if (currentScrollPos <= 0) {
      navbarRef.current.style.transform = 'translateY(0px)';
      prevScrollPos = currentScrollPos;
      return;
    }

    /* This code block is checking if the user has scrolled to the bottom of the page. If the current
    scroll position is greater than or equal to the maximum scroll height (which is the total height
    of the scrolling element minus the height of the viewport), it sets the transform style of the
    navbar to 'translateY(-100px)', which means it will be positioned off the screen. It also sets
    the previous scroll position to the maximum scroll height, so that the rest of the code block is
    not executed. */
    if (currentScrollPos >= scrollHeight) {
      navbarRef.current.style.transform = 'translateY(-100px)';
      prevScrollPos = currentScrollPos;
      return;
    }

    if (currentScrollPos > prevScrollPos) {
      navbarRef.current.style.transform = 'translateY(-100px)';
    } else {
      navbarRef.current.style.transform = 'translateY(0px)';
    }
    prevScrollPos = currentScrollPos;
  };

  useEffect(() => {
    window.onscroll = hideNavbar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className="fixed top-6 right-6 bg-libonatiDarkBlack bg-opacity-80 rounded-3xl py-2 z-50 backdrop-blur-md shadow-md transition-transform duration-200 ease-in-out"
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
