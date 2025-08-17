import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Shield, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-primary">CleanPro</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/book">Book Now</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
            <MapPin className="h-3 w-3 mr-1" />
            Serving All of Singapore
          </Badge>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-foreground">
            Professional Cleaning
            <span className="text-primary block">Made Simple</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Book trusted cleaning professionals in Singapore with just a few clicks. Residential, commercial, and deep
            cleaning services available 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/book">Book Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="#services">View Services</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>10,000+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Insured & Bonded</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold mb-4">Our Cleaning Services</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of professional cleaning services, tailored to meet your specific
              needs in Singapore.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Residential Cleaning</CardTitle>
                <CardDescription>
                  Regular house cleaning, deep cleaning, and move-in/out services for homes and apartments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Weekly, bi-weekly, or monthly service</li>
                  <li>• Kitchen and bathroom deep clean</li>
                  <li>• Dusting and vacuuming</li>
                  <li>• Window and mirror cleaning</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/book">From S$80</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Commercial Cleaning</CardTitle>
                <CardDescription>
                  Professional office and commercial space cleaning services for businesses of all sizes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Daily office maintenance</li>
                  <li>• Restroom sanitization</li>
                  <li>• Floor care and carpet cleaning</li>
                  <li>• Waste management</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/book">Get Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Deep Cleaning</CardTitle>
                <CardDescription>
                  Comprehensive deep cleaning service for thorough sanitization and detailed cleaning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Post-renovation cleanup</li>
                  <li>• Spring cleaning service</li>
                  <li>• Appliance deep clean</li>
                  <li>• Disinfection service</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/book">From S$150</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold mb-4">Why Choose CleanPro?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're Singapore's trusted cleaning service provider, committed to excellence and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Insured & Bonded</h4>
              <p className="text-sm text-muted-foreground">
                All our cleaners are fully insured and background-checked for your peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Flexible Scheduling</h4>
              <p className="text-sm text-muted-foreground">
                Book services that fit your schedule, including evenings and weekends.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Quality Guarantee</h4>
              <p className="text-sm text-muted-foreground">
                Not satisfied? We'll return within 24 hours to make it right, free of charge.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Trained Professionals</h4>
              <p className="text-sm text-muted-foreground">
                Our team undergoes rigorous training and uses eco-friendly cleaning products.
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold mb-4">About CleanPro Singapore</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Founded in 2020, CleanPro has been Singapore's trusted partner for professional cleaning services. 
              We believe that a clean environment is essential for health, productivity, and well-being.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="h-full flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary mb-2">4+</div>
                  <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground font-medium">Team Members</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground font-medium">Happy Customers</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground font-medium">Support Available</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border">
              <h4 className="font-semibold text-lg mb-6 text-center">Why Choose CleanPro?</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-4 w-4 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-foreground">Eco-friendly cleaning products</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-4 bg-secondary rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-foreground">Trained & certified professionals</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-4 bg-accent rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-foreground">100% satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-4 bg-primary/60 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-foreground">Insured & bonded service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center py-8 mt-8">
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Our team of certified cleaning professionals is committed to delivering exceptional service 
            using eco-friendly products and industry-best practices. We serve residential and commercial 
            clients across Singapore with reliability and excellence.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground">
              Have questions about our services? Need a custom quote? We're here to help!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-muted-foreground">123 Clean Street, Singapore 123456</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <div className="text-sm text-muted-foreground">Mon-Sun: 7:00 AM - 9:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Emergency Service</div>
                      <div className="text-sm text-muted-foreground">Available 24/7 for urgent cleaning needs</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Quick Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <span className="text-primary">+65 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span className="text-primary">hello@cleanpro.sg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">WhatsApp:</span>
                    <span className="text-primary">+65 9876 5432</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-4">Send us a Message</h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Tell us about your cleaning needs..."
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-serif font-bold mb-4">Ready to Book Your Cleaning Service?</h3>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers in Singapore. Get your free quote today and experience the CleanPro
            difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/book">Book Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Call +65 1234 5678
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-lg font-serif font-bold">CleanPro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Singapore's trusted professional cleaning service provider since 2020.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Services</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Residential Cleaning</li>
                <li>Commercial Cleaning</li>
                <li>Deep Cleaning</li>
                <li>Move-in/out Cleaning</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Reviews</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Contact</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+65 1234 5678</li>
                <li>hello@cleanpro.sg</li>
                <li>Singapore</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CleanPro Singapore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
