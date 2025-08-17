import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cleanpro.sg' },
    update: {},
    create: {
      email: 'admin@cleanpro.sg',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+65 1234 5678',
      role: 'ADMIN',
      status: 'ACTIVE',
      admin: {
        create: {
          permissions: 'manage_users,manage_bookings,manage_services,view_analytics'
        }
      }
    }
  })

  // Create customer user
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customerUser = await prisma.user.upsert({
    where: { email: 'john.doe@email.com' },
    update: {},
    create: {
      email: 'john.doe@email.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+65 9123 4567',
      role: 'CUSTOMER',
      status: 'ACTIVE',
      customer: {
        create: {
          address: '123 Orchard Road, #12-34',
          postalCode: '238863',
          preferences: 'Focus on kitchen and bathrooms, eco-friendly products preferred'
        }
      }
    }
  })

  // Create cleaner user
  const cleanerPassword = await bcrypt.hash('cleaner123', 12)
  const cleanerUser = await prisma.user.upsert({
    where: { email: 'sarah.chen@cleanpro.sg' },
    update: {},
    create: {
      email: 'sarah.chen@cleanpro.sg',
      password: cleanerPassword,
      firstName: 'Sarah',
      lastName: 'Chen',
      phone: '+65 9111 2222',
      role: 'CLEANER',
      status: 'ACTIVE',
      cleaner: {
        create: {
          specialties: 'Residential,Deep Cleaning',
          hourlyRate: 25,
          rating: 4.9,
          completedJobs: 156,
          availability: 'Monday to Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 3:00 PM, Sunday: Closed',
          documents: 'ID_verification.pdf,cleaning_certification.pdf'
        }
      }
    }
  })

  // Create services
  const residentialService = await prisma.service.upsert({
    where: { id: 'residential-cleaning' },
    update: {},
    create: {
      id: 'residential-cleaning',
      name: 'Residential Cleaning',
      type: 'RESIDENTIAL',
      description: 'Regular house cleaning for homes and apartments',
      basePrice: 80,
      duration: 120
    }
  })

  const commercialService = await prisma.service.upsert({
    where: { id: 'commercial-cleaning' },
    update: {},
    create: {
      id: 'commercial-cleaning',
      name: 'Commercial Cleaning',
      type: 'COMMERCIAL',
      description: 'Professional office and commercial space cleaning',
      basePrice: 120,
      duration: 90
    }
  })

  const deepCleaningService = await prisma.service.upsert({
    where: { id: 'deep-cleaning' },
    update: {},
    create: {
      id: 'deep-cleaning',
      name: 'Deep Cleaning',
      type: 'DEEP_CLEANING',
      description: 'Comprehensive deep cleaning and sanitization',
      basePrice: 150,
      duration: 180
    }
  })

  // Create service options
  await prisma.serviceOption.upsert({
    where: { id: 'fridge-cleaning' },
    update: {},
    create: {
      id: 'fridge-cleaning',
      serviceId: residentialService.id,
      name: 'Inside Fridge Cleaning',
      description: 'Deep clean inside refrigerator and freezer',
      price: 25
    }
  })

  await prisma.serviceOption.upsert({
    where: { id: 'oven-cleaning' },
    update: {},
    create: {
      id: 'oven-cleaning',
      serviceId: residentialService.id,
      name: 'Inside Oven Cleaning',
      description: 'Deep clean inside oven and stovetop',
      price: 30
    }
  })

  await prisma.serviceOption.upsert({
    where: { id: 'window-cleaning' },
    update: {},
    create: {
      id: 'window-cleaning',
      serviceId: residentialService.id,
      name: 'Window Cleaning',
      description: 'Clean all windows and mirrors',
      price: 40
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin user: admin@cleanpro.sg / admin123')
  console.log('👤 Customer user: john.doe@email.com / customer123')
  console.log('👤 Cleaner user: sarah.chen@cleanpro.sg / cleaner123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
