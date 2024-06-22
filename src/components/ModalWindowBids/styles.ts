import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #dbd7d2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  border-radius: 8px;
  /* max-width: auto; */
  height: auto;
  width: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const ModalBody = styled.div`
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonWrapper = styled.div`
  width: 200px;
`;
