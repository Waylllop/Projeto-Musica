import Player from "../Player";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-dark md:px-10">
      <Header />
      <main className="bg-light rounded-3xl md:rounded-[48px] px-6 md:px-0">{children}</main>
      <Footer />
      <div className="flex justify-center fixed left-0 bottom-0 w-full z-20">
        <Player />
      </div>
    </div>
  );
};

export default Layout;
