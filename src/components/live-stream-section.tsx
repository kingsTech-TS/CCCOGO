"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Users, Calendar, Clock } from "lucide-react"
import {
  doc,
  updateDoc,
  onSnapshot,
  increment,
  setDoc,
  getDoc,
} from "firebase/firestore"
import { db } from "../../lib/firebase"

export function LiveStreamSection() {
  const [isLive, setIsLive] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewerCount, setViewerCount] = useState<number>(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamDocRef = doc(db, "streams", "mainStream")

  // 🔹 Update this to match your FastAPI local stream HLS URL
  const STREAM_URL = "http://192.168.1.10:8000/hls/index.m3u8"

  // 🔸 Periodically check if stream is live
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        setChecking(true)
        const res = await fetch(STREAM_URL, { method: "HEAD" })
        if (res.ok) {
          setIsLive(true)
          setError(null)
        } else {
          setIsLive(false)
        }
      } catch {
        setIsLive(false)
      } finally {
        setChecking(false)
      }
    }

    checkLiveStatus()
    const interval = setInterval(checkLiveStatus, 10000)
    return () => clearInterval(interval)
  }, [])

  // 🔸 Firestore setup for viewers
  useEffect(() => {
    const setupStreamDoc = async () => {
      const docSnap = await getDoc(streamDocRef)
      if (!docSnap.exists()) {
        await setDoc(streamDocRef, { viewers: 0 })
      }
    }

    setupStreamDoc()

    const unsubscribe = onSnapshot(streamDocRef, (snapshot) => {
      const data = snapshot.data()
      if (data?.viewers !== undefined) setViewerCount(data.viewers)
    })

    return () => unsubscribe()
  }, [])

  // 🔸 Track viewer count
  useEffect(() => {
    const incrementView = async () => {
      try {
        await updateDoc(streamDocRef, { viewers: increment(1) })
      } catch (err) {
        console.error("Error incrementing viewers:", err)
      }
    }

    const decrementView = async () => {
      try {
        await updateDoc(streamDocRef, { viewers: increment(-1) })
      } catch (err) {
        console.error("Error decrementing viewers:", err)
      }
    }

    incrementView()
    toast.success("You joined the live stream 🙌")

    return () => {
      decrementView()
      toast("You left the stream 👋", { icon: "👋" })
    }
  }, [])

  // 🔸 Handle HLS stream
  useEffect(() => {
    let hls: Hls | null = null

    if (isLive && videoRef.current) {
      if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(STREAM_URL)
        hls.attachMedia(videoRef.current)

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          toast.success("Connected to live stream ✅")
          videoRef.current?.play()
        })

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error("HLS error:", data)
          setError("Stream unavailable or server not reachable.")
          setIsLive(false)
          toast.error("Stream connection failed ❌")
        })
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = STREAM_URL
      }
    }

    return () => {
      if (hls) hls.destroy()
    }
  }, [isLive])

  const upcomingServices = [
    {
      title: "Sunday Morning Worship",
      date: "October 20, 2025",
      time: "9:00 AM & 11:00 AM",
      description: "Join us for inspiring worship and biblical teaching.",
    },
    {
      title: "Wednesday Bible Study",
      date: "October 22, 2025",
      time: "7:00 PM",
      description: "Dive deeper into God's Word with interactive discussion.",
    },
  ]

  return (
    <section className="py-16 bg-white" id="watch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Watch Live
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our online community for live worship services and special events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🎥 Live Stream Player */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                  {checking ? (
                    <div className="text-center text-white animate-pulse">
                      Checking live status...
                    </div>
                  ) : isLive && !error ? (
                    <video
                      ref={videoRef}
                      controls
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full rounded-md bg-black"
                    />
                  ) : (
                    <div className="text-center text-white p-8">
                      <div className="bg-green-600/30 p-6 rounded-full inline-flex mb-4">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {error ? "Stream Unavailable" : "Stream Currently Offline"}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {error || "Join us during our scheduled service times."}
                      </p>
                      <Button
                        onClick={() => {
                          setError(null)
                          setIsLive(true)
                          toast.loading("Reconnecting to live stream...")
                        }}
                        className="bg-green-600 hover:bg-green-700 transition-all"
                      >
                        Retry Connection
                      </Button>
                    </div>
                  )}

                  {isLive && !error && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-md">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      LIVE
                    </div>
                  )}
                </div>

                {isLive && !error && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Sunday Morning Worship
                        </h3>
                        <p className="text-sm text-gray-600">Pastor Michael Johnson</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{viewerCount} watching</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* 📅 Upcoming Services */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
              Upcoming Services
            </h3>
            <div className="space-y-4">
              {upcomingServices.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {service.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {service.time}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 🌐 Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Watch on Social Media
              </h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-blue-50 transition"
                  size="sm"
                >
                  <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                  Facebook Live
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
