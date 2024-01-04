interface InfoProps {
  title: string;
  data: string | undefined;
}

const Info = ({ title, data }: InfoProps) => {
  return (
    <div>
      <p className="text-2xl text-secondary mb-[-10px]">{title}</p>
      <p className="text-4xl text-dark">{data}</p>
    </div>
  );
};

export default Info;
