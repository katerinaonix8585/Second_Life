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

function SelectWithIcon<T extends Key>({
  options,
  value,
  onChange,
  placeholder,
  icon,
  iconDisable,
  defaultIndex,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<T | undefined>(
    defaultIndex !== undefined
      ? options[defaultIndex]?.selectData.value
      : value,
  );

  const handleSelect = (option: SelectDataProps<T>) => {
    setSelectedValue(option.selectData.value);
    onChange(option.selectData.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.selectData.value === selectedValue,
  );

  const displayValue = selectedOption
    ? selectedOption.selectData.label
    : placeholder;

  return (
    <SelectContainer>
      <SelectWrapper onClick={() => setIsOpen(!isOpen)} hasError={""}>
        <SelectLabel>{displayValue}</SelectLabel>
        <IconWrapper>
          {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </IconWrapper>
        {iconDisable && icon && (
          <IconWrapper style={{ right: "435px" }}>{icon}</IconWrapper>
        )}
      </SelectWrapper>
      {isOpen && (
        <OptionsList>
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

export default SelectWithIcon;
