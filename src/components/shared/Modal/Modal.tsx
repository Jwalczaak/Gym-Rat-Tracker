import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

function Open({ children, opens: opensWindowName }) {
  console.log('dsadas');
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = '';

  if (name !== openName) return null;

  return createPortal(
    <div className="overlay bg-surface-subtle p6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-(--shadow-sm) transition-all duration-500">
      <div className="modal bg-surface-subtle fixed top-0 left-0 z-1000 h-screen w-full backdrop-blur-sm"></div>
      {/* <div> {cloneElement(children, { onCloseModal: close })}</div> */}
      <span className="text-fg-muted text-base">{children}</span>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
