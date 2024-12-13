import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { PrismaService } from '../prisma/prisma.service'; // Make sure this is the path for PrismaService

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService,
    private prisma: PrismaService
  ) {}

//   // Route to get all invoices
//   @Get()
//   getAllInvoices() {
//     //return "Hello World 2";
//     return this.invoicesService.getInvoices();
//   }
   // Route to get all invoices with pagination
   @Get()
   getAllInvoices(
     @Query('page') page: number = 1, // Default to page 1
     @Query('limit') limit: number = 10 // Default to 10 invoices per page
   ) {
     return this.invoicesService.getInvoices(page, limit); // Pass page and limit to service
   }
   // Fetch invoices with pagination
  async getInvoices(page: number, limit: number) {
    const pageNum = parseInt(page.toString(), 10); // Ensure page is an integer
    const limitNum = parseInt(limit.toString(), 10); // Ensure limit is an integer

    if (isNaN(pageNum) || pageNum < 1) {
      throw new Error('Invalid page number. It must be a positive integer.');
    }

    if (isNaN(limitNum) || limitNum < 1) {
      throw new Error('Invalid limit number. It must be a positive integer.');
    }

    const skip = (pageNum - 1) * limitNum; // Calculate skip for pagination

    const invoices = await this.prisma.invoice.findMany({
      skip: skip,
      take: limitNum, // Pass limitNum (integer) to take
    });

    const totalInvoices = await this.prisma.invoice.count(); // Get total number of invoices

    return {
      invoices,
      totalInvoices,
      totalPages: Math.ceil(totalInvoices / limitNum), // Calculate total number of pages
      currentPage: pageNum, // Return the current page number
    };
  }


  // New method to get total amount due by due_date
  @Get('total')
  async getTotalAmountDue() {
    return this.invoicesService.getTotalByDueDate();
  }

  // Route to get an invoice by ID
  @Get(':id')
  getInvoice(@Param('id') id: string) {
    return this.invoicesService.getInvoiceById(id);
  }
  

  // Route to create a new invoice
  @Post()
  createInvoice(@Body() data: any) {
    return this.invoicesService.createInvoice(data);
  }
}
