import { Card } from '@/components/ui/card';
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal components must be used within <Modal>');
  return context;
}

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  opens: string;
}) {
  const { open } = useModalContext();

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Close({
  children,
}: {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}) {
  const { close } = useModalContext();

  return cloneElement(children, {
    onClick: close,
  });
}

function Window({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const { openName, close } = useModalContext();

  if (name !== openName) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 z-1000 h-screen w-full backdrop-blur-xs"
      onMouseDown={close}
    >
      <Card
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-0 shadow-(--shadow-sm) transition-all duration-500"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
      </Card>
    </div>,
    document.body,
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b">
      <div className="p-4">{children}</div>
    </div>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t">
      <div className="p-4">{children}</div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.Close = Close;

export default Modal;
