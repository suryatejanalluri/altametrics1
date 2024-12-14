import React from 'react';
import '../styles/InvoiceList.css';

interface Invoice {
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  paid: boolean;
  user_id: string;
}

interface ModalProps {
  invoice: Invoice;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ invoice, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Invoice Details</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p><strong>Vendor:</strong> {invoice.vendor_name}</p>
          <p><strong>Amount:</strong> {formatAmount(invoice.amount)}</p>
          <p><strong>Due Date:</strong> {formatDate(invoice.due_date)}</p>
          <p><strong>Description:</strong> {invoice.description}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`status-badge ${invoice.paid ? 'status-paid' : 'status-pending'}`}>
              {invoice.paid ? 'Paid' : 'Pending'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
