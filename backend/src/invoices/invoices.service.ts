import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Make sure this is the path for PrismaService

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

//   // Fetch all invoices
//   async getInvoices() {
//     return this.prisma.invoice.findMany();
//   }

  // Fetch invoices with pagination
  async getInvoices(page: number, limit: number) {
    // Ensure page and limit are integers
    const pageNum = parseInt(page.toString(), 10); // Parse page as an integer
    const limitNum = parseInt(limit.toString(), 10); // Parse limit as an integer

    if (isNaN(pageNum) || pageNum < 1) {
      throw new Error('Invalid page number. It must be a positive integer.');
    }

    if (isNaN(limitNum) || limitNum < 1) {
      throw new Error('Invalid limit number. It must be a positive integer.');
    }

    const skip = (pageNum - 1) * limitNum; // Calculate skip for pagination
    const invoices = await this.prisma.invoice.findMany({
      skip: skip, // Skip the invoices from previous pages
      take: limitNum, // Limit the number of invoices returned
    });

    const totalInvoices = await this.prisma.invoice.count(); // Get the total number of invoices

    return {
      invoices,
      totalInvoices,
      totalPages: Math.ceil(totalInvoices / limitNum), // Calculate total number of pages
      currentPage: pageNum, // Return the current page number
    };
  }
  // Fetch a specific invoice by ID
  async getInvoiceById(id: string) {
    //return this.prisma.invoice.findUnique({ where: { id } });
    // Convert the string `id` to an integer
    const invoiceId = parseInt(id);

    // Validate if the id is a valid integer
    if (isNaN(invoiceId)) {
      throw new Error('Invalid ID provided. It must be a valid number.');
    }
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice) {
      // Throw an error if the invoice is not found
      throw new NotFoundException(`Invoice with ID ${invoiceId} not found`);
    }

    return invoice;
  }

   // Method to get total amount due by due_date
   async getTotalByDueDate() {
    const totals = await this.prisma.invoice.groupBy({
      by: ['due_date'],  // Group by due_date
      _sum: {
        amount: true,  // Sum the amount for each group
      },
      orderBy: {
        due_date: 'asc',  // Sort by due_date
      },
    });

    return totals.map((total) => ({
      due_date: total.due_date,
      total_amount_due: total._sum.amount,
    }));
  }

  // Create a new invoice
  async createInvoice(data: { vendor_name: string, amount: number, due_date: Date, description: string, user_id: number, paid: boolean }) {
    console.log('Received data:', data); // Debug the incoming data
    return this.prisma.invoice.create({
      data,
    }); 
  }
}
