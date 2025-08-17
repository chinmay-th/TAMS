'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Camera, 
  AlertTriangle, 
  Eye, 
  Bell,
  MapPin,
  Clock,
  PlayCircle,
  FileText,
  Users,
  Lock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function SecurityPage() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [activeSOP, setActiveSOP] = useState<string | null>(null);

  const securityData = [
    { name: '6AM', incidents: 0, alerts: 2, patrols: 12 },
    { name: '9AM', incidents: 1, alerts: 5, patrols: 18 },
    { name: '12PM', incidents: 2, alerts: 8, patrols: 24 },
    { name: '3PM', incidents: 1, alerts: 12, patrols: 22 },
    { name: '6PM', incidents: 3, alerts: 15, patrols: 20 },
    { name: '9PM', incidents: 0, alerts: 8, patrols: 16 },
  ];

  const incidents = [
    {
      id: 'INC-2024-001',
      type: 'Perimeter Breach',
      severity: 'high',
      location: 'Sector 7, East Perimeter',
      time: '14:32',
      status: 'active',
      description: 'Motion detected along perimeter fence - investigating',
      assignee: 'Security Team Alpha',
      coordinates: { x: 150, y: 200 }
    },
    {
      id: 'INC-2024-002',
      type: 'Unattended Baggage',
      severity: 'medium',
      location: 'Terminal 3, Gate B15',
      time: '14:28',
      status: 'investigating',
      description: 'Suspicious package identified by CCTV analytics',
      assignee: 'Security Team Beta',
      coordinates: { x: 300, y: 150 }
    },
    {
      id: 'INC-2024-003',
      type: 'Access Violation',
      severity: 'low',
      location: 'Staff Area C, Level 2',
      time: '14:15',
      status: 'resolved',
      description: 'Unauthorized access attempt - badge expired',
      assignee: 'Security Supervisor',
      coordinates: { x: 200, y: 100 }
    },
  ];

  const cctvFeeds = [
    { id: 'CAM-001', location: 'Terminal 1 Main Entrance', status: 'active', alerts: 0, recording: true },
    { id: 'CAM-002', location: 'Security Checkpoint A', status: 'active', alerts: 1, recording: true },
    { id: 'CAM-003', location: 'Baggage Claim Area', status: 'maintenance', alerts: 0, recording: false },
    { id: 'CAM-004', location: 'Parking Structure P1', status: 'active', alerts: 2, recording: true },
    { id: 'CAM-005', location: 'Perimeter Fence East', status: 'active', alerts: 3, recording: true },
    { id: 'CAM-006', location: 'Airside Apron Area', status: 'active', alerts: 0, recording: true },
    { id: 'CAM-007', location: 'Terminal 2 Food Court', status: 'active', alerts: 0, recording: true },
    { id: 'CAM-008', location: 'Employee Parking', status: 'active', alerts: 1, recording: true },
  ];

  const sops = [
    {
      id: 'SOP-001',
      name: 'Perimeter Intrusion Response',
      description: 'Standard response for perimeter security breaches',
      steps: [
        'Immediately alert security dispatch',
        'Deploy nearest patrol unit to investigate',
        'Activate relevant CCTV cameras',
        'Contact law enforcement if threat confirmed',
        'Document incident and evidence'
      ],
      estimatedTime: '15 minutes',
      triggers: ['PIDS Alert', 'Motion Detection', 'Manual Alert']
    },
    {
      id: 'SOP-002',
      name: 'Unattended Baggage Protocol',
      description: 'Response procedure for suspicious packages',
      steps: [
        'Establish 50m security perimeter',
        'Evacuate immediate area',
        'Contact bomb disposal unit',
        'Notify airport operations center',
        'Coordinate with emergency services'
      ],
      estimatedTime: '30 minutes',
      triggers: ['CCTV Analytics', 'Passenger Report', 'Security Patrol']
    },
    {
      id: 'SOP-003',
      name: 'Fire Emergency Response',
      description: 'Coordinated response to fire incidents',
      steps: [
        'Activate fire suppression systems',
        'Evacuate affected areas',
        'Direct emergency vehicles',
        'Coordinate with fire department',
        'Manage passenger flow and communications'
      ],
      estimatedTime: '20 minutes',
      triggers: ['Fire Panel Alert', 'Smoke Detection', 'Manual Alarm']
    }
  ];

  const executeSOP = (sopId: string) => {
    setActiveSOP(sopId);
    const sop = sops.find(s => s.id === sopId);
    if (sop) {
      alert(`Executing SOP: ${sop.name}\n\nEstimated completion time: ${sop.estimatedTime}\n\nFirst step: ${sop.steps[0]}\n\nAll relevant teams have been notified.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Security & Safety Operations</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="destructive" className="flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3" />
            <span>1 Critical</span>
          </Badge>
          <Badge variant="default" className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>156 Cameras Active</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="incidents">Incident Management</TabsTrigger>
          <TabsTrigger value="cctv">CCTV Monitoring</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="sop">SOP Console</TabsTrigger>
          <TabsTrigger value="analytics">Security Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-6">
          {/* Incident Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Live Security Map</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 rounded-lg p-4 min-h-[400px] relative">
                    <svg viewBox="0 0 500 400" className="w-full h-full">
                      {/* Airport Layout */}
                      <rect x="50" y="100" width="400" height="200" fill="none" stroke="#4ade80" strokeWidth="2" />
                      <text x="250" y="90" textAnchor="middle" fill="#4ade80" fontSize="12">Airport Perimeter</text>
                      
                      {/* Terminal Buildings */}
                      <rect x="150" y="150" width="200" height="100" fill="#3b82f6" />
                      <text x="250" y="205" textAnchor="middle" fill="white" fontSize="14">Terminal Complex</text>
                      
                      {/* Incident Markers */}
                      {incidents.map((incident, index) => (
                        <g key={incident.id}>
                          <circle 
                            cx={incident.coordinates.x} 
                            cy={incident.coordinates.y} 
                            r="8" 
                            fill={incident.severity === 'high' ? '#ef4444' : 
                                  incident.severity === 'medium' ? '#f59e0b' : '#22c55e'}
                            className="cursor-pointer"
                            onClick={() => setSelectedIncident(incident.id)}
                          >
                            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <text 
                            x={incident.coordinates.x + 15} 
                            y={incident.coordinates.y + 5} 
                            fill="white" 
                            fontSize="10"
                            className="cursor-pointer"
                          >
                            {incident.id.split('-')[2]}
                          </text>
                        </g>
                      ))}
                      
                      {/* Security Zones */}
                      <rect x="60" y="110" width="80" height="80" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" />
                      <text x="100" y="130" textAnchor="middle" fill="#ef4444" fontSize="10">Restricted</text>
                      
                      <rect x="360" y="110" width="80" height="80" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5,5" />
                      <text x="400" y="130" textAnchor="middle" fill="#f59e0b" fontSize="10">Controlled</text>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Active Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {incidents.map((incident) => (
                      <div 
                        key={incident.id} 
                        className={`p-3 border rounded-lg cursor-pointer transition-colors card-enhanced ${
                          selectedIncident === incident.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-slate-50'
                        }`}
                        onClick={() => setSelectedIncident(incident.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={incident.severity === 'high' ? 'destructive' : incident.severity === 'medium' ? 'default' : 'secondary'}>
                            {incident.severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-blue-300">{incident.time}</span>
                        </div>
                        <h4 className="font-medium text-sm text-white">{incident.type}</h4>
                        <p className="text-xs text-blue-300 mt-1">{incident.location}</p>
                        <p className="text-xs text-blue-400 mt-1">{incident.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-blue-300">{incident.assignee}</span>
                          <Badge variant="outline" className="text-xs">
                            {incident.status}
                          </Badge>
                        </div>
                        {selectedIncident === incident.id && (
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <PlayCircle className="w-3 h-3 mr-1" />
                              Execute SOP
                            </Button>
                            <Button size="sm" variant="outline">
                              Update
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Security Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Security Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={securityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} name="Incidents" />
                  <Line type="monotone" dataKey="alerts" stroke="#f59e0b" strokeWidth={2} name="Alerts" />
                  <Line type="monotone" dataKey="patrols" stroke="#22c55e" strokeWidth={2} name="Patrols" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cctv" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>CCTV Control Center</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {cctvFeeds.slice(0, 8).map((feed) => (
                  <Card key={feed.id} className={`relative ${feed.status === 'maintenance' ? 'border-red-200' : 'border-green-200'}`}>
                    <CardContent className="p-3">
                      <div className="bg-slate-800 rounded aspect-video flex items-center justify-center mb-2">
                        <Camera className="w-8 h-8 text-slate-500" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">{feed.id}</span>
                          <div className={`w-2 h-2 rounded-full ${feed.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        </div>
                        <p className="text-xs text-slate-600">{feed.location}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant={feed.status === 'active' ? 'secondary' : 'destructive'} className="text-xs">
                            {feed.status}
                          </Badge>
                          {feed.alerts > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {feed.alerts} alerts
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Analytics Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-800">Loitering Detection</p>
                            <p className="text-sm text-red-600">CAM-002 - Individual present for 25+ minutes</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Investigate
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Eye className="w-5 h-5 text-yellow-600" />
                          <div>
                            <p className="font-medium text-yellow-800">Crowd Density Alert</p>
                            <p className="text-sm text-yellow-600">CAM-007 - High density detected in food court</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recording & Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Storage Utilization</span>
                        <span className="font-bold">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-blue-600">156</p>
                          <p className="text-xs text-slate-500">Active Cameras</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-600">152</p>
                          <p className="text-xs text-slate-500">Recording</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Retention Period: 30 days</p>
                        <p className="text-sm text-slate-600">Next cleanup: 2 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Access Control System</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
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
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm">Terminal Entry Gates</span>
                      <Badge variant="secondary">98.5% Success</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                      <span className="text-sm">Restricted Area Access</span>
                      <Badge variant="secondary">99.2% Success</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm">Vehicle Gates</span>
                      <Badge variant="destructive">2 Violations</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Access Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[250px] overflow-y-auto">
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
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Perimeter Intrusion Detection (PIDS)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 widget-card rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-green-400">North Sector</p>
                  <p className="text-sm text-blue-300">All Clear</p>
                </div>
                <div className="text-center p-4 widget-card rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-red-400">East Sector</p>
                  <p className="text-sm text-blue-300">Alert Active</p>
                </div>
                <div className="text-center p-4 widget-card rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-green-400">South Sector</p>
                  <p className="text-sm text-blue-300">All Clear</p>
                </div>
                <div className="text-center p-4 widget-card rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-green-400">West Sector</p>
                  <p className="text-sm text-blue-300">All Clear</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sop" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PlayCircle className="w-5 h-5" />
                <span>Standard Operating Procedures Console</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sops.map((sop) => (
                  <Card key={sop.id} className={`${activeSOP === sop.id ? 'border-blue-500 bg-blue-50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{sop.name}</h3>
                          <p className="text-sm text-slate-500">{sop.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {sop.estimatedTime}
                          </Badge>
                          <Button size="sm" onClick={() => executeSOP(sop.id)}>
                            Execute SOP
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Response Steps:</h4>
                          <ol className="list-decimal list-inside space-y-1">
                            {sop.steps.map((step, index) => (
                              <li key={index} className="text-sm text-slate-600">{step}</li>
                            ))}
                          </ol>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Triggers:</h4>
                          <div className="space-y-1">
                            {sop.triggers.map((trigger, index) => (
                              <Badge key={index} variant="secondary" className="mr-2 mb-1">
                                {trigger}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={securityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
                    <Bar dataKey="alerts" fill="#f59e0b" name="Alerts" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-bold text-green-600">4.2 min</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SOP Completion Rate</span>
                    <span className="font-bold text-blue-600">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">False Alarm Rate</span>
                    <span className="font-bold text-yellow-600">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                  
                  <div className="text-center mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">System uptime: 99.8%</p>
                    <p className="text-xs text-green-600">Last incident response: 3.1 minutes</p>
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