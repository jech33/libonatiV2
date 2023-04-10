'use client';

/** Functional **/
import { getRelease } from '@api/contentful/route';
import Footer from '@components/Footer';
import Loader from '@components/Loader';
import Navbar from '@components/Navbar';
import {
  AmazonLogo,
  AppleLogo,
  InstagramLogo,
  LinkSimpleHorizontal,
  SoundcloudLogo,
  SpotifyLogo,
  TidalLogo,
  TiktokLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { splitCamelCase } from '@shared/functions';
import { ContentfulRelease } from '@shared/types/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReleasePage({
  params,
}: // searchParams,
{
  params: { id: string };
  // searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [release, setRelease] = useState<ContentfulRelease | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { push } = useRouter();

  const fetchRelease = async () => {
    setLoading(true);
    const data = await getRelease(params.id);
    if (!data || !data?.active) {
      push('/');
      return;
    }
    setLoading(false);
    setRelease(data);
  };

  const formatReleaseLinks = (links: ContentfulRelease['links']) => {
    const formattedLinks = Object.keys(links).map((link) => {
      let linkName = link;
      let icon = null;
      let bgColor = null;
      switch (link) {
        case 'spotify':
          icon = (
            <SpotifyLogo
              size={32}
              weight="fill"
              className="text-green-500 group-hover:text-black"
            />
          );
          bgColor = 'hover:bg-green-400';
          break;
        case 'youtube':
          icon = (
            <YoutubeLogo
              size={32}
              weight="fill"
              className="text-red-500 group-hover:text-white"
            />
          );
          bgColor = 'hover:bg-red-500 hover:text-white';
          break;
        case 'apple':
          linkName = 'Apple Music';
          icon = (
            <AppleLogo
              size={32}
              weight="fill"
              className="group-hover:text-white"
            />
          );
          bgColor = 'hover:bg-black hover:text-white';
          break;
        case 'tiktok':
          icon = <TiktokLogo size={32} weight="fill" />;
          bgColor = 'hover:bg-gray-100';
          break;
        case 'amazonMusic':
          linkName = 'Amazon Music';
          icon = <AmazonLogo size={32} weight="fill" />;
          bgColor = 'hover:bg-gray-100';
          break;
        case 'tidal':
          icon = <TidalLogo size={32} weight="fill" />;
          bgColor = 'hover:bg-gray-100';
          break;
        case 'soundcloud':
          icon = (
            <SoundcloudLogo
              size={32}
              weight="fill"
              className="text-orange-500 group-hover:text-white"
            />
          );
          bgColor = 'hover:bg-orange-500 hover:text-white';
          break;
        case 'instagram':
          icon = (
            <InstagramLogo
              size={32}
              weight="fill"
              className="text-pink-600 group-hover:text-white"
            />
          );
          bgColor = 'hover:bg-pink-600 hover:text-white';
          break;
        default:
          icon = <LinkSimpleHorizontal size={32} weight="light" />;
          bgColor = 'hover:bg-gray-100';
          break;
      }
      return {
        name: splitCamelCase(linkName),
        icon: icon,
        bgColor: bgColor,
        href: links[link as keyof ContentfulRelease['links']],
      };
    });

    return formattedLinks;
  };

  useEffect(() => {
    fetchRelease();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar hideLatestRelease />
      <main className="flex flex-grow flex-col items-center justify-between text-libonatiGrayYellow">
        {!release || loading ? (
          <section className="flex flex-grow items-center justify-center text-libonatiGold">
            <Loader />
          </section>
        ) : (
          <>
            <Image
              className="object-fill blur-2xl bg-black bg-opacity-20"
              placeholder="blur"
              blurDataURL="@components/images/blur.png"
              alt={`${release.name} background image`}
              fill
              priority
              onLoadStart={() => {
                setLoading(true);
              }}
              onLoad={() => {
                setLoading(false);
              }}
              src={release.image}
            />
            <div className="fixed h-full w-full bg-black bg-opacity-20" />
            <section className="bg-transparent w-[320px] rounded-lg overflow-hidden z-10 flex flex-col flex-grow items-center first-letter:uppercase mt-12">
              <figure className="">
                <Image
                  alt={`${release.name} cover image`}
                  width={320}
                  height={320}
                  priority
                  src={release.image}
                />
              </figure>
              <p className="flex flex-col gap-[2px] max-w-full text-body1 text-center bg-black text-white py-4 px-6 w-full">
                <span>{release.name}</span>
                <span>Bruno Libonati</span>
              </p>
              <ul className="w-full max-w-[320px] py-6 flex flex-col gap-2 bg-white">
                {formatReleaseLinks(release.links).map((link, idx) => (
                  <li key={idx}>
                    <Link
                      className="group flex items-center justify-center px-3 select-none first-letter:uppercase text-black"
                      href={link.href}
                      target="_blank"
                    >
                      <div
                        className={`flex items-center justify-center font-semibold 
                      gap-2 p-2 w-full rounded-md border-[1px] border-x-gray-100
                      shadow-[0_0_10px_-3px_rgba(0,0,0,0.1)]
                      transition-colors duration-150 ${link.bgColor}`}
                      >
                        {link.icon}
                        <span className="first-letter:uppercase">
                          {splitCamelCase(link.name).toLowerCase()}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
