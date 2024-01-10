import "./style.css";

interface BarAnimationProps {
  bgSize: string;
  barSize: string;
}

const BarAnimation = ({ bgSize, barSize }: BarAnimationProps) => {
  return (
    <div className={`absolute flex justify-center items-center bg-light rounded-full opacity-90 ${bgSize} ${bgSize}`}>
      <div className={`playing w-${barSize} h-${barSize}`}>
        <span className="playing__bar playing__bar1"></span>
        <span className="playing__bar playing__bar2"></span>
        <span className="playing__bar playing__bar3"></span>
      </div>
    </div>
  );
};

export default BarAnimation;
