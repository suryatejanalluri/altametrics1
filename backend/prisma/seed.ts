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
  
      // Create the user with the hashed password
      const createdUser = await prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,  // Store the hashed password
          name: user.name,
        },
      });
      console.log(`User created: ${createdUser.email}`);
  
      // Seed invoices for the user (directly after user creation)
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
  