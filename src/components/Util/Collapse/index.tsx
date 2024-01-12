import { m, LazyMotion, domAnimation } from "framer-motion";

interface CollapseProps {
  open: boolean;
  children: React.ReactNode;
}

const Collapse = ({ children, open }: CollapseProps) => {
  const animate = {
    transition: { type: "tween", duration: 0.3 },
    height: open ? "auto" : 0,
    // opacity: open ? 1 : .5
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div aria-expanded={open}>
        <m.div
          style={{ overflow: "hidden" }}
          initial={{ height: 0, opacity: 1 }}
          animate={animate}
          exit={{ height: 0, opacity: 1 }}
        >
          {children}
        </m.div>
      </div>
    </LazyMotion>
  );
};

export default Collapse;
