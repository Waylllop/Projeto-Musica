import { Minus, Plus } from "@phosphor-icons/react";

interface FilterButtonProps {
  title: string;
  onClick: () => void;
  style?: string;
  isModalOpen?: boolean;
}
const FilterButton = ({ title, onClick, style, isModalOpen }: FilterButtonProps) => {
  return (
    <button
      className={`w-[200px] h-[50px] text-dark font-bold text-2xl flex justify-between items-center px-4 py-2 duration-200 ${style}`}
      onClick={onClick}
    >
      <span className="block">{title}</span>
      {isModalOpen ? (
        <Minus size={24} weight="bold" className="text-dark" />
      ) : (
        <Plus size={24} weight="bold" className="text-dark" />
      )}
    </button>
  );
};

export default FilterButton;
