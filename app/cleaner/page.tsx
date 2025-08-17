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
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { format, addDays, subDays } from "date-fns"
import Link from "next/link"

// Mock data for demonstration
const mockJobs = [
  {
    id: "CP1703123456",
    customer: "John Doe",
    customerPhone: "+65 9123 4567",
    service: "Residential Cleaning",
    type: "Deep Clean",
    date: addDays(new Date(), 2),
    time: "10:00 AM",
    status: "confirmed",
    total: 130,
    address: "123 Orchard Road, #12-34, Singapore 238863",
    frequency: "One-time",
    notes: "Please focus on kitchen and bathrooms",
    estimatedDuration: 120, // minutes
  },
  {
    id: "CP1703123455",
    customer: "Jane Smith",
    customerPhone: "+65 8234 5678",
    service: "Commercial Cleaning",
    type: "Daily Maintenance",
    date: new Date(),
    time: "8:00 AM",
    status: "in-progress",
    total: 120,
    address: "456 Marina Bay, #05-10, Singapore 018956",
    frequency: "Daily",
    notes: "Office building, 5th floor only",
    estimatedDuration: 90,
  },
  {
    id: "CP1703123454",
    customer: "Robert Wilson",
    customerPhone: "+65 9876 5432",
    service: "Deep Cleaning",
    type: "Post-Renovation",
    date: subDays(new Date(), 1),
    time: "9:00 AM",
    status: "completed",
    total: 250,
    address: "789 Sentosa Cove, #12-01, Singapore 098234",
    frequency: "One-time",
    notes: "Post-renovation cleanup, heavy dust",
    estimatedDuration: 180,
    rating: 5,
    review: "Excellent work! Very thorough cleaning.",
  },
]

const mockCleaner = {
  id: "CL001",
  name: "Sarah Chen",
  email: "sarah.chen@cleanpro.sg",
  phone: "+65 9111 2222",
  status: "active",
  rating: 4.9,
  completedJobs: 156,
  specialties: ["Residential", "Deep Cleaning"],
  joinDate: "2023-01-15",
  hourlyRate: 25,
  totalEarnings: 3890,
}

export default function CleanerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedJob, setSelectedJob] = useState<any>(null)

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

  const todayJobs = mockJobs.filter(job => 
    format(job.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  )
  const upcomingJobs = mockJobs.filter(job => 
    job.date > new Date() && job.status === "confirmed"
  )
  const completedJobs = mockJobs.filter(job => job.status === "completed")

  // Calculate metrics
  const totalEarnings = mockJobs.reduce((sum, job) => sum + job.total, 0)
  const averageRating = mockCleaner.rating
  const jobsThisMonth = mockJobs.filter(job => 
    job.date.getMonth() === new Date().getMonth()
  ).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">CleanPro</h1>
              <p className="text-xs text-muted-foreground">Cleaner Portal</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{mockCleaner.name}</p>
              <p className="text-xs text-muted-foreground">{mockCleaner.email}</p>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Welcome back, {mockCleaner.name}!</h2>
          <p className="text-muted-foreground">Manage your cleaning jobs and track your progress.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
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
                      <p className="text-sm font-medium text-muted-foreground">Today's Jobs</p>
                      <p className="text-2xl font-bold">{todayJobs.length}</p>
                      <p className="text-xs text-blue-600 mt-1">Active schedule</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold">S${totalEarnings}</p>
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
                      <p className="text-sm font-medium text-muted-foreground">Rating</p>
                      <p className="text-2xl font-bold">{averageRating}</p>
                      <p className="text-xs text-yellow-600 mt-1">Excellent!</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed Jobs</p>
                      <p className="text-2xl font-bold">{mockCleaner.completedJobs}</p>
                      <p className="text-xs text-primary mt-1">Total</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your cleaning jobs for today</CardDescription>
                </CardHeader>
                <CardContent>
                  {todayJobs.length > 0 ? (
                    <div className="space-y-4">
                      {todayJobs.map((job) => {
                        const ServiceIcon = getServiceIcon(job.service)
                        return (
                          <div key={job.id} className="flex items-center gap-4 p-3 border rounded-lg">
                            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <ServiceIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{job.customer}</h4>
                              <p className="text-sm text-muted-foreground">
                                {job.service} • {job.time}
                              </p>
                              <p className="text-xs text-muted-foreground">{job.address}</p>
                            </div>
                            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No jobs scheduled for today</p>
                      <p className="text-sm">Enjoy your day off!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>Latest customer feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  {completedJobs.filter(job => job.rating).length > 0 ? (
                    <div className="space-y-4">
                      {completedJobs
                        .filter(job => job.rating)
                        .slice(0, 3)
                        .map((job) => (
                          <div key={job.id} className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1">
                                {[...Array(job.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm font-medium">{job.customer}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{job.review}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {format(job.date, "MMM d, yyyy")}
                            </p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No reviews yet</p>
                      <p className="text-sm">Complete jobs to get feedback</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Today Tab */}
          <TabsContent value="today" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Today's Jobs</h3>
              <div className="text-sm text-muted-foreground">
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </div>
            </div>

            {todayJobs.length > 0 ? (
              <div className="space-y-4">
                {todayJobs.map((job) => {
                  const ServiceIcon = getServiceIcon(job.service)
                  return (
                    <Card key={job.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <ServiceIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{job.service}</h4>
                              <p className="text-muted-foreground">{job.type}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{job.customer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{job.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{job.address}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">S${job.total}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{job.estimatedDuration} min</span>
                            </div>
                            {job.notes && (
                              <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <span className="text-sm">{job.notes}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {job.status === "confirmed" && (
                            <Button className="flex-1">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Start Job
                            </Button>
                          )}
                          {job.status === "in-progress" && (
                            <Button className="flex-1" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Complete Job
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
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
                  <h3 className="text-lg font-semibold mb-2">No jobs today</h3>
                  <p className="text-muted-foreground mb-4">
                    You have no cleaning jobs scheduled for today.
                  </p>
                  <Button variant="outline">View Upcoming Jobs</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Upcoming Schedule</h3>
              <Button variant="outline">Export Calendar</Button>
            </div>

            <div className="space-y-4">
              {upcomingJobs.map((job) => {
                const ServiceIcon = getServiceIcon(job.service)
                return (
                  <Card key={job.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <ServiceIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{job.customer}</h4>
                          <p className="text-sm text-muted-foreground">
                            {job.service} • {format(job.date, "MMM d")} at {job.time}
                          </p>
                          <p className="text-xs text-muted-foreground">{job.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">S${job.total}</p>
                          <p className="text-sm text-muted-foreground">
                            {job.estimatedDuration} min
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <h3 className="text-2xl font-semibold">Earnings & Performance</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold">S${totalEarnings}</p>
                      <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Jobs This Month</p>
                      <p className="text-2xl font-bold">{jobsThisMonth}</p>
                      <p className="text-xs text-blue-600 mt-1">Active schedule</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
                      <p className="text-2xl font-bold">S${mockCleaner.hourlyRate}</p>
                      <p className="text-xs text-primary mt-1">Per hour</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Earnings</CardTitle>
                <CardDescription>Your payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJobs
                    .filter(job => job.status === "completed")
                    .slice(0, 5)
                    .map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{job.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(job.date, "MMM d, yyyy")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">S${job.total}</p>
                          <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h3 className="text-2xl font-semibold">Profile & Settings</h3>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={mockCleaner.name.split(" ")[0]} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={mockCleaner.name.split(" ")[1]} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={mockCleaner.email} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={mockCleaner.phone} />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work Preferences</CardTitle>
                  <CardDescription>Manage your availability and specialties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (S$)</Label>
                    <Input id="hourlyRate" type="number" defaultValue={mockCleaner.hourlyRate} />
                  </div>
                  <div>
                    <Label htmlFor="specialties">Specialties</Label>
                    <Input id="specialties" defaultValue={mockCleaner.specialties.join(", ")} />
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Textarea 
                      id="availability" 
                      placeholder="e.g., Mon-Fri 8AM-6PM, Sat 9AM-3PM"
                      defaultValue="Monday to Friday: 8:00 AM - 6:00 PM&#10;Saturday: 9:00 AM - 3:00 PM&#10;Sunday: Closed"
                    />
                  </div>
                  <Button>Update Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
