'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  MapPin,
  AlertTriangle,
  Gift,
  CreditCard,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function RetailPage() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const revenueData = [
    { name: '6AM', retail: 0, food: 500, parking: 1200, total: 1700 },
    { name: '9AM', retail: 8500, food: 3200, parking: 4800, total: 16500 },
    { name: '12PM', retail: 15200, food: 8900, parking: 6200, total: 30300 },
    { name: '3PM', retail: 22800, food: 12400, parking: 8100, total: 43300 },
    { name: '6PM', retail: 18600, food: 15800, parking: 9400, total: 43800 },
    { name: '9PM', retail: 12400, food: 6200, parking: 7800, total: 26400 },
  ];

  const dwellTimeData = [
    { zone: 'Food Court A', avgDwell: 35, occupancy: 78, conversion: 68 },
    { zone: 'Retail Corridor B', avgDwell: 12, occupancy: 45, conversion: 23 },
    { zone: 'Duty Free', avgDwell: 28, occupancy: 62, conversion: 45 },
    { zone: 'Electronics Store', avgDwell: 18, occupancy: 38, conversion: 31 },
    { zone: 'Fashion Outlets', avgDwell: 25, occupancy: 52, conversion: 28 },
    { zone: 'Bookstore', avgDwell: 22, occupancy: 35, conversion: 41 },
  ];

  const stores = [
    {
      id: 'ST-001',
      name: 'Hudson News Terminal 1',
      category: 'Convenience',
      revenue24h: 8420,
      transactions: 247,
      avgTicket: 34.09,
      occupancy: 65,
      status: 'operational',
      alerts: 0,
      location: 'Terminal 1, Gate Area A'
    },
    {
      id: 'ST-002',
      name: 'Starbucks Coffee',
      category: 'Food & Beverage',
      revenue24h: 12850,
      transactions: 389,
      avgTicket: 33.03,
      occupancy: 88,
      status: 'high_traffic',
      alerts: 1,
      location: 'Terminal 2, Central Court'
    },
    {
      id: 'ST-003',
      name: 'Duty Free Americas',
      category: 'Duty Free',
      revenue24h: 24680,
      transactions: 156,
      avgTicket: 158.21,
      occupancy: 45,
      status: 'operational',
      alerts: 0,
      location: 'International Concourse'
    },
    {
      id: 'ST-004',
      name: 'Quick Service Restaurant',
      category: 'Food & Beverage',
      revenue24h: 9240,
      transactions: 312,
      avgTicket: 29.62,
      occupancy: 72,
      status: 'queue_alert',
      alerts: 2,
      location: 'Terminal 3, Gate Area C'
    },
  ];

  const offers = [
    {
      id: 'OFF-001',
      title: '20% Off Coffee',
      description: 'For passengers with 2+ hour layovers',
      target: 'Long layover passengers',
      redemptions: 47,
      revenue: 1240,
      status: 'active',
      expires: '2024-01-15 23:59'
    },
    {
      id: 'OFF-002',
      title: 'Free WiFi Upgrade',
      description: 'With purchase over $25',
      target: 'High-value customers',
      redemptions: 89,
      revenue: 3580,
      status: 'active',
      expires: '2024-01-20 23:59'
    },
    {
      id: 'OFF-003',
      title: 'Duty Free Bundle',
      description: 'Buy 2 get 1 free on selected items',
      target: 'International travelers',
      redemptions: 23,
      revenue: 4920,
      status: 'expiring',
      expires: '2024-01-16 12:00'
    },
  ];

  const leakageAlerts = [
    {
      id: 'LEAK-001',
      type: 'Food Purchase',
      severity: 'high',
      description: '68% of passengers bypassing food courts in Terminal 2',
      recommendation: 'Deploy targeted offers, improve signage',
      impact: '$12,400 daily opportunity',
      timeDetected: '14:30'
    },
    {
      id: 'LEAK-002',
      type: 'Retail Browsing',
      severity: 'medium',
      description: 'Low conversion rate in electronics section',
      recommendation: 'Staff engagement program, demo stations',
      impact: '$3,800 daily opportunity',
      timeDetected: '13:45'
    },
  ];

  const createDynamicOffer = (targetAudience: string) => {
    const offers = [
      'Free coffee with any meal purchase',
      '15% off retail items over $50',
      'Complimentary WiFi upgrade',
      'Buy one get one 50% off snacks'
    ];
    const randomOffer = offers[Math.floor(Math.random() * offers.length)];
    alert(`AI Dynamic Offer Created:\n\nTarget: ${targetAudience}\nOffer: ${randomOffer}\nExpiry: 2 hours\nDistribution: Push notification + digital displays\n\nExpected uplift: 15-25% revenue increase`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Retail & Revenue Operations</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3" />
            <span>Today: $187,420</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12.4% vs yesterday</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="dwell">Dwell Time Analysis</TabsTrigger>
          <TabsTrigger value="offers">Dynamic Offers</TabsTrigger>
          <TabsTrigger value="leakage">Revenue Leakage</TabsTrigger>
          <TabsTrigger value="stores">Store Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Revenue Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">$187,420</p>
                <p className="text-sm text-slate-500">Total Revenue (24h)</p>
                <p className="text-xs text-green-600">+12.4% vs yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">2,147</p>
                <p className="text-sm text-slate-500">Transactions</p>
                <p className="text-xs text-blue-600">+8.7% vs yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">$87.32</p>
                <p className="text-sm text-slate-500">Avg Ticket Size</p>
                <p className="text-xs text-purple-600">+3.4% vs yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">34.2%</p>
                <p className="text-sm text-slate-500">Conversion Rate</p>
                <p className="text-xs text-orange-600">+2.1% vs yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Category - Today</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Bar dataKey="retail" fill="#3b82f6" name="Retail" />
                  <Bar dataKey="food" fill="#22c55e" name="Food & Beverage" />
                  <Bar dataKey="parking" fill="#f59e0b" name="Parking" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Food & Beverage', value: 89400, fill: '#22c55e' },
                        { name: 'Retail', value: 67200, fill: '#3b82f6' },
                        { name: 'Duty Free', value: 24800, fill: '#8b5cf6' },
                        { name: 'Parking', value: 38700, fill: '#f59e0b' },
                        { name: 'Services', value: 12400, fill: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Stores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stores.slice(0, 4).map((store, index) => (
                    <div key={store.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-bold text-slate-600">#{index + 1}</div>
                        <div>
                          <p className="font-medium text-sm">{store.name}</p>
                          <p className="text-xs text-slate-500">{store.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${store.revenue24h.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">{store.transactions} txns</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dwell" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Passenger Dwell Time & Conversion Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dwellTimeData.map((zone) => (
                  <Card key={zone.zone}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <h3 className="font-medium">{zone.zone}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-600">{zone.avgDwell} min avg dwell</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Occupancy</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={zone.occupancy} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{zone.occupancy}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Conversion Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={zone.conversion} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{zone.conversion}%</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Heatmap
                          </Button>
                          <Button size="sm" onClick={() => createDynamicOffer(`Passengers in ${zone.zone}`)}>
                            Create Offer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Passenger Flow Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">Interactive Passenger Flow Visualization</p>
                  <p className="text-sm">Real-time heatmap showing passenger density and movement patterns</p>
                  <p className="text-sm">Click zones to analyze dwell time and conversion opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Dynamic Offers Management</h3>
            <Button onClick={() => createDynamicOffer('All passengers with 1+ hour layover')}>
              <Gift className="w-4 h-4 mr-2" />
              Create AI Offer
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <Card key={offer.id} className={`work-order-card ${
                offer.status === 'expiring' ? 'border-red-200 bg-red-50' :
                offer.status === 'active' ? 'border-green-200 bg-green-50' :
                'border-gray-200'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${
                      offer.status === 'active' ? 'status-active' : 
                      offer.status === 'expiring' ? 'priority-critical' : 'status-pending'
                    }`}>
                      {offer.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-secondary-readable">{offer.id}</span>
                  </div>
                  
                  <h3 className="font-medium mb-2 text-readable">{offer.title}</h3>
                  <p className="text-sm text-muted-readable mb-3">{offer.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-readable">Target:</span>
                      <span className="font-medium text-readable">{offer.target}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-readable">Redemptions:</span>
                      <span className="font-medium text-readable">{offer.redemptions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-readable">Revenue:</span>
                      <span className="font-medium text-green-600">${offer.revenue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-readable">Expires:</span>
                      <span className="text-xs text-muted-readable">{offer.expires}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 sci-fi-button">
                      Edit Offer
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 sci-fi-button">
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Offer Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={[
                  { time: '08:00', redemptions: 5, revenue: 125 },
                  { time: '10:00', redemptions: 12, revenue: 340 },
                  { time: '12:00', redemptions: 28, revenue: 780 },
                  { time: '14:00', redemptions: 45, revenue: 1250 },
                  { time: '16:00', redemptions: 38, revenue: 1020 },
                  { time: '18:00', redemptions: 31, revenue: 890 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="redemptions" stroke="#3b82f6" strokeWidth={2} name="Redemptions" />
                  <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} name="Revenue ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leakage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>Revenue Leakage Detection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leakageAlerts.map((alert) => (
                  <Card key={alert.id} className="widget-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge variant={alert.severity === 'high' ? 'destructive' : 'default'}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <span className="font-medium text-white">{alert.type} Leakage</span>
                        </div>
                        <span className="text-xs text-blue-300">Detected: {alert.timeDetected}</span>
                      </div>
                      
                      <p className="text-sm text-blue-300 mb-3">{alert.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-blue-400 mb-1">Revenue Impact</p>
                          <p className="font-bold text-red-600">{alert.impact}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-400 mb-1">AI Recommendation</p>
                          <p className="text-sm font-medium text-white">{alert.recommendation}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => createDynamicOffer('Affected passenger segment')}>
                          Deploy AI Solution
                        </Button>
                        <Button size="sm" variant="outline">
                          Notify Operations
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Leakage Prevention Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">$42,300</p>
                    <p className="text-sm text-slate-500">Revenue Recovered (30 days)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Food & Beverage</span>
                      <span className="font-bold text-green-600">$18,900</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Retail Shopping</span>
                      <span className="font-bold text-green-600">$15,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Premium Services</span>
                      <span className="font-bold text-green-600">$8,200</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Leakage Detection Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Detection Accuracy</span>
                    <span className="font-bold text-blue-600">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">False Positive Rate</span>
                    <span className="font-bold text-yellow-600">5.8%</span>
                  </div>
                  <Progress value={5.8} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recovery Success Rate</span>
                    <span className="font-bold text-green-600">78.3%</span>
                  </div>
                  <Progress value={78.3} className="h-2" />
                  
                  <div className="text-center mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">Model continuously learning from passenger behavior</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Performance Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stores.map((store) => (
                  <Card 
                    key={store.id} 
                    className={`cursor-pointer transition-all ${
                      selectedStore === store.id ? 'border-blue-500 bg-blue-500/20' : 'hover:shadow-md'
                    }`}
                    className="card-enhanced"
                    onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            store.status === 'operational' ? 'bg-green-500' :
                            store.status === 'high_traffic' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <div>
                            <h3 className="font-medium text-white">{store.name}</h3>
                            <p className="text-sm text-blue-300">{store.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{store.category}</Badge>
                          {store.alerts > 0 && (
                            <Badge variant="destructive">{store.alerts} alerts</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-blue-400">24h Revenue</p>
                          <p className="font-bold text-green-600">${store.revenue24h.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-400">Transactions</p>
                          <p className="font-medium text-white">{store.transactions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-400">Avg Ticket</p>
                          <p className="font-medium text-white">${store.avgTicket}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-400">Occupancy</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={store.occupancy} className="flex-1 h-1" />
                            <span className="text-xs text-white">{store.occupancy}%</span>
                          </div>
                        </div>
                      </div>
                      
                      {selectedStore === store.id && (
                        <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-medium mb-2 text-white">Performance Metrics</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-blue-300">Conversion Rate:</span>
                                  <span className="font-medium text-white">34.2%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-300">Return Rate:</span>
                                  <span className="font-medium text-white">12.8%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-300">Staff Efficiency:</span>
                                  <span className="font-medium text-white">92%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2 text-white">Recent Alerts</h4>
                              {store.alerts > 0 ? (
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <AlertTriangle className="w-3 h-3 text-red-500" />
                                    <span className="text-sm text-red-600">Long queue detected</span>
                                  </div>
                                  {store.alerts > 1 && (
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-3 h-3 text-yellow-500" />
                                      <span className="text-sm text-yellow-600">Staff break overdue</span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm text-blue-400">No alerts</p>
                              )}
                            </div>
                            
                            <div className="flex flex-col space-y-2">
                              <Button size="sm" className="sci-fi-button">
                                View Analytics
                              </Button>
                              <Button size="sm" variant="outline" className="sci-fi-button">
                                Store Settings
                              </Button>
                              <Button size="sm" variant="outline" className="sci-fi-button">
                                Staff Schedule
                              </Button>
                            </div>
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