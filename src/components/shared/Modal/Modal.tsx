import { Card } from '@/components/ui/card';
import { useOutsideClick } from '@/hooks/useOutsideClick';
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

function useModalContext() {
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

function Window({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 z-1000 h-screen w-full backdrop-blur-xs">
      <Card
        ref={ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 shadow-(--shadow-sm) transition-all duration-500"
      >
        <div> {children}</div>
      </Card>
    </div>,
    document.body,
  );
}

function Header({
  title,
  secondTitle,
  subTitle,
}: {
  title: string;
  secondTitle?: string;
  subTitle?: string;
}) {
  return (
    <div>
      {title},{subTitle},{secondTitle}
    </div>
  );
}

function Footer({ footerText }: { footerText: string }) {
  return <div>{footerText}</div>;
}

Modal.Open = Open;
Modal.Window = Window;
Modal.Header = Header;
Modal.Footer = Footer;

export default Modal;
