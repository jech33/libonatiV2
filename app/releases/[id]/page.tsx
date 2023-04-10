'use client';
/** Libraries **/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

/** Assets **/
import {
  AmazonLogo,
  AppleLogo,
  FacebookLogo,
  InstagramLogo,
  LinkSimpleHorizontal,
  SoundcloudLogo,
  SpotifyLogo,
  TidalLogo,
  TiktokLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';

/** Functional **/
import { getRelease } from '@api/contentful/route';
import Footer from '@components/Footer';
import Loader from '@components/Loader';
import Navbar from '@components/Navbar';
import { splitCamelCase } from '@shared/functions';
import { ContentfulRelease } from '@shared/types/contentful';

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
      let className = null;
      switch (link) {
        case 'spotify':
          icon = (
            <SpotifyLogo
              size={32}
              weight="fill"
              className="text-green-500 group-hover:text-black"
            />
          );
          className = 'hover:bg-green-400';
          break;
        case 'youtube':
          icon = (
            <YoutubeLogo
              size={32}
              weight="fill"
              className="text-red-500 group-hover:text-white"
            />
          );
          className = 'hover:bg-red-500 hover:text-white';
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
          className = 'hover:bg-black hover:text-white';
          break;
        case 'tiktok':
          icon = <TiktokLogo size={32} weight="fill" />;
          className = 'hover:bg-gray-100 active:bg-gray-100';
          break;
        case 'amazonMusic':
          linkName = 'Amazon Music';
          icon = <AmazonLogo size={32} weight="fill" />;
          className = 'hover:bg-gray-100 active:bg-gray-100';
          break;
        case 'tidal':
          icon = <TidalLogo size={32} weight="fill" />;
          className = 'hover:bg-gray-100 active:bg-gray-100';
          break;
        case 'soundcloud':
          icon = (
            <SoundcloudLogo
              size={32}
              weight="fill"
              className="text-orange-500 group-hover:text-white"
            />
          );
          className = 'hover:bg-orange-500 hover:text-white';
          break;
        case 'facebook':
          icon = (
            <FacebookLogo
              size={32}
              weight="fill"
              className="text-blue-700 group-hover:text-white"
            />
          );
          className = 'hover:bg-blue-700 hover:text-white';
          break;
        case 'instagram':
          icon = (
            <InstagramLogo
              size={32}
              weight="fill"
              className="text-pink-600 group-hover:text-white"
            />
          );
          className = 'hover:bg-pink-600 hover:text-white';
          break;
        default:
          icon = <LinkSimpleHorizontal size={32} weight="light" />;
          className = 'hover:bg-gray-100 active:bg-gray-100';
          break;
      }
      return {
        name: splitCamelCase(linkName),
        icon: icon,
        className: className,
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
              className="bg-black bg-opacity-20 object-fill blur-2xl"
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
            <section className="z-10 mt-12 flex w-[320px] flex-grow flex-col items-center overflow-hidden rounded-lg bg-transparent first-letter:uppercase">
              <figure>
                <Image
                  alt={`${release.name} cover image`}
                  width={320}
                  height={320}
                  priority
                  src={release.image}
                />
              </figure>
              <p className="flex w-full max-w-full flex-col gap-[2px] bg-black px-6 py-4 text-center text-body1 text-white">
                <span>{release.name}</span>
                <span>Bruno Libonati</span>
              </p>
              <ul className="flex w-full max-w-[320px] flex-col gap-2 bg-white py-6">
                {formatReleaseLinks(release.links).map((link, idx) => (
                  <li className="flex w-full px-5" key={idx}>
                    <Link
                      className={`group flex h-14 max-h-14 w-full items-center justify-center gap-2 rounded-md border-[1px] border-x-gray-100 p-2 font-semibold text-black shadow-[0_0_10px_-3px_rgba(0,0,0,0.1)] transition-colors duration-150 ${link.className}`}
                      href={link.href}
                      target="_blank"
                    >
                      <span>{link.icon}</span>
                      <span className="line-clamp-1 overflow-hidden text-ellipsis first-letter:uppercase">
                        {splitCamelCase(link.name).toLowerCase()}
                      </span>
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
