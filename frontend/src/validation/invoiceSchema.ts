// import { z } from 'zod';

// // Define the invoice schema
// export const invoiceSchema = z.array(
//   z.object({
//     id: z.number(),
//     vendor_name: z.string(),
//     amount: z.number(),
//     due_date: z.string(), // You can also use z.date() if you want to handle Date objects
//     description: z.string(),
//     user_id: z.number(),
//     paid: z.boolean(),
//   })
// );

// // Define the schema for the response that contains the invoices and metadata
// const invoiceResponseSchema = z.object({
//   invoices: z.array(invoiceSchema), // The invoices will be an array of invoice objects
//   totalInvoices: z.number(),
//   totalPages: z.number(),
//   currentPage: z.number(),
// });

//export { invoiceResponseSchema };
import { z } from 'zod';

// Define the invoice schema
const invoiceSchema = z.object({
  id: z.number(),
  vendor_name: z.string(),
  amount: z.number(),
  due_date: z.string(), // You can also use z.date() if you want to handle Date objects
  description: z.string(),
  user_id: z.number(),
  paid: z.boolean(),
});

// Define the schema for the response that contains the invoices and metadata
const invoiceResponseSchema = z.object({
  invoices: z.array(invoiceSchema), // The invoices will be an array of invoice objects
  totalInvoices: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

export { invoiceResponseSchema };

