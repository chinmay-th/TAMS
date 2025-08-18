'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ActionConfirmationModal } from '@/components/shared/action-confirmation-modal';
import { 
  PlayCircle, 
  FileText, 
  Clock, 
  Users, 
  CheckCircle,
  AlertTriangle,
  Search,
  Plus,
  Edit,
  History,
  Camera
} from 'lucide-react';

export function SOPConsolePage() {
  const [selectedSOP, setSelectedSOP] = useState<string | null>(null);
  const [activeSOP, setActiveSOP] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);

  const sops = [
    {
      id: 'SOP-001',
      name: 'Perimeter Intrusion Response',
      domain: 'Security',
      trigger: 'PIDS Alert',
      description: 'Standard response protocol for perimeter security breaches',
      estimatedTime: '15 minutes',
      priority: 'critical',
      lastUpdated: '2024-01-10',
      version: '2.1',
      steps: [
        {
          id: 1,
          title: 'Immediate Alert',
          description: 'Notify security dispatch and AOCC immediately',
          assignedRole: 'Security Operator',
          estimatedTime: '1 min',
          evidence: ['Alert timestamp', 'Notification log'],
          completed: false
        },
        {
          id: 2,
          title: 'Deploy Response Team',
          description: 'Dispatch nearest patrol unit to investigate location',
          assignedRole: 'Security Supervisor',
          estimatedTime: '3 min',
          evidence: ['Team dispatch log', 'Response time'],
          completed: false
        },
        {
          id: 3,
          title: 'Activate Surveillance',
          description: 'Focus CCTV cameras on alert zone and begin recording',
          assignedRole: 'CCTV Operator',
          estimatedTime: '2 min',
          evidence: ['Camera activation log', 'Recording start time'],
          completed: false
        },
        {
          id: 4,
          title: 'Law Enforcement Contact',
          description: 'Contact local law enforcement if threat is confirmed',
          assignedRole: 'Security Supervisor',
          estimatedTime: '5 min',
          evidence: ['Call log', 'Response confirmation'],
          completed: false
        },
        {
          id: 5,
          title: 'Incident Documentation',
          description: 'Complete incident report and evidence collection',
          assignedRole: 'Security Officer',
          estimatedTime: '4 min',
          evidence: ['Incident report', 'Photo/video evidence'],
          completed: false
        }
      ],
      executionHistory: [
        { date: '2024-01-14', outcome: 'successful', duration: '12 min', notes: 'False alarm - wildlife' },
        { date: '2024-01-08', outcome: 'successful', duration: '18 min', notes: 'Trespasser detained' },
        { date: '2023-12-22', outcome: 'successful', duration: '15 min', notes: 'Equipment malfunction' }
      ]
    },
    {
      id: 'SOP-002',
      name: 'Unattended Baggage Protocol',
      domain: 'Security',
      trigger: 'CCTV Analytics Alert',
      description: 'Response procedure for suspicious unattended packages',
      estimatedTime: '30 minutes',
      priority: 'critical',
      lastUpdated: '2024-01-05',
      version: '1.8',
      steps: [
        {
          id: 1,
          title: 'Establish Security Perimeter',
          description: 'Create 50-meter security zone around suspicious item',
          assignedRole: 'Security Team',
          estimatedTime: '5 min',
          evidence: ['Perimeter log', 'Area photo'],
          completed: false
        },
        {
          id: 2,
          title: 'Evacuate Area',
          description: 'Safely evacuate all passengers and staff from perimeter',
          assignedRole: 'Security Officers',
          estimatedTime: '10 min',
          evidence: ['Evacuation log', 'Headcount'],
          completed: false
        },
        {
          id: 3,
          title: 'Contact Bomb Disposal',
          description: 'Notify and request bomb disposal unit response',
          assignedRole: 'Security Supervisor',
          estimatedTime: '3 min',
          evidence: ['Contact log', 'ETA confirmation'],
          completed: false
        },
        {
          id: 4,
          title: 'Coordinate Emergency Services',
          description: 'Liaise with fire, police, and medical services',
          assignedRole: 'AOCC Operator',
          estimatedTime: '7 min',
          evidence: ['Service notifications', 'Response confirmations'],
          completed: false
        },
        {
          id: 5,
          title: 'All-Clear Procedures',
          description: 'Coordinate area reopening after threat assessment',
          assignedRole: 'Security Supervisor',
          estimatedTime: '5 min',
          evidence: ['All-clear confirmation', 'Area reopening log'],
          completed: false
        }
      ],
      executionHistory: [
        { date: '2024-01-12', outcome: 'successful', duration: '28 min', notes: 'Abandoned laptop - owner located' },
        { date: '2023-12-15', outcome: 'successful', duration: '35 min', notes: 'Suspicious package - false alarm' }
      ]
    },
    {
      id: 'SOP-003',
      name: 'Fire Emergency Response',
      domain: 'Safety',
      trigger: 'Fire Panel Alert',
      description: 'Coordinated response to fire incidents and alarms',
      estimatedTime: '20 minutes',
      priority: 'critical',
      lastUpdated: '2024-01-08',
      version: '3.2',
      steps: [
        {
          id: 1,
          title: 'Activate Fire Systems',
          description: 'Trigger fire suppression systems in affected area',
          assignedRole: 'Fire Safety Officer',
          estimatedTime: '2 min',
          evidence: ['System activation log', 'Zone confirmation'],
          completed: false
        },
        {
          id: 2,
          title: 'Initiate Evacuation',
          description: 'Begin evacuation procedures for affected zones',
          assignedRole: 'Security Team',
          estimatedTime: '8 min',
          evidence: ['Evacuation announcement', 'Exit monitoring'],
          completed: false
        },
        {
          id: 3,
          title: 'Emergency Vehicle Access',
          description: 'Clear and direct emergency vehicles to incident location',
          assignedRole: 'Airside Operations',
          estimatedTime: '5 min',
          evidence: ['Vehicle access log', 'Route clearance'],
          completed: false
        },
        {
          id: 4,
          title: 'Fire Department Coordination',
          description: 'Coordinate with responding fire department units',
          assignedRole: 'Fire Safety Officer',
          estimatedTime: '3 min',
          evidence: ['Coordination log', 'Briefing notes'],
          completed: false
        },
        {
          id: 5,
          title: 'Passenger Management',
          description: 'Manage passenger flow and provide updates',
          assignedRole: 'Terminal Operations',
          estimatedTime: '2 min',
          evidence: ['Passenger communications', 'Flow management'],
          completed: false
        }
      ],
      executionHistory: [
        { date: '2024-01-09', outcome: 'successful', duration: '18 min', notes: 'Kitchen fire - contained quickly' },
        { date: '2023-11-28', outcome: 'successful', duration: '22 min', notes: 'Electrical fire - power isolated' }
      ]
    },
    {
      id: 'SOP-004',
      name: 'Runway Incursion Response',
      domain: 'Airside',
      trigger: 'A-SMGCS Alert',
      description: 'Immediate response to runway safety violations',
      estimatedTime: '10 minutes',
      priority: 'critical',
      lastUpdated: '2024-01-12',
      version: '2.5',
      steps: [
        {
          id: 1,
          title: 'Immediate Traffic Hold',
          description: 'Stop all runway movements and hold aircraft',
          assignedRole: 'Air Traffic Control',
          estimatedTime: '1 min',
          evidence: ['Traffic hold log', 'Communication transcript'],
          completed: false
        },
        {
          id: 2,
          title: 'Dispatch Ground Patrol',
          description: 'Send airside patrol to investigate incursion',
          assignedRole: 'Airside Supervisor',
          estimatedTime: '3 min',
          evidence: ['Dispatch log', 'Patrol response time'],
          completed: false
        },
        {
          id: 3,
          title: 'Runway Inspection',
          description: 'Conduct safety inspection of runway surface',
          assignedRole: 'Airside Operations',
          estimatedTime: '4 min',
          evidence: ['Inspection report', 'Safety clearance'],
          completed: false
        },
        {
          id: 4,
          title: 'Resume Operations',
          description: 'Clear runway for normal operations after all-clear',
          assignedRole: 'Air Traffic Control',
          estimatedTime: '2 min',
          evidence: ['All-clear confirmation', 'Operations resume log'],
          completed: false
        }
      ],
      executionHistory: [
        { date: '2024-01-11', outcome: 'successful', duration: '8 min', notes: 'Vehicle incursion - quickly cleared' },
        { date: '2023-12-03', outcome: 'successful', duration: '12 min', notes: 'Wildlife on runway' }
      ]
    }
  ];

  const activeExecutions = [
    {
      sopId: 'SOP-001',
      sopName: 'Perimeter Intrusion Response',
      startTime: '14:32',
      currentStep: 3,
      totalSteps: 5,
      assignedTo: 'Security Team Alpha',
      estimatedCompletion: '14:47',
      status: 'in_progress'
    },
    {
      sopId: 'SOP-003',
      sopName: 'Fire Emergency Response',
      startTime: '13:45',
      currentStep: 5,
      totalSteps: 5,
      assignedTo: 'Emergency Response Team',
      estimatedCompletion: '14:05',
      status: 'completing'
    }
  ];

  const executeSOP = (sopId: string) => {
    const sop = sops.find(s => s.id === sopId);
    if (sop) {
      setPendingAction({
        title: `Execute SOP: ${sop.name}`,
        type: 'sop',
        priority: sop.priority as 'high' | 'medium' | 'low',
        description: sop.description,
        details: [
          `First step: ${sop.steps[0].title}`,
          `Assigned to: ${sop.steps[0].assignedRole}`,
          'All relevant teams notified',
          'Evidence collection enabled'
        ],
        eta: sop.estimatedTime
      });
      setShowActionModal(true);
    }
  };

  const completeStep = (sopId: string, stepId: number) => {
    setPendingAction({
      title: `Complete Step ${stepId}`,
      type: 'workflow',
      description: `Mark step ${stepId} as completed for ${sopId}`,
      details: [
        'Evidence collected and logged',
        'Step verification completed',
        'Proceeding to next step',
        'Progress tracking updated'
      ],
      eta: '2 minutes'
    });
    setShowActionModal(true);
  };

  const filteredSOPs = sops.filter(sop => 
    sop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sop.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sop.trigger.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Standard Operating Procedures Console</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="destructive" className="flex items-center space-x-1">
            <PlayCircle className="w-3 h-3" />
            <span>2 Active</span>
          </Badge>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create SOP
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Executions</TabsTrigger>
          <TabsTrigger value="library">SOP Library</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="author">Author/Edit</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Active SOP Executions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PlayCircle className="w-5 h-5 text-blue-600" />
                <span>Currently Executing SOPs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeExecutions.length > 0 ? (
                <div className="space-y-4">
                  {activeExecutions.map((execution) => (
                    <Card key={execution.sopId} className="card-enhanced">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge className="sci-fi-badge">
                              {execution.status.replace('_', ' ')}
                            </Badge>
                            <h3 className="font-medium text-white">{execution.sopName}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-300">Started: {execution.startTime}</p>
                            <p className="text-xs text-blue-400">ETA: {execution.estimatedCompletion}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-blue-300">Progress: Step {execution.currentStep} of {execution.totalSteps}</span>
                          <span className="text-sm text-blue-400">Assigned: {execution.assignedTo}</span>
                        </div>
                        
                        <div className="w-full bg-blue-900/50 rounded-full h-2 mb-3">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(execution.currentStep / execution.totalSteps) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="sci-fi-button">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="sci-fi-button">
                            Update Status
                          </Button>
                          <Button size="sm" className="sci-fi-button">
                            Complete Step
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <PlayCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No SOPs currently executing</p>
                  <p className="text-sm">SOPs will appear here when triggered or manually executed</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Execute Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Execute</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sops.filter(sop => sop.priority === 'critical').map((sop) => (
                  <Card key={sop.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        {sop.domain === 'Security' && <AlertTriangle className="w-6 h-6 text-red-600" />}
                        {sop.domain === 'Safety' && <AlertTriangle className="w-6 h-6 text-orange-600" />}
                        {sop.domain === 'Airside' && <PlayCircle className="w-6 h-6 text-blue-600" />}
                      </div>
                      <h3 className="font-medium text-sm mb-1">{sop.name}</h3>
                      <p className="text-xs text-slate-500 mb-3">{sop.estimatedTime}</p>
                      <Button size="sm" className="w-full" onClick={() => executeSOP(sop.id)}>
                        Execute Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search SOPs by name, domain, or trigger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* SOP Library */}
          <div className="space-y-4">
            {filteredSOPs.map((sop) => (
              <Card 
                key={sop.id} 
                className={`cursor-pointer transition-all ${
                  selectedSOP === sop.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedSOP(selectedSOP === sop.id ? null : sop.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between p-4 widget-card rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant={sop.priority === 'critical' ? 'destructive' : 'default'}>
                        {sop.priority}
                      </Badge>
                      <h3 className="font-medium">{sop.name}</h3>
                      <Badge variant="outline">{sop.domain}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">v{sop.version}</span>
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-500">{sop.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">{sop.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{sop.steps.length} steps</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" onClick={() => executeSOP(sop.id)}>
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Execute
                      </Button>
                    </div>
                  </div>
                  
                  {selectedSOP === sop.id && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium mb-3">Execution Steps</h4>
                      <div className="space-y-3">
                        {sop.steps.map((step, index) => (
                          <div key={step.id} className="flex items-start space-x-3 p-3 bg-white rounded border">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-sm">{step.title}</h5>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span className="text-xs text-slate-500">{step.estimatedTime}</span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">Assigned: {step.assignedRole}</span>
                                <div className="flex items-center space-x-1">
                                  <Camera className="w-3 h-3 text-slate-400" />
                                  <span className="text-xs text-slate-500">{step.evidence.length} evidence items</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Recent Executions</h4>
                        <div className="space-y-2">
                          {sop.executionHistory.map((execution, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm">{execution.date}</span>
                                <span className="text-sm text-slate-600">{execution.duration}</span>
                              </div>
                              <span className="text-xs text-slate-500">{execution.notes}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>SOP Execution Audit Trail</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Fire Emergency Response - Completed</p>
                      <p className="text-sm text-green-600">Executed: 2024-01-15 13:45 - 14:03 (18 minutes)</p>
                      <p className="text-xs text-green-600">Kitchen fire in Terminal 2 - Successfully contained</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Evidence
                    </Button>
                    <Button size="sm" variant="outline">
                      Export Report
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <PlayCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Perimeter Intrusion Response - In Progress</p>
                      <p className="text-sm text-blue-600">Started: 2024-01-15 14:32 (Step 3 of 5)</p>
                      <p className="text-xs text-blue-600">Motion detected at East Perimeter - Under investigation</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Monitor Progress
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Unattended Baggage Protocol - Completed</p>
                      <p className="text-sm text-slate-600">Executed: 2024-01-14 16:20 - 16:48 (28 minutes)</p>
                      <p className="text-xs text-slate-600">Abandoned laptop at Gate B15 - Owner located and reunited</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Evidence
                    </Button>
                    <Button size="sm" variant="outline">
                      Export Report
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Runway Incursion Response - Completed</p>
                      <p className="text-sm text-slate-600">Executed: 2024-01-13 11:15 - 11:23 (8 minutes)</p>
                      <p className="text-xs text-slate-600">Vehicle incursion on Runway 10L - Quickly cleared, no delays</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Evidence
                    </Button>
                    <Button size="sm" variant="outline">
                      Export Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Execution Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Execution Time</span>
                    <span className="font-bold text-blue-600">16.2 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-bold text-green-600">98.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Evidence Collection Rate</span>
                    <span className="font-bold text-purple-600">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SOPs Executed (30 days)</span>
                    <span className="font-bold">47</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                    <p className="text-sm text-slate-500">Evidence Items Collected</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Photos/Videos</span>
                      <span className="font-medium">892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Audio Recordings</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Documents</span>
                      <span className="font-medium">199</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="author" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5" />
                <span>SOP Author & Editor</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">SOP Name</label>
                    <Input placeholder="Enter SOP name..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Domain</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Security</option>
                      <option>Safety</option>
                      <option>Airside</option>
                      <option>Terminal</option>
                      <option>Maintenance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Trigger Type</label>
                    <Input placeholder="e.g., PIDS Alert, Fire Panel Alert..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Estimated Duration</label>
                    <Input placeholder="e.g., 15 minutes" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    placeholder="Describe the purpose and scope of this SOP..."
                    rows={3}
                  />
                </div>

                <div>
                  <h3 className="font-medium mb-3">Execution Steps</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Step Title</label>
                          <Input placeholder="Step title..." />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Assigned Role</label>
                          <Input placeholder="e.g., Security Officer" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Step Description</label>
                        <Textarea placeholder="Detailed step instructions..." rows={2} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Estimated Time</label>
                          <Input placeholder="e.g., 3 minutes" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Evidence Required</label>
                          <Input placeholder="e.g., Photo, Log entry, Report" />
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Step
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Save SOP
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Preview SOP
                  </Button>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
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