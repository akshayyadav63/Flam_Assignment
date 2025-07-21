// pages/index.jsx
import { getSession } from "next-auth/react";
import Dashboard from "../components/Dashboard"; // move your large dashboard to a component file for cleanliness

export default function DashboardPage() {
  return <Dashboard />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "../auth/signin", // custom sign-in page
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
