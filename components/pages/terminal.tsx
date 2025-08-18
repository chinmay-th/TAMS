'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { KPIDetailModal } from '@/components/shared/kpi-detail-modal';
import { PassengerHeatmap } from '@/components/shared/passenger-heatmap';
import { ActionConfirmationModal } from '@/components/shared/action-confirmation-modal';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Wifi,
  Luggage,
  Shield,
  TrendingUp,
  ArrowRight,
  Plane,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function TerminalPage() {
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [showKPIModal, setShowKPIModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);
  
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
      setPendingAction({
        title: `AI Queue Prediction - ${checkpoint.name}`,
        type: 'forecast',
        description: 'Predictive queue analysis and optimization',
        details: [
          `15-minute forecast: ${prediction} minutes`,
          `Recommendation: ${staffingAdvice}`,
          'Real-time passenger flow analysis',
          'Staffing optimization suggestions'
        ],
        confidence: 87,
        eta: '15 minutes'
      });
      setShowActionModal(true);
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
          {/* AI-Driven Turnaround Performance Intelligence */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Plane className="w-5 h-5 text-blue-400" />
                <span>AI Turnaround Performance Intelligence</span>
                <Badge variant="outline" className="sci-fi-badge">
                  ML-Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="widget-card p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">Predictive Turnaround Analytics</h4>
                      <Badge className="sci-fi-badge">Live AI</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Current Average</span>
                        <span className="font-bold text-white">45 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">AI Predicted (Next 4h)</span>
                        <span className="font-bold text-cyan-400">42 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Optimal Achievable</span>
                        <span className="font-bold text-green-400">38 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Efficiency Score</span>
                        <span className="font-bold text-purple-400">87.3%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="widget-card p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-3">Critical Path Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-red-500/20 border border-red-500/30 rounded">
                        <span className="text-red-300">Baggage Loading</span>
                        <Badge variant="destructive">Bottleneck</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-yellow-500/20 border border-yellow-500/30 rounded">
                        <span className="text-yellow-300">Fuel Service</span>
                        <Badge variant="default">Optimizable</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-500/20 border border-green-500/30 rounded">
                        <span className="text-green-300">Passenger Boarding</span>
                        <Badge variant="secondary">Optimal</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="widget-card p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-3">AI Optimization Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-300 font-medium">Parallel Service Optimization</span>
                          <Badge className="sci-fi-badge">High Impact</Badge>
                        </div>
                        <p className="text-sm text-blue-400 mb-2">Coordinate fuel and catering services simultaneously</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-blue-300">Potential savings:</span>
                          <span className="text-green-400 font-bold">-8 minutes</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-2 sci-fi-button"
                          onClick={() => {
                            setPendingAction({
                              title: 'Optimize Parallel Services',
                              type: 'optimization',
                              description: 'AI-coordinated parallel turnaround services',
                              details: [
                                'Synchronize fuel and catering schedules',
                                'Optimize ground crew allocation',
                                'Reduce aircraft ground time by 8 minutes',
                                'Improve gate utilization efficiency'
                              ],
                              confidence: 92,
                              eta: '30 minutes'
                            });
                            setShowActionModal(true);
                          }}
                        >
                          Implement Optimization
                        </Button>
                      </div>
                      
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-purple-300 font-medium">Predictive Crew Scheduling</span>
                          <Badge className="sci-fi-badge">Medium Impact</Badge>
                        </div>
                        <p className="text-sm text-purple-400 mb-2">AI-predicted crew requirements for peak efficiency</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-purple-300">Efficiency gain:</span>
                          <span className="text-green-400 font-bold">+12%</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-2 sci-fi-button"
                          onClick={() => {
                            setPendingAction({
                              title: 'Deploy Predictive Crew Scheduling',
                              type: 'workflow',
                              description: 'AI-optimized crew allocation system',
                              details: [
                                'Machine learning crew demand prediction',
                                'Dynamic shift optimization',
                                'Real-time crew reallocation',
                                'Performance tracking integration'
                              ],
                              confidence: 88,
                              eta: '45 minutes'
                            });
                            setShowActionModal(true);
                          }}
                        >
                          Deploy AI Scheduling
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI-Enhanced CUPPS/CUTE Intelligence */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>CUPPS/CUTE AI Operations Intelligence</span>
                <Badge variant="outline" className="sci-fi-badge">
                  Neural Network
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">System Health Analytics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Active Workstations</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">127/135</span>
                        <Badge variant="secondary">94.1%</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">AI Health Score</span>
                      <span className="font-bold text-green-400">99.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Predicted Failures</span>
                      <span className="font-bold text-yellow-400">2 in 72h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Performance Trend</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold">+2.3%</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-3 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'AI System Health Optimization',
                        type: 'optimization',
                        description: 'Proactive system maintenance and optimization',
                        details: [
                          'Predictive maintenance scheduling',
                          'Performance bottleneck identification',
                          'Resource allocation optimization',
                          'Failure prevention protocols'
                        ],
                        confidence: 94,
                        eta: '20 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Optimize System Health
                  </Button>
                </div>
                
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Check-in Intelligence</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Active Counters</span>
                      <span className="text-white font-bold">45/52</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">AI Queue Prediction</span>
                      <span className="text-cyan-400 font-bold">8.2 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Passenger Flow Rate</span>
                      <span className="text-white font-bold">247 pax/hr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Efficiency Score</span>
                      <span className="text-green-400 font-bold">91.8%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-yellow-300">Peak hour approaching - deploy 3 more counters</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-2 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'Deploy Additional Check-in Counters',
                        type: 'workflow',
                        priority: 'medium',
                        description: 'AI-predicted counter deployment for peak efficiency',
                        details: [
                          'Open 3 additional check-in counters',
                          'Redeploy staff from low-traffic areas',
                          'Update passenger flow signage',
                          'Monitor queue reduction in real-time'
                        ],
                        assignee: 'Terminal Operations Manager',
                        eta: '15 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Deploy Counters
                  </Button>
                </div>
                
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Gate Position Analytics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Occupied Gates</span>
                      <span className="text-white font-bold">82/88</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Utilization Rate</span>
                      <span className="text-white font-bold">93.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">AI Conflict Detection</span>
                      <span className="text-green-400 font-bold">0 conflicts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Next Available</span>
                      <span className="text-cyan-400 font-bold">Gate C12 (18 min)</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-blue-500/20 border border-blue-500/30 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-blue-300">AI gate assignment optimization active</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-2 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'Optimize Gate Assignments',
                        type: 'optimization',
                        description: 'AI-driven gate allocation optimization',
                        details: [
                          'Machine learning gate assignment',
                          'Minimize passenger walking distances',
                          'Optimize turnaround times',
                          'Reduce gate conflicts by 95%'
                        ],
                        confidence: 96,
                        eta: '10 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Optimize Assignments
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Turnaround Bottleneck Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-red-500/20 border border-red-500/30 rounded">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-red-300">Baggage Loading Delay</span>
                      </div>
                      <span className="text-red-400 font-bold">+12 min</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-500/20 border border-yellow-500/30 rounded">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-300">Fuel Service Queue</span>
                      </div>
                      <span className="text-yellow-400 font-bold">+5 min</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-500/20 border border-green-500/30 rounded">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-300">Cleaning Service</span>
                      </div>
                      <span className="text-green-400 font-bold">On time</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-3 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'Resolve Turnaround Bottlenecks',
                        type: 'workflow',
                        priority: 'high',
                        description: 'AI-identified bottleneck resolution',
                        details: [
                          'Deploy additional baggage loading crew',
                          'Optimize fuel service scheduling',
                          'Implement parallel service protocols',
                          'Real-time performance monitoring'
                        ],
                        assignee: 'Ground Operations Manager',
                        eta: '25 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Resolve Bottlenecks
                  </Button>
                </div>
                
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Performance Forecasting</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Next Hour Forecast</span>
                      <span className="text-cyan-400 font-bold">43 min avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Peak Hour Impact</span>
                      <span className="text-yellow-400 font-bold">+8 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Weather Adjustment</span>
                      <span className="text-green-400 font-bold">-2 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Confidence Level</span>
                      <span className="text-purple-400 font-bold">94.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI-Enhanced Flight Information Display System */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Users className="w-5 h-5 text-purple-400" />
                <span>AI Flight Information Display Intelligence</span>
                <Badge variant="outline" className="sci-fi-badge">
                  Smart Content
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="widget-card p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">Smart Display Management</h4>
                      <Badge className="sci-fi-badge">AI-Driven</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Active Displays</span>
                        <span className="text-white font-bold">156/160</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">AI Content Optimization</span>
                        <span className="text-green-400 font-bold">Real-time</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Passenger Engagement</span>
                        <span className="text-cyan-400 font-bold">87.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Content Relevance Score</span>
                        <span className="text-purple-400 font-bold">94.1%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="widget-card p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-3">Predictive Content Analytics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-blue-500/20 border border-blue-500/30 rounded">
                        <span className="text-blue-300">Gate Change Predictions</span>
                        <Badge className="sci-fi-badge">3 predicted</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-500/20 border border-green-500/30 rounded">
                        <span className="text-green-300">Delay Notifications</span>
                        <Badge variant="secondary">Auto-generated</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-500/20 border border-purple-500/30 rounded">
                        <span className="text-purple-300">Passenger Guidance</span>
                        <Badge className="sci-fi-badge">Personalized</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="widget-card p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-3">AI Content Intelligence</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-300 font-medium">Dynamic Wayfinding</span>
                          <Badge className="sci-fi-badge">Active</Badge>
                        </div>
                        <p className="text-sm text-green-400 mb-2">AI-powered route optimization based on real-time congestion</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-green-300">Passenger satisfaction:</span>
                          <span className="text-green-400 font-bold">+18%</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-2 sci-fi-button"
                          onClick={() => {
                            setPendingAction({
                              title: 'Enhance Dynamic Wayfinding',
                              type: 'optimization',
                              description: 'Advanced AI wayfinding system deployment',
                              details: [
                                'Real-time congestion analysis',
                                'Personalized route recommendations',
                                'Multi-language support enhancement',
                                'Accessibility optimization'
                              ],
                              confidence: 91,
                              eta: '35 minutes'
                            });
                            setShowActionModal(true);
                          }}
                        >
                          Enhance Wayfinding
                        </Button>
                      </div>
                      
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-300 font-medium">Predictive Messaging</span>
                          <Badge className="sci-fi-badge">Learning</Badge>
                        </div>
                        <p className="text-sm text-blue-400 mb-2">ML-driven proactive passenger notifications</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-blue-300">Accuracy rate:</span>
                          <span className="text-blue-400 font-bold">96.2%</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-2 sci-fi-button"
                          onClick={() => {
                            setPendingAction({
                              title: 'Deploy Predictive Messaging',
                              type: 'control',
                              description: 'AI-powered proactive passenger communication',
                              details: [
                                'Predictive delay notifications',
                                'Proactive gate change alerts',
                                'Personalized service recommendations',
                                'Multi-channel message distribution'
                              ],
                              confidence: 89,
                              eta: '20 minutes'
                            });
                            setShowActionModal(true);
                          }}
                        >
                          Deploy Messaging
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 widget-card p-4 rounded-lg">
                <h4 className="font-medium text-white mb-3">Display Network Intelligence</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">156</p>
                    <p className="text-xs text-blue-300">Active Displays</p>
                    <p className="text-xs text-green-400">97.5% uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">2.1s</p>
                    <p className="text-xs text-blue-300">Update Latency</p>
                    <p className="text-xs text-green-400">Real-time sync</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">94.1%</p>
                    <p className="text-xs text-blue-300">Content Relevance</p>
                    <p className="text-xs text-purple-400">AI-optimized</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyan-400">12,847</p>
                    <p className="text-xs text-blue-300">Daily Interactions</p>
                    <p className="text-xs text-cyan-400">Touch & mobile</p>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-4">
                  <Button 
                    className="flex-1 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'AI Content Optimization',
                        type: 'optimization',
                        description: 'Machine learning content personalization',
                        details: [
                          'Passenger behavior analysis',
                          'Dynamic content prioritization',
                          'Multi-language optimization',
                          'Accessibility enhancement'
                        ],
                        confidence: 93,
                        eta: '15 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Optimize Content
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'Deploy Predictive Maintenance',
                        type: 'maintenance',
                        description: 'AI-driven display system maintenance',
                        details: [
                          'Predictive failure analysis',
                          'Proactive component replacement',
                          'Performance optimization',
                          'Zero-downtime maintenance'
                        ],
                        confidence: 87,
                        eta: '45 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Predictive Maintenance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Passenger Experience Optimization */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>AI Passenger Experience Optimization</span>
                <Badge variant="outline" className="sci-fi-badge">
                  Deep Learning
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Journey Analytics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Avg Journey Time</span>
                      <span className="text-white font-bold">47 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Satisfaction Score</span>
                      <span className="text-green-400 font-bold">4.2/5.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Pain Point Detection</span>
                      <span className="text-yellow-400 font-bold">3 identified</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">AI Recommendations</span>
                      <span className="text-purple-400 font-bold">7 active</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-3 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'Optimize Passenger Journey',
                        type: 'optimization',
                        description: 'AI-driven passenger experience enhancement',
                        details: [
                          'Journey mapping optimization',
                          'Pain point resolution',
                          'Service touchpoint enhancement',
                          'Real-time satisfaction monitoring'
                        ],
                        confidence: 91,
                        eta: '40 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Optimize Journey
                  </Button>
                </div>
                
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Behavioral Intelligence</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Dwell Time Prediction</span>
                      <span className="text-cyan-400 font-bold">28.4 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Service Utilization</span>
                      <span className="text-white font-bold">73.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Flow Optimization</span>
                      <span className="text-green-400 font-bold">+15% efficiency</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Congestion Prediction</span>
                      <span className="text-purple-400 font-bold">Gate B15 (20 min)</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-yellow-300">Congestion predicted at Gate B15 in 20 minutes</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-2 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'Deploy Congestion Mitigation',
                        type: 'workflow',
                        priority: 'medium',
                        description: 'AI-predicted congestion prevention',
                        details: [
                          'Redirect passenger flow to alternate routes',
                          'Deploy additional staff to Gate B15',
                          'Update dynamic signage and announcements',
                          'Monitor congestion reduction in real-time'
                        ],
                        assignee: 'Terminal Operations Team',
                        eta: '15 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Prevent Congestion
                  </Button>
                </div>
                
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Intelligent Messaging</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Messages Sent (24h)</span>
                      <span className="text-white font-bold">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">AI Personalization</span>
                      <span className="text-green-400 font-bold">89.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Language Detection</span>
                      <span className="text-cyan-400 font-bold">12 languages</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Response Rate</span>
                      <span className="text-purple-400 font-bold">76.8%</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-3 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'Enhance AI Messaging System',
                        type: 'optimization',
                        description: 'Advanced passenger communication intelligence',
                        details: [
                          'Natural language processing enhancement',
                          'Sentiment analysis integration',
                          'Proactive service recommendations',
                          'Multi-modal communication optimization'
                        ],
                        confidence: 88,
                        eta: '30 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Enhance Messaging
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Real-time Display Analytics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-500/20 border border-green-500/30 rounded">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-300">Content Sync Status</span>
                      </div>
                      <span className="text-green-400 font-bold">100%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-500/20 border border-blue-500/30 rounded">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-300">Update Frequency</span>
                      </div>
                      <span className="text-blue-400 font-bold">2.1 sec</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-500/20 border border-purple-500/30 rounded">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300">Passenger Interactions</span>
                      </div>
                      <span className="text-purple-400 font-bold">12,847</span>
                    </div>
                  </div>
                </div>
                
                <div className="widget-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">AI Performance Insights</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Content Effectiveness</span>
                      <span className="text-green-400 font-bold">94.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Passenger Engagement</span>
                      <span className="text-cyan-400 font-bold">87.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">System Learning Rate</span>
                      <span className="text-purple-400 font-bold">+2.4% daily</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Prediction Accuracy</span>
                      <span className="text-white font-bold">96.2%</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-3 sci-fi-button"
                    onClick={() => {
                      setPendingAction({
                        title: 'Advanced AI Analytics Deployment',
                        type: 'optimization',
                        description: 'Next-generation display intelligence system',
                        details: [
                          'Deep learning passenger behavior analysis',
                          'Predictive content optimization',
                          'Real-time performance enhancement',
                          'Advanced personalization algorithms'
                        ],
                        confidence: 95,
                        eta: '50 minutes'
                      });
                      setShowActionModal(true);
                    }}
                  >
                    Deploy Advanced AI
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedKPI && (
        <KPIDetailModal 
          isOpen={showKPIModal} 
          onClose={() => setShowKPIModal(false)} 
          kpi={selectedKPI} 
        />
      )}
      
      {pendingAction && (
        <ActionConfirmationModal
          isOpen={showActionModal}
          onClose={() => setShowActionModal(false)}
          onConfirm={() => {
            console.log('Action executed:', pendingAction);
          }}
          action={pendingAction}
        />
      )}
    </div>
  );
}