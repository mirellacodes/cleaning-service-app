import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting production database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cleanpro.sg' },
    update: {},
    create: {
      email: 'admin@cleanpro.sg',
      password: adminPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+65 1234 5678',
      admin: {
        create: {
          permissions: 'all'
        }
      }
    }
  })
  console.log('✅ Admin user created:', admin.email)

  // Create customer user
  const customerPassword = await bcrypt.hash('customer123', 10)
  const customer = await prisma.user.upsert({
    where: { email: 'john.doe@email.com' },
    update: {},
    create: {
      email: 'john.doe@email.com',
      password: customerPassword,
      role: 'CUSTOMER',
      status: 'ACTIVE',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+65 9876 5432',
      customer: {
        create: {
          address: '123 Main Street',
          unit: 'Apt 4B',
          postalCode: '123456',
          preferences: JSON.stringify({
            cleaningFrequency: 'weekly',
            preferredTime: 'morning',
            specialInstructions: 'Pet-friendly cleaning products only'
          })
        }
      }
    }
  })
  console.log('✅ Customer user created:', customer.email)

  // Create cleaner user
  const cleanerPassword = await bcrypt.hash('cleaner123', 10)
  const cleaner = await prisma.user.upsert({
    where: { email: 'sarah.chen@cleanpro.sg' },
    update: {},
    create: {
      email: 'sarah.chen@cleanpro.sg',
      password: cleanerPassword,
      role: 'CLEANER',
      status: 'ACTIVE',
      firstName: 'Sarah',
      lastName: 'Chen',
      phone: '+65 8765 4321',
      cleaner: {
        create: {
          specialties: 'residential,deep-cleaning,eco-friendly',
          hourlyRate: 25.0,
          rating: 4.8,
          completedJobs: 150,
          joinDate: new Date('2023-01-15'),
          availability: JSON.stringify({
            monday: { start: '08:00', end: '18:00' },
            tuesday: { start: '08:00', end: '18:00' },
            wednesday: { start: '08:00', end: '18:00' },
            thursday: { start: '08:00', end: '18:00' },
            friday: { start: '08:00', end: '18:00' },
            saturday: { start: '09:00', end: '16:00' },
            sunday: { start: '09:00', end: '16:00' }
          }),
          documents: 'id-card,cleaning-certificate,insurance'
        }
      }
    }
  })
  console.log('✅ Cleaner user created:', cleaner.email)

  // Create sample services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'residential-cleaning' },
      update: {},
      create: {
        id: 'residential-cleaning',
        name: 'Residential Cleaning',
        description: 'Regular house cleaning service for homes and apartments',
        price: 80.0,
        duration: 120,
        category: 'RESIDENTIAL',
        isActive: true
      }
    }),
    prisma.service.upsert({
      where: { id: 'deep-cleaning' },
      update: {},
      create: {
        id: 'deep-cleaning',
        name: 'Deep Cleaning',
        description: 'Thorough cleaning including hard-to-reach areas',
        price: 150.0,
        duration: 240,
        category: 'RESIDENTIAL',
        isActive: true
      }
    }),
    prisma.service.upsert({
      where: { id: 'commercial-cleaning' },
      update: {},
      create: {
        id: 'commercial-cleaning',
        name: 'Commercial Cleaning',
        description: 'Office and commercial space cleaning',
        price: 120.0,
        duration: 180,
        category: 'COMMERCIAL',
        isActive: true
      }
    })
  ])
  console.log('✅ Services created:', services.length)

  console.log('🎉 Production database seeding completed!')
  console.log('\n📋 Demo Accounts:')
  console.log('👑 Admin: admin@cleanpro.sg / admin123')
  console.log('👤 Customer: john.doe@email.com / customer123')
  console.log('🧹 Cleaner: sarah.chen@cleanpro.sg / cleaner123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
