import "./styles.ts";
import Button from "components/Button/Button";

import {
  ButtonControl,
  CounterWrapper,
  InputBid,
  InputWrapper,
} from "./styles";
import { CounterProps } from "./types";

function Counter({ countValue, onMakeABid }: CounterProps) {
  return (
    <CounterWrapper>
      <InputWrapper>
        <InputBid value={countValue}></InputBid>
      </InputWrapper>
      <ButtonControl>
        <Button name="Make a bid" onButtonClick={onMakeABid} />
      </ButtonControl>
    </CounterWrapper>
  );
}

export default Counter;
