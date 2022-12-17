import Link from 'next/link';
import { FaPlaneDeparture } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{' '}
        <Link href="/" className="hover:underline">
          Travelio
        </Link>
        <FaPlaneDeparture />
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link href="/profile" className="mr-4 hover:underline md:mr-6 ">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/holidays" className="mr-4 hover:underline md:mr-6">
            Holidays
          </Link>
        </li>
        <li>
          <Link href="/holidays/new" className="mr-4 hover:underline md:mr-6">
            New holiday
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
