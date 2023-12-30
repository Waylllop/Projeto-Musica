import { NavLink } from "react-router-dom";

const Work = () => {
  return (
    <section id="work" className="scroll-smooth mx-16 mt-20 border-t-4 border-dark">
      <h1 className="my-10 text-5xl font-bold">Work</h1>
      <div className="bg-secondary h-[600px]">
        <NavLink
          to="/songs"
          className={({ isActive }) =>
            `font-coustard text-primary text-4xl ${isActive ? "duration-200" : "hover:text-[#fcc46a] duration-200]"}`
          }
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Songs
        </NavLink>
      </div>
    </section>
  );
};

export default Work;
