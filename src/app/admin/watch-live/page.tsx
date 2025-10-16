"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import toast, { Toaster } from "react-hot-toast"
import { Play, StopCircle, Settings, Video } from "lucide-react"
import Hls from "hls.js"

export default function StreamDashboard() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // ✅ Update this to your backend IP if not localhost
  const API_BASE = "http://127.0.0.1:8000"
  const STREAM_URL = `${API_BASE}/hls/index.m3u8`

  // 🔁 Check backend status periodically
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${API_BASE}/status`)
        const data = await res.json()
        setIsStreaming(data.is_streaming)
      } catch (err) {
        console.warn("⚠️ Status check failed.", err)
      }
    }
    checkStatus()
    const interval = setInterval(checkStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  // 🎥 Initialize HLS when live
  useEffect(() => {
    if (isStreaming && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(STREAM_URL)
        hls.attachMedia(videoRef.current)
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = STREAM_URL
      }
    }
  }, [isStreaming])

  const addLog = (msg: string) =>
    setLogs((prev) => [`${new Date().toLocaleTimeString()}: ${msg}`, ...prev])

  // ▶️ Start Stream
  const startStream = async () => {
    setLoading(true)
    toast.loading("Starting stream...")
    try {
      const res = await fetch(`${API_BASE}/start-stream`, { method: "POST" })
      toast.dismiss()
      if (res.ok) {
        setIsStreaming(true)
        toast.success("✅ Stream started successfully")
        addLog("Stream started successfully.")
      } else {
        const err = await res.text()
        toast.error(`❌ Failed to start: ${err}`)
        addLog("Stream start failed.")
      }
    } catch (err) {
      toast.dismiss()
      toast.error("⚠️ Unable to reach backend.")
      addLog("Backend not reachable.")
    } finally {
      setLoading(false)
    }
  }

  // ⏹ Stop Stream
  const stopStream = async () => {
    setLoading(true)
    toast.loading("Stopping stream...")
    try {
      const res = await fetch(`${API_BASE}/stop-stream`, { method: "POST" })
      toast.dismiss()
      if (res.ok) {
        setIsStreaming(false)
        toast.success("🛑 Stream stopped")
        addLog("Stream stopped successfully.")
      } else {
        const err = await res.text()
        toast.error(`❌ Failed to stop: ${err}`)
        addLog("Stream stop failed.")
      }
    } catch (err) {
      toast.dismiss()
      toast.error("⚠️ Unable to reach backend.")
      addLog("Backend not reachable.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto space-y-10">
        {/* 🧭 Control Panel */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Livestream Control Panel
              <div className="flex items-center ml-4 gap-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${
                    isStreaming
                      ? "bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"
                      : "bg-gray-400"
                  }`}
                ></span>
                <Badge className={isStreaming ? "bg-red-600" : "bg-gray-400"}>
                  {isStreaming ? "LIVE" : "OFFLINE"}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {!isStreaming ? (
                <Button
                  onClick={startStream}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  <Play className="h-5 w-5 mr-2" />
                  {loading ? "Starting..." : "Start Stream"}
                </Button>
              ) : (
                <Button
                  onClick={stopStream}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={loading}
                >
                  <StopCircle className="h-5 w-5 mr-2" />
                  {loading ? "Stopping..." : "Stop Stream"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 🎥 Live Preview */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" /> Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isStreaming ? (
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg border bg-black aspect-video"
              />
            ) : (
              <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
                Stream not active
              </div>
            )}
          </CardContent>
        </Card>

        {/* 📜 Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
          </CardHeader>
          <CardContent className="bg-gray-50 p-4 h-64 overflow-y-auto rounded-md">
            {logs.length ? (
              logs.map((log, i) => (
                <p
                  key={i}
                  className="text-sm text-gray-700 border-b border-gray-200 py-1"
                >
                  {log}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No logs yet...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
