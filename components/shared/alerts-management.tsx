'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Eye,
  Wrench,
  PlayCircle,
  Target,
  Brain,
  Lightbulb,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
  category: 'security' | 'operations' | 'maintenance' | 'safety' | 'system';
  source: string;
  location: string;
  timestamp: string;
  assignee?: string;
  aiInsights?: {
    rootCause: string;
    impact: string;
    recommendation: string;
    confidence: number;
  };
  suggestedActions?: {
    id: string;
    title: string;
    type: 'maintenance' | 'workflow' | 'control';
    priority: 'high' | 'medium' | 'low';
    eta: string;
  }[];
}

interface AlertsManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlertsManagement({ isOpen, onClose }: AlertsManagementProps) {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const alerts: Alert[] = [
    {
      id: 'ALT-001',
      title: 'Runway 10L Bird Activity Detected',
      description: 'Multiple bird strikes detected on approach path. Wildlife management team alerted.',
      severity: 'critical',
      status: 'active',
      category: 'safety',
      source: 'Wildlife Detection System',
      location: 'Runway 10L/28R',
      timestamp: '2024-01-15 14:32:15',
      assignee: 'Wildlife Control Team',
      aiInsights: {
        rootCause: 'Seasonal migration pattern coinciding with peak flight operations',
        impact: 'High risk of aircraft damage and potential flight delays',
        recommendation: 'Deploy acoustic deterrents and coordinate with ATC for temporary approach adjustments',
        confidence: 94
      },
      suggestedActions: [
        {
          id: 'ACT-001',
          title: 'Deploy Wildlife Deterrents',
          type: 'control',
          priority: 'high',
          eta: '15 minutes'
        },
        {
          id: 'ACT-002',
          title: 'Coordinate ATC Approach Changes',
          type: 'workflow',
          priority: 'high',
          eta: '10 minutes'
        }
      ]
    },
    {
      id: 'ALT-002',
      title: 'Security Checkpoint B Queue Exceeding SLA',
      description: 'Wait times exceeding 20-minute SLA threshold. Current average: 25 minutes.',
      severity: 'high',
      status: 'acknowledged',
      category: 'operations',
      source: 'Queue Management System',
      location: 'Terminal 2, Security Checkpoint B',
      timestamp: '2024-01-15 14:25:42',
      assignee: 'Terminal Operations Manager',
      aiInsights: {
        rootCause: 'Staffing shortage combined with higher than expected passenger volume',
        impact: 'Passenger dissatisfaction and potential missed flights',
        recommendation: 'Redeploy staff from Checkpoint A and open additional lanes',
        confidence: 89
      },
      suggestedActions: [
        {
          id: 'ACT-003',
          title: 'Redeploy Security Staff',
          type: 'workflow',
          priority: 'high',
          eta: '20 minutes'
        },
        {
          id: 'ACT-004',
          title: 'Open Additional Security Lanes',
          type: 'control',
          priority: 'medium',
          eta: '30 minutes'
        }
      ]
    },
    {
      id: 'ALT-003',
      title: 'Chiller Unit 3 Abnormal Vibration',
      description: 'Vibration levels 40% above normal. Potential bearing failure predicted.',
      severity: 'medium',
      status: 'active',
      category: 'maintenance',
      source: 'BMS Monitoring System',
      location: 'Mechanical Room B, Level -1',
      timestamp: '2024-01-15 14:18:33',
      assignee: 'Maintenance Team Alpha',
      aiInsights: {
        rootCause: 'Bearing wear due to extended operation beyond maintenance schedule',
        impact: 'Risk of complete chiller failure affecting Terminal 2 climate control',
        recommendation: 'Schedule immediate bearing replacement during next maintenance window',
        confidence: 92
      },
      suggestedActions: [
        {
          id: 'ACT-005',
          title: 'Schedule Bearing Replacement',
          type: 'maintenance',
          priority: 'medium',
          eta: '4 hours'
        },
        {
          id: 'ACT-006',
          title: 'Adjust Load Distribution',
          type: 'control',
          priority: 'low',
          eta: '1 hour'
        }
      ]
    },
    {
      id: 'ALT-004',
      title: 'Parking Structure P3 95% Capacity',
      description: 'Parking structure approaching maximum capacity. Overflow procedures may be needed.',
      severity: 'medium',
      status: 'active',
      category: 'operations',
      source: 'Parking Management System',
      location: 'Parking Structure P3',
      timestamp: '2024-01-15 14:15:28',
      aiInsights: {
        rootCause: 'Higher than forecasted passenger volume due to holiday travel',
        impact: 'Potential passenger inconvenience and revenue loss from turned-away vehicles',
        recommendation: 'Activate overflow parking areas and update dynamic pricing',
        confidence: 87
      },
      suggestedActions: [
        {
          id: 'ACT-007',
          title: 'Activate Overflow Parking',
          type: 'workflow',
          priority: 'medium',
          eta: '45 minutes'
        }
      ]
    },
    {
      id: 'ALT-005',
      title: 'Fire Panel Alert - Terminal 1 Kitchen',
      description: 'Smoke detection in Terminal 1 food service area. Fire suppression system activated.',
      severity: 'critical',
      status: 'resolved',
      category: 'safety',
      source: 'Fire Detection System',
      location: 'Terminal 1, Food Service Area',
      timestamp: '2024-01-15 13:45:12',
      assignee: 'Fire Safety Team',
      aiInsights: {
        rootCause: 'Overheated cooking equipment due to ventilation system malfunction',
        impact: 'Potential fire spread and passenger evacuation requirements',
        recommendation: 'Inspect and service kitchen ventilation systems',
        confidence: 96
      }
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const selectedAlertData = alerts.find(alert => alert.id === selectedAlert);

  const executeAction = (actionId: string, alertId: string) => {
    const foundAlert = alerts.find(a => a.id === alertId);
    const action = foundAlert?.suggestedActions?.find(a => a.id === actionId);
    
    if (action && foundAlert) {
      alert(`Executing Action: ${action.title}\n\nAlert: ${foundAlert.title}\nType: ${action.type}\nPriority: ${action.priority}\nETA: ${action.eta}\n\nAction has been initiated and relevant teams notified.`);
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    alert(`Alert ${alertId} has been acknowledged.\n\nStatus updated and assigned team notified.`);
  };

  const resolveAlert = (alertId: string) => {
    alert(`Alert ${alertId} has been marked as resolved.\n\nIncident closed and documentation updated.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto modal-content cyber-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-white neon-glow">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="holographic-text">Alerts & Alarms Management</span>
            <Badge variant="destructive">
              {alerts.filter(a => a.status === 'active').length} Active
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters and Search */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sci-fi-input"
                />
              </div>
              <select 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 bg-slate-800 border border-blue-500/30 rounded-md text-white"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-slate-800 border border-blue-500/30 rounded-md text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {/* Alerts List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredAlerts.map((alert) => (
                <Card
                  key={alert.id} 
                  className={`card-enhanced cursor-pointer transition-all ${
                    selectedAlert === alert.id ? 'border-blue-500 bg-blue-500/10' : 'hover:border-blue-500/50'
                  } ${
                    alert.severity === 'critical' ? 'border-l-4 border-l-red-500' :
                    alert.severity === 'high' ? 'border-l-4 border-l-orange-500' :
                    alert.severity === 'medium' ? 'border-l-4 border-l-yellow-500' :
                    'border-l-4 border-l-green-500'
                  }`}
                  onClick={() => setSelectedAlert(alert.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          alert.severity === 'critical' ? 'destructive' :
                          alert.severity === 'high' ? 'default' :
                          'secondary'
                        }>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{alert.category}</Badge>
                        <Badge variant={
                          alert.status === 'active' ? 'destructive' :
                          alert.status === 'acknowledged' ? 'default' :
                          'secondary'
                        }>
                          {alert.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-blue-300">{alert.timestamp}</span>
                    </div>
                    
                    <h3 className="font-medium text-white mb-1">{alert.title}</h3>
                    <p className="text-sm text-blue-300 mb-2">{alert.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{alert.location}</span>
                      <span>{alert.source}</span>
                    </div>
                    
                    {alert.assignee && (
                      <div className="flex items-center space-x-1 mt-2">
                        <Users className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-blue-400">{alert.assignee}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Alert Details */}
          <div className="space-y-4">
            {selectedAlertData ? (
              <>
                <Card className="card-enhanced">
                  <CardHeader>
                    <CardTitle className="text-white">Alert Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">{selectedAlertData.title}</h4>
                        <p className="text-sm text-blue-300">{selectedAlertData.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Location:</span>
                          <p className="text-white">{selectedAlertData.location}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Source:</span>
                          <p className="text-white">{selectedAlertData.source}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {selectedAlertData.status === 'active' && (
                          <Button size="sm" onClick={() => acknowledgeAlert(selectedAlertData.id)} className="sci-fi-button">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        {selectedAlertData.status !== 'resolved' && (
                          <Button size="sm" variant="outline" onClick={() => resolveAlert(selectedAlertData.id)}>
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                {selectedAlertData.aiInsights && (
                  <Card className="card-enhanced">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-white">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span>AI Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-purple-300 mb-1">Root Cause</h5>
                          <p className="text-sm text-white">{selectedAlertData.aiInsights.rootCause}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-orange-300 mb-1">Impact Assessment</h5>
                          <p className="text-sm text-white">{selectedAlertData.aiInsights.impact}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-green-300 mb-1">Recommendation</h5>
                          <p className="text-sm text-white">{selectedAlertData.aiInsights.recommendation}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-blue-300">Confidence:</span>
                          <div className="flex-1 bg-blue-500/20 rounded-full h-2 max-w-24">
                            <div 
                              className="bg-blue-400 h-2 rounded-full" 
                              style={{ width: `${selectedAlertData.aiInsights.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-blue-400">{selectedAlertData.aiInsights.confidence}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Suggested Actions */}
                {selectedAlertData.suggestedActions && selectedAlertData.suggestedActions.length > 0 && (
                  <Card className="card-enhanced">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-white">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        <span>Suggested Actions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedAlertData.suggestedActions.map((action) => (
                          <div key={action.id} className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${
                                action.type === 'maintenance' ? 'bg-orange-500/20' :
                                action.type === 'workflow' ? 'bg-blue-500/20' :
                                'bg-purple-500/20'
                              }`}>
                                {action.type === 'maintenance' && <Wrench className="w-4 h-4 text-orange-400" />}
                                {action.type === 'workflow' && <PlayCircle className="w-4 h-4 text-blue-400" />}
                                {action.type === 'control' && <Target className="w-4 h-4 text-purple-400" />}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">{action.title}</p>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={action.priority === 'high' ? 'destructive' : action.priority === 'medium' ? 'default' : 'secondary'}>
                                    {action.priority}
                                  </Badge>
                                  <span className="text-xs text-blue-300">ETA: {action.eta}</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" onClick={() => executeAction(action.id, selectedAlertData.id)} className="sci-fi-button">
                              Execute
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="card-enhanced">
                <CardContent className="p-8 text-center">
                  <Eye className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400">Select an alert to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}