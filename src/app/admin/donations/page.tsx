"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Search,
  Download,
  Mail,
  Eye,
  BarChart3,
  RefreshCcw,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

interface Donation {
  id: string
  donorName: string
  donorEmail: string
  amount: number
  category:
    | "tithe"
    | "offering"
    | "missions"
    | "building-fund"
    | "special-project"
    | "other"
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

// --- SAMPLE DATA ---
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
]

// --- HELPERS ---
const toTitleCase = (str: string) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

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

// --- MAIN COMPONENT ---
export default function DonationsGivingDashboard() {
  const [donations] = useState<Donation[]>(initialDonations)
  const [donors] = useState<Donor[]>(initialDonors)
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const resetFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setStatusFilter("all")
    setDateFilter("all")
  }

  // --- FILTERED DATA ---
  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        categoryFilter === "all" || donation.category === categoryFilter

      const matchesStatus =
        statusFilter === "all" || donation.status === statusFilter

      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "thisMonth" &&
          new Date(donation.date).getMonth() === new Date().getMonth()) ||
        (dateFilter === "lastMonth" &&
          new Date(donation.date).getMonth() ===
            new Date().getMonth() - 1)

      return matchesSearch && matchesCategory && matchesStatus && matchesDate
    })
  }, [donations, searchTerm, categoryFilter, statusFilter, dateFilter])

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const matchesSearch =
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.email.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [donors, searchTerm])

  // --- STATS ---
  const stats = useMemo(() => {
    return {
      totalDonations: donations.reduce((sum, d) => sum + d.amount, 0),
      totalDonors: donors.length,
      activeDonors: donors.filter((d) => d.status === "active").length,
      recurringDonors: donors.filter((d) => d.isRecurringDonor).length,
      averageDonation:
        donations.length > 0
          ? donations.reduce((sum, d) => sum + d.amount, 0) /
            donations.length
          : 0,
      thisMonth: donations
        .filter(
          (d) => new Date(d.date).getMonth() === new Date().getMonth()
        )
        .reduce((sum, d) => sum + d.amount, 0),
    }
  }, [donations, donors])

  const categoryStats = useMemo(() => {
    return donations.reduce((acc, donation) => {
      acc[donation.category] =
        (acc[donation.category] || 0) + donation.amount
      return acc
    }, {} as Record<string, number>)
  }, [donations])

  // --- CHART DATA ---
  const monthlyData = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 1800 },
    { month: "Mar", amount: 950 },
  ]
  const categoryData = Object.entries(categoryStats).map(
    ([name, value]) => ({ name: toTitleCase(name), value })
  )
  const COLORS = ["#4F46E5", "#16A34A", "#9333EA", "#F97316", "#DB2777"]

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Donations & Giving Dashboard
          </h2>
          <p className="text-muted-foreground">
            Track donations, manage donors, and analyze giving patterns
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Donations
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Donors
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="donors">Donors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* --- Overview Tab --- */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm">Total Donations</p>
                <p className="text-xl font-bold">
                  ${stats.totalDonations.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm">Total Donors</p>
                <p className="text-xl font-bold">{stats.totalDonors}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm">Active Donors</p>
                <p className="text-xl font-bold">{stats.activeDonors}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm">Recurring</p>
                <p className="text-xl font-bold">
                  {stats.recurringDonors}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm">Average</p>
                <p className="text-xl font-bold">
                  ${Math.round(stats.averageDonation)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm">This Month</p>
                <p className="text-xl font-bold">
                  ${stats.thisMonth.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- Analytics Tab --- */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Giving Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#4F46E5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
