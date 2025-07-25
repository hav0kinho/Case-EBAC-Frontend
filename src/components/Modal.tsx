import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

const Overlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;
  z-index: 999;
`;

const Content = styled(Dialog.Content)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Title = styled(Dialog.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CloseButton = styled(Dialog.Close)`
  background: none;
  border: none;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  cursor: pointer;
`;

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ open, onOpenChange, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Overlay />
      <Content>
        <Title>{title}</Title>
        <CloseButton aria-label="Fechar">
          X
        </CloseButton>
        {children}
      </Content>
    </Dialog.Root>
  );
};
