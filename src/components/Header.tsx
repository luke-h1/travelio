import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const authLinks = [
  { name: 'Hols', path: '/holidays', id: 1 },
  { name: 'New hol', path: '/holidays/new', id: 2 },
  { name: 'Profile', path: '/profile', id: 3 },
];

const Header = (): JSX.Element => {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">Travelio</span>
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {status !== 'loading' &&
            data?.user &&
            authLinks.map(link => (
              <Link
                href={link.path}
                key={link.id}
                className="mr-5 hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
        </nav>
        {!data?.user && status === 'unauthenticated' && (
          <div className="flex ml-3 mr-3">
            <button
              className="inline-flex items-center btn-blue border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 mr-2 ml-2"
              type="button"
              onClick={() => {
                router.push('/auth/login');
              }}
            >
              Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 btn-blue"
              type="button"
              onClick={() => {
                router.push('/auth/register');
              }}
            >
              Register
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
        {status !== 'loading' && data?.user && (
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            type="button"
            onClick={async () => {
              router.reload();
            }}
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
