import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Faith Street", "Community City, CC 12345"],
      action: "Get Directions",
      link: "https://maps.google.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Main: (555) 123-4567", "Prayer Line: (555) 123-PRAY"],
      action: "Call Now",
      link: "tel:(555)123-4567",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@gracecommunity.org", "pastor@gracecommunity.org"],
      action: "Send Email",
      link: "mailto:info@gracecommunity.org",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 9:00 AM - 5:00 PM", "Saturday: 9:00 AM - 12:00 PM", "Sunday: Closed"],
      action: null,
      link: null,
    },
  ]

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      link: "https://facebook.com/gracecommunity",
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      icon: Instagram,
      name: "Instagram",
      link: "https://instagram.com/gracecommunity",
      color: "text-pink-600 hover:text-pink-700",
    },
    {
      icon: Youtube,
      name: "YouTube",
      link: "https://youtube.com/gracecommunity",
      color: "text-red-600 hover:text-red-700",
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      link: "https://wa.me/15551234567",
      color: "text-green-600 hover:text-green-700",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactDetails.map((detail, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
                  <detail.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">{detail.title}</h3>
                <div className="space-y-1 mb-4">
                  {detail.details.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-gray-600 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
                {detail.action && detail.link && (
                  <a
                    href={detail.link}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    {detail.action}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} transition-colors duration-200`}
                title={social.name}
              >
                <social.icon className="h-8 w-8" />
              </a>
            ))}
          </div>
          <p className="text-gray-600 mt-4 text-sm">Follow us for updates, events, and daily inspiration</p>
        </div>
      </div>
    </section>
  )
}
