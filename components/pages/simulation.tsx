'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ActionConfirmationModal } from '@/components/shared/action-confirmation-modal';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward,
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Brain,
  Zap,
  Target,
  BarChart3,
  Eye,
  Settings,
  MapPin,
  Plane,
  Shield,
  Luggage,
  CreditCard,
  Coffee
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SimulationStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  status: 'pending' | 'active' | 'completed' | 'delayed' | 'optimized';
  aiIntervention?: {
    type: 'optimization' | 'alert' | 'prediction' | 'automation';
    description: string;
    impact: string;
    confidence: number;
  };
  metrics: {
    throughput: number;
    waitTime: number;
    efficiency: number;
  };
}

interface Passenger {
  id: string;
  name: string;
  flightNumber: string;
  currentStep: number;
  totalTime: number;
  status: 'on_track' | 'delayed' | 'critical';
  profile: 'standard' | 'premium' | 'family' | 'mobility_assist';
}

export function SimulationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState('passenger_turnaround');
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);

  const scenarios = [
    {
      id: 'passenger_turnaround',
      name: 'Outbound Passenger Turnaround Time',
      description: 'Complete passenger journey from terminal entry to aircraft boarding',
      duration: 120,
      complexity: 'high',
      aiFeatures: ['Predictive Analytics', 'Queue Optimization', 'Dynamic Routing']
    },
    {
      id: 'aircraft_turnaround',
      name: 'Aircraft Turnaround Operations',
      description: 'Complete aircraft servicing from arrival to departure',
      duration: 45,
      complexity: 'medium',
      aiFeatures: ['Resource Optimization', 'Predictive Maintenance', 'Delay Prevention']
    },
    {
      id: 'security_incident',
      name: 'Security Incident Response',
      description: 'Emergency response simulation with SOP execution',
      duration: 30,
      complexity: 'critical',
      aiFeatures: ['Threat Assessment', 'Resource Deployment', 'Communication Coordination']
    },
    {
      id: 'weather_disruption',
      name: 'Weather Disruption Management',
      description: 'Operations during severe weather conditions',
      duration: 180,
      complexity: 'high',
      aiFeatures: ['Impact Prediction', 'Resource Reallocation', 'Passenger Management']
    }
  ];

  const passengerTurnaroundSteps: SimulationStep[] = [
    {
      id: 'terminal_entry',
      name: 'Terminal Entry',
      description: 'Passenger arrives at terminal entrance with ID/security check',
      duration: 3,
      status: 'completed',
      aiIntervention: {
        type: 'optimization',
        description: 'AI facial recognition reduces entry processing time',
        impact: '40% faster entry processing',
        confidence: 94
      },
      metrics: { throughput: 450, waitTime: 1.2, efficiency: 96 }
    },
    {
      id: 'check_in',
      name: 'Check-in & Verification',
      description: 'Passenger verification, boarding pass issuance, seat allocation',
      duration: 8,
      status: 'completed',
      aiIntervention: {
        type: 'automation',
        description: 'AI-powered document verification and seat optimization',
        impact: '60% reduction in processing time',
        confidence: 91
      },
      metrics: { throughput: 180, waitTime: 2.5, efficiency: 89 }
    },
    {
      id: 'baggage_drop',
      name: 'Baggage Drop-off',
      description: 'Checked baggage handover, tagging, and BHS integration',
      duration: 5,
      status: 'active',
      aiIntervention: {
        type: 'prediction',
        description: 'AI predicts baggage handling bottlenecks',
        impact: 'Proactive resource allocation',
        confidence: 87
      },
      metrics: { throughput: 220, waitTime: 3.1, efficiency: 85 }
    },
    {
      id: 'security_screening',
      name: 'Security Screening',
      description: 'Passenger and carry-on luggage security screening',
      duration: 12,
      status: 'pending',
      aiIntervention: {
        type: 'optimization',
        description: 'AI queue management and threat assessment',
        impact: '25% reduction in wait times',
        confidence: 92
      },
      metrics: { throughput: 150, waitTime: 8.5, efficiency: 78 }
    },
    {
      id: 'immigration',
      name: 'Immigration Control',
      description: 'Border clearance via officer or biometric e-gate',
      duration: 6,
      status: 'pending',
      aiIntervention: {
        type: 'automation',
        description: 'Biometric AI reduces manual processing',
        impact: '70% automated processing',
        confidence: 96
      },
      metrics: { throughput: 200, waitTime: 2.8, efficiency: 93 }
    },
    {
      id: 'customs',
      name: 'Customs Declaration',
      description: 'Outbound customs processing (if applicable)',
      duration: 4,
      status: 'pending',
      metrics: { throughput: 300, waitTime: 1.5, efficiency: 95 }
    },
    {
      id: 'airside_waiting',
      name: 'Airside Activities',
      description: 'Departure lounge, shopping, dining, lounge access',
      duration: 45,
      status: 'pending',
      aiIntervention: {
        type: 'optimization',
        description: 'AI-driven passenger flow and retail recommendations',
        impact: '15% increase in retail revenue',
        confidence: 83
      },
      metrics: { throughput: 800, waitTime: 0, efficiency: 88 }
    },
    {
      id: 'boarding_gate',
      name: 'Gate Processing',
      description: 'Document verification, queue management, boarding preparation',
      duration: 15,
      status: 'pending',
      aiIntervention: {
        type: 'optimization',
        description: 'AI boarding sequence optimization',
        impact: '30% faster boarding process',
        confidence: 89
      },
      metrics: { throughput: 120, waitTime: 5.2, efficiency: 82 }
    },
    {
      id: 'aircraft_boarding',
      name: 'Aircraft Boarding',
      description: 'Passenger boarding bridge/bus, cabin entry, seating',
      duration: 20,
      status: 'pending',
      aiIntervention: {
        type: 'prediction',
        description: 'AI predicts boarding delays and optimizes sequence',
        impact: 'Reduced aircraft turnaround time',
        confidence: 85
      },
      metrics: { throughput: 180, waitTime: 3.8, efficiency: 86 }
    },
    {
      id: 'cabin_ready',
      name: 'Cabin Preparation',
      description: 'Baggage stowage, seating, manifest verification',
      duration: 8,
      status: 'pending',
      metrics: { throughput: 200, waitTime: 2.0, efficiency: 91 }
    }
  ];

  const mockPassengers: Passenger[] = [
    {
      id: 'PAX001',
      name: 'Sarah Johnson',
      flightNumber: 'UA1234',
      currentStep: 3,
      totalTime: 16,
      status: 'on_track',
      profile: 'premium'
    },
    {
      id: 'PAX002',
      name: 'Mike Chen',
      flightNumber: 'DL5678',
      currentStep: 4,
      totalTime: 28,
      status: 'delayed',
      profile: 'standard'
    },
    {
      id: 'PAX003',
      name: 'Emma Wilson',
      flightNumber: 'AA9012',
      currentStep: 2,
      totalTime: 12,
      status: 'on_track',
      profile: 'family'
    },
    {
      id: 'PAX004',
      name: 'Robert Davis',
      flightNumber: 'BA3456',
      currentStep: 5,
      totalTime: 35,
      status: 'critical',
      profile: 'mobility_assist'
    }
  ];

  const simulationMetrics = [
    { time: '0min', throughput: 0, efficiency: 0, aiOptimization: 0 },
    { time: '15min', throughput: 45, efficiency: 78, aiOptimization: 12 },
    { time: '30min', throughput: 89, efficiency: 82, aiOptimization: 25 },
    { time: '45min', throughput: 134, efficiency: 85, aiOptimization: 38 },
    { time: '60min', throughput: 178, efficiency: 88, aiOptimization: 52 },
    { time: '75min', throughput: 223, efficiency: 91, aiOptimization: 67 },
    { time: '90min', throughput: 267, efficiency: 89, aiOptimization: 74 },
    { time: '105min', throughput: 312, efficiency: 92, aiOptimization: 81 },
    { time: '120min', throughput: 356, efficiency: 94, aiOptimization: 89 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const maxTime = scenarios.find(s => s.id === selectedScenario)?.duration || 120;
          return prev >= maxTime ? 0 : prev + simulationSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed, selectedScenario]);

  const executeAIIntervention = (step: SimulationStep) => {
    if (step.aiIntervention) {
      setPendingAction({
        title: `AI Intervention: ${step.aiIntervention.type.charAt(0).toUpperCase() + step.aiIntervention.type.slice(1)}`,
        type: step.aiIntervention.type,
        description: step.aiIntervention.description,
        details: [
          `Step: ${step.name}`,
          `Impact: ${step.aiIntervention.impact}`,
          `Confidence: ${step.aiIntervention.confidence}%`,
          'Real-time optimization applied',
          'Performance metrics updated'
        ],
        confidence: step.aiIntervention.confidence
      });
      setShowActionModal(true);
    }
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario);
  const currentProgress = selectedScenarioData ? (currentTime / selectedScenarioData.duration) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Simulation & Review Center</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Brain className="w-3 h-3" />
            <span>AI-Powered</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>Live Simulation</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenarios">Simulation Scenarios</TabsTrigger>
          <TabsTrigger value="live">Live Simulation</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="rehearsal">Mock Rehearsals</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Target className="w-5 h-5 text-blue-400" />
                <span>Available Simulation Scenarios</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenarios.map((scenario) => (
                  <Card 
                    key={scenario.id} 
                    className={`cursor-pointer transition-all ${
                      selectedScenario === scenario.id ? 'border-blue-500 bg-blue-500/20' : 'hover:shadow-md'
                    } card-enhanced`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-white">{scenario.name}</h3>
                        <Badge variant={
                          scenario.complexity === 'critical' ? 'destructive' :
                          scenario.complexity === 'high' ? 'default' : 'secondary'
                        }>
                          {scenario.complexity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-blue-300 mb-3">{scenario.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-blue-300">{scenario.duration} minutes</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-blue-400">AI Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {scenario.aiFeatures.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs sci-fi-badge">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedScenario === 'passenger_turnaround' && (
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-white">Outbound Passenger Turnaround Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {passengerTurnaroundSteps.map((step, index) => (
                    <Card key={step.id} className="widget-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              step.status === 'completed' ? 'bg-green-500' :
                              step.status === 'active' ? 'bg-blue-500' :
                              step.status === 'delayed' ? 'bg-red-500' :
                              'bg-gray-500'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{step.name}</h4>
                              <p className="text-sm text-blue-300">{step.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              step.status === 'completed' ? 'secondary' :
                              step.status === 'active' ? 'default' :
                              step.status === 'delayed' ? 'destructive' :
                              'outline'
                            }>
                              {step.status.replace('_', ' ')}
                            </Badge>
                            <span className="text-sm text-blue-300">{step.duration}min</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="text-center p-2 bg-blue-500/10 rounded">
                            <p className="text-lg font-bold text-blue-400">{step.metrics.throughput}</p>
                            <p className="text-xs text-blue-300">Throughput/hr</p>
                          </div>
                          <div className="text-center p-2 bg-yellow-500/10 rounded">
                            <p className="text-lg font-bold text-yellow-400">{step.metrics.waitTime}min</p>
                            <p className="text-xs text-yellow-300">Avg Wait Time</p>
                          </div>
                          <div className="text-center p-2 bg-green-500/10 rounded">
                            <p className="text-lg font-bold text-green-400">{step.metrics.efficiency}%</p>
                            <p className="text-xs text-green-300">Efficiency</p>
                          </div>
                        </div>
                        
                        {step.aiIntervention && (
                          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Brain className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium text-purple-300">AI Intervention</span>
                                <Badge variant="outline" className="text-xs">
                                  {step.aiIntervention.confidence}% confidence
                                </Badge>
                              </div>
                              <Button size="sm" onClick={() => executeAIIntervention(step)} className="sci-fi-button">
                                Execute
                              </Button>
                            </div>
                            <p className="text-sm text-purple-200 mt-2">{step.aiIntervention.description}</p>
                            <p className="text-xs text-purple-300 mt-1">Impact: {step.aiIntervention.impact}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          {/* Simulation Controls */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Play className="w-5 h-5 text-green-400" />
                <span>Live Simulation Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`sci-fi-button ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button onClick={resetSimulation} variant="outline" className="sci-fi-button">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-300">Speed:</span>
                    {[0.5, 1, 2, 4].map((speed) => (
                      <Button
                        key={speed}
                        size="sm"
                        variant={simulationSpeed === speed ? 'default' : 'outline'}
                        onClick={() => setSimulationSpeed(speed)}
                        className="sci-fi-button"
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</p>
                  <p className="text-sm text-blue-300">Simulation Time</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">Progress</span>
                  <span className="text-white">{currentProgress.toFixed(1)}%</span>
                </div>
                <Progress value={currentProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Live Passenger Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Live Passenger Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPassengers.map((passenger) => (
                    <div key={passenger.id} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            passenger.status === 'on_track' ? 'bg-green-500' :
                            passenger.status === 'delayed' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <span className="font-medium text-white">{passenger.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {passenger.profile.replace('_', ' ')}
                          </Badge>
                        </div>
                        <span className="text-sm text-blue-300">{passenger.flightNumber}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-300">
                          Step {passenger.currentStep}/10: {passengerTurnaroundSteps[passenger.currentStep - 1]?.name}
                        </span>
                        <span className="text-sm font-medium text-white">{passenger.totalTime}min</span>
                      </div>
                      
                      <Progress 
                        value={(passenger.currentStep / passengerTurnaroundSteps.length) * 100} 
                        className="h-1 mt-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>AI Interventions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-300">Queue Optimization Applied</span>
                    </div>
                    <p className="text-xs text-green-200">Security checkpoint wait time reduced by 25%</p>
                  </div>
                  
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Brain className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-300">Predictive Alert</span>
                    </div>
                    <p className="text-xs text-blue-200">Baggage handling bottleneck predicted in 15 minutes</p>
                  </div>
                  
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-300">Route Optimization</span>
                    </div>
                    <p className="text-xs text-purple-200">Alternative path suggested for mobility-assist passenger</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white">Simulation Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="sci-fi-chart rounded-lg p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={simulationMetrics}>
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
                    <Line type="monotone" dataKey="throughput" stroke="hsl(217, 91%, 60%)" strokeWidth={3} name="Throughput" />
                    <Line type="monotone" dataKey="efficiency" stroke="hsl(142, 76%, 36%)" strokeWidth={3} name="Efficiency %" />
                    <Line type="monotone" dataKey="aiOptimization" stroke="hsl(280, 100%, 70%)" strokeWidth={3} name="AI Optimization %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-white">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">94.2%</p>
                    <p className="text-sm text-blue-300">Overall Efficiency</p>
                  </div>
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">89%</p>
                    <p className="text-sm text-green-300">AI Optimization</p>
                  </div>
                  <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-purple-400">356</p>
                    <p className="text-sm text-purple-300">Passengers/Hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-white">AI Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-300">Time Savings</span>
                    <span className="font-bold text-green-400">-32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-300">Queue Reduction</span>
                    <span className="font-bold text-green-400">-45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-300">Efficiency Gain</span>
                    <span className="font-bold text-green-400">+28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-300">Cost Reduction</span>
                    <span className="font-bold text-green-400">-18%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-white">Bottleneck Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-red-500/10 rounded">
                    <span className="text-red-300">Security Screening</span>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded">
                    <span className="text-yellow-300">Baggage Drop</span>
                    <Badge variant="default">Moderate</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                    <span className="text-green-300">Check-in</span>
                    <Badge variant="secondary">Optimized</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rehearsal" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Settings className="w-5 h-5 text-orange-400" />
                <span>Mock Rehearsal Center</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Scheduled Rehearsals</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">Emergency Evacuation Drill</span>
                        <Badge variant="default">Tomorrow 09:00</Badge>
                      </div>
                      <p className="text-sm text-blue-300">Full terminal evacuation simulation with AI coordination</p>
                    </div>
                    
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">Peak Hour Stress Test</span>
                        <Badge variant="secondary">Weekly</Badge>
                      </div>
                      <p className="text-sm text-green-300">Maximum capacity simulation with AI optimization</p>
                    </div>
                    
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">System Failure Recovery</span>
                        <Badge variant="outline">Monthly</Badge>
                      </div>
                      <p className="text-sm text-purple-300">Critical system failure response with backup procedures</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Training Scenarios</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start sci-fi-button">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Security Threat Response
                    </Button>
                    <Button className="w-full justify-start sci-fi-button">
                      <Plane className="w-4 h-4 mr-2" />
                      Aircraft Emergency Landing
                    </Button>
                    <Button className="w-full justify-start sci-fi-button">
                      <Users className="w-4 h-4 mr-2" />
                      Mass Passenger Disruption
                    </Button>
                    <Button className="w-full justify-start sci-fi-button">
                      <Zap className="w-4 h-4 mr-2" />
                      Power Grid Failure
                    </Button>
                  </div>
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
            console.log('Simulation action executed:', pendingAction);
          }}
          action={pendingAction}
        />
      )}
    </div>
  );
}