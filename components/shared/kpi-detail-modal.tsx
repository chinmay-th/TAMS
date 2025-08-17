'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  BarChart3,
  Lightbulb,
  Wrench,
  PlayCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface KPIDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: {
    id: string;
    name: string;
    value: string;
    unit?: string;
    trend: 'up' | 'down' | 'neutral';
    change: string;
    status: 'good' | 'warning' | 'critical';
    target?: string;
    description?: string;
  };
}

export function KPIDetailModal({ isOpen, onClose, kpi }: KPIDetailModalProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  // Mock historical data - in real app, this would come from API
  const historicalData = [
    { time: '00:00', value: 85, target: 90, benchmark: 88 },
    { time: '04:00', value: 78, target: 90, benchmark: 88 },
    { time: '08:00', value: 92, target: 90, benchmark: 88 },
    { time: '12:00', value: 95, target: 90, benchmark: 88 },
    { time: '16:00', value: 89, target: 90, benchmark: 88 },
    { time: '20:00', value: 87, target: 90, benchmark: 88 },
  ];

  const contributingFactors = [
    { factor: 'Weather Conditions', impact: 'High', value: '+15%', description: 'Clear skies improving operations' },
    { factor: 'Staff Availability', impact: 'Medium', value: '+8%', description: 'Full staffing levels maintained' },
    { factor: 'Equipment Status', impact: 'Low', value: '-2%', description: 'Minor maintenance on Gate 12' },
    { factor: 'Passenger Volume', impact: 'High', value: '+12%', description: 'Peak travel season increase' },
  ];

  const aiInsights = [
    {
      type: 'prediction',
      title: 'Performance Forecast',
      description: 'Based on current trends, expect 5% improvement over next 4 hours',
      confidence: 87,
      icon: TrendingUp
    },
    {
      type: 'recommendation',
      title: 'Optimization Opportunity',
      description: 'Deploy additional staff to Gate Area B to maintain SLA compliance',
      priority: 'high',
      icon: Lightbulb
    },
    {
      type: 'alert',
      title: 'Threshold Warning',
      description: 'Approaching critical threshold - consider preventive action',
      severity: 'warning',
      icon: AlertTriangle
    }
  ];

  const actionItems = [
    {
      id: 'ACT-001',
      title: 'Schedule Preventive Maintenance',
      type: 'maintenance',
      priority: 'medium',
      eta: '2 hours',
      assignee: 'Maintenance Team Alpha'
    },
    {
      id: 'ACT-002',
      title: 'Adjust Staffing Levels',
      type: 'workflow',
      priority: 'high',
      eta: '30 minutes',
      assignee: 'Operations Manager'
    },
    {
      id: 'ACT-003',
      title: 'Update System Parameters',
      type: 'control',
      priority: 'low',
      eta: '1 hour',
      assignee: 'System Administrator'
    }
  ];

  const executeAction = (actionId: string) => {
    const action = actionItems.find(a => a.id === actionId);
    if (action) {
      alert(`Executing Action: ${action.title}\n\nType: ${action.type}\nPriority: ${action.priority}\nAssigned to: ${action.assignee}\nETA: ${action.eta}\n\nAction has been initiated and relevant teams notified.`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto modal-content cyber-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-white neon-glow">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <span className="holographic-text">{kpi.name} - Detailed Analysis</span>
            <Badge variant={kpi.status === 'good' ? 'secondary' : kpi.status === 'warning' ? 'default' : 'destructive'}>
              {kpi.status.toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 card-enhanced">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends & Analysis</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="actions">Action Items</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-enhanced">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{kpi.value}</div>
                  <div className="text-sm text-blue-300 mb-4">Current Value</div>
                  <div className="flex items-center justify-center space-x-2">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : kpi.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                    )}
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-400' : kpi.trend === 'down' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-enhanced">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{kpi.target || 'N/A'}</div>
                  <div className="text-sm text-blue-300 mb-4">Target Value</div>
                  <div className="flex items-center justify-center space-x-2">
                    <Target className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Goal</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-enhanced">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">88%</div>
                  <div className="text-sm text-blue-300 mb-4">Performance Score</div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-400">Industry Benchmark</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-white">Contributing Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributingFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{factor.factor}</h4>
                        <p className="text-sm text-blue-300">{factor.description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={factor.impact === 'High' ? 'destructive' : factor.impact === 'Medium' ? 'default' : 'secondary'}>
                          {factor.impact} Impact
                        </Badge>
                        <span className={`font-bold ${factor.value.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {factor.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-white">Timeframe:</span>
              {['1h', '24h', '7d', '30d'].map((period) => (
                <Button
                  key={period}
                  size="sm"
                  variant={selectedTimeframe === period ? 'default' : 'outline'}
                  onClick={() => setSelectedTimeframe(period)}
                  className="sci-fi-button"
                >
                  {period}
                </Button>
              ))}
            </div>

            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-white">Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="sci-fi-chart rounded-lg p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 91%, 60%, 0.2)" />
                      <XAxis dataKey="time" stroke="hsl(210, 40%, 95%)" />
                      <YAxis stroke="hsl(210, 40%, 95%)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(220, 27%, 12%)', 
                          border: '1px solid hsl(217, 91%, 60%, 0.3)',
                          borderRadius: '8px',
                          color: 'hsl(210, 40%, 95%)'
                        }} 
                      />
                      <Line type="monotone" dataKey="value" stroke="hsl(217, 91%, 60%)" strokeWidth={3} name="Actual" />
                      <Line type="monotone" dataKey="target" stroke="hsl(142, 76%, 36%)" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                      <Line type="monotone" dataKey="benchmark" stroke="hsl(47, 96%, 53%)" strokeWidth={2} strokeDasharray="3 3" name="Benchmark" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="text-white">Statistical Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Average</span>
                      <span className="font-bold text-white">87.7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Median</span>
                      <span className="font-bold text-white">88.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Standard Deviation</span>
                      <span className="font-bold text-white">5.2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Min/Max</span>
                      <span className="font-bold text-white">78 / 95</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="text-white">Performance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="sci-fi-chart rounded-lg p-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[
                        { range: '70-80', count: 2 },
                        { range: '80-90', count: 8 },
                        { range: '90-100', count: 6 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 91%, 60%, 0.2)" />
                        <XAxis dataKey="range" stroke="hsl(210, 40%, 95%)" />
                        <YAxis stroke="hsl(210, 40%, 95%)" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(220, 27%, 12%)', 
                            border: '1px solid hsl(217, 91%, 60%, 0.3)',
                            borderRadius: '8px',
                            color: 'hsl(210, 40%, 95%)'
                          }} 
                        />
                        <Bar dataKey="count" fill="hsl(217, 91%, 60%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-4">
              {aiInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <Card key={index} className="card-enhanced">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${
                          insight.type === 'prediction' ? 'bg-blue-500/20' :
                          insight.type === 'recommendation' ? 'bg-green-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            insight.type === 'prediction' ? 'text-blue-400' :
                            insight.type === 'recommendation' ? 'text-green-400' :
                            'text-yellow-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white mb-2">{insight.title}</h3>
                          <p className="text-blue-300 mb-3">{insight.description}</p>
                          {insight.confidence && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-blue-300">Confidence:</span>
                              <div className="flex-1 bg-blue-500/20 rounded-full h-2 max-w-32">
                                <div 
                                  className="bg-blue-400 h-2 rounded-full" 
                                  style={{ width: `${insight.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-blue-400">{insight.confidence}%</span>
                            </div>
                          )}
                          {insight.priority && (
                            <Badge variant={insight.priority === 'high' ? 'destructive' : 'default'}>
                              {insight.priority} Priority
                            </Badge>
                          )}
                          {insight.severity && (
                            <Badge variant={insight.severity === 'warning' ? 'default' : 'destructive'}>
                              {insight.severity}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div className="space-y-4">
              {actionItems.map((action) => (
                <Card key={action.id} className="card-enhanced">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          action.type === 'maintenance' ? 'bg-orange-500/20' :
                          action.type === 'workflow' ? 'bg-blue-500/20' :
                          'bg-purple-500/20'
                        }`}>
                          {action.type === 'maintenance' && <Wrench className="w-5 h-5 text-orange-400" />}
                          {action.type === 'workflow' && <PlayCircle className="w-5 h-5 text-blue-400" />}
                          {action.type === 'control' && <Target className="w-5 h-5 text-purple-400" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{action.title}</h3>
                          <p className="text-sm text-blue-300">Assigned to: {action.assignee}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={action.priority === 'high' ? 'destructive' : action.priority === 'medium' ? 'default' : 'secondary'}>
                          {action.priority}
                        </Badge>
                        <div className="flex items-center space-x-1 text-blue-300">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{action.eta}</span>
                        </div>
                        <Button size="sm" onClick={() => executeAction(action.id)} className="sci-fi-button">
                          Execute
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="text-white">Data Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <span className="text-white">Primary Sensor Data</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <span className="text-white">System Logs</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <span className="text-white">External API</span>
                      <Badge variant="default">Delayed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="text-white">Data Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-300">Completeness</span>
                        <span className="text-white">98%</span>
                      </div>
                      <div className="w-full bg-blue-500/20 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-300">Accuracy</span>
                        <span className="text-white">95%</span>
                      </div>
                      <div className="w-full bg-blue-500/20 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-300">Timeliness</span>
                        <span className="text-white">92%</span>
                      </div>
                      <div className="w-full bg-blue-500/20 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}