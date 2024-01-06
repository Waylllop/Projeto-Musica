import { filter } from "../../../../common/interfices";

interface CheckboxProps {
  options?: filter[];
  selectedOptions: number[];
  selectedFilters: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const Checkbox = ({
  options,
  selectedOptions,
  selectedFilters,
  setSelectedOptions,
  setSelectedFilters,
}: CheckboxProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = Number(event.target.value);
    const optionIndex = selectedOptions.includes(optionId);
    const agentName = options?.find((option) => Number(option.id) === optionId)?.name;

    if (agentName) {
      const agentIndex = selectedFilters.includes(agentName);

      if (!agentIndex) {
        setSelectedFilters([...selectedFilters, agentName]);
      } else {
        setSelectedFilters(selectedFilters.filter((name) => name !== agentName));
      }
    }

    if (!optionIndex) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto mr-2 mb-4 filter-scroll-custom max-h-[200px]">
      {options?.map((option) => (
        <label key={option.id} className="text-dark text-xl ml-4">
          <input
            className="mr-2 appearance-none w-4 h-4 rounded-md border-2 border-dark bg-light checked:bg-dark checked:border-dark"
            type="checkbox"
            value={option.id}
            id={String(option.id)}
            checked={selectedOptions.includes(Number(option.id))}
            onChange={handleCheckboxChange}
          />
          {option.name}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
