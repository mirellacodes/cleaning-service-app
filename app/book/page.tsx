"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CalendarIcon, Clock, MapPin, Sparkles, Home, Building } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

const services = [
  {
    id: "residential",
    name: "Residential Cleaning",
    icon: Home,
    basePrice: 80,
    description: "Regular house cleaning for homes and apartments",
    options: [
      { id: "basic", name: "Basic Clean", price: 0 },
      { id: "deep", name: "Deep Clean", price: 50 },
      { id: "moveout", name: "Move-in/out Clean", price: 70 },
    ],
  },
  {
    id: "commercial",
    name: "Commercial Cleaning",
    icon: Building,
    basePrice: 120,
    description: "Professional office and commercial space cleaning",
    options: [
      { id: "daily", name: "Daily Maintenance", price: 0 },
      { id: "weekly", name: "Weekly Service", price: -20 },
      { id: "monthly", name: "Monthly Deep Clean", price: 30 },
    ],
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    icon: Sparkles,
    basePrice: 150,
    description: "Comprehensive deep cleaning and sanitization",
    options: [
      { id: "standard", name: "Standard Deep Clean", price: 0 },
      { id: "postreno", name: "Post-Renovation", price: 100 },
      { id: "disinfect", name: "Disinfection Service", price: 50 },
    ],
  },
]

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

const frequencies = [
  { id: "once", name: "One-time", discount: 0 },
  { id: "weekly", name: "Weekly", discount: 10 },
  { id: "biweekly", name: "Bi-weekly", discount: 5 },
  { id: "monthly", name: "Monthly", discount: 0 },
]

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedFrequency, setSelectedFrequency] = useState("once")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    unit: "",
    postalCode: "",
    specialInstructions: "",
    bedrooms: "1",
    bathrooms: "1",
    squareFootage: "",
  })
  const [addOns, setAddOns] = useState<string[]>([])

  const addOnServices = [
    { id: "fridge", name: "Inside Fridge Cleaning", price: 25 },
    { id: "oven", name: "Inside Oven Cleaning", price: 30 },
    { id: "windows", name: "Window Cleaning", price: 40 },
    { id: "balcony", name: "Balcony Cleaning", price: 20 },
    { id: "laundry", name: "Laundry Service", price: 35 },
  ]

  const calculateTotal = () => {
    const service = services.find((s) => s.id === selectedService)
    if (!service) return 0

    const option = service.options.find((o) => o.id === selectedOption)
    const frequency = frequencies.find((f) => f.id === selectedFrequency)
    const addOnTotal = addOns.reduce((sum, addOnId) => {
      const addOn = addOnServices.find((a) => a.id === addOnId)
      return sum + (addOn?.price || 0)
    }, 0)

    const baseTotal = service.basePrice + (option?.price || 0) + addOnTotal
    const discount = frequency ? (baseTotal * frequency.discount) / 100 : 0

    return Math.max(baseTotal - discount, 0)
  }

  const handleAddOnToggle = (addOnId: string) => {
    setAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleConfirmBooking = () => {
    const bookingData = {
      service: services.find((s) => s.id === selectedService),
      option: services.find((s) => s.id === selectedService)?.options.find((o) => o.id === selectedOption),
      frequency: frequencies.find((f) => f.id === selectedFrequency),
      date: selectedDate,
      time: selectedTime,
      addOns: addOns.map((id) => addOnServices.find((a) => a.id === id)).filter(Boolean),
      total: calculateTotal(),
      customer: formData,
      propertyDetails: {
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        squareFootage: formData.squareFootage,
        specialInstructions: formData.specialInstructions,
      },
    }

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData))

    router.push("/book/payment")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-primary">CleanPro</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Step {step} of 4</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Booking Progress</span>
            <span className="text-sm text-muted-foreground">{step}/4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Choose Your Service</CardTitle>
              <CardDescription>Select the cleaning service that best fits your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.id}
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                      selectedService === service.id ? "border-primary bg-primary/5" : "border-border",
                    )}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{service.name}</h3>
                          <span className="text-lg font-bold text-primary">From S${service.basePrice}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{service.description}</p>

                        {selectedService === service.id && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Service Type:</Label>
                            {service.options.map((option) => (
                              <div
                                key={option.id}
                                className={cn(
                                  "border rounded p-3 cursor-pointer transition-colors",
                                  selectedOption === option.id ? "border-primary bg-primary/5" : "border-border",
                                )}
                                onClick={() => setSelectedOption(option.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">{option.name}</span>
                                  <span className="text-sm font-medium">
                                    {option.price > 0
                                      ? `+S$${option.price}`
                                      : option.price < 0
                                        ? `-S$${Math.abs(option.price)}`
                                        : "Included"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="flex justify-end pt-4">
                <Button onClick={nextStep} disabled={!selectedService || !selectedOption} size="lg">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Select Date & Time</CardTitle>
              <CardDescription>Choose when you'd like your cleaning service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Frequency Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">Service Frequency</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {frequencies.map((freq) => (
                    <div
                      key={freq.id}
                      className={cn(
                        "border rounded-lg p-3 cursor-pointer text-center transition-all",
                        selectedFrequency === freq.id ? "border-primary bg-primary/5" : "border-border",
                      )}
                      onClick={() => setSelectedFrequency(freq.id)}
                    >
                      <div className="font-medium text-sm">{freq.name}</div>
                      {freq.discount > 0 && <div className="text-xs text-green-600 mt-1">Save {freq.discount}%</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-12",
                          !selectedDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Add-on Services */}
              <div>
                <Label className="text-base font-medium mb-3 block">Add-on Services (Optional)</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {addOnServices.map((addOn) => (
                    <div key={addOn.id} className="flex items-center space-x-3 border rounded-lg p-3">
                      <Checkbox
                        id={addOn.id}
                        checked={addOns.includes(addOn.id)}
                        onCheckedChange={() => handleAddOnToggle(addOn.id)}
                      />
                      <div className="flex-1">
                        <label htmlFor={addOn.id} className="text-sm font-medium cursor-pointer">
                          {addOn.name}
                        </label>
                        <div className="text-sm text-muted-foreground">+S${addOn.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={prevStep} size="lg">
                  Back
                </Button>
                <Button onClick={nextStep} disabled={!selectedDate || !selectedTime} size="lg">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Property Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Property Details</CardTitle>
              <CardDescription>Tell us about your space to ensure we bring the right supplies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bedrooms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select
                    value={formData.bathrooms}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bathrooms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="squareFootage">Square Footage (Optional)</Label>
                  <Input
                    id="squareFootage"
                    placeholder="e.g. 800"
                    value={formData.squareFootage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, squareFootage: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="Any specific areas to focus on, access instructions, or special requests..."
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData((prev) => ({ ...prev, specialInstructions: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={prevStep} size="lg">
                  Back
                </Button>
                <Button onClick={nextStep} size="lg">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Contact & Address */}
        {step === 4 && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Contact & Address</CardTitle>
                  <CardDescription>We'll need your details to confirm the booking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+65 1234 5678"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      required
                      placeholder="123 Orchard Road"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="unit">Unit Number</Label>
                      <Input
                        id="unit"
                        placeholder="e.g. #12-34"
                        value={formData.unit}
                        onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        required
                        placeholder="123456"
                        value={formData.postalCode}
                        onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={prevStep} size="lg">
                      Back
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleConfirmBooking}
                      disabled={
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.address ||
                        !formData.postalCode
                      }
                    >
                      Continue to Payment
                    </Button>
                  </div>
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
                  {selectedService && (
                    <>
                      <div>
                        <div className="font-medium">{services.find((s) => s.id === selectedService)?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {
                            services.find((s) => s.id === selectedService)?.options.find((o) => o.id === selectedOption)
                              ?.name
                          }
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Service</span>
                          <span>S${services.find((s) => s.id === selectedService)?.basePrice}</span>
                        </div>

                        {selectedOption &&
                          services.find((s) => s.id === selectedService)?.options.find((o) => o.id === selectedOption)
                            ?.price !== 0 && (
                            <div className="flex justify-between">
                              <span>Option</span>
                              <span>
                                S$
                                {
                                  services
                                    .find((s) => s.id === selectedService)
                                    ?.options.find((o) => o.id === selectedOption)?.price
                                }
                              </span>
                            </div>
                          )}

                        {addOns.map((addOnId) => {
                          const addOn = addOnServices.find((a) => a.id === addOnId)
                          return addOn ? (
                            <div key={addOnId} className="flex justify-between">
                              <span>{addOn.name}</span>
                              <span>S${addOn.price}</span>
                            </div>
                          ) : null
                        })}

                        {selectedFrequency !== "once" && (
                          <div className="flex justify-between text-green-600">
                            <span>{frequencies.find((f) => f.id === selectedFrequency)?.name} Discount</span>
                            <span>-{frequencies.find((f) => f.id === selectedFrequency)?.discount}%</span>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>S${calculateTotal()}</span>
                      </div>

                      {selectedDate && selectedTime && (
                        <>
                          <Separator />
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{format(selectedDate, "PPP")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{selectedTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>Singapore</span>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
