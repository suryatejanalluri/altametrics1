import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { invoiceResponseSchema } from '../validation/invoiceSchema'; // Import the updated schema
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { setInvoices } from '../redux/invoiceSlice';
import '../styles/InvoiceList.css';


const InvoiceList: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = React.useState<null | any>(null);
  const [page, setPage] = React.useState(1); // State for current page
  const limit = 10; // Number of items per page

  // Fetch invoices using React Query and passing page and limit
  const { data: invoices, error, isLoading } = useQuery(
    ['invoices', page],
    async () => {
      const response = await axios.get('http://localhost:3000/invoices', {
        params: { page, limit }, // Pass page and limit for pagination
      });
      return response.data; // Return the full response (including invoices)
    }
  );

  // Validate the fetched data using the updated Zod schema
  let validatedInvoices = invoices;

  if (invoices) {
    try {
      validatedInvoices = invoiceResponseSchema.parse(invoices); // Validate entire response
    } catch (err) {
      console.error('Invalid data:', err);
      return <div>Error: Invalid invoice data</div>;
    }
  }

  // Redux dispatch to store validated invoices
  const dispatch = useDispatch();
  if (validatedInvoices) {
    dispatch(setInvoices(validatedInvoices.invoices)); // Store only the invoices array in Redux
  }

  // Error handling for React Query
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error fetching invoices: {error.message}</div>;

  // Pagination controls
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent going below page 1
  };

  return (
    <div>
      <h1>Invoices</h1>
      <ul>
        {validatedInvoices.invoices?.map((invoice: any) => (
          <li key={invoice.id} onClick={() => setSelectedInvoice(invoice)}>
            {invoice.vendor_name} - ${invoice.amount}
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={page === validatedInvoices.totalPages}>
          Next
        </button>
      </div>

      {/* Modal for displaying selected invoice */}
      {selectedInvoice && (
        <Modal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
};

export default InvoiceList;

