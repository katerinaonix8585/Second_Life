import React, { useState, useEffect } from "react";

import Button from "components/Button/Button";

import {
  CounterWrapper,
  InputBid,
  ButtonControl,
  ErrorMessage,
  InputWrapper,
} from "./styles";
import { CounterProps } from "./types";

function Counter({ countValue, onMakeABid, isFirstBid }: CounterProps) {
  const initialBidAmount =
    countValue !== null && countValue !== undefined
      ? countValue.toString()
      : "";
  const [bidAmount, setBidAmount] = useState(initialBidAmount);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newBidAmount =
      countValue !== null && countValue !== undefined
        ? countValue.toString()
        : "";
    setBidAmount(newBidAmount);
  }, [countValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(event.target.value);
    setError(null);
  };

  const handleBidButtonClick = () => {
    const bidValue = parseFloat(bidAmount);

    if (isNaN(bidValue)) {
      setError("Invalid bid amount. Please enter a valid number.");
      return;
    }

    if (bidValue < countValue && isFirstBid) {
      setError("First bid amount must be greater than the start bid amount.");
      return;
    }

    if (bidValue <= countValue && !isFirstBid) {
      setError("New bid amount must be greater than the current bid amount.");
      return;
    }

    if (onMakeABid) {
      onMakeABid(bidValue);
    } else {
      setError("onMakeABid is not defined");
    }
  };

  return (
    <CounterWrapper>
      <InputWrapper>
        <InputBid
          type="number"
          value={bidAmount}
          onChange={handleChange}
          placeholder="Enter bid amount"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
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
