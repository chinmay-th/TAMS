'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Wrench, 
  Zap, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  TrendingUp,
  Settings,
  FileText,
  Users
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

export function MaintenancePage() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const energyData = [
    { name: '6AM', consumption: 12500, hvac: 6200, lighting: 3200, other: 3100, temperature: 22 },
    { name: '9AM', consumption: 18900, hvac: 9800, lighting: 4800, other: 4300, temperature: 23 },
    { name: '12PM', consumption: 22400, hvac: 12100, lighting: 5200, other: 5100, temperature: 24 },
    { name: '3PM', consumption: 24800, hvac: 13500, lighting: 5800, other: 5500, temperature: 25 },
    { name: '6PM', consumption: 21200, hvac: 11200, lighting: 5100, other: 4900, temperature: 24 },
    { name: '9PM', consumption: 16800, hvac: 8400, lighting: 4200, other: 4200, temperature: 23 },
  ];

  const workOrders = [
    {
      id: 'WO-2024-001',
      asset: 'Chiller Unit 3',
      priority: 'critical',
      status: 'in_progress',
      description: 'Abnormal vibration detected - bearing replacement required',
      assignee: 'Mike Chen',
      created: '2024-01-15 14:30',
      eta: '2024-01-15 18:00',
      parts: ['Bearing Assembly', 'Gasket Kit'],
      location: 'Mechanical Room B'
    },
    {
      id: 'WO-2024-002',
      asset: 'Baggage Conveyor 7A',
      priority: 'high',
      status: 'scheduled',
      description: 'Predictive maintenance - belt tension adjustment needed',
      assignee: 'Sarah Rodriguez',
      created: '2024-01-15 09:15',
      eta: '2024-01-16 08:00',
      parts: ['Drive Belt', 'Tension Pulley'],
      location: 'BHS Level 1'
    },
    {
      id: 'WO-2024-003',
      asset: 'LED Panel Bank A12',
      priority: 'medium',
      status: 'pending',
      description: 'Multiple LED failures in gate area display',
      assignee: 'David Kim',
      created: '2024-01-15 11:20',
      eta: '2024-01-16 14:00',
      parts: ['LED Module Set', 'Control Board'],
      location: 'Terminal 1, Gate A12'
    },
    {
      id: 'WO-2024-004',
      asset: 'Fire Suppression Pump 2',
      priority: 'low',
      status: 'completed',
      description: 'Routine inspection and testing completed successfully',
      assignee: 'Lisa Thompson',
      created: '2024-01-14 16:00',
      eta: '2024-01-15 10:00',
      parts: [],
      location: 'Fire Pump Room'
    },
  ];

  const assets = [
    {
      id: 'CHIL-001',
      name: 'Chiller Unit 1',
      type: 'HVAC',
      status: 'operational',
      health: 95,
      efficiency: 4.2,
      runtime: '8760h',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      alerts: 0,
      location: 'Mechanical Room A',
      specifications: { capacity: '500 Tons', refrigerant: 'R-134a', power: '320kW' }
    },
    {
      id: 'CHIL-003',
      name: 'Chiller Unit 3',
      type: 'HVAC',
      status: 'maintenance',
      health: 78,
      efficiency: 3.8,
      runtime: '12450h',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
      alerts: 2,
      location: 'Mechanical Room B',
      specifications: { capacity: '750 Tons', refrigerant: 'R-134a', power: '480kW' }
    },
    {
      id: 'UPS-001',
      name: 'UPS System A',
      type: 'Power',
      status: 'operational',
      health: 88,
      efficiency: 96.2,
      runtime: '6280h',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-07-05',
      alerts: 0,
      location: 'Electrical Room 1',
      specifications: { capacity: '500kVA', backup: '30min', batteries: '40x 12V' }
    },
    {
      id: 'CONV-007A',
      name: 'Baggage Conveyor 7A',
      type: 'BHS',
      status: 'alert',
      health: 82,
      efficiency: 89.5,
      runtime: '15600h',
      lastMaintenance: '2023-12-20',
      nextMaintenance: '2024-01-20',
      alerts: 1,
      location: 'BHS Level 1',
      specifications: { length: '120m', speed: '0.5m/s', capacity: '3000bags/hr' }
    },
  ];

  const bmsAlerts = [
    {
      id: 'BMS-001',
      type: 'Temperature',
      severity: 'warning',
      message: 'Terminal 2 Zone 3 - Temperature above setpoint (26°C)',
      timestamp: '14:32',
      equipment: 'AHU-T2-03',
      action: 'Adjusting damper position'
    },
    {
      id: 'BMS-002',
      type: 'Power',
      severity: 'critical',
      message: 'Main electrical panel - Load imbalance detected',
      timestamp: '14:28',
      equipment: 'MDP-001',
      action: 'Engineering team notified'
    },
    {
      id: 'BMS-003',
      type: 'Equipment',
      severity: 'info',
      message: 'Chiller 2 - Optimal performance achieved after tuning',
      timestamp: '14:15',
      equipment: 'CHIL-002',
      action: 'No action required'
    },
  ];

  const createWorkOrder = (assetId: string, description: string) => {
    alert(`Work Order Created:\n\nAsset: ${assetId}\nDescription: ${description}\nPriority: Auto-assigned based on AI analysis\nEstimated completion: 4-6 hours\n\nTechnician will be notified automatically.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Maintenance & Engineering</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="destructive" className="flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3" />
            <span>2 Critical</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Energy: 22.4MW</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="workorders" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="workorders">Work Orders</TabsTrigger>
          <TabsTrigger value="bms">Building Management</TabsTrigger>
          <TabsTrigger value="energy">Energy Management</TabsTrigger>
          <TabsTrigger value="assets">Asset Registry</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="workorders" className="space-y-6">
          {/* Work Order Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-red-200">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">2</p>
                <p className="text-sm text-slate-500">Critical</p>
              </CardContent>
            </Card>
            <Card className="border-yellow-200">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">5</p>
                <p className="text-sm text-slate-500">High Priority</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="p-4 text-center">
                <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-slate-500">In Progress</p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">48</p>
                <p className="text-sm text-slate-500">Completed (24h)</p>
              </CardContent>
            </Card>
          </div>

          {/* Work Orders List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Active Work Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrders.map((wo) => (
                  <Card key={wo.id} className={`work-order-card ${
                    wo.priority === 'critical' ? 'border-red-200 bg-red-50' :
                    wo.priority === 'high' ? 'border-yellow-200 bg-yellow-50' :
                    wo.priority === 'medium' ? 'border-blue-200 bg-blue-50' :
                    'border-green-200 bg-green-50'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge className={`${
                            wo.priority === 'critical' ? 'priority-critical' : 
                            wo.priority === 'high' ? 'priority-high' : 
                            wo.priority === 'medium' ? 'priority-medium' : 'priority-low'
                          }`}>
                            {wo.priority.toUpperCase()}
                          </Badge>
                          <span className="font-medium text-readable">{wo.id}</span>
                          <Badge className={`${
                            wo.status === 'in_progress' ? 'status-active' :
                            wo.status === 'completed' ? 'status-completed' :
                            wo.status === 'scheduled' ? 'status-scheduled' :
                            'status-pending'
                          }`}>
                            {wo.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-muted-readable">{wo.assignee}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-1 text-readable">{wo.asset}</h4>
                          <p className="text-sm text-muted-readable">{wo.description}</p>
                          <p className="text-xs text-secondary-readable mt-1">{wo.location}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-secondary-readable">Created: {wo.created}</p>
                          <p className="text-xs text-secondary-readable">ETA: {wo.eta}</p>
                          {wo.parts.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-secondary-readable mb-1">Parts Required:</p>
                              {wo.parts.map((part, index) => (
                                <Badge key={index} className="sci-fi-badge text-xs mr-1">
                                  {part}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" className="sci-fi-button">
                            Update Status
                          </Button>
                          <Button size="sm" className="sci-fi-button" variant="outline">
                            Add Notes
                          </Button>
                          {wo.status === 'pending' && (
                            <Button size="sm" className="sci-fi-button">
                              Assign Technician
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Building Management System</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-lg font-bold text-blue-600">23.5°C</p>
                      <p className="text-sm text-slate-500">Avg Temperature</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-lg font-bold text-green-600">87%</p>
                      <p className="text-sm text-slate-500">System Efficiency</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">HVAC System Health</span>
                      <Badge variant="secondary">98%</Badge>
                    </div>
                    <Progress value={98} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lighting Control</span>
                      <Badge variant="secondary">95%</Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fire Safety Systems</span>
                      <Badge variant="secondary">100%</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>BMS Alerts & Faults</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {bmsAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg work-order-card ${
                      alert.severity === 'critical' ? 'border-red-500/50' :
                      alert.severity === 'warning' ? 'border-yellow-500/50' :
                      'border-blue-500/50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={
                          alert.severity === 'critical' ? 'destructive' : 
                          alert.severity === 'warning' ? 'default' : 'secondary'
                        }>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-blue-300">{alert.timestamp}</span>
                      </div>
                      <h4 className="font-medium text-sm text-white">{alert.type} Alert</h4>
                      <p className="text-sm text-blue-300 mb-1">{alert.message}</p>
                      <p className="text-xs text-blue-400">Equipment: {alert.equipment}</p>
                      <p className="text-xs text-blue-400 mt-1">Action: {alert.action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="energy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">22.4MW</p>
                <p className="text-sm text-slate-500">Current Load</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">3.8</p>
                <p className="text-sm text-slate-500">Avg kW/Ton</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">24°C</p>
                <p className="text-sm text-slate-500">Optimal Temp</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">87%</p>
                <p className="text-sm text-slate-500">Efficiency</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="hvac" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="HVAC" />
                  <Area type="monotone" dataKey="lighting" stackId="1" stroke="#22c55e" fill="#22c55e" name="Lighting" />
                  <Area type="monotone" dataKey="other" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Other" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Energy Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-green-800">Optimal Chiller Setpoint</h4>
                    <p className="text-sm text-green-600">Recommended: 7.2°C (current: 6.8°C)</p>
                    <p className="text-sm text-green-600">Potential savings: 8% energy reduction</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Apply Setting
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-800">Lighting Schedule Optimization</h4>
                    <p className="text-sm text-blue-600">Adjust Terminal 2 lighting based on occupancy</p>
                    <p className="text-sm text-blue-600">Potential savings: 12% lighting energy</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Registry & Health Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assets.map((asset) => (
                  <Card 
                    key={asset.id} 
                    className={`cursor-pointer transition-all ${
                      selectedAsset === asset.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
                    } ${
                      asset.status === 'maintenance' ? 'border-red-200' :
                      asset.status === 'alert' ? 'border-yellow-200' :
                      'border-green-200'
                    }`}
                    onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            asset.status === 'operational' ? 'bg-green-500' :
                            asset.status === 'maintenance' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}></div>
                          <h3 className="font-medium">{asset.name}</h3>
                          <Badge variant="outline">{asset.type}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={asset.health > 90 ? 'secondary' : asset.health > 75 ? 'default' : 'destructive'}>
                            {asset.health}% Health
                          </Badge>
                          {asset.alerts > 0 && (
                            <Badge variant="destructive">
                              {asset.alerts} alerts
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-slate-500">Efficiency</p>
                          <p className="font-medium">{asset.efficiency}{asset.type === 'HVAC' ? ' kW/ton' : '%'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Runtime</p>
                          <p className="font-medium">{asset.runtime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Last Maintenance</p>
                          <p className="font-medium">{asset.lastMaintenance}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Next Maintenance</p>
                          <p className="font-medium">{asset.nextMaintenance}</p>
                        </div>
                      </div>
                      
                      <Progress value={asset.health} className="h-2" />
                      
                      {selectedAsset === asset.id && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                          <h4 className="font-medium mb-2">Asset Details</h4>
                          <p className="text-sm text-slate-600 mb-2">Location: {asset.location}</p>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            {Object.entries(asset.specifications).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-xs text-slate-500 capitalize">{key}</p>
                                <p className="text-sm font-medium">{value}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => createWorkOrder(asset.id, 'Routine maintenance inspection')}>
                              Create Work Order
                            </Button>
                            <Button size="sm" variant="outline">
                              View History
                            </Button>
                            <Button size="sm" variant="outline">
                              Update Details
                            </Button>
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

        <TabsContent value="predictive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>AI Predictive Maintenance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                        <div>
                          <h4 className="font-medium text-red-800">Chiller Unit 3 - Critical</h4>
                          <p className="text-sm text-red-600">Bearing failure predicted</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Remaining Useful Life</span>
                          <span className="font-bold text-red-600">72 hours</span>
                        </div>
                        <Progress value={15} className="h-2" />
                        <p className="text-xs text-red-600">Confidence: 94% | Auto work order created</p>
                      </div>
                      <Button size="sm" className="w-full mt-3" onClick={() => createWorkOrder('CHIL-003', 'Bearing replacement - AI predicted failure')}>
                        Schedule Maintenance Now
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Clock className="w-6 h-6 text-yellow-600" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Conveyor 7A - Warning</h4>
                          <p className="text-sm text-yellow-600">Belt tension anomaly detected</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Recommended Action</span>
                          <span className="font-bold text-yellow-600">7 days</span>
                        </div>
                        <Progress value={65} className="h-2" />
                        <p className="text-xs text-yellow-600">Confidence: 87% | Preventive maintenance</p>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        Schedule Within 7 Days
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Machine Learning Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">23</p>
                        <p className="text-sm text-slate-500">Failures Prevented</p>
                        <p className="text-xs text-green-600">This month</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">$127k</p>
                        <p className="text-sm text-slate-500">Cost Savings</p>
                        <p className="text-xs text-blue-600">YTD avoided costs</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">94%</p>
                        <p className="text-sm text-slate-500">Prediction Accuracy</p>
                        <p className="text-xs text-purple-600">Model performance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>RUL Analysis Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={[
                        { name: 'Jan', chiller1: 95, chiller2: 88, chiller3: 82, ups1: 92 },
                        { name: 'Feb', chiller1: 93, chiller2: 85, chiller3: 78, ups1: 90 },
                        { name: 'Mar', chiller1: 91, chiller2: 83, chiller3: 75, ups1: 88 },
                        { name: 'Apr', chiller1: 89, chiller2: 81, chiller3: 72, ups1: 86 },
                        { name: 'May', chiller1: 87, chiller2: 78, chiller3: 68, ups1: 84 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="chiller1" stroke="#22c55e" strokeWidth={2} name="Chiller 1" />
                        <Line type="monotone" dataKey="chiller2" stroke="#3b82f6" strokeWidth={2} name="Chiller 2" />
                        <Line type="monotone" dataKey="chiller3" stroke="#ef4444" strokeWidth={2} name="Chiller 3" />
                        <Line type="monotone" dataKey="ups1" stroke="#f59e0b" strokeWidth={2} name="UPS 1" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}