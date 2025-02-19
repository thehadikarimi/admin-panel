import UserDetailsPage from "@/components/templates/UserDetailsPage";

async function Page({ params }) {
  const { userId } = await params;

  return <UserDetailsPage userId={userId} />;
}

export default Page;
