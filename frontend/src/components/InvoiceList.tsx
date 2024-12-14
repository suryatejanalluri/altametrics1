import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { invoiceResponseSchema } from '../validation/invoiceSchema';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { setInvoices } from '../redux/invoiceSlice';
import '../styles/InvoiceList.css';

interface Invoice {
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  paid: boolean;
  user_id: string;
}

const InvoiceList: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { data: invoices, error, isLoading } = useQuery(
    ['invoices', page],
    async () => {
      const response = await axios.get('http://localhost:3000/invoices', {
        params: { page, limit },
      });
      return response.data;
    }
  );

  let validatedInvoices = invoices;

  if (invoices) {
    try {
      validatedInvoices = invoiceResponseSchema.parse(invoices);
    } catch (err) {
      console.error('Invalid data:', err);
      return <div>Error: Invalid invoice data</div>;
    }
  }

  const dispatch = useDispatch();
  if (validatedInvoices) {
    dispatch(setInvoices(validatedInvoices.invoices));
  }

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error fetching invoices: {error.message}</div>;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const startIndex = (page - 1) * limit;

  return (
    <div className="invoice-list-container">
      <h1>Invoices</h1>
      <ul className="invoice-list">
        {validatedInvoices.invoices?.map((invoice: Invoice, index: number) => (
          <li key={invoice.user_id} onClick={() => setSelectedInvoice(invoice)}>
            <div className="invoice-item">
              <span className="invoice-number">{startIndex + index + 1}.</span>
              <span className="vendor-name">{invoice.vendor_name}</span>
              <span className="amount">{formatAmount(invoice.amount)}</span>
              <span className={`status-badge ${invoice.paid ? 'status-paid' : 'status-pending'}`}>
                {invoice.paid ? 'Paid' : 'Pending'}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={page === validatedInvoices.totalPages}>
          Next
        </button>
      </div>

      {selectedInvoice && (
        <Modal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
};

export default InvoiceList;
