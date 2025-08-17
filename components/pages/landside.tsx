'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Car, 
  Bus, 
  Train, 
  Clock, 
  AlertCircle,
  MapPin,
  TrendingUp,
  Users,
  Camera
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function LandsidePage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const parkingData = [
    { name: '8AM', p1: 85, p2: 92, p3: 78, p4: 65, hourly: 45 },
    { name: '10AM', p1: 92, p2: 95, p3: 88, p4: 82, hourly: 62 },
    { name: '12PM', p1: 95, p2: 98, p3: 94, p4: 88, hourly: 78 },
    { name: '2PM', p1: 98, p2: 99, p3: 96, p4: 92, hourly: 85 },
    { name: '4PM', p1: 99, p2: 100, p3: 98, p4: 95, hourly: 92 },
    { name: '6PM', p1: 96, p2: 98, p3: 94, p4: 90, hourly: 88 },
  ];

  const kerbData = [
    { zone: 'Departures Drop-off', occupancy: 78, dwellTime: 4.2, vehicles: 45 },
    { zone: 'Arrivals Pick-up', occupancy: 92, dwellTime: 6.8, vehicles: 62 },
    { zone: 'Premium Drop-off', occupancy: 45, dwellTime: 2.8, vehicles: 18 },
    { zone: 'Taxi Queue', occupancy: 85, dwellTime: 8.5, vehicles: 34 },
    { zone: 'Ride Share', occupancy: 88, dwellTime: 3.2, vehicles: 52 },
  ];

  const transportData = [
    { mode: 'Taxi', available: 45, waiting: 12, avgWait: 6 },
    { mode: 'Uber', available: 32, waiting: 8, avgWait: 4 },
    { mode: 'Lyft', available: 28, waiting: 5, avgWait: 3 },
    { mode: 'Bus Route 1', available: 2, waiting: 15, avgWait: 8 },
    { mode: 'Blue Line', available: 4, waiting: 22, avgWait: 12 },
  ];

  const parkingStructures = [
    { id: 'P1', name: 'Terminal 1 Parking', capacity: 3200, occupied: 3104, rate: 97, revenue: 24500, alerts: 2 },
    { id: 'P2', name: 'Terminal 2 Parking', capacity: 2800, occupied: 2716, rate: 97, revenue: 22100, alerts: 0 },
    { id: 'P3', name: 'Terminal 3 Parking', capacity: 3500, occupied: 3290, rate: 94, revenue: 26800, alerts: 1 },
    { id: 'P4', name: 'Economy Parking', capacity: 5000, occupied: 4250, rate: 85, revenue: 18900, alerts: 0 },
    { id: 'H1', name: 'Hourly Parking', capacity: 1200, occupied: 1068, rate: 89, revenue: 15600, alerts: 3 },
  ];

  const generateKerbForecast = (zone: string) => {
    const forecast = Math.floor(Math.random() * 20) + 70;
    const recommendation = forecast > 90 ? 'Deploy additional staff' : 'Current operations adequate';
    alert(`AI Kerb Forecast for ${zone}:\n\nPredicted occupancy (next hour): ${forecast}%\nConfidence: 91%\nRecommendation: ${recommendation}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Landside Operations</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Car className="w-3 h-3" />
            <span>Total Parking: 92%</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Kerb Activity: High</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="parking" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="parking">Parking Management</TabsTrigger>
          <TabsTrigger value="kerb">Kerb Operations</TabsTrigger>
          <TabsTrigger value="transport">Ground Transport</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="parking" className="space-y-6">
          {/* Parking Structure Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {parkingStructures.map((structure) => (
              <Card key={structure.id} className={`${structure.rate > 95 ? 'border-red-200' : structure.rate > 90 ? 'border-yellow-200' : 'border-green-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{structure.name}</h3>
                    <Badge variant={structure.rate > 95 ? 'destructive' : structure.rate > 90 ? 'default' : 'secondary'}>
                      {structure.rate}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Occupied</span>
                      <span>{structure.occupied}/{structure.capacity}</span>
                    </div>
                    <Progress value={structure.rate} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span>Revenue (24h)</span>
                      <span>${structure.revenue.toLocaleString()}</span>
                    </div>
                    {structure.alerts > 0 && (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-red-600">{structure.alerts} alerts</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Parking Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Parking Utilization Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={parkingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="p1" stroke="#ef4444" strokeWidth={2} name="Terminal 1" />
                  <Line type="monotone" dataKey="p2" stroke="#f59e0b" strokeWidth={2} name="Terminal 2" />
                  <Line type="monotone" dataKey="p3" stroke="#3b82f6" strokeWidth={2} name="Terminal 3" />
                  <Line type="monotone" dataKey="p4" stroke="#22c55e" strokeWidth={2} name="Economy" />
                  <Line type="monotone" dataKey="hourly" stroke="#8b5cf6" strokeWidth={2} name="Hourly" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>License Plate Recognition (LPR)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">12,847</p>
                      <p className="text-sm text-slate-500">Vehicles Tracked</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">4.2min</p>
                      <p className="text-sm text-slate-500">Avg Search Time</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 event-card rounded-lg">
                      <span className="text-sm text-white">P1 Entry Gate 1</span>
                      <Badge className="sci-fi-badge">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 event-card rounded-lg">
                      <span className="text-sm text-white">P3 Exit Gate 2</span>
                      <Badge variant="destructive">Fault</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 event-card rounded-lg">
                      <span className="text-sm text-white">Economy Entry</span>
                      <Badge className="sci-fi-badge">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Parking Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">Dynamic Pricing Active</p>
                      <p className="text-sm text-blue-700">Premium zones: +25% rate</p>
                    </div>
                    <Badge variant="default">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">AI Space Prediction</p>
                      <p className="text-sm text-green-700">Next available: P2 Level 3</p>
                    </div>
                    <Badge variant="secondary">6 min</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-900">Parking Guidance</p>
                      <p className="text-sm text-yellow-700">467 spaces available</p>
                    </div>
                    <Badge variant="default">Updated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kerb" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kerb Side Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kerbData.map((zone) => (
                  <div key={zone.zone} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 card-enhanced rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-white">{zone.zone}</span>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">{zone.occupancy}%</p>
                      <p className="text-xs text-blue-300">Occupancy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">{zone.dwellTime}min</p>
                      <p className="text-xs text-blue-300">Avg Dwell</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">{zone.vehicles}</p>
                      <p className="text-xs text-blue-300">Vehicles</p>
                    </div>
                    <div>
                      <Button 
                        size="sm" 
                        className="w-full sci-fi-button"
                        onClick={() => generateKerbForecast(zone.zone)}
                      >
                        AI Forecast
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kerb Activity Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 rounded-lg p-6 min-h-[300px]">
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 600 300" className="w-full h-full">
                    {/* Terminal Building */}
                    <rect x="100" y="50" width="400" height="60" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
                    <text x="300" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Terminal Building</text>
                    
                    {/* Kerb Zones */}
                    <rect x="100" y="120" width="80" height="40" fill="#ef4444" opacity="0.7" />
                    <text x="140" y="145" textAnchor="middle" fill="white" fontSize="10">Drop-off</text>
                    
                    <rect x="200" y="120" width="80" height="40" fill="#f59e0b" opacity="0.7" />
                    <text x="240" y="145" textAnchor="middle" fill="white" fontSize="10">Premium</text>
                    
                    <rect x="300" y="120" width="80" height="40" fill="#22c55e" opacity="0.7" />
                    <text x="340" y="145" textAnchor="middle" fill="white" fontSize="10">Pick-up</text>
                    
                    <rect x="400" y="120" width="100" height="40" fill="#ef4444" opacity="0.8" />
                    <text x="450" y="145" textAnchor="middle" fill="white" fontSize="10">Taxi Queue</text>
                    
                    {/* Activity Indicators */}
                    <circle cx="140" cy="180" r="15" fill="#ef4444" opacity="0.8">
                      <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="140" y="200" textAnchor="middle" fontSize="12" fill="#ef4444">High</text>
                    
                    <circle cx="300" cy="180" r="12" fill="#f59e0b" opacity="0.8">
                      <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="200" textAnchor="middle" fontSize="12" fill="#f59e0b">Medium</text>
                    
                    <circle cx="450" cy="180" r="18" fill="#ef4444" opacity="0.9">
                      <animate attributeName="r" values="12;24;12" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="450" y="200" textAnchor="middle" fontSize="12" fill="#ef4444">Critical</text>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transport" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {transportData.map((transport) => (
              <Card key={transport.mode}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {transport.mode.includes('Bus') ? <Bus className="w-4 h-4" /> :
                     transport.mode.includes('Line') ? <Train className="w-4 h-4" /> :
                     <Car className="w-4 h-4" />}
                    <span className="font-medium text-sm">{transport.mode}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Available</span>
                      <span>{transport.available}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Waiting</span>
                      <span>{transport.waiting}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Avg Wait</span>
                      <span>{transport.avgWait} min</span>
                    </div>
                    <Progress 
                      value={(transport.waiting / (transport.waiting + transport.available)) * 100} 
                      className="h-1" 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ground Transport Queue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={transportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mode" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="waiting" fill="#ef4444" name="Waiting" />
                    <Bar dataKey="available" fill="#22c55e" name="Available" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ground Transport Dispatch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 widget-card rounded-lg">
                    <div>
                      <p className="font-medium text-white">Taxi Queue Overflow</p>
                      <p className="text-sm text-red-400">45+ taxis waiting, avg wait 8+ minutes</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Dispatch More
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 widget-card rounded-lg">
                    <div>
                      <p className="font-medium text-white">Bus Route 1 Delay</p>
                      <p className="text-sm text-yellow-400">Next arrival delayed by 5 minutes</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Update Display
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 widget-card rounded-lg">
                    <div>
                      <p className="font-medium text-white">Ride Share Optimal</p>
                      <p className="text-sm text-green-400">All pickup zones operating normally</p>
                    </div>
                    <Badge variant="secondary">Good</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Control Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  <div className="flex items-center justify-between p-3 access-card rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-white">Authorized Access - Terminal 1</p>
                        <p className="text-xs text-blue-300">14:35 - Employee Badge</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 access-card rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-white">Access Denied - Restricted Area</p>
                        <p className="text-xs text-blue-300">14:33 - Expired Badge</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 access-card rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-white">Visitor Access - Main Lobby</p>
                        <p className="text-xs text-blue-300">14:30 - Escort Required</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Gate A1 Entry - Authorized</p>
                        <p className="text-xs text-slate-500">14:32 - Badge ID: EMP001234</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">P3 Vehicle Gate - Access Denied</p>
                        <p className="text-xs text-slate-500">14:28 - Expired permit</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Staff Parking - Entry</p>
                        <p className="text-xs text-slate-500">14:25 - Employee vehicle detected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-green-600">1,247</p>
                    <p className="text-sm text-slate-500">Authorized Today</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">23</p>
                    <p className="text-sm text-slate-500">Access Denied</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Employee Access</span>
                    <Badge variant="secondary">98.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Visitor Access</span>
                    <Badge variant="secondary">94.1%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vehicle Gates</span>
                    <Badge variant="secondary">99.1%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Uptime</span>
                    <Badge variant="secondary">99.8%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}