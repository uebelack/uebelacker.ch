import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export interface Props {
  title?: string;
  description?: string;
}

export default function Header({ title, description }: Props) {
  return (
    <header className="md:container px-4 mt-4 fade-in">
      <Head>
        <title>
          {title ? `${title} | Übelacker Solutions` : 'Übelacker Solutions'}
        </title>
        {description && (<meta name="description" content={description} />)}
      </Head>
      <div className="md:flex">
        <Link href="/" className="flex items-center transition ease-in-out delay-150 flex-grow">
          <Image src="/logo.svg" alt="Übelacker Solutions logo" width={40} height={40} />
          <div className="text-2xl ml-2 pt-0.5">Übelacker Solutions</div>
        </Link>
        <ul className="flex pt-2 pl-1 md:pt-2.5">
          <li className="mr-2">Blog</li>
          <li className="mr-2">Apps</li>
          <li className="mr-2">About</li>
          <li className="mr-3">Contact</li>
          <li>en</li>
          <li>|</li>
          <li>de</li>
        </ul>
      </div>
    </header>
  );
}
