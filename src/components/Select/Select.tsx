import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import {
  IconWrapper,
  OptionItem,
  OptionsList,
  SelectContainer,
  SelectLabel,
  SelectWrapper,
} from "./styles";
import { LocationDataProps, SelectProps } from "./types";

function Select({
  options,
  onChange,
  placeholder,
  icon,
  iconDisable,
  defaultIndex,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: LocationDataProps) => {
    onChange(option.locationData.value);
    setIsOpen(false);
  };

  const displayValue =
    options.find((_option, index) => index === defaultIndex)?.locationData
      .label || placeholder;

  return (
    <SelectContainer>
      <SelectWrapper onClick={() => setIsOpen(!isOpen)} hasError={""}>
        <SelectLabel>{displayValue}</SelectLabel>
        <IconWrapper>
          {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </IconWrapper>
        <IconWrapper style={{ right: "435px" }}>
          {iconDisable && icon}
        </IconWrapper>
      </SelectWrapper>
      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option.locationData.value}
              onClick={() => handleSelect(option)}
            >
              {option.locationData.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
}

export default Select;
