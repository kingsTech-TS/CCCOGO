export function MapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 text-center">Find Us</h2>
        <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Christ Chosen Church of God Oremeji Church Location"
          ></iframe>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">
            <strong>Christ Chosen Church of God Oremeji Church</strong>
            <br />
            123 Faith Street, Community City, CC 12345
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>• Free parking available on-site</p>
            <p>• Wheelchair accessible entrance</p>
            <p>• Public transportation nearby</p>
          </div>
        </div>
      </div>
    </section>
  )
}
