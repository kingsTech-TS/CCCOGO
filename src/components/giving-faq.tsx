"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function GivingFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "Is online giving secure?",
      answer:
        "Yes, absolutely. We use industry-standard SSL encryption and work with PCI-compliant payment processors to ensure your financial information is completely secure. Your data is never stored on our servers.",
    },
    {
      question: "Will I receive a tax receipt?",
      answer:
        "Yes, you will receive an immediate email receipt for your donation, and we'll send you an annual giving statement by January 31st for tax purposes. All donations to Grace Community Church are tax-deductible.",
    },
    {
      question: "Can I set up recurring donations?",
      answer:
        "You can set up weekly, monthly, or yearly recurring donations. You can modify or cancel your recurring donations at any time by contacting our office or through your donor portal.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and bank transfers (ACH). Bank transfers have lower processing fees, so more of your donation goes directly to ministry.",
    },
    {
      question: "How is my donation used?",
      answer:
        "Your donations support our ministries, community outreach, facility maintenance, staff salaries, and global missions. We publish an annual report showing exactly how funds are allocated, with 85% going directly to ministry work.",
    },
    {
      question: "Can I designate my donation for a specific purpose?",
      answer:
        "Yes, you can designate your donation for specific ministries or funds such as missions, building fund, youth ministry, or community outreach. If no designation is made, it goes to our general fund.",
    },
    {
      question: "What if I need to cancel a recurring donation?",
      answer:
        "You can cancel or modify recurring donations at any time by calling our office at (555) 123-4567 or emailing giving@gracecommunity.org. Changes typically take effect within 1-2 business days.",
    },
    {
      question: "Do you accept non-cash donations?",
      answer:
        "Yes, we accept stocks, bonds, real estate, and other assets. For non-cash donations over $500, please contact our office to arrange the transfer and ensure proper documentation for tax purposes.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about giving? Here are answers to the most common questions we receive.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact for More Questions */}
        <div className="mt-12 text-center">
          <Card className="bg-accent/50">
            <CardContent className="p-8">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Our team is here to help with any questions about giving or financial stewardship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:(555)123-4567"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Call (555) 123-4567
                </a>
                <a
                  href="mailto:giving@gracecommunity.org"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
                >
                  Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
