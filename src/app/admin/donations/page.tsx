"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Users, Calendar, Search, Download, Mail, Eye, BarChart3 } from "lucide-react"

interface Donation {
  id: string
  donorName: string
  donorEmail: string
  amount: number
  category: "tithe" | "offering" | "missions" | "building-fund" | "special-project" | "other"
  paymentMethod: "credit-card" | "bank-transfer" | "cash" | "check"
  isRecurring: boolean
  frequency?: "weekly" | "monthly" | "quarterly" | "annually"
  date: string
  transactionId?: string
  notes?: string
  isAnonymous: boolean
  status: "completed" | "pending" | "failed" | "refunded"
}

interface Donor {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  totalGiven: number
  firstDonation: string
  lastDonation: string
  donationCount: number
  averageDonation: number
  preferredCategory: string
  isRecurringDonor: boolean
  status: "active" | "inactive" | "lapsed"
}

const initialDonations: Donation[] = [
  {
    id: "1",
    donorName: "John Smith",
    donorEmail: "john.smith@email.com",
    amount: 500,
    category: "tithe",
    paymentMethod: "credit-card",
    isRecurring: true,
    frequency: "monthly",
    date: "2024-01-15T10:00:00Z",
    transactionId: "txn_1234567890",
    isAnonymous: false,
    status: "completed",
  },
  {
    id: "2",
    donorName: "Sarah Johnson",
    donorEmail: "sarah.j@email.com",
    amount: 250,
    category: "offering",
    paymentMethod: "bank-transfer",
    isRecurring: false,
    date: "2024-01-14T14:30:00Z",
    transactionId: "txn_0987654321",
    isAnonymous: false,
    status: "completed",
  },
  {
    id: "3",
    donorName: "Anonymous",
    donorEmail: "anonymous@church.com",
    amount: 1000,
    category: "missions",
    paymentMethod: "credit-card",
    isRecurring: false,
    date: "2024-01-13T09:15:00Z",
    transactionId: "txn_1122334455",
    notes: "For overseas mission work",
    isAnonymous: true,
    status: "completed",
  },
  {
    id: "4",
    donorName: "Michael Chen",
    donorEmail: "m.chen@email.com",
    amount: 150,
    category: "building-fund",
    paymentMethod: "check",
    isRecurring: true,
    frequency: "weekly",
    date: "2024-01-12T16:45:00Z",
    isAnonymous: false,
    status: "completed",
  },
  {
    id: "5",
    donorName: "Emily Davis",
    donorEmail: "emily.d@email.com",
    amount: 75,
    category: "special-project",
    paymentMethod: "cash",
    isRecurring: false,
    date: "2024-01-11T11:20:00Z",
    notes: "Youth camp fundraiser",
    isAnonymous: false,
    status: "completed",
  },
]

const initialDonors: Donor[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    address: "123 Main St, City, State 12345",
    totalGiven: 6000,
    firstDonation: "2023-06-01",
    lastDonation: "2024-01-15",
    donationCount: 12,
    averageDonation: 500,
    preferredCategory: "tithe",
    isRecurringDonor: true,
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1-555-0456",
    totalGiven: 2750,
    firstDonation: "2023-08-15",
    lastDonation: "2024-01-14",
    donationCount: 11,
    averageDonation: 250,
    preferredCategory: "offering",
    isRecurringDonor: false,
    status: "active",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1-555-0789",
    totalGiven: 3900,
    firstDonation: "2023-04-10",
    lastDonation: "2024-01-12",
    donationCount: 26,
    averageDonation: 150,
    preferredCategory: "building-fund",
    isRecurringDonor: true,
    status: "active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@email.com",
    totalGiven: 825,
    firstDonation: "2023-09-20",
    lastDonation: "2024-01-11",
    donationCount: 11,
    averageDonation: 75,
    preferredCategory: "special-project",
    isRecurringDonor: false,
    status: "active",
  },
]

export default function DonationsGivingDashboard() {
  const [donations, setDonations] = useState<Donation[]>(initialDonations)
  const [donors, setDonors] = useState<Donor[]>(initialDonors)
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || donation.category === categoryFilter
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tithe":
        return "bg-blue-100 text-blue-800"
      case "offering":
        return "bg-green-100 text-green-800"
      case "missions":
        return "bg-purple-100 text-purple-800"
      case "building-fund":
        return "bg-orange-100 text-orange-800"
      case "special-project":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      case "refunded":
        return "outline"
      default:
        return "outline"
    }
  }

  const getDonorStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "lapsed":
        return "outline"
      default:
        return "outline"
    }
  }

  const stats = {
    totalDonations: donations.reduce((sum, d) => sum + d.amount, 0),
    totalDonors: donors.length,
    activeDonors: donors.filter((d) => d.status === "active").length,
    recurringDonors: donors.filter((d) => d.isRecurringDonor).length,
    averageDonation: donations.length > 0 ? donations.reduce((sum, d) => sum + d.amount, 0) / donations.length : 0,
    thisMonth: donations
      .filter((d) => new Date(d.date).getMonth() === new Date().getMonth())
      .reduce((sum, d) => sum + d.amount, 0),
  }

  const categoryStats = donations.reduce(
    (acc, donation) => {
      acc[donation.category] = (acc[donation.category] || 0) + donation.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const exportData = (type: "donations" | "donors") => {
    const data = type === "donations" ? filteredDonations : filteredDonors
    const csv = [
      type === "donations"
        ? ["Date", "Donor", "Email", "Amount", "Category", "Method", "Status"].join(",")
        : ["Name", "Email", "Total Given", "Donation Count", "Average", "Status"].join(","),
      ...data.map((item) =>
        type === "donations"
          ? [
              new Date((item as Donation).date).toLocaleDateString(),
              (item as Donation).donorName,
              (item as Donation).donorEmail,
              (item as Donation).amount,
              (item as Donation).category,
              (item as Donation).paymentMethod,
              (item as Donation).status,
            ].join(",")
          : [
              (item as Donor).name,
              (item as Donor).email,
              (item as Donor).totalGiven,
              (item as Donor).donationCount,
              (item as Donor).averageDonation,
              (item as Donor).status,
            ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${type}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Donations & Giving Dashboard</h2>
          <p className="text-muted-foreground">Track donations, manage donors, and analyze giving patterns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportData("donations")}>
            <Download className="h-4 w-4 mr-2" />
            Export Donations
          </Button>
          <Button variant="outline" onClick={() => exportData("donors")}>
            <Download className="h-4 w-4 mr-2" />
            Export Donors
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="donors">Donors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Total Donations</p>
                    <p className="text-2xl font-bold">${stats.totalDonations.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Total Donors</p>
                    <p className="text-2xl font-bold">{stats.totalDonors}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Active Donors</p>
                    <p className="text-2xl font-bold">{stats.activeDonors}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm font-medium">Recurring</p>
                    <p className="text-2xl font-bold">{stats.recurringDonors}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium">Average Donation</p>
                  <p className="text-2xl font-bold">${Math.round(stats.averageDonation).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium">This Month</p>
                  <p className="text-2xl font-bold">${stats.thisMonth.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Donations by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(categoryStats).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Badge className={getCategoryColor(category)}>
                        {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {donations.filter((d) => d.category === category).length} donations
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((amount / stats.totalDonations) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donations.slice(0, 5).map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{donation.isAnonymous ? "Anonymous" : donation.donorName}</p>
                        <Badge className={getCategoryColor(donation.category)}>
                          {donation.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                        {donation.isRecurring && <Badge variant="outline">Recurring</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(donation.date).toLocaleDateString()} • {donation.paymentMethod.replace("-", " ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${donation.amount.toLocaleString()}</p>
                      <Badge variant={getStatusColor(donation.status) as any}>{donation.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search donations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tithe">Tithe</SelectItem>
                    <SelectItem value="offering">Offering</SelectItem>
                    <SelectItem value="missions">Missions</SelectItem>
                    <SelectItem value="building-fund">Building Fund</SelectItem>
                    <SelectItem value="special-project">Special Project</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Donations List */}
          <div className="space-y-4">
            {filteredDonations.map((donation) => (
              <Card key={donation.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {donation.isAnonymous ? "Anonymous Donation" : donation.donorName}
                        </h3>
                        <Badge className={getCategoryColor(donation.category)}>
                          {donation.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                        <Badge variant={getStatusColor(donation.status) as any}>{donation.status}</Badge>
                        {donation.isRecurring && <Badge variant="outline">Recurring</Badge>}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{donation.isAnonymous ? "Anonymous" : donation.donorEmail}</span>
                        <span>{new Date(donation.date).toLocaleDateString()}</span>
                        <span>{donation.paymentMethod.replace("-", " ")}</span>
                        {donation.transactionId && <span>ID: {donation.transactionId}</span>}
                      </div>
                      {donation.notes && <p className="text-sm text-muted-foreground italic">{donation.notes}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${donation.amount.toLocaleString()}</p>
                      {donation.frequency && (
                        <p className="text-sm text-muted-foreground capitalize">{donation.frequency}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDonations.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No donations found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="donors" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Donors List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDonors.map((donor) => (
              <Card key={donor.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{donor.name}</h3>
                          <Badge variant={getDonorStatusColor(donor.status) as any}>{donor.status}</Badge>
                          {donor.isRecurringDonor && <Badge variant="outline">Recurring</Badge>}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>{donor.email}</p>
                          {donor.phone && <p>{donor.phone}</p>}
                          {donor.address && <p>{donor.address}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedDonor(donor)}>
                              <Eye className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Donor Details: {selectedDonor?.name}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedDonor && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Contact Information</Label>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <strong>Email:</strong> {selectedDonor.email}
                                      </p>
                                      {selectedDonor.phone && (
                                        <p>
                                          <strong>Phone:</strong> {selectedDonor.phone}
                                        </p>
                                      )}
                                      {selectedDonor.address && (
                                        <p>
                                          <strong>Address:</strong> {selectedDonor.address}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Giving Summary</Label>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <strong>Total Given:</strong> ${selectedDonor.totalGiven.toLocaleString()}
                                      </p>
                                      <p>
                                        <strong>Donations:</strong> {selectedDonor.donationCount}
                                      </p>
                                      <p>
                                        <strong>Average:</strong> ${selectedDonor.averageDonation.toLocaleString()}
                                      </p>
                                      <p>
                                        <strong>Preferred:</strong> {selectedDonor.preferredCategory}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Label>Recent Donations</Label>
                                  <div className="space-y-2 mt-2">
                                    {donations
                                      .filter((d) => d.donorEmail === selectedDonor.email)
                                      .slice(0, 5)
                                      .map((donation) => (
                                        <div
                                          key={donation.id}
                                          className="flex items-center justify-between p-3 border rounded"
                                        >
                                          <div>
                                            <Badge className={getCategoryColor(donation.category)}>
                                              {donation.category.replace("-", " ")}
                                            </Badge>
                                            <p className="text-xs text-muted-foreground mt-1">
                                              {new Date(donation.date).toLocaleDateString()}
                                            </p>
                                          </div>
                                          <p className="font-medium">${donation.amount.toLocaleString()}</p>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Given</p>
                        <p className="text-xl font-bold">${donor.totalGiven.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Donations</p>
                        <p className="text-xl font-bold">{donor.donationCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Average</p>
                        <p className="text-lg font-semibold">${donor.averageDonation.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Preferred</p>
                        <Badge className={getCategoryColor(donor.preferredCategory)}>
                          {donor.preferredCategory.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>First: {new Date(donor.firstDonation).toLocaleDateString()}</span>
                      <span>Last: {new Date(donor.lastDonation).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDonors.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No donors found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Giving Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donor Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Pie chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Payment method breakdown</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
