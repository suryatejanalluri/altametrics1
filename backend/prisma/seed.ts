import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';  // Import bcrypt for password hashing
  
  const prisma = new PrismaClient();
  
  async function main() {
    // Define your user data (this will be seeded)
    const users = [
      { email: 'user1@example.com', password: 'password123', name: 'User One' },
      { email: 'user2@example.com', password: 'password456', name: 'User Two' },
    ];
  
    // Loop through each user, hash their password, and store in the database
    for (const user of users) {
      // Hash the plain-text password before storing it
      const hashedPassword = await bcrypt.hash(user.password, 10);  // 10 is the salt rounds
  
      // Upsert the user (create if not exists, update if exists)
      const createdUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {
          password: hashedPassword,
          name: user.name,
        },
        create: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
        },
      });
      console.log(`User upserted: ${createdUser.email}`);
  
      // Delete existing invoices for this user
      await prisma.invoice.deleteMany({
        where: { user_id: createdUser.id },
      });
  
      // Create new invoices for the user
      await prisma.invoice.createMany({
        data: [
          {
            vendor_name: 'Vendor A',
            amount: 100.5,
            due_date: new Date('2024-12-31'),
            description: 'Service charge for December',
            user_id: createdUser.id,  // Use the created user's ID for invoice
            paid: false,
          },
          {
            vendor_name: 'Vendor B',
            amount: 250.0,
            due_date: new Date('2024-12-15'),
            description: 'Annual subscription fee',
            user_id: createdUser.id,  // Use the created user's ID for invoice
            paid: true,
          },
          {
            vendor_name: 'Vendor C',
            amount: 75.0,
            due_date: new Date('2024-12-20'),
            description: 'Food supplier invoice for December',
            user_id: createdUser.id,
            paid: false,
          },
          {
            vendor_name: 'Vendor D',
            amount: 180.25,
            due_date: new Date('2024-12-25'),
            description: 'Kitchen equipment maintenance',
            user_id: createdUser.id,
            paid: true,
          },
          {
            vendor_name: 'Vendor E',
            amount: 300.0,
            due_date: new Date('2024-12-18'),
            description: 'Restaurant furniture lease',
            user_id: createdUser.id,
            paid: false,
          },
          {
            vendor_name: 'Vendor F',
            amount: 150.75,
            due_date: new Date('2024-12-10'),
            description: 'Pantry supplies and ingredients',
            user_id: createdUser.id,
            paid: true,
          },
          {
            vendor_name: 'Vendor G',
            amount: 90.5,
            due_date: new Date('2024-12-22'),
            description: 'Monthly cleaning service for restaurant',
            user_id: createdUser.id,
            paid: false,
          },
          {
            vendor_name: 'Vendor H',
            amount: 120.0,
            due_date: new Date('2024-12-14'),
            description: 'Restaurant marketing campaign for December',
            user_id: createdUser.id,
            paid: true,
          },
          {
            vendor_name: 'Vendor I',
            amount: 250.5,
            due_date: new Date('2024-12-01'),
            description: 'Food delivery service subscription',
            user_id: createdUser.id,
            paid: false,
          },
          {
            vendor_name: 'Vendor J',
            amount: 200.0,
            due_date: new Date('2024-12-19'),
            description: 'Employee uniforms for restaurant staff',
            user_id: createdUser.id,
            paid: true,
          },
          {
            vendor_name: 'Vendor K',
            amount: 99.99,
            due_date: new Date('2024-12-23'),
            description: 'Restaurant POS system subscription',
            user_id: createdUser.id,
            paid: false,
          },
          {
            vendor_name: 'Vendor L',
            amount: 55.0,
            due_date: new Date('2024-12-05'),
            description: 'Tablecloths and napkins purchase',
            user_id: createdUser.id,
            paid: true,
          },
          {
            vendor_name: 'Vendor M',
            amount: 175.0,
            due_date: new Date('2024-12-27'),
            description: 'Restaurant license renewal fee',
            user_id: createdUser.id,
            paid: false,
          },
          {
            vendor_name: 'Vendor N',
            amount: 60.0,
            due_date: new Date('2024-12-10'),
            description: 'Subscription for restaurant industry magazine',
            user_id: createdUser.id,
            paid: true,
          },
        ],
      });
      console.log(`Invoices created for ${createdUser.email}`);
    }
  
    console.log('Seed data has been added to the database!');
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });