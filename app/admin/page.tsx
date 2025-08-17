"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Star,
  Home,
  Building,
  Sparkles,
  Mail,
  Edit,
  Eye,
  User,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Search,
  Download,
  UserPlus,
} from "lucide-react"
import { format, addDays, subDays } from "date-fns"
import Link from "next/link"

// Mock data for demonstration
const mockBookings = [
  {
    id: "CP1703123456",
    customer: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+65 9123 4567",
    service: "Residential Cleaning",
    type: "Deep Clean",
    date: addDays(new Date(), 2),
    time: "10:00 AM",
    status: "confirmed",
    cleaner: "Sarah Chen",
    cleanerId: "CL001",
    total: 130,
    address: "123 Orchard Road, #12-34, Singapore 238863",
    frequency: "One-time",
    notes: "Please focus on kitchen and bathrooms",
  },
  {
    id: "CP1703123455",
    customer: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    customerPhone: "+65 8234 5678",
    service: "Commercial Cleaning",
    type: "Daily Maintenance",
    date: new Date(),
    time: "8:00 AM",
    status: "in-progress",
    cleaner: "Michael Tan",
    cleanerId: "CL002",
    total: 120,
    address: "456 Marina Bay, #05-10, Singapore 018956",
    frequency: "Daily",
    notes: "Office building, 5th floor only",
  },
  {
    id: "CP1703123454",
    customer: "Robert Wilson",
    customerEmail: "robert.wilson@email.com",
    customerPhone: "+65 9876 5432",
    service: "Deep Cleaning",
    type: "Post-Renovation",
    date: subDays(new Date(), 1),
    time: "9:00 AM",
    status: "completed",
    cleaner: "Lisa Wong",
    cleanerId: "CL003",
    total: 250,
    address: "789 Sentosa Cove, #12-01, Singapore 098234",
    frequency: "One-time",
    notes: "Post-renovation cleanup, heavy dust",
    rating: 5,
  },
]

const mockCleaners = [
  {
    id: "CL001",
    name: "Sarah Chen",
    email: "sarah.chen@cleanpro.sg",
    phone: "+65 9111 2222",
    status: "active",
    rating: 4.9,
    completedJobs: 156,
    specialties: ["Residential", "Deep Cleaning"],
    joinDate: "2023-01-15",
  },
  {
    id: "CL002",
    name: "Michael Tan",
    email: "michael.tan@cleanpro.sg",
    phone: "+65 9333 4444",
    status: "active",
    rating: 4.8,
    completedJobs: 203,
    specialties: ["Commercial", "Office Cleaning"],
    joinDate: "2022-08-20",
  },
  {
    id: "CL003",
    name: "Lisa Wong",
    email: "lisa.wong@cleanpro.sg",
    phone: "+65 9555 6666",
    status: "active",
    rating: 4.9,
    completedJobs: 189,
    specialties: ["Deep Cleaning", "Post-Renovation"],
    joinDate: "2022-11-10",
  },
]

const mockCustomers = [
  {
    id: "CU001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+65 9123 4567",
    address: "123 Orchard Road, #12-34",
    totalBookings: 5,
    totalSpent: 650,
    lastBooking: subDays(new Date(), 7),
    status: "active",
  },
  {
    id: "CU002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+65 8234 5678",
    address: "456 Marina Bay, #05-10",
    totalBookings: 12,
    totalSpent: 1440,
    lastBooking: new Date(),
    status: "active",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [bookingFilter, setBookingFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "in-progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getServiceIcon = (service: string) => {
    if (service.includes("Residential")) return Home
    if (service.includes("Commercial")) return Building
    return Sparkles
  }

  const filteredBookings = mockBookings.filter((booking) => {
    if (bookingFilter === "all") return true
    return booking.status === bookingFilter
  })

  // Calculate metrics
  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.total, 0)
  const completedBookings = mockBookings.filter((b) => b.status === "completed").length
  const activeCleaners = mockCleaners.filter((c) => c.status === "active").length
  const totalCustomers = mockCustomers.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">CleanPro</h1>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage your cleaning service business operations.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="cleaners">Cleaners</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">S${totalRevenue}</p>
                      <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{mockBookings.length}</p>
                      <p className="text-xs text-blue-600 mt-1">+8% from last month</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Cleaners</p>
                      <p className="text-2xl font-bold">{activeCleaners}</p>
                      <p className="text-xs text-primary mt-1">All available</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                      <p className="text-2xl font-bold">{totalCustomers}</p>
                      <p className="text-xs text-accent mt-1">+15% from last month</p>
                    </div>
                    <User className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking requests and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.slice(0, 5).map((booking) => {
                      const ServiceIcon = getServiceIcon(booking.service)
                      return (
                        <div key={booking.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ServiceIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{booking.customer}</h4>
                            <p className="text-sm text-muted-foreground">
                              {booking.service} • {format(booking.date, "MMM d")} at {booking.time}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Highest rated cleaners this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCleaners
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((cleaner) => (
                        <div key={cleaner.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                            <AvatarFallback>
                              {cleaner.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{cleaner.name}</h4>
                            <p className="text-sm text-muted-foreground">{cleaner.completedJobs} jobs completed</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{cleaner.rating}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Booking Management</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search bookings..." className="w-64" />
                </div>
                <Select value={bookingFilter} onValueChange={setBookingFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Booking ID</th>
                        <th className="text-left p-4 font-medium">Customer</th>
                        <th className="text-left p-4 font-medium">Service</th>
                        <th className="text-left p-4 font-medium">Date & Time</th>
                        <th className="text-left p-4 font-medium">Cleaner</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Amount</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="border-b hover:bg-muted/25">
                          <td className="p-4 font-mono text-sm">{booking.id}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{booking.customer}</p>
                              <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{booking.service}</p>
                              <p className="text-sm text-muted-foreground">{booking.type}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{format(booking.date, "MMM d, yyyy")}</p>
                              <p className="text-sm text-muted-foreground">{booking.time}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-medium">{booking.cleaner || "Unassigned"}</p>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </td>
                          <td className="p-4 font-medium">S${booking.total}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cleaners Tab */}
          <TabsContent value="cleaners" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Cleaner Management</h3>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Cleaner
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCleaners.map((cleaner) => (
                <Card key={cleaner.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/generic-placeholder-icon.png?height=48&width=48`} />
                          <AvatarFallback>
                            {cleaner.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{cleaner.name}</h4>
                          <p className="text-sm text-muted-foreground">{cleaner.email}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-50 text-green-700 border-green-200">{cleaner.status}</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{cleaner.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Completed Jobs:</span>
                        <span className="font-medium">{cleaner.completedJobs}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{cleaner.phone}</span>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {cleaner.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Customer Management</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search customers..." className="w-64" />
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Customer</th>
                        <th className="text-left p-4 font-medium">Contact</th>
                        <th className="text-left p-4 font-medium">Address</th>
                        <th className="text-left p-4 font-medium">Total Bookings</th>
                        <th className="text-left p-4 font-medium">Total Spent</th>
                        <th className="text-left p-4 font-medium">Last Booking</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-muted/25">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                                <AvatarFallback>
                                  {customer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <p className="font-medium">{customer.name}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-sm">{customer.email}</p>
                              <p className="text-sm text-muted-foreground">{customer.phone}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm">{customer.address}</p>
                          </td>
                          <td className="p-4 font-medium">{customer.totalBookings}</td>
                          <td className="p-4 font-medium">S${customer.totalSpent}</td>
                          <td className="p-4">{format(customer.lastBooking, "MMM d, yyyy")}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-2xl font-semibold">Business Analytics</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold">S${totalRevenue}</p>
                      <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Booking Value</p>
                      <p className="text-2xl font-bold">S${Math.round(totalRevenue / mockBookings.length)}</p>
                      <p className="text-xs text-blue-600 mt-1">+5% vs last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Customer Retention</p>
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-xs text-primary mt-1">+3% vs last month</p>
                    </div>
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                      <p className="text-2xl font-bold">4.9</p>
                      <p className="text-xs text-yellow-600 mt-1">Excellent service</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Distribution</CardTitle>
                  <CardDescription>Breakdown of services booked this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Residential Cleaning</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-16 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Commercial Cleaning</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-8 h-2 bg-secondary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Deep Cleaning</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-4 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Revenue and booking trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Integration with charting library needed for detailed analytics
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h3 className="text-2xl font-semibold">System Settings</h3>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Update your company details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="CleanPro Singapore Pte Ltd" />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Company Email</Label>
                    <Input id="companyEmail" defaultValue="admin@cleanpro.sg" />
                  </div>
                  <div>
                    <Label htmlFor="companyPhone">Company Phone</Label>
                    <Input id="companyPhone" defaultValue="+65 1234 5678" />
                  </div>
                  <div>
                    <Label htmlFor="companyAddress">Company Address</Label>
                    <Textarea id="companyAddress" defaultValue="123 Business Park, Singapore 123456" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Settings</CardTitle>
                  <CardDescription>Configure service pricing and availability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="basePrice">Base Residential Price (S$)</Label>
                    <Input id="basePrice" type="number" defaultValue="80" />
                  </div>
                  <div>
                    <Label htmlFor="commercialPrice">Base Commercial Price (S$)</Label>
                    <Input id="commercialPrice" type="number" defaultValue="120" />
                  </div>
                  <div>
                    <Label htmlFor="deepCleanPrice">Deep Cleaning Price (S$)</Label>
                    <Input id="deepCleanPrice" type="number" defaultValue="150" />
                  </div>
                  <div>
                    <Label htmlFor="operatingHours">Operating Hours</Label>
                    <Select defaultValue="8am-6pm">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8am-6pm">8:00 AM - 6:00 PM</SelectItem>
                        <SelectItem value="7am-7pm">7:00 AM - 7:00 PM</SelectItem>
                        <SelectItem value="24hours">24 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Update Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
