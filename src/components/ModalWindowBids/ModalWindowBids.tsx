import Button from "components/Button/Button";

import {
  ButtonWrapper,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./styles";
import { ModalProps } from "./types";

const ModalWindowBids: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  onOk,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <ButtonWrapper>
            <Button
              type="submit"
              name="Set winner"
              background="#0A5F38"
              onButtonClick={onOk}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              type="submit"
              name="Back"
              background="grey"
              onButtonClick={onClose}
            />
          </ButtonWrapper>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalWindowBids;
