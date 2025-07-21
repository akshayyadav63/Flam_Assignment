import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Sign In | HR Dashboard</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2 mb-6">
            Sign in to access your HR dashboard
          </p>

          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="mb-4">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition duration-300 shadow-md hover:shadow-xl"
              >
                Continue with {provider.name}
              </button>
            </div>
          ))}

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Powered by <span className="font-medium">NextAuth.js</span>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
