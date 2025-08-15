"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Heart, Search, MessageSquare, CheckCircle, Clock, AlertCircle, EyeOff } from "lucide-react"

interface PrayerRequest {
  id: string
  name: string
  email: string
  phone?: string
  category: "personal" | "family" | "health" | "financial" | "spiritual" | "other"
  subject: string
  message: string
  isUrgent: boolean
  isConfidential: boolean
  status: "new" | "praying" | "answered" | "closed"
  submittedAt: string
  responses: {
    id: string
    message: string
    respondedBy: string
    respondedAt: string
  }[]
  followUpDate?: string
}

const initialRequests: PrayerRequest[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1-555-0123",
    category: "health",
    subject: "Healing for my mother",
    message:
      "Please pray for my mother who was recently diagnosed with cancer. She's starting treatment next week and we're trusting God for complete healing. The doctors are optimistic, but we know that God is the ultimate healer. Please pray for strength for our family during this difficult time.",
    isUrgent: true,
    isConfidential: false,
    status: "praying",
    submittedAt: "2024-01-15T10:30:00Z",
    responses: [
      {
        id: "r1",
        message:
          "We are lifting your mother up in prayer and believing God for her complete healing. Our prayer team will be praying specifically for her treatment and recovery.",
        respondedBy: "Pastor Johnson",
        respondedAt: "2024-01-15T14:20:00Z",
      },
    ],
    followUpDate: "2024-01-22",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    category: "financial",
    subject: "Job search and provision",
    message:
      "I've been unemployed for 3 months now and struggling to find work in my field. Please pray that God would open doors for employment and provide for my family's needs during this challenging time.",
    isUrgent: false,
    isConfidential: true,
    status: "new",
    submittedAt: "2024-01-14T16:45:00Z",
    responses: [],
  },
  {
    id: "3",
    name: "Anonymous",
    email: "prayer@anonymous.com",
    category: "spiritual",
    subject: "Struggling with faith",
    message:
      "I've been going through a difficult season and finding it hard to feel God's presence. Please pray for renewed faith and spiritual breakthrough.",
    isUrgent: false,
    isConfidential: true,
    status: "praying",
    submittedAt: "2024-01-13T09:15:00Z",
    responses: [
      {
        id: "r2",
        message:
          "Thank you for sharing your heart with us. We're praying for God to reveal Himself to you in a fresh way and for His peace to fill your heart.",
        respondedBy: "Sister Mary",
        respondedAt: "2024-01-13T11:30:00Z",
      },
    ],
  },
  {
    id: "4",
    name: "David Williams",
    email: "david.w@email.com",
    phone: "+1-555-0456",
    category: "family",
    subject: "Marriage restoration",
    message:
      "My wife and I are going through a very difficult time in our marriage. We're both believers but struggling to communicate and connect. Please pray for healing and restoration in our relationship.",
    isUrgent: true,
    isConfidential: true,
    status: "answered",
    submittedAt: "2024-01-10T14:20:00Z",
    responses: [
      {
        id: "r3",
        message:
          "We're praying for God's healing and restoration in your marriage. Consider joining our marriage ministry for additional support and counseling resources.",
        respondedBy: "Pastor Johnson",
        respondedAt: "2024-01-10T16:45:00Z",
      },
      {
        id: "r4",
        message:
          "Praise God! We heard that you and your wife have been attending counseling and seeing improvement. We continue to pray for your marriage.",
        respondedBy: "Sister Mary",
        respondedAt: "2024-01-20T10:15:00Z",
      },
    ],
  },
]

export default function PrayerRequestsDashboard() {
  const [requests, setRequests] = useState<PrayerRequest[]>(initialRequests)
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [responseMessage, setResponseMessage] = useState("")

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesCategory = categoryFilter === "all" || request.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const updateRequestStatus = (id: string, status: PrayerRequest["status"]) => {
    setRequests(
      requests.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
              followUpDate:
                status === "praying"
                  ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                  : request.followUpDate,
            }
          : request,
      ),
    )
  }

  const addResponse = (requestId: string) => {
    if (!responseMessage.trim()) return

    const newResponse = {
      id: Date.now().toString(),
      message: responseMessage,
      respondedBy: "Admin User",
      respondedAt: new Date().toISOString(),
    }

    setRequests(
      requests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              responses: [...request.responses, newResponse],
              status: request.status === "new" ? "praying" : request.status,
            }
          : request,
      ),
    )

    setResponseMessage("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />
      case "praying":
        return <Clock className="h-4 w-4" />
      case "answered":
        return <CheckCircle className="h-4 w-4" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Prayer Requests Dashboard</h2>
        <p className="text-muted-foreground">Manage and respond to prayer requests from the community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Requests</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium">New</p>
                <p className="text-2xl font-bold">{stats.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Praying</p>
                <p className="text-2xl font-bold">{stats.praying}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <div>
                <p className="text-sm font-medium">Answered</p>
                <p className="text-2xl font-bold">{stats.answered}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm font-medium">Urgent</p>
                <p className="text-2xl font-bold">{stats.urgent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
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
              <SelectTrigger className="w-full md:w-40">
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
        </CardContent>
      </Card>

      {/* Prayer Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className={`${request.isUrgent ? "border-destructive" : ""}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{request.subject}</h3>
                    {request.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                    {request.isConfidential && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <EyeOff className="h-3 w-3" />
                        Confidential
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{request.name}</span>
                    <span>{request.email}</span>
                    <span>{new Date(request.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(request.status) as any} className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                    <Badge className={getCategoryColor(request.category)}>
                      {request.category.charAt(0).toUpperCase() + request.category.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={request.status}
                    onValueChange={(value: PrayerRequest["status"]) => updateRequestStatus(request.id, value)}
                  >
                    <SelectTrigger className="w-32">
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
                      <Button variant="outline" onClick={() => setSelectedRequest(request)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-primary" />
                          Prayer Request Details
                        </DialogTitle>
                      </DialogHeader>
                      {selectedRequest && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{selectedRequest.subject}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusColor(selectedRequest.status) as any}>
                                {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                              </Badge>
                              <Badge className={getCategoryColor(selectedRequest.category)}>
                                {selectedRequest.category.charAt(0).toUpperCase() + selectedRequest.category.slice(1)}
                              </Badge>
                              {selectedRequest.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                              {selectedRequest.isConfidential && <Badge variant="outline">Confidential</Badge>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Contact Information</Label>
                            <div className="text-sm space-y-1">
                              <p>
                                <strong>Name:</strong> {selectedRequest.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {selectedRequest.email}
                              </p>
                              {selectedRequest.phone && (
                                <p>
                                  <strong>Phone:</strong> {selectedRequest.phone}
                                </p>
                              )}
                              <p>
                                <strong>Submitted:</strong> {new Date(selectedRequest.submittedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Prayer Request</Label>
                            <div className="bg-muted p-4 rounded-lg">
                              <p className="text-sm">{selectedRequest.message}</p>
                            </div>
                          </div>

                          {selectedRequest.responses.length > 0 && (
                            <div className="space-y-2">
                              <Label>Previous Responses</Label>
                              <div className="space-y-3">
                                {selectedRequest.responses.map((response) => (
                                  <div key={response.id} className="bg-primary/5 p-4 rounded-lg">
                                    <p className="text-sm mb-2">{response.message}</p>
                                    <p className="text-xs text-muted-foreground">
                                      By {response.respondedBy} on {new Date(response.respondedAt).toLocaleString()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label htmlFor="response">Add Response</Label>
                            <Textarea
                              id="response"
                              placeholder="Write your response or prayer update..."
                              value={responseMessage}
                              onChange={(e) => setResponseMessage(e.target.value)}
                              rows={4}
                            />
                            <Button
                              onClick={() => addResponse(selectedRequest.id)}
                              disabled={!responseMessage.trim()}
                              className="w-full"
                            >
                              Send Response
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{request.message}</p>
                {request.responses.length > 0 && (
                  <p className="text-xs text-primary">
                    {request.responses.length} response{request.responses.length !== 1 ? "s" : ""} • Last response by{" "}
                    {request.responses[request.responses.length - 1].respondedBy}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No prayer requests found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
