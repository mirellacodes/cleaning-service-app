"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, Clock, MapPin, Phone, Mail, Sparkles, Download, Share } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ConfirmationPage() {
  const router = useRouter()
  const [confirmationData, setConfirmationData] = useState<any>(null)

  useEffect(() => {
    // Get confirmation data from sessionStorage
    const storedData = sessionStorage.getItem("confirmationData")
    if (storedData) {
      setConfirmationData(JSON.parse(storedData))
    } else {
      // Redirect to home if no confirmation data
      router.push("/")
    }
  }, [router])

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading confirmation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-primary">CleanPro</h1>
          </Link>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Booking Confirmed
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-lg">
            Thank you for choosing CleanPro. Your cleaning service has been successfully booked.
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Booking ID: {confirmationData.bookingId}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Here are the details of your confirmed cleaning service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Information */}
                <div>
                  <h4 className="font-semibold mb-3">Service Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{confirmationData.service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{confirmationData.option?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span>{confirmationData.frequency?.name}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Schedule Information */}
                <div>
                  <h4 className="font-semibold mb-3">Schedule</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{format(new Date(confirmationData.date), "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{confirmationData.time}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Location Information */}
                <div>
                  <h4 className="font-semibold mb-3">Service Location</h4>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p>{confirmationData.customer.address}</p>
                      {confirmationData.customer.unit && <p>Unit: {confirmationData.customer.unit}</p>}
                      <p>Singapore {confirmationData.customer.postalCode}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Add-on Services */}
                {confirmationData.addOns && confirmationData.addOns.length > 0 && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-3">Add-on Services</h4>
                      <ul className="space-y-1 text-sm">
                        {confirmationData.addOns.map((addOn: any) => (
                          <li key={addOn.id} className="flex justify-between">
                            <span>{addOn.name}</span>
                            <span>+S${addOn.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Special Instructions */}
                {confirmationData.propertyDetails.specialInstructions && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-3">Special Instructions</h4>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {confirmationData.propertyDetails.specialInstructions}
                      </p>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Payment Information */}
                <div>
                  <h4 className="font-semibold mb-3">Payment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-bold text-lg">S${confirmationData.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span className="capitalize">{confirmationData.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Status:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Completed
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Confirmation Email</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a confirmation email with all booking details within 5 minutes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Cleaner Assignment</p>
                      <p className="text-sm text-muted-foreground">
                        We'll assign a professional cleaner and send you their details 24 hours before your appointment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Service Day</p>
                      <p className="text-sm text-muted-foreground">
                        Your cleaner will arrive on time and provide exceptional service. You'll receive updates
                        throughout.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">
                        {confirmationData.customer.firstName} {confirmationData.customer.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{confirmationData.customer.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <p className="text-sm">{confirmationData.customer.email}</p>
                  </div>
                </div>

                <Separator />

                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Need to make changes?</p>
                  <p>Contact us at least 24 hours before your appointment.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Share className="h-4 w-4 mr-2" />
                  Share Booking
                </Button>

                <Button className="w-full" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our customer support team is here to help you 24/7.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Call +65 1234 5678
                    </Button>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      WhatsApp Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
