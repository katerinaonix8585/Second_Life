import { useState, useEffect } from "react";

import Button from "components/Button/Button";

import { CounterWrapper, InputBid, ButtonControl } from "./styles";
import { CounterProps } from "./types";

function Counter({ countValue, onMakeABid }: CounterProps) {
  const [bidAmount, setBidAmount] = useState(countValue.toString());

  useEffect(() => {
    setBidAmount(countValue.toString());
  }, [countValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(event.target.value);
  };

  const handleBidButtonClick = () => {
    const bidValue = parseFloat(bidAmount);

    if (isNaN(bidValue)) {
      console.error("Invalid bid amount:", bidAmount);
      return;
    }

    if (bidValue <= countValue) {
      console.error(
        "New bid amount must be greater than the current bid amount.",
      );
      return;
    }

    if (onMakeABid) {
      onMakeABid(bidValue);
    } else {
      console.error("onMakeABid is not defined");
    }
  };

  return (
    <CounterWrapper>
      <InputBid
        type="number"
        value={bidAmount}
        onChange={handleChange}
        placeholder="Enter bid amount"
      />
      <ButtonControl>
        <Button
          background="#0A5F38"
          name="Make a bid"
          onButtonClick={handleBidButtonClick}
        />
      </ButtonControl>
    </CounterWrapper>
  );
}

export default Counter;
