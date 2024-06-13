export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onOk: () => void;
}
