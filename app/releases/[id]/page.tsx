'use client';
/** Libraries **/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

/** Functional **/
import { getRelease } from '@api/contentful/route';
import Footer from '@components/Footer';
import Loader from '@components/Loader';
import Navbar from '@components/Navbar';
import { splitCamelCase } from '@shared/functions';
import { ContentfulRelease } from '@shared/types/contentful';
import { formatReleaseLinks } from './utils';

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

  useEffect(() => {
    fetchRelease();
    console.log(release?.image);
    document.body.classList.add('relative');
    return () => {
      document.body.classList.remove('relative');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-container relative flex h-full w-full flex-1 flex-col">
      {release && !loading && (
        <div className="img-wrapper absolute -z-[1] h-full w-full lg:fixed">
          <Image
            className="-z-[1] object-cover"
            alt={`${release.name} background image`}
            fill
            priority
            sizes="(max-width: 720px) 720px, 100vw"
            src={release.image}
          />
          <div className="h-full w-full bg-black bg-opacity-30 backdrop-blur-lg" />
        </div>
      )}
      <Navbar hideLatestRelease />
      {!release || loading ? (
        <section className="flex h-full flex-grow items-center justify-center text-libonatiGold">
          <Loader />
        </section>
      ) : (
        <>
          <main className="z-10 flex flex-grow flex-col items-center justify-between text-libonatiGrayYellow">
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
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
