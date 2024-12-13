import React from 'react';

interface ModalProps {
  invoice: {
    id: number;
    vendor_name: string;
    amount: number;
    due_date: string;
    description: string;
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ invoice, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Invoice Details</h2>
        <p>Vendor: {invoice.vendor_name}</p>
        <p>Amount: ${invoice.amount}</p>
        <p>Due Date: {invoice.due_date}</p>
        <p>Description: {invoice.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
