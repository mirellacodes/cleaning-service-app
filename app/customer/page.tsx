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
  Clock,
  MapPin,
  User,
  DollarSign,
  TrendingUp,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
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
    address: "123 Orchard Road, #12-34, Singapore 238863",
    frequency: "One-time",
    notes: "Please focus on kitchen and bathrooms",
    rating: null,
  },
  {
    id: "CP1703123455",
    service: "Commercial Cleaning",
    type: "Daily Maintenance",
    date: new Date(),
    time: "8:00 AM",
    status: "in-progress",
    cleaner: "Michael Tan",
    total: 120,
    address: "456 Marina Bay, #05-10, Singapore 018956",
    frequency: "Daily",
    notes: "Office building, 5th floor only",
    rating: null,
  },
  {
    id: "CP1703123454",
    service: "Deep Cleaning",
    type: "Post-Renovation",
    date: subDays(new Date(), 1),
    time: "9:00 AM",
    status: "completed",
    cleaner: "Lisa Wong",
    total: 250,
    address: "789 Sentosa Cove, #12-01, Singapore 098234",
    frequency: "One-time",
    notes: "Post-renovation cleanup, heavy dust",
    rating: 5,
    review: "Excellent work! Very thorough cleaning.",
  },
]

const mockCustomer = {
  id: "CU001",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+65 9123 4567",
  address: "123 Orchard Road, #12-34",
  postalCode: "238863",
  totalBookings: 5,
  totalSpent: 650,
  lastBooking: subDays(new Date(), 7),
  status: "active",
  preferences: "Focus on kitchen and bathrooms, eco-friendly products preferred",
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

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

  const upcomingBookings = mockBookings.filter(booking => 
    booking.date > new Date() && booking.status === "confirmed"
  )
  const completedBookings = mockBookings.filter(booking => booking.status === "completed")
  const activeBookings = mockBookings.filter(booking => 
    ["confirmed", "in-progress"].includes(booking.status)
  )

  // Calculate metrics
  const totalSpent = mockBookings.reduce((sum, booking) => sum + booking.total, 0)
  const averageRating = completedBookings
    .filter(booking => booking.rating)
    .reduce((sum, booking) => sum + (booking.rating || 0), 0) / 
    completedBookings.filter(booking => booking.rating).length || 0

  const handleRateBooking = (bookingId: string) => {
    // In real app, this would update the database
    console.log(`Rating booking ${bookingId}: ${rating} stars, review: ${review}`)
    setRating(0)
    setReview("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">CleanPro</h1>
              <p className="text-xs text-muted-foreground">Customer Portal</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/book">
                <Plus className="h-4 w-4 mr-2" />
                Book New Service
              </Link>
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium">{mockCustomer.name}</p>
              <p className="text-xs text-muted-foreground">{mockCustomer.email}</p>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Welcome back, {mockCustomer.name}!</h2>
          <p className="text-muted-foreground">Manage your cleaning services and bookings.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Bookings</p>
                      <p className="text-2xl font-bold">{activeBookings.length}</p>
                      <p className="text-xs text-blue-600 mt-1">Currently scheduled</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">S${totalSpent}</p>
                      <p className="text-xs text-green-600 mt-1">This month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                      <p className="text-xs text-yellow-600 mt-1">Service quality</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{mockCustomer.totalBookings}</p>
                      <p className="text-xs text-primary mt-1">All time</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" asChild>
                    <Link href="/book">
                      <Plus className="h-4 w-4 mr-2" />
                      Book New Cleaning Service
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Preferences
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.slice(0, 3).map((booking) => {
                      const ServiceIcon = getServiceIcon(booking.service)
                      return (
                        <div key={booking.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ServiceIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{booking.service}</h4>
                            <p className="text-sm text-muted-foreground">
                              {format(booking.date, "MMM d")} at {booking.time}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
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

            <div className="space-y-4">
              {mockBookings.map((booking) => {
                const ServiceIcon = getServiceIcon(booking.service)
                return (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ServiceIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{booking.service}</h4>
                            <p className="text-muted-foreground">{booking.type}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{format(booking.date, "EEEE, MMMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.address}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.cleaner}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">S${booking.total}</span>
                          </div>
                          {booking.notes && (
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <span className="text-sm">{booking.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {booking.status === "confirmed" && (
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Reschedule
                          </Button>
                        )}
                        {booking.status === "confirmed" && (
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        )}
                        {booking.status === "completed" && !booking.rating && (
                          <Button size="sm" onClick={() => setSelectedBooking(booking)}>
                            <Star className="h-4 w-4 mr-2" />
                            Rate & Review
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Cleaner
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Upcoming Schedule</h3>
              <Button variant="outline">Export Calendar</Button>
            </div>

            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => {
                  const ServiceIcon = getServiceIcon(booking.service)
                  return (
                    <Card key={booking.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ServiceIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{booking.service}</h4>
                            <p className="text-sm text-muted-foreground">
                              {format(booking.date, "EEEE, MMMM d")} at {booking.time}
                            </p>
                            <p className="text-xs text-muted-foreground">{booking.address}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">S${booking.total}</p>
                            <p className="text-sm text-muted-foreground">{booking.cleaner}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any cleaning services scheduled.
                  </p>
                  <Button asChild>
                    <Link href="/book">Book Your First Service</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <h3 className="text-2xl font-semibold">Service History</h3>

            <div className="space-y-4">
              {completedBookings.map((booking) => {
                const ServiceIcon = getServiceIcon(booking.service)
                return (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ServiceIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{booking.service}</h4>
                            <p className="text-muted-foreground">{booking.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">S${booking.total}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(booking.date, "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.cleaner}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.address}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {booking.rating ? (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(booking.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm font-medium">{booking.rating}/5</span>
                            </div>
                          ) : (
                            <Button size="sm" onClick={() => setSelectedBooking(booking)}>
                              <Star className="h-4 w-4 mr-2" />
                              Rate & Review
                            </Button>
                          )}
                          {booking.review && (
                            <p className="text-sm text-muted-foreground">{booking.review}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Book Again
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Cleaner
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h3 className="text-2xl font-semibold">Profile & Preferences</h3>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={mockCustomer.name.split(" ")[0]} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={mockCustomer.name.split(" ")[1]} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={mockCustomer.email} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={mockCustomer.phone} />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address & Preferences</CardTitle>
                  <CardDescription>Manage your service address and cleaning preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" defaultValue={mockCustomer.address} />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" defaultValue={mockCustomer.postalCode} />
                  </div>
                  <div>
                    <Label htmlFor="preferences">Cleaning Preferences</Label>
                    <Textarea 
                      id="preferences" 
                      placeholder="Any specific cleaning preferences or instructions..."
                      defaultValue={mockCustomer.preferences}
                    />
                  </div>
                  <Button>Update Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rating Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Rate Your Service</CardTitle>
              <CardDescription>
                How was your cleaning service with {selectedBooking.cleaner}?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-2xl hover:scale-110 transition-transform"
                  >
                    <Star 
                      className={`h-8 w-8 ${
                        star <= rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300"
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <div>
                <Label htmlFor="review">Review (Optional)</Label>
                <Textarea 
                  id="review" 
                  placeholder="Share your experience..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  onClick={() => handleRateBooking(selectedBooking.id)}
                >
                  Submit Rating
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedBooking(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
