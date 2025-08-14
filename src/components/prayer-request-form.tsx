"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Send, CheckCircle } from "lucide-react"

interface PrayerRequest {
  id: string
  name: string
  email: string
  phone: string
  category: string
  request: string
  isPublic: boolean
  isUrgent: boolean
  submittedAt: Date
}

export function PrayerRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    request: "",
    isPublic: false,
    isUrgent: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mock storage for prayer requests (in real app, this would be a database)
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([])

  const categories = [
    "Health & Healing",
    "Family & Relationships",
    "Work & Finances",
    "Spiritual Growth",
    "Grief & Loss",
    "Guidance & Direction",
    "Thanksgiving & Praise",
    "Other",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.request.trim()) {
      newErrors.request = "Prayer request is required"
    } else if (formData.request.trim().length < 10) {
      newErrors.request = "Please provide more details about your prayer request"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newRequest: PrayerRequest = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date(),
    }

    setPrayerRequests((prev) => [newRequest, ...prev])
    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      request: "",
      isPublic: false,
      isUrgent: false,
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="bg-green-100 p-4 rounded-full inline-flex mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Prayer Request Submitted</h2>
              <p className="text-gray-600 mb-6">
                Thank you for sharing your prayer request with us. Our prayer team will be lifting you up in prayer. You
                are not alone in this journey.
              </p>
              <div className="space-y-3 text-sm text-gray-500 mb-6">
                <p>• Our pastoral team reviews all prayer requests</p>
                <p>• Urgent requests are prioritized for immediate prayer</p>
                <p>• We respect your privacy and confidentiality</p>
              </div>
              <Button onClick={() => setIsSubmitted(false)} className="bg-primary hover:bg-primary/90">
                Submit Another Request
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
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Heart className="h-6 w-6 text-primary mr-2" />
                  <h2 className="font-serif text-2xl font-bold text-gray-900">Share Your Prayer Request</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number (Optional)
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Prayer Category *
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="request" className="block text-sm font-medium text-gray-700 mb-2">
                      Prayer Request *
                    </label>
                    <Textarea
                      id="request"
                      value={formData.request}
                      onChange={(e) => handleInputChange("request", e.target.value)}
                      className={errors.request ? "border-red-500" : ""}
                      placeholder="Please share your prayer request with us..."
                      rows={5}
                    />
                    {errors.request && <p className="text-red-500 text-sm mt-1">{errors.request}</p>}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPublic"
                        checked={formData.isPublic}
                        onCheckedChange={(checked) => handleInputChange("isPublic", checked as boolean)}
                      />
                      <label htmlFor="isPublic" className="text-sm text-gray-700">
                        I'm comfortable sharing this request with the church family (first name only)
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isUrgent"
                        checked={formData.isUrgent}
                        onCheckedChange={(checked) => handleInputChange("isUrgent", checked as boolean)}
                      />
                      <label htmlFor="isUrgent" className="text-sm text-gray-700">
                        This is an urgent prayer request
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Prayer Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-accent/50">
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">How We Pray</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Our pastoral team prays over every request
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Prayer warriors meet weekly to intercede
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Urgent requests receive immediate attention
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    All requests are kept confidential
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Need Immediate Prayer?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you need someone to pray with you right now, don't hesitate to reach out.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Prayer Hotline:</strong>
                    <br />
                    <a href="tel:(555)123-PRAY" className="text-primary hover:underline">
                      (555) 123-PRAY
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <br />
                    <a href="mailto:prayer@gracecommunity.org" className="text-primary hover:underline">
                      prayer@gracecommunity.org
                    </a>
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
