import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";

export default function Home() {
  const { isLoading, error, user } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Head>
        <title>Next JS ChatGPT Starter</title>
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-800">
        <div>
          {!!user && (
            <Link
              href={"/api/auth/logout"}
              className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
            >
              Logout
            </Link>
          )}
          {!user && (
            <>
              <Link
                className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                href={"/api/auth/login"}
              >
                Login
              </Link>
              <Link
                className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                href={"/api/auth/signup"}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: {
  req: IncomingMessage | NextApiRequest;
  res: ServerResponse<IncomingMessage> | NextApiResponse;
}) => {
  const session = await getSession(context.req, context.res);

  if (!!session) {
    return {
      redirect: {
        destination: "/chat",
      },
    };
  }

  return {
    props: {},
  };
};
