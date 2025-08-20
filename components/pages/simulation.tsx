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
  Coffee,
  Box,
  Maximize,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move3d,
  Calculator,
  DollarSign,
  Gauge,
  FileBarChart
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

interface TangibleResult {
  category: 'operational' | 'financial' | 'passenger' | 'efficiency' | 'safety';
  metric: string;
  baseline: number;
  optimized: number;
  improvement: number;
  unit: string;
  impact: 'high' | 'medium' | 'low';
  annualValue?: number;
  description: string;
}

export function SimulationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState('passenger_turnaround');
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);
  const [view3D, setView3D] = useState(false);
  const [cameraAngle, setCameraAngle] = useState({ x: 0, y: 0, z: 1 });
  const [showResults, setShowResults] = useState(false);

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

  const tangibleResults: TangibleResult[] = [
    {
      category: 'operational',
      metric: 'Average Turnaround Time',
      baseline: 120,
      optimized: 82,
      improvement: -31.7,
      unit: 'minutes',
      impact: 'high',
      annualValue: 2400000,
      description: 'AI optimization reduces passenger processing time through predictive queue management and dynamic routing'
    },
    {
      category: 'financial',
      metric: 'Operational Cost per Passenger',
      baseline: 45.80,
      optimized: 32.20,
      improvement: -29.7,
      unit: 'USD',
      impact: 'high',
      annualValue: 8500000,
      description: 'Reduced staffing requirements and improved resource allocation through AI-driven workforce optimization'
    },
    {
      category: 'passenger',
      metric: 'Passenger Satisfaction Score',
      baseline: 3.2,
      optimized: 4.6,
      improvement: 43.8,
      unit: '/5.0',
      impact: 'high',
      annualValue: 1200000,
      description: 'Improved experience through reduced wait times, personalized routing, and proactive communication'
    },
    {
      category: 'efficiency',
      metric: 'Queue Processing Efficiency',
      baseline: 68,
      optimized: 94,
      improvement: 38.2,
      unit: '%',
      impact: 'high',
      annualValue: 3200000,
      description: 'AI queue management and predictive analytics optimize passenger flow and reduce bottlenecks'
    },
    {
      category: 'operational',
      metric: 'Security Screening Throughput',
      baseline: 150,
      optimized: 225,
      improvement: 50.0,
      unit: 'pax/hour',
      impact: 'high',
      annualValue: 1800000,
      description: 'AI threat assessment and automated screening processes increase throughput while maintaining security'
    },
    {
      category: 'efficiency',
      metric: 'Gate Utilization Rate',
      baseline: 65,
      optimized: 89,
      improvement: 36.9,
      unit: '%',
      impact: 'medium',
      annualValue: 2100000,
      description: 'AI-driven gate assignment optimization maximizes infrastructure utilization'
    },
    {
      category: 'financial',
      metric: 'Revenue per Passenger',
      baseline: 28.50,
      optimized: 42.80,
      improvement: 50.2,
      unit: 'USD',
      impact: 'high',
      annualValue: 4600000,
      description: 'AI-driven retail recommendations and dwell time optimization increase non-aeronautical revenue'
    },
    {
      category: 'safety',
      metric: 'Incident Response Time',
      baseline: 8.5,
      optimized: 3.2,
      improvement: -62.4,
      unit: 'minutes',
      impact: 'high',
      annualValue: 800000,
      description: 'AI-powered incident detection and automated response protocols significantly reduce response times'
    },
    {
      category: 'passenger',
      metric: 'Missed Flight Rate',
      baseline: 2.8,
      optimized: 0.9,
      improvement: -67.9,
      unit: '%',
      impact: 'medium',
      annualValue: 1500000,
      description: 'Predictive analytics and proactive passenger notifications reduce missed flights'
    },
    {
      category: 'efficiency',
      metric: 'Staff Productivity Index',
      baseline: 72,
      optimized: 96,
      improvement: 33.3,
      unit: '%',
      impact: 'medium',
      annualValue: 2800000,
      description: 'AI workforce optimization and predictive scheduling improve staff efficiency and reduce overtime'
    }
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

  const toggle3DView = () => {
    setView3D(!view3D);
  };

  const rotateCameraAngle = (axis: 'x' | 'y' | 'z', direction: number) => {
    setCameraAngle(prev => ({
      ...prev,
      [axis]: prev[axis] + (direction * 15)
    }));
  };

  const showTangibleResults = () => {
    setShowResults(true);
  };

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario);
  const currentProgress = selectedScenarioData ? (currentTime / selectedScenarioData.duration) * 100 : 0;
  const totalAnnualValue = tangibleResults.reduce((sum, result) => sum + (result.annualValue || 0), 0);

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
          <TabsTrigger value="3d">3D Simulation</TabsTrigger>
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

        <TabsContent value="3d" className="space-y-6">
          {/* 3D Simulation Controls */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Box className="w-5 h-5 text-cyan-400" />
                <span>3D Simulation Environment</span>
                <Badge variant={view3D ? 'default' : 'outline'}>
                  {view3D ? '3D Active' : '2D View'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={toggle3DView}
                    className={`sci-fi-button ${view3D ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                  >
                    <Box className="w-4 h-4 mr-2" />
                    {view3D ? 'Switch to 2D' : 'Enable 3D View'}
                  </Button>
                  
                  {view3D && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-blue-300">Camera:</span>
                      <Button size="sm" onClick={() => rotateCameraAngle('x', 1)} className="sci-fi-button">
                        <RotateCw className="w-3 h-3" />
                      </Button>
                      <Button size="sm" onClick={() => rotateCameraAngle('y', 1)} className="sci-fi-button">
                        <Move3d className="w-3 h-3" />
                      </Button>
                      <Button size="sm" onClick={() => rotateCameraAngle('z', 1)} className="sci-fi-button">
                        <ZoomIn className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button onClick={showTangibleResults} className="sci-fi-button">
                    <Calculator className="w-4 h-4 mr-2" />
                    View Results Analysis
                  </Button>
                </div>
              </div>
              
              {/* 3D Terminal Visualization */}
              <div className="relative bg-slate-900 rounded-lg p-4 min-h-[600px] overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="sci-fi-badge">
                    {view3D ? '3D Perspective View' : '2D Top-Down View'}
                  </Badge>
                </div>
                
                <svg viewBox="0 0 800 600" className="w-full h-full">
                  <defs>
                    <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Terminal Building Structure */}
                  {view3D ? (
                    <g transform={`rotate(${cameraAngle.x}) scale(${cameraAngle.z})`}>
                      {/* 3D Terminal Building */}
                      <polygon 
                        points="100,200 700,200 750,150 150,150" 
                        fill="url(#terminalGradient)" 
                        stroke="hsl(217, 91%, 60%)" 
                        strokeWidth="2"
                      />
                      <polygon 
                        points="100,200 700,200 700,400 100,400" 
                        fill="hsl(220, 40%, 15%)" 
                        stroke="hsl(217, 91%, 60%)" 
                        strokeWidth="2"
                      />
                      <polygon 
                        points="700,200 750,150 750,350 700,400" 
                        fill="hsl(220, 40%, 12%)" 
                        stroke="hsl(217, 91%, 60%)" 
                        strokeWidth="2"
                      />
                      
                      {/* 3D Passenger Flow Paths */}
                      {passengerTurnaroundSteps.map((step, index) => {
                        const x = 120 + (index * 60);
                        const y = 250 + Math.sin(index * 0.5) * 20;
                        const z = 10 + index * 2;
                        
                        return (
                          <g key={step.id}>
                            {/* 3D Step Visualization */}
                            <circle
                              cx={x}
                              cy={y - z}
                              r="12"
                              fill={
                                step.status === 'completed' ? 'hsl(142, 76%, 36%)' :
                                step.status === 'active' ? 'hsl(217, 91%, 60%)' :
                                step.status === 'delayed' ? 'hsl(0, 84%, 60%)' :
                                'hsl(210, 30%, 75%)'
                              }
                              filter="url(#glow)"
                              className="cursor-pointer"
                              onClick={() => executeAIIntervention(step)}
                            >
                              <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite" />
                            </circle>
                            
                            {/* 3D Connection Lines */}
                            {index < passengerTurnaroundSteps.length - 1 && (
                              <line
                                x1={x + 12}
                                y1={y - z}
                                x2={x + 48}
                                y2={y + Math.sin((index + 1) * 0.5) * 20 - (10 + (index + 1) * 2)}
                                stroke="hsl(217, 91%, 60%)"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                opacity="0.7"
                              >
                                <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                              </line>
                            )}
                            
                            {/* Step Labels */}
                            <text
                              x={x}
                              y={y - z + 25}
                              textAnchor="middle"
                              fill="white"
                              fontSize="8"
                              fontWeight="bold"
                            >
                              {step.name.split(' ')[0]}
                            </text>
                            
                            {/* AI Intervention Indicators */}
                            {step.aiIntervention && (
                              <circle
                                cx={x + 15}
                                cy={y - z - 15}
                                r="4"
                                fill="hsl(280, 100%, 70%)"
                                filter="url(#glow)"
                              >
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
                              </circle>
                            )}
                          </g>
                        );
                      })}
                      
                      {/* 3D Passenger Avatars */}
                      {mockPassengers.map((passenger, index) => {
                        const stepIndex = passenger.currentStep - 1;
                        const x = 120 + (stepIndex * 60) + (index * 8);
                        const y = 280 + Math.sin(stepIndex * 0.5) * 20;
                        const z = 5;
                        
                        return (
                          <g key={passenger.id}>
                            <circle
                              cx={x}
                              cy={y - z}
                              r="3"
                              fill={
                                passenger.status === 'on_track' ? 'hsl(142, 76%, 36%)' :
                                passenger.status === 'delayed' ? 'hsl(47, 96%, 53%)' :
                                'hsl(0, 84%, 60%)'
                              }
                            >
                              <animate attributeName="cy" values={`${y - z};${y - z - 5};${y - z}`} dur="2s" repeatCount="indefinite" />
                            </circle>
                          </g>
                        );
                      })}
                    </g>
                  ) : (
                    /* 2D View */
                    <g>
                      {/* Terminal Layout */}
                      <rect x="50" y="150" width="700" height="300" fill="hsl(220, 40%, 15%)" stroke="hsl(217, 91%, 60%)" strokeWidth="2" />
                      <text x="400" y="140" textAnchor="middle" fill="hsl(217, 91%, 60%)" fontSize="16" fontWeight="bold">Terminal Building - Passenger Flow Simulation</text>
                      
                      {/* Process Flow Visualization */}
                      {passengerTurnaroundSteps.map((step, index) => {
                        const x = 80 + (index * 65);
                        const y = 200 + (index % 2) * 100;
                        
                        return (
                          <g key={step.id}>
                            <rect
                              x={x - 25}
                              y={y - 15}
                              width="50"
                              height="30"
                              fill={
                                step.status === 'completed' ? 'hsl(142, 76%, 36%, 0.3)' :
                                step.status === 'active' ? 'hsl(217, 91%, 60%, 0.3)' :
                                step.status === 'delayed' ? 'hsl(0, 84%, 60%, 0.3)' :
                                'hsl(210, 30%, 75%, 0.3)'
                              }
                              stroke={
                                step.status === 'completed' ? 'hsl(142, 76%, 36%)' :
                                step.status === 'active' ? 'hsl(217, 91%, 60%)' :
                                step.status === 'delayed' ? 'hsl(0, 84%, 60%)' :
                                'hsl(210, 30%, 75%)'
                              }
                              strokeWidth="2"
                              rx="4"
                              className="cursor-pointer"
                              onClick={() => executeAIIntervention(step)}
                            />
                            
                            <text
                              x={x}
                              y={y - 5}
                              textAnchor="middle"
                              fill="white"
                              fontSize="8"
                              fontWeight="bold"
                            >
                              {index + 1}
                            </text>
                            <text
                              x={x}
                              y={y + 5}
                              textAnchor="middle"
                              fill="white"
                              fontSize="6"
                            >
                              {step.name.split(' ')[0]}
                            </text>
                            
                            {/* Connection Lines */}
                            {index < passengerTurnaroundSteps.length - 1 && (
                              <line
                                x1={x + 25}
                                y1={y}
                                x2={x + 40}
                                y2={200 + ((index + 1) % 2) * 100}
                                stroke="hsl(217, 91%, 60%)"
                                strokeWidth="2"
                                strokeDasharray="3,3"
                                opacity="0.7"
                              />
                            )}
                            
                            {/* AI Intervention Indicators */}
                            {step.aiIntervention && (
                              <circle
                                cx={x + 20}
                                cy={y - 20}
                                r="3"
                                fill="hsl(280, 100%, 70%)"
                                filter="url(#glow)"
                              >
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
                              </circle>
                            )}
                          </g>
                        );
                      })}
                      
                      {/* Passenger Movement Visualization */}
                      {mockPassengers.map((passenger, index) => {
                        const stepIndex = passenger.currentStep - 1;
                        const x = 80 + (stepIndex * 65);
                        const y = 200 + (stepIndex % 2) * 100 + (index * 8);
                        
                        return (
                          <circle
                            key={passenger.id}
                            cx={x}
                            cy={y + 40}
                            r="2"
                            fill={
                              passenger.status === 'on_track' ? 'hsl(142, 76%, 36%)' :
                              passenger.status === 'delayed' ? 'hsl(47, 96%, 53%)' :
                              'hsl(0, 84%, 60%)'
                            }
                          >
                            <animate attributeName="cx" values={`${x};${x + 10};${x}`} dur="3s" repeatCount="indefinite" />
                          </circle>
                        );
                      })}
                    </g>
                  )}
                </svg>
                
                {/* 3D Controls Panel */}
                {view3D && (
                  <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
                    <h4 className="text-sm font-medium text-white mb-2">3D Controls</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button size="sm" onClick={() => rotateCameraAngle('x', 1)} className="sci-fi-button">
                        ↑
                      </Button>
                      <Button size="sm" onClick={() => rotateCameraAngle('y', 1)} className="sci-fi-button">
                        ↻
                      </Button>
                      <Button size="sm" onClick={() => rotateCameraAngle('z', 1)} className="sci-fi-button">
                        +
                      </Button>
                      <Button size="sm" onClick={() => rotateCameraAngle('x', -1)} className="sci-fi-button">
                        ↓
                      </Button>
                      <Button size="sm" onClick={() => rotateCameraAngle('y', -1)} className="sci-fi-button">
                        ↺
                      </Button>
                      <Button size="sm" onClick={() => rotateCameraAngle('z', -1)} className="sci-fi-button">
                        -
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step 3D Analysis */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white">Step-by-Step 3D Process Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Current Step Analysis</h4>
                  {passengerTurnaroundSteps.slice(0, 5).map((step, index) => (
                    <div key={step.id} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            step.status === 'completed' ? 'bg-green-500' :
                            step.status === 'active' ? 'bg-blue-500' :
                            step.status === 'delayed' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`}></div>
                          <span className="text-sm font-medium text-white">{step.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {step.metrics.efficiency}% efficiency
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="text-blue-400">{step.metrics.throughput}</p>
                          <p className="text-blue-300">pax/hr</p>
                        </div>
                        <div className="text-center">
                          <p className="text-yellow-400">{step.metrics.waitTime}min</p>
                          <p className="text-yellow-300">wait</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-400">{step.duration}min</p>
                          <p className="text-green-300">process</p>
                        </div>
                      </div>
                      
                      {step.aiIntervention && (
                        <div className="mt-2 p-2 bg-purple-500/10 rounded">
                          <div className="flex items-center space-x-1">
                            <Brain className="w-3 h-3 text-purple-400" />
                            <span className="text-xs text-purple-300">AI: {step.aiIntervention.impact}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Remaining Steps</h4>
                  {passengerTurnaroundSteps.slice(5).map((step, index) => (
                    <div key={step.id} className="p-3 bg-slate-500/10 border border-slate-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                          <span className="text-sm font-medium text-white">{step.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Pending
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="text-blue-400">{step.metrics.throughput}</p>
                          <p className="text-blue-300">pax/hr</p>
                        </div>
                        <div className="text-center">
                          <p className="text-yellow-400">{step.metrics.waitTime}min</p>
                          <p className="text-yellow-300">wait</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-400">{step.duration}min</p>
                          <p className="text-green-300">process</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

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
      
      {/* Tangible Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto modal-content cyber-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3 text-white neon-glow">
                  <FileBarChart className="w-6 h-6 text-green-400" />
                  <span className="holographic-text">Tangible Results Analysis</span>
                  <Badge variant="default">
                    Total Annual Value: ${(totalAnnualValue / 1000000).toFixed(1)}M
                  </Badge>
                </CardTitle>
                <Button onClick={() => setShowResults(false)} variant="outline">
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Executive Summary */}
                <Card className="card-enhanced">
                  <CardHeader>
                    <CardTitle className="text-white">Executive Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-green-500/10 rounded-lg">
                        <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-400">${(totalAnnualValue / 1000000).toFixed(1)}M</p>
                        <p className="text-sm text-green-300">Total Annual Value</p>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-400">38.2%</p>
                        <p className="text-sm text-blue-300">Avg Improvement</p>
                      </div>
                      <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                        <Gauge className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-400">94%</p>
                        <p className="text-sm text-purple-300">AI Confidence</p>
                      </div>
                      <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                        <Clock className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-400">18 months</p>
                        <p className="text-sm text-orange-300">ROI Payback</p>
                      </div>
                    </div>
                  </CardContent>
                {/* Detailed Results by Category */}
                <div className="space-y-4">
                  {['operational', 'financial', 'passenger', 'efficiency', 'safety'].map((category) => {
                    const categoryResults = tangibleResults.filter(r => r.category === category);
                    const categoryValue = categoryResults.reduce((sum, r) => sum + (r.annualValue || 0), 0);
                    
                    return (
                      <Card key={category} className="card-enhanced">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-white">
                            {category === 'operational' && <Settings className="w-5 h-5 text-blue-400" />}
                            {category === 'financial' && <DollarSign className="w-5 h-5 text-green-400" />}
                            {category === 'passenger' && <Users className="w-5 h-5 text-purple-400" />}
                            {category === 'efficiency' && <Zap className="w-5 h-5 text-yellow-400" />}
                            {category === 'safety' && <Shield className="w-5 h-5 text-red-400" />}
                            <span className="capitalize">{category} Impact</span>
                            <Badge variant="outline">
                              ${(categoryValue / 1000000).toFixed(1)}M Annual Value
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {categoryResults.map((result, index) => (
                              <div key={index} className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-medium text-white">{result.metric}</h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant={result.impact === 'high' ? 'destructive' : result.impact === 'medium' ? 'default' : 'secondary'}>
                                      {result.impact} impact
                                    </Badge>
                                    <span className={`font-bold ${result.improvement > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                      {result.improvement > 0 ? '+' : ''}{result.improvement.toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                  <div className="text-center p-2 bg-red-500/10 rounded">
                                    <p className="text-lg font-bold text-red-400">{result.baseline}</p>
                                    <p className="text-xs text-red-300">Baseline {result.unit}</p>
                                  </div>
                                  <div className="text-center p-2 bg-green-500/10 rounded">
                                    <p className="text-lg font-bold text-green-400">{result.optimized}</p>
                                    <p className="text-xs text-green-300">AI Optimized {result.unit}</p>
                                  </div>
                                  <div className="text-center p-2 bg-blue-500/10 rounded">
                                    <p className="text-lg font-bold text-blue-400">${(result.annualValue! / 1000000).toFixed(1)}M</p>
                                    <p className="text-xs text-blue-300">Annual Value</p>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-blue-300">{result.description}</p>
                                
                                {/* Progress Bar showing improvement */}
                                <div className="mt-3">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-blue-300">Improvement Progress</span>
                                    <span className="text-white">{Math.abs(result.improvement).toFixed(1)}%</span>
                                  </div>
                                  <div className="w-full bg-blue-500/20 rounded-full h-2">
                                    <div 
                                      className="bg-green-400 h-2 rounded-full" 
                                      style={{ width: `${Math.min(Math.abs(result.improvement), 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                </Card>
                {/* ROI Analysis */}
                <Card className="card-enhanced">
                  <CardHeader>
                    <CardTitle className="text-white">Return on Investment Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-white">Investment Breakdown</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-blue-300">AI System Implementation</span>
                            <span className="font-bold text-white">$2.4M</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-300">Staff Training & Change Management</span>
                            <span className="font-bold text-white">$800K</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-300">Infrastructure Upgrades</span>
                            <span className="font-bold text-white">$1.2M</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-300">Integration & Testing</span>
                            <span className="font-bold text-white">$600K</span>
                          </div>
                          <hr className="border-blue-500/30" />
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Total Investment</span>
                            <span className="font-bold text-red-400">$5.0M</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium text-white">Annual Returns</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-blue-300">Operational Savings</span>
                            <span className="font-bold text-green-400">$12.8M</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-300">Revenue Enhancement</span>
                            <span className="font-bold text-green-400">$8.4M</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-300">Risk Mitigation Value</span>
                            <span className="font-bold text-green-400">$3.2M</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-300">Efficiency Gains</span>
                            <span className="font-bold text-green-400">$4.0M</span>
                          </div>
                          <hr className="border-blue-500/30" />
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Total Annual Return</span>
                            <span className="font-bold text-green-400">${(totalAnnualValue / 1000000).toFixed(1)}M</span>
                          </div>
                        </div>
                        
                        <div className="text-center p-4 bg-green-500/10 rounded-lg">
                          <p className="text-sm text-green-300">ROI Payback Period</p>
                          <p className="text-2xl font-bold text-green-400">18 months</p>
                          <p className="text-xs text-green-300">576% ROI over 5 years</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
      
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