import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    type Timer = ReturnType<typeof setTimeout>;
    let timer: Timer;
    if (loading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 100);
    } else {
      setShowLoader(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="flex justify-center">
      {showLoader ? <ScaleLoader color="#895B1E" width={10} height={87} /> : null}
    </div>
  );
};

export default Loader;
