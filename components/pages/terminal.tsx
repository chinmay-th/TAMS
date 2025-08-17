'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { KPIDetailModal } from '@/components/shared/kpi-detail-modal';
import { PassengerHeatmap } from '@/components/shared/passenger-heatmap';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Wifi,
  Luggage,
  Shield,
  TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function TerminalPage() {
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [showKPIModal, setShowKPIModal] = useState(false);
  
  const queueData = [
    { name: '14:00', checkpoint_A: 8, checkpoint_B: 12, checkpoint_C: 15, checkpoint_D: 6 },
    { name: '14:15', checkpoint_A: 12, checkpoint_B: 15, checkpoint_C: 18, checkpoint_D: 8 },
    { name: '14:30', checkpoint_A: 15, checkpoint_B: 18, checkpoint_C: 22, checkpoint_D: 10 },
    { name: '14:45', checkpoint_A: 18, checkpoint_B: 22, checkpoint_C: 25, checkpoint_D: 12 },
    { name: '15:00', checkpoint_A: 22, checkpoint_B: 25, checkpoint_C: 28, checkpoint_D: 15 },
    { name: '15:15', checkpoint_A: 20, checkpoint_B: 23, checkpoint_C: 26, checkpoint_D: 14 },
  ];

  const bhsData = [
    { name: 'Sortation', status: 98, bags: 1250 },
    { name: 'Baggage Make-up', status: 95, bags: 890 },
    { name: 'Early Bag Store', status: 92, bags: 340 },
    { name: 'Reclaim', status: 99, bags: 780 },
    { name: 'CBRA', status: 88, bags: 120 },
  ];

  const occupancyData = [
    { zone: 'Gate Areas', occupancy: 78 },
    { zone: 'Food Courts', occupancy: 85 },
    { zone: 'Retail Areas', occupancy: 62 },
    { zone: 'Lounges', occupancy: 45 },
    { zone: 'Restrooms', occupancy: 35 },
  ];

  const checkpoints = [
    { id: 'TSA-A', name: 'Security Checkpoint A', currentWait: 12, predictedWait: 15, throughput: 180, sla: 20, status: 'good' },
    { id: 'TSA-B', name: 'Security Checkpoint B', currentWait: 25, predictedWait: 28, throughput: 165, sla: 20, status: 'warning' },
    { id: 'TSA-C', name: 'Security Checkpoint C', currentWait: 35, predictedWait: 32, throughput: 145, sla: 20, status: 'critical' },
    { id: 'TSA-D', name: 'Security Checkpoint D', currentWait: 8, predictedWait: 10, throughput: 195, sla: 20, status: 'good' },
  ];

  const generateQueuePrediction = (checkpointId: string) => {
    const checkpoint = checkpoints.find(c => c.id === checkpointId);
    if (checkpoint) {
      const prediction = Math.floor(Math.random() * 10) + 5;
      const staffingAdvice = prediction > 15 ? 'Add 2 more lanes' : 'Current staffing adequate';
      alert(`AI Queue Prediction for ${checkpoint.name}:\n\n15-min forecast: ${prediction} minutes\nConfidence: 87%\nRecommendation: ${staffingAdvice}`);
    }
  };

  const handleKPIClick = (kpiData: any) => {
    setSelectedKPI(kpiData);
    setShowKPIModal(true);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Terminal Operations</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Capacity: 78%</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Wifi className="w-3 h-3" />
            <span>WiFi Users: 12,847</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="queues" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queues">Queue Management</TabsTrigger>
          <TabsTrigger value="bhs">Baggage Handling</TabsTrigger>
          <TabsTrigger value="occupancy">Terminal Occupancy</TabsTrigger>
          <TabsTrigger value="operations">Flight Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="queues" className="space-y-6">
          {/* Security Checkpoint Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {checkpoints.map((checkpoint) => (
              <Card 
                key={checkpoint.id} 
                className={`border-l-4 cursor-pointer ${
                checkpoint.status === 'good' ? 'border-l-green-500' : 
                checkpoint.status === 'warning' ? 'border-l-yellow-500' : 'border-l-red-500'
              }`}
                onClick={() => handleKPIClick({
                  id: checkpoint.id,
                  name: `${checkpoint.name} Wait Time`,
                  value: `${checkpoint.currentWait}min`,
                  unit: 'minutes',
                  trend: checkpoint.currentWait > checkpoint.predictedWait ? 'down' : 'up',
                  change: `${checkpoint.currentWait > checkpoint.predictedWait ? '-' : '+'}${Math.abs(checkpoint.currentWait - checkpoint.predictedWait)}min`,
                  status: checkpoint.status === 'good' ? 'good' : checkpoint.status === 'warning' ? 'warning' : 'critical',
                  target: `${checkpoint.sla}min`,
                  description: `Current wait time at ${checkpoint.name} with throughput of ${checkpoint.throughput} passengers per hour`
                })}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{checkpoint.name}</h3>
                    <Badge variant={checkpoint.status === 'good' ? 'secondary' : 
                                  checkpoint.status === 'warning' ? 'default' : 'destructive'}>
                      {checkpoint.currentWait}min
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Current Wait</span>
                      <span>{checkpoint.currentWait} min</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Predicted Wait</span>
                      <span>{checkpoint.predictedWait} min</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Throughput</span>
                      <span>{checkpoint.throughput}/hr</span>
                    </div>
                    <Progress 
                      value={(checkpoint.currentWait / checkpoint.sla) * 100} 
                      className="h-2" 
                    />
                    <Button 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => generateQueuePrediction(checkpoint.id)}
                    >
                      AI Predict Queue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Queue Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Security Checkpoint Queue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={queueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="checkpoint_A" stroke="#22c55e" strokeWidth={2} name="Checkpoint A" />
                  <Line type="monotone" dataKey="checkpoint_B" stroke="#3b82f6" strokeWidth={2} name="Checkpoint B" />
                  <Line type="monotone" dataKey="checkpoint_C" stroke="#ef4444" strokeWidth={2} name="Checkpoint C" />
                  <Line type="monotone" dataKey="checkpoint_D" stroke="#f59e0b" strokeWidth={2} name="Checkpoint D" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bhs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Luggage className="w-5 h-5" />
                  <span>BHS System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bhsData.map((system) => (
                    <div key={system.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-white">{system.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-blue-300">{system.bags} bags/hr</span>
                          <Badge variant={system.status >= 95 ? 'secondary' : system.status >= 90 ? 'default' : 'destructive'}>
                            {system.status}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={system.status} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800">AI Predictive Maintenance: All systems optimal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Baggage Processing Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={bhsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bags" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span>BHS Alerts & Maintenance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Conveyor Belt 7A - Vibration Alert</p>
                      <p className="text-sm text-yellow-600">Predicted maintenance needed in 72 hours</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Schedule Maintenance
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Sortation System - Optimal Performance</p>
                      <p className="text-sm text-green-600">AI RUL Analysis: 95% confidence, 180 days remaining</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Healthy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-6">
          <PassengerHeatmap />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Terminal Zone Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {occupancyData.map((zone) => (
                    <div key={zone.zone} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-white">{zone.zone}</span>
                        <span className="text-sm text-blue-300">{zone.occupancy}%</span>
                      </div>
                      <Progress value={zone.occupancy} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>WiFi & Bluetooth Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">12,847</p>
                      <p className="text-sm text-slate-500">Active WiFi Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">8,932</p>
                      <p className="text-sm text-slate-500">Bluetooth Devices</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Hotspots</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Food Court A</span>
                        <Badge variant="destructive">High Density</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gate B15-B20</span>
                        <Badge variant="default">Medium Density</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Retail Corridor C</span>
                        <Badge variant="secondary">Low Density</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Turnaround Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Turnaround</span>
                    <span className="font-bold">45 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-Time Performance</span>
                    <span className="font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bags On-Time</span>
                    <span className="font-bold text-blue-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gate Utilization</span>
                    <span className="font-bold">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CUPPS/CUTE Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Workstations</span>
                    <Badge variant="secondary">127/135</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Health</span>
                    <Badge variant="secondary">99.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Check-in Counters</span>
                    <Badge variant="secondary">45/52</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gate Positions</span>
                    <Badge variant="secondary">82/88</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Flight Information Display</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Displays</span>
                    <Badge variant="secondary">156/160</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Content Updates</span>
                    <Badge variant="secondary">Real-time</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Status</span>
                    <Badge variant="secondary">Operational</Badge>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded">
                    <p className="text-xs text-blue-800">Last update: 2 seconds ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedKPI && (
        <KPIDetailModal 
          isOpen={showKPIModal} 
          onClose={() => setShowKPIModal(false)} 
          kpi={selectedKPI} 
        />
      )}
    </div>
  );
}