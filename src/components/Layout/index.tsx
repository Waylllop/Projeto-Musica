import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-dark">
      <Header />
      <main className="bg-bgLight rounded-[48px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
