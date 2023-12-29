import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="bg-bgLight min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
