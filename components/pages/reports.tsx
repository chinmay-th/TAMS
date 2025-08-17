'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Plane
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const dailyOpsData = [
    { time: '06:00', flights: 12, delays: 2, onTime: 83, passengers: 2400 },
    { time: '09:00', flights: 28, delays: 5, onTime: 82, passengers: 5600 },
    { time: '12:00', flights: 35, delays: 8, onTime: 77, passengers: 7200 },
    { time: '15:00', flights: 42, delays: 12, onTime: 71, passengers: 8900 },
    { time: '18:00', flights: 38, delays: 9, onTime: 76, passengers: 8100 },
    { time: '21:00', flights: 24, delays: 4, onTime: 83, passengers: 5200 },
  ];

  const slaData = [
    { metric: 'Security Wait Time', target: 20, actual: 18.5, performance: 92.5 },
    { metric: 'Baggage Delivery', target: 30, actual: 28.2, performance: 94.0 },
    { metric: 'Check-in Processing', target: 5, actual: 4.2, performance: 84.0 },
    { metric: 'Immigration Processing', target: 15, actual: 12.8, performance: 85.3 },
    { metric: 'Aircraft Turnaround', target: 45, actual: 42.1, performance: 93.6 },
  ];

  const sustainabilityData = [
    { month: 'Jan', carbon: 4850, energy: 185, water: 2.9, waste: 72 },
    { month: 'Feb', carbon: 4620, energy: 178, water: 2.8, waste: 74 },
    { month: 'Mar', carbon: 4450, energy: 172, water: 2.7, waste: 76 },
    { month: 'Apr', carbon: 4280, energy: 168, water: 2.6, waste: 78 },
    { month: 'May', carbon: 4100, energy: 162, water: 2.5, waste: 79 },
    { month: 'Jun', carbon: 3950, energy: 158, water: 2.4, waste: 81 },
  ];

  const reports = [
    {
      id: 'RPT-001',
      name: 'Daily Operations Summary',
      type: 'Operational',
      frequency: 'Daily',
      lastGenerated: '2024-01-15 06:00',
      status: 'completed',
      size: '2.4 MB',
      recipients: ['AOCC Team', 'Management', 'Stakeholders']
    },
    {
      id: 'RPT-002',
      name: 'Flight Delay Analysis',
      type: 'Performance',
      frequency: 'Weekly',
      lastGenerated: '2024-01-14 18:00',
      status: 'completed',
      size: '5.8 MB',
      recipients: ['Operations', 'Airlines', 'Slot Coordination']
    },
    {
      id: 'RPT-003',
      name: 'Security Incident Report',
      type: 'Security',
      frequency: 'Weekly',
      lastGenerated: '2024-01-14 12:00',
      status: 'completed',
      size: '1.2 MB',
      recipients: ['Security Team', 'Management', 'Authorities']
    },
    {
      id: 'RPT-004',
      name: 'Sustainability Dashboard',
      type: 'Environmental',
      frequency: 'Monthly',
      lastGenerated: '2024-01-01 09:00',
      status: 'scheduled',
      size: '3.6 MB',
      recipients: ['Sustainability Team', 'Regulators', 'Board']
    },
    {
      id: 'RPT-005',
      name: 'SLA Performance Report',
      type: 'Performance',
      frequency: 'Monthly',
      lastGenerated: '2024-01-01 10:00',
      status: 'completed',
      size: '4.2 MB',
      recipients: ['Management', 'Service Providers', 'Airlines']
    },
    {
      id: 'RPT-006',
      name: 'Maintenance Summary',
      type: 'Maintenance',
      frequency: 'Weekly',
      lastGenerated: '2024-01-14 16:00',
      status: 'completed',
      size: '2.8 MB',
      recipients: ['Engineering Team', 'Management', 'Contractors']
    }
  ];

  const kpiSummary = {
    flights: { total: 1247, onTime: 1089, delayed: 158, cancelled: 12, performance: 87.3 },
    passengers: { total: 156780, domestic: 98450, international: 58330, satisfaction: 4.2 },
    security: { incidents: 23, resolved: 21, pending: 2, avgResponse: 4.2 },
    sustainability: { carbonReduction: 12.3, energyEfficiency: 8.7, wasteReduction: 15.2 },
    revenue: { total: 2847000, retail: 890000, parking: 456000, services: 234000 }
  };

  const generateReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      alert(`Generating ${report.name}...\n\nReport will include:\n- Latest operational data\n- Performance metrics\n- Trend analysis\n- Recommendations\n\nEstimated completion: 2-3 minutes\nRecipients will be notified automatically.`);
    }
  };

  const downloadReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      alert(`Downloading ${report.name}\n\nFile size: ${report.size}\nFormat: PDF with Excel data appendix\n\nDownload will begin shortly...`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <FileText className="w-3 h-3" />
            <span>6 Reports</span>
          </Badge>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Executive Dashboard</TabsTrigger>
          <TabsTrigger value="operations">Daily Operations</TabsTrigger>
          <TabsTrigger value="performance">Performance & SLA</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="reports">Report Library</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Executive KPI Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Plane className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{kpiSummary.flights.performance}%</p>
                <p className="text-sm text-slate-500">On-Time Performance</p>
                <p className="text-xs text-green-600">+2.1% vs last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{kpiSummary.passengers.satisfaction}</p>
                <p className="text-sm text-slate-500">Passenger Satisfaction</p>
                <p className="text-xs text-green-600">+0.3 vs last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">98.2%</p>
                <p className="text-sm text-slate-500">System Uptime</p>
                <p className="text-xs text-purple-600">+0.5% vs last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">${(kpiSummary.revenue.total / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-slate-500">Monthly Revenue</p>
                <p className="text-xs text-orange-600">+8.4% vs last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">{kpiSummary.security.pending}</p>
                <p className="text-sm text-slate-500">Open Incidents</p>
                <p className="text-xs text-red-600">-5 vs last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Key Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Trends - Last 30 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyOpsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="onTime" stroke="#22c55e" strokeWidth={2} name="On-Time %" />
                  <Line type="monotone" dataKey="delays" stroke="#ef4444" strokeWidth={2} name="Delays" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Flight Operations Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Flights (30 days)</span>
                    <span className="font-bold text-blue-600">{kpiSummary.flights.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-Time Flights</span>
                    <span className="font-bold text-green-600">{kpiSummary.flights.onTime.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Delayed Flights</span>
                    <span className="font-bold text-yellow-600">{kpiSummary.flights.delayed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cancelled Flights</span>
                    <span className="font-bold text-red-600">{kpiSummary.flights.cancelled}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Passenger Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{kpiSummary.passengers.total.toLocaleString()}</p>
                    <p className="text-sm text-slate-500">Total Passengers (30 days)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{kpiSummary.passengers.domestic.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">Domestic</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">{kpiSummary.passengers.international.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">International</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Operations Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyOpsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="flights" fill="#3b82f6" name="Total Flights" />
                  <Bar dataKey="delays" fill="#ef4444" name="Delays" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">Peak hour handled smoothly</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">Average delay: 8.2 minutes</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">Weather impact: Minimal</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Gate Utilization</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Runway Capacity</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Terminal Occupancy</span>
                      <span>82%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-2 bg-red-50 rounded">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-800">Gate B12 - Equipment fault</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">Security queue exceeding SLA</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800">All systems operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Level Agreement (SLA) Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {slaData.map((sla) => (
                  <div key={sla.metric} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{sla.metric}</h3>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500">Target</p>
                      <p className="font-bold">{sla.target} {sla.metric.includes('Time') ? 'min' : sla.metric.includes('Processing') ? 'min' : 'min'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500">Actual</p>
                      <p className="font-bold text-blue-600">{sla.actual} {sla.metric.includes('Time') ? 'min' : sla.metric.includes('Processing') ? 'min' : 'min'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500">Performance</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${sla.performance >= 90 ? 'bg-green-600' : sla.performance >= 80 ? 'bg-yellow-600' : 'bg-red-600'}`}
                            style={{ width: `${Math.min(sla.performance, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold">{sla.performance}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={[
                    { month: 'Jan', security: 92, baggage: 89, checkin: 85, immigration: 88 },
                    { month: 'Feb', security: 91, baggage: 91, checkin: 87, immigration: 86 },
                    { month: 'Mar', security: 93, baggage: 92, checkin: 84, immigration: 89 },
                    { month: 'Apr', security: 92, baggage: 94, checkin: 84, immigration: 85 },
                    { month: 'May', security: 94, baggage: 93, checkin: 86, immigration: 87 },
                    { month: 'Jun', security: 93, baggage: 95, checkin: 84, immigration: 85 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="security" stroke="#ef4444" strokeWidth={2} name="Security" />
                    <Line type="monotone" dataKey="baggage" stroke="#3b82f6" strokeWidth={2} name="Baggage" />
                    <Line type="monotone" dataKey="checkin" stroke="#22c55e" strokeWidth={2} name="Check-in" />
                    <Line type="monotone" dataKey="immigration" stroke="#f59e0b" strokeWidth={2} name="Immigration" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SLA Compliance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">89.2%</p>
                    <p className="text-sm text-slate-500">Overall SLA Compliance</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Exceeding Target</span>
                      <Badge variant="secondary">3 metrics</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Meeting Target</span>
                      <Badge variant="default">1 metric</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Below Target</span>
                      <Badge variant="destructive">1 metric</Badge>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">Next review: January 31, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sustainabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="carbon" stroke="#ef4444" strokeWidth={2} name="Carbon (tons CO2)" />
                  <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy (kWh/m²)" />
                  <Line type="monotone" dataKey="waste" stroke="#22c55e" strokeWidth={2} name="Waste Diversion %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">-{kpiSummary.sustainability.carbonReduction}%</p>
                <p className="text-sm text-slate-500">Carbon Reduction</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">-{kpiSummary.sustainability.energyEfficiency}%</p>
                <p className="text-sm text-slate-500">Energy Efficiency</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">+{kpiSummary.sustainability.wasteReduction}%</p>
                <p className="text-sm text-slate-500">Waste Diversion</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">68%</p>
                <p className="text-sm text-slate-500">Goal Progress</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <Card 
                    key={report.id} 
                    className={`cursor-pointer transition-all work-order-card ${
                      selectedReport === report.id ? 'border-blue-500 bg-blue-500/20' : 'hover:shadow-md'
                    }`}
                    className="card-enhanced"
                    onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge variant={report.status === 'completed' ? 'secondary' : 'default'}>
                            {report.status}
                          </Badge>
                          <h3 className="font-medium text-white">{report.name}</h3>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-blue-300">{report.frequency}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-blue-400">Last Generated</p>
                          <p className="text-sm font-medium text-white">{report.lastGenerated}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-400">File Size</p>
                          <p className="text-sm font-medium text-white">{report.size}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-400">Recipients</p>
                          <p className="text-sm font-medium text-white">{report.recipients.length} groups</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => generateReport(report.id)}>
                          <BarChart3 className="w-3 h-3 mr-1" />
                          Generate
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => downloadReport(report.id)}>
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule
                        </Button>
                      </div>
                      
                      {selectedReport === report.id && (
                        <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                          <h4 className="font-medium mb-2 text-white">Report Recipients</h4>
                          <div className="flex flex-wrap gap-2">
                            {report.recipients.map((recipient, index) => (
                              <Badge key={index} variant="outline">{recipient}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}