"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  Lock,
  CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  useEffect(() => {
    // Get booking data from sessionStorage
    const storedData = sessionStorage.getItem("bookingData")
    if (storedData) {
      setBookingData(JSON.parse(storedData))
    } else {
      // Redirect back to booking if no data
      router.push("/book")
    }
  }, [router])

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store booking confirmation data
    const confirmationData = {
      ...bookingData,
      bookingId: `CP${Date.now()}`,
      paymentMethod,
      paymentStatus: "completed",
      bookingDate: new Date().toISOString(),
    }

    sessionStorage.setItem("confirmationData", JSON.stringify(confirmationData))
    sessionStorage.removeItem("bookingData")

    // Redirect to confirmation page
    router.push("/book/confirmation")
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/book" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-primary">CleanPro</h1>
          </Link>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Lock className="h-3 w-3 mr-1" />
            Secure Payment
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Payment Method
                </CardTitle>
                <CardDescription>Choose your preferred payment method to complete your booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 border rounded-lg p-4">
                    <RadioGroupItem value="card" id="card" />
                    <div className="flex items-center gap-3 flex-1">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="card" className="font-medium cursor-pointer">
                          Credit/Debit Card
                        </Label>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4">
                    <RadioGroupItem value="paynow" id="paynow" />
                    <div className="flex items-center gap-3 flex-1">
                      <Smartphone className="h-5 w-5 text-secondary" />
                      <div>
                        <Label htmlFor="paynow" className="font-medium cursor-pointer">
                          PayNow
                        </Label>
                        <p className="text-sm text-muted-foreground">Pay instantly with your mobile banking app</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4">
                    <RadioGroupItem value="bank" id="bank" />
                    <div className="flex items-center gap-3 flex-1">
                      <Building2 className="h-5 w-5 text-accent" />
                      <div>
                        <Label htmlFor="bank" className="font-medium cursor-pointer">
                          Bank Transfer
                        </Label>
                        <p className="text-sm text-muted-foreground">Direct transfer from your bank account</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={cardData.cardholderName}
                        onChange={(e) => setCardData((prev) => ({ ...prev, cardholderName: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={cardData.expiryDate}
                          onChange={(e) => setCardData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => setCardData((prev) => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayNow Instructions */}
                {paymentMethod === "paynow" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                      <h4 className="font-medium mb-2">PayNow Instructions</h4>
                      <ol className="text-sm text-muted-foreground space-y-1">
                        <li>1. Open your mobile banking app</li>
                        <li>2. Select PayNow and scan the QR code</li>
                        <li>3. Confirm the payment amount: S${bookingData.total}</li>
                        <li>4. Complete the transaction</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Instructions */}
                {paymentMethod === "bank" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Bank:</strong> DBS Bank
                        </p>
                        <p>
                          <strong>Account Name:</strong> CleanPro Singapore Pte Ltd
                        </p>
                        <p>
                          <strong>Account Number:</strong> 123-456789-0
                        </p>
                        <p>
                          <strong>Reference:</strong> Your booking ID will be provided after confirmation
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-4">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Secure Payment</p>
                    <p className="text-muted-foreground">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  size="lg"
                  className="w-full"
                  disabled={
                    isProcessing ||
                    (paymentMethod === "card" &&
                      (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName))
                  }
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay S$${bookingData.total}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">{bookingData.service?.name}</div>
                  <div className="text-sm text-muted-foreground">{bookingData.option?.name}</div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service</span>
                    <span>S${bookingData.service?.basePrice}</span>
                  </div>

                  {bookingData.option?.price !== 0 && (
                    <div className="flex justify-between">
                      <span>Option</span>
                      <span>S${bookingData.option?.price}</span>
                    </div>
                  )}

                  {bookingData.addOns?.map((addOn: any) => (
                    <div key={addOn.id} className="flex justify-between">
                      <span>{addOn.name}</span>
                      <span>S${addOn.price}</span>
                    </div>
                  ))}

                  {bookingData.frequency?.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{bookingData.frequency.name} Discount</span>
                      <span>-{bookingData.frequency.discount}%</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>S${bookingData.total}</span>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{format(new Date(bookingData.date), "PPP")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{bookingData.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{bookingData.customer.address}</span>
                  </div>
                </div>

                <Separator />

                <div className="text-xs text-muted-foreground">
                  <p className="mb-2">
                    <strong>Customer:</strong> {bookingData.customer.firstName} {bookingData.customer.lastName}
                  </p>
                  <p>
                    <strong>Contact:</strong> {bookingData.customer.phone}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
