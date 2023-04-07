/** Functional **/
import Footer from '@components/Footer';

export default function ReleasePage({
  params,
}: // searchParams,
{
  params: { id: string };
  // searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex flex-grow flex-col justify-between">
      <p className="flex flex-col flex-grow">{params.id}</p>
      <Footer />
    </main>
  );
}
