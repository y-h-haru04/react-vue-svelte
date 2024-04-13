import { ReactNode, useEffect } from "react";

type Props = {
  title: string;
  children: ReactNode[];
  onDestroyModal?: () => void;
};

const Modal = ({ title, children: [body, footer], onDestroyModal }: Props) => {
  useEffect(() => {
    return () => {
      onDestroyModal?.();
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-backdrop"></div>
      <div className="modal-content">
        {/* Modal header */}
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>
        {/* Modal body */}
        <div className="modal-body">{body}</div>
        {/* Modal footer  */}
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
