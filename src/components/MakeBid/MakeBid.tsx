import Button from "components/Button/Button";

import { CounterWrapper, InputBid, ButtonControl } from "./styles";
import { CounterProps } from "./types";

function Counter({ countValue, onMakeABid }: CounterProps) {
  const handleChange = () => {
    // Handle the change event here if necessary
    // Example: Update parent state or perform validation
  };

  return (
    <CounterWrapper>
      <InputBid value={countValue} onChange={handleChange} />
      <ButtonControl>
        <Button name="Make a bid" onButtonClick={onMakeABid} />
      </ButtonControl>
    </CounterWrapper>
  );
}

export default Counter;
