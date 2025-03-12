import Footer from "../Footer";
import Header from "./Header.jsx";

function UserLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh_-_168px)] w-full lg:min-h-[calc(100vh_-_172px)]">
        <div className="container max-w-screen-2xl lg:px-5">
          <div className="py-3 lg:py-5">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UserLayout;
