"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Settings,
  Star,
  CreditCard,
  Home,
  Building,
  Sparkles,
  Edit,
  Eye,
  CheckCircle,
  User,
} from "lucide-react"
import { format, addDays, subDays } from "date-fns"
import Link from "next/link"

// Mock data for demonstration
const mockBookings = [
  {
    id: "CP1703123456",
    service: "Residential Cleaning",
    type: "Deep Clean",
    date: addDays(new Date(), 2),
    time: "10:00 AM",
    status: "confirmed",
    cleaner: "Sarah Chen",
    total: 130,
    address: "123 Orchard Road, #12-34",
    frequency: "One-time",
  },
  {
    id: "CP1703123455",
    service: "Residential Cleaning",
    type: "Basic Clean",
    date: subDays(new Date(), 7),
    time: "2:00 PM",
    status: "completed",
    cleaner: "Michael Tan",
    total: 80,
    address: "123 Orchard Road, #12-34",
    frequency: "Weekly",
    rating: 5,
  },
  {
    id: "CP1703123454",
    service: "Deep Cleaning",
    type: "Post-Renovation",
    date: subDays(new Date(), 21),
    time: "9:00 AM",
    status: "completed",
    cleaner: "Lisa Wong",
    total: 250,
    address: "123 Orchard Road, #12-34",
    frequency: "One-time",
    rating: 5,
  },
]

const mockPayments = [
  {
    id: "PAY001",
    bookingId: "CP1703123456",
    amount: 130,
    date: new Date(),
    method: "Credit Card",
    status: "completed",
  },
  {
    id: "PAY002",
    bookingId: "CP1703123455",
    amount: 80,
    date: subDays(new Date(), 7),
    method: "PayNow",
    status: "completed",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+65 9123 4567",
    address: "123 Orchard Road",
    unit: "#12-34",
    postalCode: "238863",
  })

  const upcomingBookings = mockBookings.filter((booking) => booking.status === "confirmed")
  const pastBookings = mockBookings.filter((booking) => booking.status === "completed")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200"
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-primary">CleanPro</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/book">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Link>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>
                {userProfile.firstName[0]}
                {userProfile.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Welcome back, {userProfile.firstName}!</h2>
          <p className="text-muted-foreground">Manage your cleaning services and account settings.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{mockBookings.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                      <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{pastBookings.length}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">
                        S${mockBookings.reduce((sum, booking) => sum + booking.total, 0)}
                      </p>
                    </div>
                    <CreditCard className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled cleaning services</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => {
                      const ServiceIcon = getServiceIcon(booking.service)
                      return (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <ServiceIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{booking.service}</h4>
                              <p className="text-sm text-muted-foreground">{booking.type}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {format(booking.date, "MMM d, yyyy")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {booking.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            <p className="text-sm font-medium mt-1">S${booking.total}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">No upcoming bookings</h4>
                    <p className="text-muted-foreground mb-4">Book your next cleaning service to get started.</p>
                    <Button asChild>
                      <Link href="/book">Book Now</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest cleaning service history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastBookings.slice(0, 3).map((booking) => {
                    const ServiceIcon = getServiceIcon(booking.service)
                    return (
                      <div key={booking.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{booking.service} completed</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(booking.date, "MMM d, yyyy")} • Cleaner: {booking.cleaner}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (booking.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">My Bookings</h3>
              <Button asChild>
                <Link href="/book">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </Link>
              </Button>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => {
                    const ServiceIcon = getServiceIcon(booking.service)
                    return (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <ServiceIcon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">{booking.service}</h4>
                                <p className="text-muted-foreground">{booking.type}</p>
                                <div className="flex items-center gap-6 mt-3 text-sm">
                                  <span className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {format(booking.date, "EEEE, MMMM d, yyyy")}
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {booking.time}
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {booking.address}
                                  </span>
                                </div>
                                {booking.cleaner && (
                                  <p className="text-sm text-muted-foreground mt-2">
                                    Assigned cleaner: <span className="font-medium">{booking.cleaner}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                              <p className="text-lg font-bold mt-2">S${booking.total}</p>
                              <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Reschedule
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="space-y-4">
                  {pastBookings.map((booking) => {
                    const ServiceIcon = getServiceIcon(booking.service)
                    return (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">{booking.service}</h4>
                                <p className="text-muted-foreground">{booking.type}</p>
                                <div className="flex items-center gap-6 mt-3 text-sm">
                                  <span className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {format(booking.date, "MMMM d, yyyy")}
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {booking.time}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                  Cleaner: <span className="font-medium">{booking.cleaner}</span>
                                </p>
                                {booking.rating && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm">Your rating:</span>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < booking.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                              <p className="text-lg font-bold mt-2">S${booking.total}</p>
                              <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Receipt
                                </Button>
                                <Button variant="outline" size="sm">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Payment History</h3>
              <Button variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Payment Methods
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Payment for {payment.bookingId}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(payment.date, "MMM d, yyyy")} • {payment.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">S${payment.amount}</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200">{payment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Profile Settings</h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={userProfile.firstName}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={userProfile.lastName}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={userProfile.address}
                      onChange={(e) => setUserProfile((prev) => ({ ...prev, address: e.target.value }))}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="unit">Unit Number</Label>
                      <Input
                        id="unit"
                        value={userProfile.unit}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, unit: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={userProfile.postalCode}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, postalCode: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-2xl">
                        {userProfile.firstName[0]}
                        {userProfile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      Notification Preferences
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Methods
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <User className="h-4 w-4 mr-2" />
                      Privacy Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
