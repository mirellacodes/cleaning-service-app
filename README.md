# CleanPro Singapore - Professional Cleaning Services

A modern, responsive web application for booking professional cleaning services in Singapore. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Professional Booking System** - Easy-to-use interface for scheduling cleaning services
- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Authentication System** - Secure user login and registration
- **Beautiful UI/UX** - Natural color scheme with moss green, earth yellow, and tiger's eye
- **Multiple User Roles** - Customer, Cleaner, and Admin interfaces
- **Real-time Updates** - Modern web technologies for smooth user experience

## 🎨 Design

The app features a carefully crafted natural color palette:
- **Dark Moss Green** (#606c38) - Primary brand color
- **Pakistan Green** (#283618) - Text and accents
- **Cornsilk** (#fefae0) - Light backgrounds
- **Earth Yellow** (#dda15e) - Secondary elements
- **Tiger's Eye** (#bc6c25) - Highlight colors

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, CSS Variables
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM with SQLite
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 📱 Pages & Features

### Public Pages
- **Homepage** - Company introduction, services overview, and booking CTA
- **About** - Company story, statistics, and key benefits
- **Contact** - Contact information and message form
- **Services** - Detailed service offerings

### User Pages
- **Authentication** - Sign in/up with secure authentication
- **Dashboard** - User dashboard with booking history
- **Booking** - Service selection and scheduling
- **Payment** - Secure payment processing
- **Confirmation** - Booking confirmation and details

### Admin Features
- **Admin Dashboard** - Service management and analytics
- **User Management** - Customer and cleaner accounts
- **Service Management** - Add/edit cleaning services

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cleaning-service-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
cleaning-service-app/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard and management
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── book/              # Booking flow
│   ├── cleaner/           # Cleaner dashboard
│   ├── customer/          # Customer dashboard
│   ├── dashboard/         # Main dashboard
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (buttons, cards, etc.)
│   ├── auth-provider.tsx  # Authentication context
│   └── theme-provider.tsx # Theme management
├── lib/                   # Utility functions and configurations
│   ├── auth.ts            # Authentication configuration
│   ├── prisma.ts          # Database client
│   └── utils.ts           # Helper functions
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeding
└── public/                # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database with sample data

## 🌍 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Add other environment variables as needed
```

## 📊 Database Schema

The app uses Prisma with the following main models:
- **User** - Customer and cleaner accounts
- **Service** - Available cleaning services
- **Booking** - Service appointments
- **Review** - Customer feedback and ratings

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
- **Netlify** - Static site hosting
- **Railway** - Full-stack hosting
- **DigitalOcean** - VPS hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible UI primitives
- **Vercel** - For hosting and deployment

## 📞 Support

For support, email hello@cleanpro.sg or create an issue in this repository.

---

**Built with ❤️ for CleanPro Singapore**
