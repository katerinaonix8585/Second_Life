import { Key, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import {
  ErrorMessage,
  IconWrapper,
  InputLabel,
  LabelContainer,
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
  error,
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

  const displayValue: string | number | undefined = selectedOption
    ? selectedOption.selectData.value !== undefined
      ? selectedOption.selectData.value.toString()
      : placeholder
    : placeholder;

  return (
    <SelectContainer>
      <LabelContainer>
        {label && <InputLabel htmlFor={label}>{label}</InputLabel>}
      </LabelContainer>
      <SelectWrapper
        onClick={() => setIsOpen(!isOpen)}
        hasError={!!error}
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
            <OptionItem
              key={String(index)}
              onClick={() => handleSelect(option)}
              hasError={!!error}
            >
              {String(option.selectData.value)}
            </OptionItem>
          ))}
        </OptionsList>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectContainer>
  );
}

export default Select;
