import Button from "components/Button/Button";

import {
  ButtonWrapper,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "./styles";
import { ModalProps } from "./types";

const ModalWindowRegistration: React.FC<ModalProps> = ({ children, onOk }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <ButtonWrapper>
            <Button
              type="submit"
              name="ОК"
              background="#0A5F38"
              onButtonClick={onOk}
            />
          </ButtonWrapper>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalWindowRegistration;
