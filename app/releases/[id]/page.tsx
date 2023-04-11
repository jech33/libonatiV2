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
          className =
            'hover:bg-green-400 hover:text-black active:bg-green-400 active:text-black';
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
          className = 'hover:bg-gray-700 hover:text-white';
          break;
        case 'tiktok':
          icon = <TiktokLogo size={32} weight="fill" />;
          className = 'hover:bg-purple-900 active:bg-purple-900';
          break;
        case 'amazonMusic':
          linkName = 'Amazon Music';
          icon = <AmazonLogo size={32} weight="fill" />;
          className = 'hover:bg-blue-600 hover:text-white';
          break;
        case 'tidal':
          icon = <TidalLogo size={32} weight="fill" />;
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
          icon = <LinkSimpleHorizontal size={32} weight="regular" />;
          break;
      }
      return {
        name: splitCamelCase(linkName),
        icon: icon,
        className: className || 'hover:bg-black hover:text-white',
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
            <div className="img-wrapper fixed h-full w-full">
              <Image
                className="bg-black bg-opacity-20 object-fill blur-2xl"
                alt={`${release.name} background image`}
                fill
                priority
                src={release.image}
              />
            </div>
            <div className="overlay fixed h-full w-full bg-black bg-opacity-20" />
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
              <article className="flex w-full max-w-full flex-col justify-center bg-libonatiDarkBlack p-6">
                <p className="flex w-full max-w-full flex-col gap-[2px] text-center text-body1 text-white">
                  <span>{release.name}</span>
                  <span>Bruno Libonati</span>
                </p>
                <ul className="mt-6 flex w-full max-w-[320px] flex-col gap-3">
                  {formatReleaseLinks(release.links).map((link, idx) => (
                    <li className="flex w-full" key={idx}>
                      <Link
                        className={`group relative flex h-12 max-h-14 w-full items-center gap-2 rounded-full rounded-s-full 
                        bg-black bg-opacity-50 pl-4 pr-4 font-semibold text-libonatiWhiteFont 
                        shadow-[0_0_10px_-3px_rgba(0,0,0,0.1)] transition-colors duration-150 ${link.className}`}
                        href={link.href}
                        target="_blank"
                      >
                        <span className="z-[1]">{link.icon}</span>
                        <span className="absolute left-1/2 line-clamp-1 w-7/12 -translate-x-1/2 overflow-hidden text-ellipsis text-center capitalize">
                          {splitCamelCase(link.name).toLowerCase()}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
