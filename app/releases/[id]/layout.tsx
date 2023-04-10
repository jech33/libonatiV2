import { getRelease } from '@api/contentful/route';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const release = await getRelease(id);
  if (!release) {
    return {
      title: 'New Release',
      description: 'Released by Bruno Libonati',
    };
  }
  const date = new Date(release.releaseDate);

  return {
    title: release.name || 'New Release',
    description: `${
      release.name
    } released by Bruno Libonati on ${date.toLocaleDateString('en-US')}`,
    other: {
      'og:release-date': date.toLocaleDateString('en-US'),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
