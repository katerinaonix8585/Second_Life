import { ErrorMessage, Icon, SelectComponent, SelectComponentContainer, SelectWrapper } from "./styles";
import { SelectProps } from "./types";

function SelectRegistration({ name, icon, onInputChange, value, error, onBlur, options }: SelectProps) {
  return (
    <SelectComponentContainer>
      <SelectWrapper>
        {icon && <Icon>{icon}</Icon>}
        <SelectComponent name={name} onChange={onInputChange} value={value} onBlur={onBlur}>
          {options && options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectComponent>
      </SelectWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectComponentContainer>
  );
}

export default SelectRegistration;
