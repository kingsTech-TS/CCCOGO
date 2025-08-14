"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, CheckCircle, Calendar, DollarSign } from "lucide-react"

interface DonationData {
  amount: string
  frequency: "one-time" | "weekly" | "monthly" | "yearly"
  category: string
  isAnonymous: boolean
  dedicatedTo: string
  paymentMethod: "card" | "bank"
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

export function DonationForm() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<DonationData>({
    amount: "",
    frequency: "one-time",
    category: "General Fund",
    isAnonymous: false,
    dedicatedTo: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const quickAmounts = ["25", "50", "100", "250", "500"]
  const categories = [
    "General Fund",
    "Tithes & Offerings",
    "Building Fund",
    "Missions",
    "Youth Ministry",
    "Children's Ministry",
    "Community Outreach",
    "Special Events",
  ]

  const frequencies = [
    { value: "one-time", label: "One Time" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ]

  const handleInputChange = (field: keyof DonationData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section className="py-16 bg-white" id="donate">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="bg-green-100 p-4 rounded-full inline-flex mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Thank You for Your Generosity!</h2>
              <p className="text-gray-600 mb-6">
                Your donation of ${formData.amount} has been processed successfully. You will receive a confirmation
                email shortly with your donation receipt for tax purposes.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Donation Details:</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Amount: ${formData.amount}</p>
                  <p>Frequency: {formData.frequency}</p>
                  <p>Category: {formData.category}</p>
                  <p>Transaction ID: TXN-{Date.now()}</p>
                </div>
              </div>
              <Button onClick={() => window.location.reload()} className="bg-primary hover:bg-primary/90">
                Make Another Donation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">Make a Donation</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Lock className="h-4 w-4 mr-1" />
                    Secure & Encrypted
                  </div>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      1
                    </div>
                    <div className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      2
                    </div>
                    <div className={`w-16 h-1 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      3
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Amount & Frequency */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Donation Amount</label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                          {quickAmounts.map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant={formData.amount === amount ? "default" : "outline"}
                              onClick={() => handleInputChange("amount", amount)}
                              className={
                                formData.amount === amount ? "bg-primary hover:bg-primary/90" : "bg-transparent"
                              }
                            >
                              ${amount}
                            </Button>
                          ))}
                        </div>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="Enter custom amount"
                            value={formData.amount}
                            onChange={(e) => handleInputChange("amount", e.target.value)}
                            className="pl-10"
                            min="1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Frequency</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {frequencies.map((freq) => (
                            <Button
                              key={freq.value}
                              type="button"
                              variant={formData.frequency === freq.value ? "default" : "outline"}
                              onClick={() => handleInputChange("frequency", freq.value)}
                              className={
                                formData.frequency === freq.value ? "bg-primary hover:bg-primary/90" : "bg-transparent"
                              }
                            >
                              <Calendar className="mr-1 h-4 w-4" />
                              {freq.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Donation Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange("category", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dedication (Optional)</label>
                        <Input
                          placeholder="In honor/memory of..."
                          value={formData.dedicatedTo}
                          onChange={(e) => handleInputChange("dedicatedTo", e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={formData.isAnonymous}
                          onCheckedChange={(checked) => handleInputChange("isAnonymous", checked as boolean)}
                        />
                        <label htmlFor="anonymous" className="text-sm text-gray-700">
                          Make this donation anonymous
                        </label>
                      </div>

                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.amount || Number.parseFloat(formData.amount) < 1}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Payment Method */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            type="button"
                            variant={formData.paymentMethod === "card" ? "default" : "outline"}
                            onClick={() => handleInputChange("paymentMethod", "card")}
                            className={
                              formData.paymentMethod === "card" ? "bg-primary hover:bg-primary/90" : "bg-transparent"
                            }
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit/Debit Card
                          </Button>
                          <Button
                            type="button"
                            variant={formData.paymentMethod === "bank" ? "default" : "outline"}
                            onClick={() => handleInputChange("paymentMethod", "bank")}
                            className={
                              formData.paymentMethod === "bank" ? "bg-primary hover:bg-primary/90" : "bg-transparent"
                            }
                          >
                            Bank Transfer
                          </Button>
                        </div>
                      </div>

                      {formData.paymentMethod === "card" && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                              maxLength={19}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                              <Input
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                              <Input
                                placeholder="123"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange("cvv", e.target.value)}
                                maxLength={4}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                            <Input
                              placeholder="John Doe"
                              value={formData.nameOnCard}
                              onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Information */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <Input
                          placeholder="123 Main Street"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <Input
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                          <Input
                            placeholder="State"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                          <Input
                            placeholder="12345"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                          Back
                        </Button>
                        <Button type="submit" disabled={isProcessing} className="flex-1 bg-primary hover:bg-primary/90">
                          {isProcessing ? "Processing..." : `Donate $${formData.amount}`}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Donation Summary */}
          <div className="space-y-6">
            <Card className="bg-accent/50">
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Donation Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">${formData.amount || "0"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-semibold capitalize">{formData.frequency.replace("-", " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-semibold">{formData.category}</span>
                  </div>
                  {formData.dedicatedTo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dedication:</span>
                      <span className="font-semibold text-sm">{formData.dedicatedTo}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">${formData.amount || "0"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Secure Giving</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-green-600" />
                    SSL encrypted transactions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    PCI compliant processing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Instant tax receipts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Cancel anytime
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have questions about giving or need assistance, we're here to help.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Call:</strong> (555) 123-4567
                  </p>
                  <p>
                    <strong>Email:</strong> giving@gracecommunity.org
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
