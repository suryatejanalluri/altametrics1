import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Invoice {
  id: number;
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  user_id: number;
  paid: boolean;
}

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices(state, action: PayloadAction<Invoice[]>) {
      state.invoices = action.payload;
    },
  },
});

export const { setInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
