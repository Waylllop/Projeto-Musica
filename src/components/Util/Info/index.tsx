interface InfoProps {
  title: string;
  data: string | undefined;
  style?: string;
}

const Info = ({ title, data, style }: InfoProps) => {
  return (
    <div className={`${style}`}>
      <p className="md:text-xl lg:text-2xl text-secondary mb-[-10px]">{title}</p>
      <p className="w-[155px] min-[450px]:w-48 min-[900px]:w-60 min-[1300px]:w-80 text-2xl md:text-3xl lg:text-4xl text-dark truncate">{data}</p>
    </div>
  );
};

export default Info;
