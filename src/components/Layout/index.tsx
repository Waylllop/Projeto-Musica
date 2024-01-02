import Player from "../Player";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-dark px-10">
      <Header />
      <main className="bg-light rounded-[48px]">{children}</main>
      <Footer />
      <div className="flex justify-center fixed left-0 bottom-0 w-[calc(100vw-80px)] z-20 ml-10">
        <Player />
      </div>
    </div>
  );
};

export default Layout;
