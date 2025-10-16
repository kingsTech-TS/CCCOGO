"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Heart,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  EyeOff,
  MessageSquare,
} from "lucide-react"
import {
  collection,
  updateDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore"
import toast, { Toaster } from "react-hot-toast"
import { db } from "../../../../lib/firebase"

interface PrayerRequest {
  id: string
  name: string
  email: string
  phone?: string
  category:
    | "personal"
    | "family"
    | "health"
    | "financial"
    | "Guidance"
    | "Work"
    | "spiritual"
    | "Education"
    | "other"
  request: string
  isUrgent: boolean
  isConfidential: boolean
  status: "new" | "praying" | "answered" | "closed"
  submittedAt: string
}

export default function PrayerRequestsDashboard() {
  const [requests, setRequests] = useState<PrayerRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [hasShownToast, setHasShownToast] = useState(false)

  // ✅ Real-time listener with onSnapshot
  useEffect(() => {
    const q = query(collection(db, "prayerRequest"), orderBy("submittedAt", "desc"))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PrayerRequest[]

        setRequests(data)
        setLoading(false)

        if (!hasShownToast) {
          toast.success("Prayer requests loaded successfully")
          setHasShownToast(true)
        }
      },
      (error) => {
        console.error("Error fetching prayer requests:", error)
        toast.error("Failed to load prayer requests")
        setLoading(false)
      }
    )

    // Cleanup listener on unmount
    return () => unsubscribe()
  }, [hasShownToast])

  // 🔍 Filtering logic
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.request?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesCategory = categoryFilter === "all" || request.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  // ⚡ Update status with toast
  const updateRequestStatus = async (id: string, status: PrayerRequest["status"]) => {
    try {
      const requestRef = doc(db, "prayerRequest", id)
      await updateDoc(requestRef, { status })
      toast.success(`Status updated to "${status}"`)
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update status")
    }
  }

  // 🔹 UI helpers
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />
      case "praying":
        return <Clock className="h-4 w-4" />
      case "answered":
      case "closed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "destructive"
      case "praying":
        return "default"
      case "answered":
        return "secondary"
      case "closed":
        return "outline"
      default:
        return "outline"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "health":
        return "bg-red-100 text-red-800"
      case "family":
        return "bg-blue-100 text-blue-800"
      case "financial":
        return "bg-green-100 text-green-800"
      case "spiritual":
        return "bg-purple-100 text-purple-800"
      case "personal":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    praying: requests.filter((r) => r.status === "praying").length,
    answered: requests.filter((r) => r.status === "answered").length,
    urgent: requests.filter((r) => r.isUrgent).length,
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-muted-foreground">Loading prayer requests...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Prayer Requests Dashboard
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage and view prayer requests from the community
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Heart className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs font-medium">Total</p>
              <p className="text-lg font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-xs font-medium">New</p>
              <p className="text-lg font-bold">{stats.new}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs font-medium">Praying</p>
              <p className="text-lg font-bold">{stats.praying}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-secondary" />
            <div>
              <p className="text-xs font-medium">Answered</p>
              <p className="text-lg font-bold">{stats.answered}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs font-medium">Urgent</p>
              <p className="text-lg font-bold">{stats.urgent}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="praying">Praying</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="spiritual">Spiritual</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card
            key={request.id}
            className={request.isUrgent ? "border-destructive" : ""}
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-base md:text-lg">
                      {request.request.slice(0, 40)}...
                    </h3>
                    {request.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                    {request.isConfidential && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <EyeOff className="h-3 w-3" /> Confidential
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs md:text-sm text-muted-foreground">
                    <span>{request.name}</span>
                    <span>{request.email}</span>
                    <span>{new Date(request.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={getStatusColor(request.status) as any}
                      className="flex items-center gap-1"
                    >
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                    <Badge className={getCategoryColor(request.category)}>
                      {request.category.charAt(0).toUpperCase() + request.category.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <Select
                    value={request.status}
                    onValueChange={(value: PrayerRequest["status"]) =>
                      updateRequestStatus(request.id, value)
                    }
                  >
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="praying">Praying</SelectItem>
                      <SelectItem value="answered">Answered</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedRequest(request)}
                        className="w-full sm:w-auto"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" /> Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <h3 className="text-lg font-semibold mb-2">Prayer Request</h3>
                      <p className="text-sm mb-4">{request.request}</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <strong>From:</strong> {request.name} ({request.email})
                        </p>
                        {request.phone && (
                          <p>
                            <strong>Phone:</strong> {request.phone}
                          </p>
                        )}
                        <p>
                          <strong>Category:</strong> {request.category}
                        </p>
                        <p>
                          <strong>Submitted:</strong>{" "}
                          {new Date(request.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No prayer requests found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
