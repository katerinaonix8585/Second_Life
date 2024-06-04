import { Key, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import {
  IconWrapper,
  OptionItem,
  OptionsList,
  SelectContainer,
  SelectLabel,
  SelectWrapper,
} from "./styles";
import { SelectDataProps, SelectProps } from "./types";

function Select<T extends Key>({
  label,
  options,
  value,
  onChange,
  placeholder,
  borderRadius = "20px",
  height = "50px",
  isSelectOpen,
}: SelectProps<T> & { borderRadius?: string; isSelectOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(isSelectOpen);

  const handleSelect = (option: SelectDataProps<T>) => {
    setIsOpen(false);
    onChange(option.selectData.value);
  };

  const selectedOption = options.find(
    (option) => option.selectData.value === value,
  );

  const displayValue = selectedOption
    ? selectedOption.selectData.label
    : placeholder;

  return (
    <SelectContainer>
      {label && <label>{label}</label>}
      <SelectWrapper
        onClick={() => setIsOpen(!isOpen)}
        hasError={""}
        borderRadius={borderRadius}
        height={height}
      >
        <SelectLabel style={{ color: value ? "black" : "#6f6f6f" }}>
          {displayValue}
        </SelectLabel>
        <IconWrapper>
          {isOpen ? (
            <IoMdArrowDropup size="25px" />
          ) : (
            <IoMdArrowDropdown size="25px" />
          )}
        </IconWrapper>
      </SelectWrapper>
      {isOpen && (
        <OptionsList borderRadius={borderRadius}>
          {options.map((option, index) => (
            <OptionItem key={index} onClick={() => handleSelect(option)}>
              {option.selectData.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
}

export default Select;
