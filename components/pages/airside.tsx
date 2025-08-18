'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ActionConfirmationModal } from '@/components/shared/action-confirmation-modal';
import { 
  Plane, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle,
  Radar,
  Wind,
  Eye,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Target,
  Activity,
  Thermometer,
  CloudRain,
  Navigation,
  Wifi,
  Settings,
  BarChart3,
  Timer,
  Gauge,
  Route,
  Satellite
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, AreaChart, Area, BarChart, Bar } from 'recharts';

export function AirsidePage() {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [selectedStand, setSelectedStand] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);
  const [liveData, setLiveData] = useState<any>({});

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData({
        timestamp: new Date().toISOString(),
        runwayCapacity: Math.floor(Math.random() * 20) + 70,
        weatherImpact: Math.floor(Math.random() * 30) + 5,
        trafficDensity: Math.floor(Math.random() * 40) + 60,
        predictedDelays: Math.floor(Math.random() * 15) + 5
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const runwayData = [
    { name: '10:00', runway10L: 8, runway14R: 12, runway22L: 6, capacity: 85, weather: 95, efficiency: 88 },
    { name: '11:00', runway10L: 12, runway14R: 15, runway22L: 8, capacity: 78, weather: 92, efficiency: 85 },
    { name: '12:00', runway10L: 15, runway14R: 18, runway22L: 10, capacity: 92, weather: 88, efficiency: 90 },
    { name: '13:00', runway10L: 18, runway14R: 22, runway22L: 12, capacity: 95, weather: 85, efficiency: 87 },
    { name: '14:00', runway10L: 22, runway14R: 25, runway22L: 15, capacity: 88, weather: 82, efficiency: 84 },
    { name: '15:00', runway10L: 20, runway14R: 24, runway22L: 14, capacity: 90, weather: 78, efficiency: 82 },
  ];

  const taxiTimes = [
    { gate: 'A1', predicted: 8, actual: 9, x: 1, y: 8, confidence: 94 },
    { gate: 'A5', predicted: 12, actual: 11, x: 5, y: 12, confidence: 89 },
    { gate: 'B3', predicted: 15, actual: 16, x: 3, y: 15, confidence: 92 },
    { gate: 'B7', predicted: 18, actual: 17, x: 7, y: 18, confidence: 87 },
    { gate: 'C2', predicted: 22, actual: 23, x: 2, y: 22, confidence: 91 },
    { gate: 'C9', predicted: 25, actual: 24, x: 9, y: 25, confidence: 88 },
  ];

  const flights = [
    { 
      id: 'UA1234', 
      aircraft: 'B737-800', 
      stand: 'A12', 
      gate: 'A12', 
      scheduledDep: '14:30', 
      estimatedDep: '14:35', 
      status: 'boarding', 
      tobt: '14:32', 
      tsat: '14:40',
      aiPrediction: { delay: 5, confidence: 92, factors: ['passenger boarding', 'catering delay'] },
      optimization: { fuelSaving: 120, timeSaving: 3, carbonReduction: 45 }
    },
    { 
      id: 'AA5678', 
      aircraft: 'A320', 
      stand: 'B7', 
      gate: 'B7', 
      scheduledDep: '14:45', 
      estimatedDep: '14:48', 
      status: 'pushback', 
      tobt: '14:45', 
      tsat: '14:52',
      aiPrediction: { delay: 3, confidence: 88, factors: ['ground traffic', 'weather'] },
      optimization: { fuelSaving: 85, timeSaving: 2, carbonReduction: 32 }
    },
    { 
      id: 'DL9012', 
      aircraft: 'B777-300', 
      stand: 'C3', 
      gate: 'C3', 
      scheduledDep: '15:00', 
      estimatedDep: '15:05', 
      status: 'taxi', 
      tobt: '15:02', 
      tsat: '15:08',
      aiPrediction: { delay: 5, confidence: 95, factors: ['runway congestion'] },
      optimization: { fuelSaving: 200, timeSaving: 4, carbonReduction: 78 }
    },
    { 
      id: 'WN3456', 
      aircraft: 'B737-700', 
      stand: 'A8', 
      gate: 'A8', 
      scheduledDep: '15:15', 
      estimatedDep: '15:12', 
      status: 'ready', 
      tobt: '15:10', 
      tsat: '15:15',
      aiPrediction: { delay: -3, confidence: 90, factors: ['early completion'] },
      optimization: { fuelSaving: 95, timeSaving: 5, carbonReduction: 38 }
    },
  ];

  const stands = [
    { 
      id: 'A12', 
      status: 'occupied', 
      aircraft: 'UA1234', 
      avdgs: 'operational', 
      lastMaintenance: '2 days ago',
      aiHealth: 95,
      predictedIssues: [],
      optimization: { efficiency: 92, nextMaintenance: '15 days' },
      sensors: { temperature: 22, vibration: 'normal', power: 'stable' }
    },
    { 
      id: 'A8', 
      status: 'occupied', 
      aircraft: 'WN3456', 
      avdgs: 'operational', 
      lastMaintenance: '1 day ago',
      aiHealth: 98,
      predictedIssues: [],
      optimization: { efficiency: 96, nextMaintenance: '28 days' },
      sensors: { temperature: 21, vibration: 'normal', power: 'stable' }
    },
    { 
      id: 'B7', 
      status: 'occupied', 
      aircraft: 'AA5678', 
      avdgs: 'fault', 
      lastMaintenance: '5 days ago',
      aiHealth: 65,
      predictedIssues: ['Display malfunction predicted in 48h', 'Sensor calibration needed'],
      optimization: { efficiency: 78, nextMaintenance: 'Immediate' },
      sensors: { temperature: 28, vibration: 'elevated', power: 'fluctuating' }
    },
    { 
      id: 'C3', 
      status: 'occupied', 
      aircraft: 'DL9012', 
      avdgs: 'operational', 
      lastMaintenance: '3 days ago',
      aiHealth: 88,
      predictedIssues: ['Minor sensor drift detected'],
      optimization: { efficiency: 89, nextMaintenance: '12 days' },
      sensors: { temperature: 23, vibration: 'normal', power: 'stable' }
    },
    { 
      id: 'A15', 
      status: 'available', 
      aircraft: null, 
      avdgs: 'operational', 
      lastMaintenance: '1 day ago',
      aiHealth: 94,
      predictedIssues: [],
      optimization: { efficiency: 94, nextMaintenance: '22 days' },
      sensors: { temperature: 20, vibration: 'normal', power: 'stable' }
    },
    { 
      id: 'B12', 
      status: 'maintenance', 
      aircraft: null, 
      avdgs: 'maintenance', 
      lastMaintenance: 'Today',
      aiHealth: 45,
      predictedIssues: ['System upgrade in progress'],
      optimization: { efficiency: 0, nextMaintenance: 'In progress' },
      sensors: { temperature: 25, vibration: 'offline', power: 'offline' }
    },
  ];

  const surfaceMovements = [
    { 
      id: 'UA1234', 
      type: 'aircraft', 
      x: 120, 
      y: 153, 
      heading: 90, 
      speed: 15, 
      status: 'taxiing',
      route: ['A12', 'T1', 'R1', 'RW10L'],
      eta: '14:42',
      aiPrediction: { conflict: false, delay: 0, optimizedRoute: true }
    },
    { 
      id: 'AA5678', 
      type: 'aircraft', 
      x: 220, 
      y: 203, 
      heading: 180, 
      speed: 12, 
      status: 'pushback',
      route: ['B7', 'pushback', 'T2'],
      eta: '14:50',
      aiPrediction: { conflict: false, delay: 2, optimizedRoute: false }
    },
    { 
      id: 'DL9012', 
      type: 'aircraft', 
      x: 320, 
      y: 253, 
      heading: 270, 
      speed: 18, 
      status: 'taxi_to_runway',
      route: ['C3', 'T3', 'R2', 'RW14R'],
      eta: '15:08',
      aiPrediction: { conflict: true, delay: 3, optimizedRoute: false }
    },
    { 
      id: 'GSE-001', 
      type: 'ground_vehicle', 
      x: 180, 
      y: 180, 
      heading: 45, 
      speed: 25, 
      status: 'service',
      route: ['Service Road', 'A15'],
      eta: '14:45',
      aiPrediction: { conflict: false, delay: 0, optimizedRoute: true }
    }
  ];

  const weatherData = {
    current: {
      metar: 'INTL 151851Z 28012KT 10SM FEW030 SCT250 24/18 A3012 RMK AO2 SLP203 T02440183 56014',
      parsed: {
        wind: { direction: 280, speed: 12, gusts: null },
        visibility: '10 SM',
        temperature: 24,
        dewpoint: 18,
        pressure: 30.12,
        conditions: 'Few clouds at 3000ft, Scattered at 25000ft'
      },
      aiAnalysis: {
        operationalImpact: 'Minimal',
        riskLevel: 'Low',
        recommendations: ['Continue normal operations', 'Monitor wind shifts'],
        confidence: 94
      }
    },
    forecast: [
      { 
        time: '15:00-18:00', 
        conditions: 'Wind: 290° @ 15kt, Visibility: 10SM', 
        impact: 'Good',
        aiPrediction: { delayRisk: 5, capacityImpact: 0, recommendations: ['Optimal conditions'] }
      },
      { 
        time: '18:00-21:00', 
        conditions: 'Wind: 270° @ 18kt G25kt, Visibility: 8SM', 
        impact: 'Caution',
        aiPrediction: { delayRisk: 15, capacityImpact: 10, recommendations: ['Monitor crosswind limits', 'Prepare for reduced capacity'] }
      },
      { 
        time: '21:00-00:00', 
        conditions: 'Wind: 250° @ 22kt G30kt, Visibility: 6SM', 
        impact: 'Alert',
        aiPrediction: { delayRisk: 35, capacityImpact: 25, recommendations: ['Consider runway change', 'Implement holding procedures'] }
      }
    ]
  };

  const optimizeTSAT = (flightId: string) => {
    const flight = flights.find(f => f.id === flightId);
    if (flight) {
      setPendingAction({
        title: `AI TSAT Optimization - ${flightId}`,
        type: 'optimization',
        priority: 'high',
        description: `AI-optimized Target Start-up Approval Time for ${flightId}`,
        details: [
          `Current TSAT: ${flight.tsat}`,
          `Optimized TSAT: ${flight.tsat} (3 min earlier)`,
          `Fuel Saving: ${flight.optimization.fuelSaving}kg`,
          `Time Saving: ${flight.optimization.timeSaving} minutes`,
          `Carbon Reduction: ${flight.optimization.carbonReduction}kg CO2`,
          `AI Confidence: ${flight.aiPrediction.confidence}%`
        ],
        assignee: 'Air Traffic Control',
        eta: '2 minutes',
        confidence: flight.aiPrediction.confidence
      });
      setShowActionModal(true);
    }
  };

  const optimizeStand = (standId: string) => {
    const stand = stands.find(s => s.id === standId);
    if (stand) {
      setPendingAction({
        title: `AI Stand Optimization - ${standId}`,
        type: 'optimization',
        priority: stand.aiHealth < 70 ? 'high' : 'medium',
        description: `AI-driven stand performance optimization`,
        details: [
          `Current Health Score: ${stand.aiHealth}%`,
          `Efficiency Rating: ${stand.optimization.efficiency}%`,
          `Next Maintenance: ${stand.optimization.nextMaintenance}`,
          `Predicted Issues: ${stand.predictedIssues.length}`,
          ...stand.predictedIssues,
          'Maintenance team will be notified'
        ],
        assignee: 'Ground Operations',
        eta: '15 minutes',
        confidence: 91
      });
      setShowActionModal(true);
    }
  };

  const resolveConflict = (movementId: string) => {
    const movement = surfaceMovements.find(m => m.id === movementId);
    if (movement) {
      setPendingAction({
        title: `AI Conflict Resolution - ${movementId}`,
        type: 'control',
        priority: 'high',
        description: `AI-powered surface movement conflict resolution`,
        details: [
          `Aircraft: ${movementId}`,
          `Current Route: ${movement.route.join(' → ')}`,
          `Optimized Route: A12 → T4 → R3 → RW10L`,
          `Conflict Avoided: Ground traffic separation`,
          `Time Saved: 4 minutes`,
          `Fuel Saved: 85kg`
        ],
        assignee: 'Ground Movement Control',
        eta: '3 minutes',
        confidence: 96
      });
      setShowActionModal(true);
    }
  };

  const generateWeatherAction = () => {
    setPendingAction({
      title: 'AI Weather Impact Analysis',
      type: 'forecast',
      description: 'Predictive weather impact assessment',
      details: [
        `Current Conditions: ${weatherData.current.parsed.conditions}`,
        `Operational Impact: ${weatherData.current.aiAnalysis.operationalImpact}`,
        `Risk Level: ${weatherData.current.aiAnalysis.riskLevel}`,
        `Next 3 Hours: 15% delay risk increase`,
        `Recommended Actions: ${weatherData.current.aiAnalysis.recommendations.join(', ')}`,
        'Continuous monitoring active'
      ],
      confidence: weatherData.current.aiAnalysis.confidence
    });
    setShowActionModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Airside Operations</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Wind className="w-3 h-3" />
            <span>Wind: 280°/12kt</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>Visibility: 10km</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Activity className="w-3 h-3" />
            <span>Live Tracking</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">AI Overview</TabsTrigger>
          <TabsTrigger value="tobt-tsat">TOBT/TSAT Optimizer</TabsTrigger>
          <TabsTrigger value="stands">Smart Stand Management</TabsTrigger>
          <TabsTrigger value="tracking">Surface Intelligence</TabsTrigger>
          <TabsTrigger value="weather">Weather Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* AI-Driven KPI Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="kpi-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Gauge className="w-6 h-6 text-blue-400 mr-2" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-blue-400">{liveData.runwayCapacity || 85}%</p>
                <p className="text-xs text-blue-300">Runway Capacity</p>
                <p className="text-xs text-green-400">+5% vs forecast</p>
              </CardContent>
            </Card>

            <Card className="kpi-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Brain className="w-6 h-6 text-purple-400 mr-2" />
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-purple-400">94%</p>
                <p className="text-xs text-blue-300">AI Prediction Accuracy</p>
                <p className="text-xs text-purple-400">TSAT Optimization</p>
              </CardContent>
            </Card>

            <Card className="kpi-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 text-orange-400 mr-2" />
                  <Radar className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-orange-400">{liveData.trafficDensity || 75}%</p>
                <p className="text-xs text-blue-300">Traffic Density</p>
                <p className="text-xs text-orange-400">Real-time tracking</p>
              </CardContent>
            </Card>

            <Card className="kpi-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-green-400 mr-2" />
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-green-400">2.3min</p>
                <p className="text-xs text-blue-300">Avg Taxi Time Saved</p>
                <p className="text-xs text-green-400">AI Optimization</p>
              </CardContent>
            </Card>
          </div>

          {/* Historical vs Predictive Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span>Runway Performance Intelligence</span>
                  <Badge className="sci-fi-badge">Live AI Analysis</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="sci-fi-chart rounded-lg p-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={runwayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 91%, 60%, 0.2)" />
                      <XAxis dataKey="name" stroke="hsl(210, 40%, 95%)" />
                      <YAxis stroke="hsl(210, 40%, 95%)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(220, 27%, 12%)', 
                          border: '1px solid hsl(217, 91%, 60%, 0.3)',
                          borderRadius: '8px',
                          color: 'hsl(210, 40%, 95%)'
                        }} 
                      />
                      <Area type="monotone" dataKey="capacity" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Capacity %" />
                      <Area type="monotone" dataKey="weather" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.4} name="Weather Impact %" />
                      <Area type="monotone" dataKey="efficiency" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="AI Efficiency %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-blue-400">92%</p>
                    <p className="text-xs text-blue-300">Current Capacity</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-400">85%</p>
                    <p className="text-xs text-green-300">Weather Score</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-orange-400">88%</p>
                    <p className="text-xs text-orange-300">AI Efficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>AI Predictive Insights</span>
                  <Badge className="sci-fi-badge">ML Powered</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <h4 className="font-medium text-blue-300">Traffic Flow Prediction</h4>
                    </div>
                    <p className="text-sm text-white mb-2">Next 2 hours: 15% increase in departures expected</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={87} className="flex-1 h-2" />
                      <span className="text-xs text-blue-400">87% confidence</span>
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Target className="w-5 h-5 text-green-400" />
                      <h4 className="font-medium text-green-300">Optimization Opportunity</h4>
                    </div>
                    <p className="text-sm text-white mb-2">Runway 14R: Switch to optimize for wind conditions</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={92} className="flex-1 h-2" />
                      <span className="text-xs text-green-400">92% confidence</span>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-medium text-yellow-300">Weather Alert</h4>
                    </div>
                    <p className="text-sm text-white mb-2">Crosswind conditions developing in 3 hours</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={78} className="flex-1 h-2" />
                      <span className="text-xs text-yellow-400">78% confidence</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Flight Intelligence */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Plane className="w-5 h-5 text-blue-400" />
                <span>Active Flight Intelligence</span>
                <Badge className="sci-fi-badge">AI Monitoring</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {flights.map((flight) => (
                  <div key={flight.id} className="flight-card p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Plane className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="font-medium text-white">{flight.id}</p>
                          <p className="text-sm text-blue-300">{flight.aircraft}</p>
                        </div>
                        <Badge variant={
                          flight.status === 'boarding' ? 'secondary' : 
                          flight.status === 'pushback' ? 'default' : 
                          flight.status === 'taxi' ? 'destructive' : 'default'
                        }>
                          {flight.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">Stand {flight.stand}</p>
                        <p className="text-xs text-blue-300">TSAT: {flight.tsat}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-2 bg-blue-500/10 rounded">
                        <p className="text-lg font-bold text-blue-400">{flight.aiPrediction.delay > 0 ? '+' : ''}{flight.aiPrediction.delay}min</p>
                        <p className="text-xs text-blue-300">AI Prediction</p>
                      </div>
                      <div className="text-center p-2 bg-green-500/10 rounded">
                        <p className="text-lg font-bold text-green-400">{flight.optimization.fuelSaving}kg</p>
                        <p className="text-xs text-green-300">Fuel Saving</p>
                      </div>
                      <div className="text-center p-2 bg-purple-500/10 rounded">
                        <p className="text-lg font-bold text-purple-400">{flight.aiPrediction.confidence}%</p>
                        <p className="text-xs text-purple-300">Confidence</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-blue-300">
                        Factors: {flight.aiPrediction.factors.join(', ')}
                      </div>
                      <Button size="sm" onClick={() => optimizeTSAT(flight.id)} className="sci-fi-button">
                        <Zap className="w-3 h-3 mr-1" />
                        Optimize TSAT
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tobt-tsat" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>AI-Powered TOBT/TSAT Optimization</span>
                <Badge className="sci-fi-badge">Machine Learning</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flights.map((flight) => (
                  <div key={flight.id} className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 flight-card rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4 text-blue-400" />
                      <div>
                        <span className="font-medium text-white">{flight.id}</span>
                        <p className="text-xs text-blue-300">{flight.aircraft}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-blue-300">TOBT</p>
                      <p className="font-mono text-white">{flight.tobt}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-blue-300">TSAT</p>
                      <p className="font-mono text-white">{flight.tsat}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-blue-300">Scheduled</p>
                      <p className="font-mono text-white">{flight.scheduledDep}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-blue-300">AI Estimated</p>
                      <p className="font-mono text-white">{flight.estimatedDep}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-blue-300">Confidence</p>
                      <div className="flex items-center space-x-1">
                        <Progress value={flight.aiPrediction.confidence} className="w-12 h-2" />
                        <span className="text-xs text-white">{flight.aiPrediction.confidence}%</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button 
                        size="sm" 
                        onClick={() => optimizeTSAT(flight.id)}
                        className="sci-fi-button"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Optimize
                      </Button>
                      <Badge variant="outline" className="text-xs">
                        {flight.optimization.timeSaving}min saved
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Taxi Time Prediction Analysis */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white">AI Taxi Time Prediction vs Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="sci-fi-chart rounded-lg p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={taxiTimes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 91%, 60%, 0.2)" />
                    <XAxis dataKey="predicted" name="Predicted (min)" stroke="hsl(210, 40%, 95%)" />
                    <YAxis dataKey="actual" name="Actual (min)" stroke="hsl(210, 40%, 95%)" />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(220, 27%, 12%)', 
                        border: '1px solid hsl(217, 91%, 60%, 0.3)',
                        borderRadius: '8px',
                        color: 'hsl(210, 40%, 95%)'
                      }}
                      formatter={(value, name) => [`${value} min`, name]}
                    />
                    <Scatter name="Taxi Times" dataKey="actual" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-400">94%</p>
                  <p className="text-xs text-blue-300">Prediction Accuracy</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-400">2.3min</p>
                  <p className="text-xs text-green-300">Avg Time Saved</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-400">156kg</p>
                  <p className="text-xs text-purple-300">Fuel Saved/Day</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stands" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Settings className="w-5 h-5 text-blue-400" />
                <span>AI-Powered Stand & AVDGS Management</span>
                <Badge className="sci-fi-badge">Predictive Maintenance</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stands.map((stand) => (
                  <Card 
                    key={stand.id} 
                    className={`widget-card cursor-pointer transition-all ${
                      selectedStand === stand.id ? 'border-blue-500 bg-blue-500/20' : ''
                    } ${
                      stand.aiHealth < 70 ? 'border-red-500/50' : 
                      stand.aiHealth < 85 ? 'border-yellow-500/50' : 'border-green-500/50'
                    }`}
                    onClick={() => setSelectedStand(selectedStand === stand.id ? null : stand.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-white">Stand {stand.id}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            stand.status === 'occupied' ? 'default' : 
                            stand.status === 'available' ? 'secondary' : 'destructive'
                          }>
                            {stand.status}
                          </Badge>
                          <div className={`w-3 h-3 rounded-full ${
                            stand.aiHealth >= 85 ? 'bg-green-500' :
                            stand.aiHealth >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      </div>
                      
                      {stand.aircraft && (
                        <div className="flex items-center space-x-2 mb-3">
                          <Plane className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-white">{stand.aircraft}</span>
                        </div>
                      )}
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-blue-300">AI Health Score</span>
                          <span className="text-sm font-bold text-white">{stand.aiHealth}%</span>
                        </div>
                        <Progress value={stand.aiHealth} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-blue-300">Efficiency</span>
                          <span className="text-sm font-bold text-white">{stand.optimization.efficiency}%</span>
                        </div>
                        <Progress value={stand.optimization.efficiency} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                        <div className="text-center">
                          <Thermometer className="w-3 h-3 text-orange-400 mx-auto" />
                          <p className="text-white">{stand.sensors.temperature}°C</p>
                        </div>
                        <div className="text-center">
                          <Activity className="w-3 h-3 text-blue-400 mx-auto" />
                          <p className="text-white">{stand.sensors.vibration}</p>
                        </div>
                        <div className="text-center">
                          <Zap className="w-3 h-3 text-green-400 mx-auto" />
                          <p className="text-white">{stand.sensors.power}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`w-2 h-2 rounded-full ${
                          stand.avdgs === 'operational' ? 'bg-green-500' : 
                          stand.avdgs === 'fault' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-sm text-blue-300">AVDGS: {stand.avdgs}</span>
                      </div>
                      
                      {stand.predictedIssues.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-yellow-300 mb-1">AI Predictions:</p>
                          {stand.predictedIssues.map((issue, index) => (
                            <p key={index} className="text-xs text-yellow-400">• {issue}</p>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 sci-fi-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            optimizeStand(stand.id);
                          }}
                        >
                          <Brain className="w-3 h-3 mr-1" />
                          Optimize
                        </Button>
                        {stand.predictedIssues.length > 0 && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Alert
                          </Button>
                        )}
                      </div>
                      
                      {selectedStand === stand.id && (
                        <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                          <h4 className="font-medium mb-2 text-white">Detailed Analytics</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-blue-300">Last Maintenance:</span>
                              <span className="text-white">{stand.lastMaintenance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-300">Next Maintenance:</span>
                              <span className="text-white">{stand.optimization.nextMaintenance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-300">Utilization Rate:</span>
                              <span className="text-white">87%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-300">Revenue Impact:</span>
                              <span className="text-green-400">$2,400/day</span>
                            </div>
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

        <TabsContent value="tracking" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Radar className="w-5 h-5 text-blue-400" />
                <span>AI Surface Movement Intelligence (A-SMGCS/ADS-B/MLAT)</span>
                <Badge className="sci-fi-badge">Real-time AI</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Interactive Surface Map */}
                <div className="lg:col-span-2">
                  <div className="bg-slate-900 rounded-lg p-6 min-h-[500px] relative overflow-hidden">
                    <svg viewBox="0 0 600 400" className="w-full h-full">
                      {/* Airport Infrastructure */}
                      <defs>
                        <pattern id="runway" patternUnits="userSpaceOnUse" width="10" height="10">
                          <rect width="10" height="10" fill="hsl(217, 91%, 60%, 0.1)" />
                          <rect width="5" height="10" fill="hsl(217, 91%, 60%, 0.2)" />
                        </pattern>
                        <pattern id="taxiway" patternUnits="userSpaceOnUse" width="5" height="5">
                          <rect width="5" height="5" fill="hsl(142, 76%, 36%, 0.1)" />
                        </pattern>
                      </defs>
                      
                      {/* Runways */}
                      <rect x="50" y="150" width="500" height="20" fill="url(#runway)" stroke="hsl(217, 91%, 60%)" strokeWidth="2" />
                      <text x="300" y="145" textAnchor="middle" fill="hsl(217, 91%, 60%)" fontSize="12" fontWeight="bold">RW 10L/28R</text>
                      
                      <rect x="50" y="200" width="500" height="20" fill="url(#runway)" stroke="hsl(217, 91%, 60%)" strokeWidth="2" />
                      <text x="300" y="195" textAnchor="middle" fill="hsl(217, 91%, 60%)" fontSize="12" fontWeight="bold">RW 14R/32L</text>
                      
                      <rect x="50" y="250" width="500" height="20" fill="url(#runway)" stroke="hsl(217, 91%, 60%)" strokeWidth="2" />
                      <text x="300" y="245" textAnchor="middle" fill="hsl(217, 91%, 60%)" fontSize="12" fontWeight="bold">RW 22L/04R</text>
                      
                      {/* Taxiways */}
                      <rect x="100" y="100" width="10" height="250" fill="url(#taxiway)" stroke="hsl(142, 76%, 36%)" strokeWidth="1" />
                      <rect x="200" y="100" width="10" height="250" fill="url(#taxiway)" stroke="hsl(142, 76%, 36%)" strokeWidth="1" />
                      <rect x="300" y="100" width="10" height="250" fill="url(#taxiway)" stroke="hsl(142, 76%, 36%)" strokeWidth="1" />
                      <rect x="400" y="100" width="10" height="250" fill="url(#taxiway)" stroke="hsl(142, 76%, 36%)" strokeWidth="1" />
                      
                      {/* Terminal Areas */}
                      <rect x="150" y="50" width="300" height="40" fill="hsl(217, 91%, 60%, 0.3)" stroke="hsl(217, 91%, 60%)" strokeWidth="1" />
                      <text x="300" y="75" textAnchor="middle" fill="hsl(217, 91%, 60%)" fontSize="14" fontWeight="bold">Terminal Complex</text>
                      
                      {/* Aircraft and Vehicle Movements */}
                      {surfaceMovements.map((movement) => (
                        <g key={movement.id}>
                          {movement.type === 'aircraft' ? (
                            <g>
                              <circle 
                                cx={movement.x} 
                                cy={movement.y} 
                                r="12" 
                                fill={movement.aiPrediction.conflict ? "hsl(0, 84%, 60%)" : "hsl(217, 91%, 60%)"}
                                stroke="white"
                                strokeWidth="2"
                                className="cursor-pointer"
                                onClick={() => resolveConflict(movement.id)}
                              >
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                              </circle>
                              
                              {/* Aircraft heading indicator */}
                              <line
                                x1={movement.x}
                                y1={movement.y}
                                x2={movement.x + Math.cos(movement.heading * Math.PI / 180) * 20}
                                y2={movement.y + Math.sin(movement.heading * Math.PI / 180) * 20}
                                stroke="white"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                              />
                              
                              <text 
                                x={movement.x} 
                                y={movement.y - 20} 
                                textAnchor="middle" 
                                fill="white" 
                                fontSize="10"
                                fontWeight="bold"
                              >
                                {movement.id}
                              </text>
                              <text 
                                x={movement.x} 
                                y={movement.y + 30} 
                                textAnchor="middle" 
                                fill="hsl(142, 76%, 36%)" 
                                fontSize="8"
                              >
                                {movement.speed}kt | {movement.eta}
                              </text>
                            </g>
                          ) : (
                            <g>
                              <rect 
                                x={movement.x - 6} 
                                y={movement.y - 4} 
                                width="12" 
                                height="8" 
                                fill="hsl(47, 96%, 53%)"
                                stroke="white"
                                strokeWidth="1"
                                className="cursor-pointer"
                              />
                              <text 
                                x={movement.x} 
                                y={movement.y - 10} 
                                textAnchor="middle" 
                                fill="hsl(47, 96%, 53%)" 
                                fontSize="8"
                              >
                                GSE
                              </text>
                            </g>
                          )}
                        </g>
                      ))}
                      
                      {/* Route Predictions */}
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(142, 76%, 36%)" />
                        </marker>
                      </defs>
                      
                      {/* Predicted Routes */}
                      <path 
                        d="M 120 153 Q 150 130 200 160" 
                        stroke="hsl(142, 76%, 36%)" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeDasharray="5,5"
                        opacity="0.7"
                      />
                      <path 
                        d="M 220 203 Q 250 180 300 210" 
                        stroke="hsl(47, 96%, 53%)" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeDasharray="5,5"
                        opacity="0.7"
                      />
                    </svg>

                    {/* Live Data Overlay */}
                    <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
                      <h4 className="text-sm font-medium text-white mb-2">Live Intelligence</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-white">4 Aircraft Tracked</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-white">1 Ground Vehicle</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-white">1 Conflict Detected</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights Panel */}
                    <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                      <h4 className="text-sm font-medium text-purple-300 mb-2">AI Insights</h4>
                      <div className="space-y-1 text-xs">
                        <p className="text-white">Traffic Density: Medium</p>
                        <p className="text-white">Avg Speed: 16kt</p>
                        <p className="text-white">Conflicts: 1 predicted</p>
                        <p className="text-green-400">Efficiency: 94%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Movement Intelligence Panel */}
                <div className="space-y-4">
                  <Card className="widget-card">
                    <CardHeader>
                      <CardTitle className="text-white">Movement Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {surfaceMovements.filter(m => m.type === 'aircraft').map((movement) => (
                          <div key={movement.id} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-white">{movement.id}</span>
                              <Badge variant={movement.aiPrediction.conflict ? 'destructive' : 'secondary'}>
                                {movement.status}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-blue-300">Speed:</span>
                                <span className="text-white">{movement.speed}kt</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-300">ETA:</span>
                                <span className="text-white">{movement.eta}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-300">Route:</span>
                                <span className="text-white">{movement.route.join(' → ')}</span>
                              </div>
                              {movement.aiPrediction.conflict && (
                                <div className="mt-2">
                                  <p className="text-red-400">⚠ Conflict predicted</p>
                                  <Button 
                                    size="sm" 
                                    className="w-full mt-1 sci-fi-button"
                                    onClick={() => resolveConflict(movement.id)}
                                  >
                                    Resolve
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="widget-card">
                    <CardHeader>
                      <CardTitle className="text-white">AI Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-300">Tracking Accuracy</span>
                          <span className="font-bold text-green-400">99.2%</span>
                        </div>
                        <Progress value={99.2} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-blue-300">Conflict Prediction</span>
                          <span className="font-bold text-blue-400">96.8%</span>
                        </div>
                        <Progress value={96.8} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-blue-300">Route Optimization</span>
                          <span className="font-bold text-purple-400">94.5%</span>
                        </div>
                        <Progress value={94.5} className="h-2" />
                        
                        <div className="text-center mt-4 p-3 bg-green-500/10 rounded-lg">
                          <p className="text-sm text-green-400">System Performance: Excellent</p>
                          <p className="text-xs text-green-300">All tracking systems operational</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <CloudRain className="w-5 h-5 text-blue-400" />
                  <span>Current METAR Intelligence</span>
                  <Badge className="sci-fi-badge">AI Analysis</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* METAR Display */}
                  <div className="p-3 bg-slate-800 rounded-lg border border-blue-500/30">
                    <p className="font-mono text-sm text-blue-300 mb-2">Raw METAR:</p>
                    <p className="font-mono text-xs text-white bg-slate-900 p-2 rounded">
                      {weatherData.current.metar}
                    </p>
                  </div>
                  
                  {/* Parsed Weather Data */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                      <Wind className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-blue-400">
                        {weatherData.current.parsed.wind.direction}°/{weatherData.current.parsed.wind.speed}kt
                      </p>
                      <p className="text-xs text-blue-300">Wind</p>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-lg">
                      <Eye className="w-6 h-6 text-green-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-green-400">{weatherData.current.parsed.visibility}</p>
                      <p className="text-xs text-green-300">Visibility</p>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                      <Thermometer className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-orange-400">
                        {weatherData.current.parsed.temperature}°C/{weatherData.current.parsed.dewpoint}°C
                      </p>
                      <p className="text-xs text-orange-300">Temp/Dewpoint</p>
                    </div>
                    <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                      <Gauge className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-purple-400">{weatherData.current.parsed.pressure}</p>
                      <p className="text-xs text-purple-300">Pressure (inHg)</p>
                    </div>
                  </div>
                  
                  {/* AI Weather Analysis */}
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <h4 className="font-medium text-purple-300">AI Weather Analysis</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Operational Impact:</span>
                        <Badge variant="secondary">{weatherData.current.aiAnalysis.operationalImpact}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Risk Level:</span>
                        <Badge variant="secondary">{weatherData.current.aiAnalysis.riskLevel}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">AI Confidence:</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={weatherData.current.aiAnalysis.confidence} className="w-16 h-2" />
                          <span className="text-white">{weatherData.current.aiAnalysis.confidence}%</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-blue-300 mb-1">AI Recommendations:</p>
                        {weatherData.current.aiAnalysis.recommendations.map((rec, index) => (
                          <p key={index} className="text-xs text-white">• {rec}</p>
                        ))}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-3 sci-fi-button"
                      onClick={generateWeatherAction}
                    >
                      <Brain className="w-3 h-3 mr-1" />
                      Generate Action Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Navigation className="w-5 h-5 text-green-400" />
                  <span>AI Terminal Aerodrome Forecast (TAF)</span>
                  <Badge className="sci-fi-badge">Predictive</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weatherData.forecast.map((period, index) => (
                    <div key={index} className="taf-card p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">{period.time}</h4>
                        <Badge variant={
                          period.impact === 'Good' ? 'secondary' : 
                          period.impact === 'Caution' ? 'default' : 'destructive'
                        }>
                          {period.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-300 mb-3">{period.conditions}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-center p-2 bg-red-500/10 rounded">
                          <p className="text-lg font-bold text-red-400">{period.aiPrediction.delayRisk}%</p>
                          <p className="text-xs text-red-300">Delay Risk</p>
                        </div>
                        <div className="text-center p-2 bg-yellow-500/10 rounded">
                          <p className="text-lg font-bold text-yellow-400">{period.aiPrediction.capacityImpact}%</p>
                          <p className="text-xs text-yellow-300">Capacity Impact</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-blue-300 mb-1">AI Recommendations:</p>
                        {period.aiPrediction.recommendations.map((rec, recIndex) => (
                          <p key={recIndex} className="text-xs text-white">• {rec}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Impact Analysis */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white">AI Weather Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="sci-fi-chart rounded-lg p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={[
                    { time: '15:00', delayRisk: 5, capacityImpact: 0, windSpeed: 15 },
                    { time: '16:00', delayRisk: 8, capacityImpact: 5, windSpeed: 17 },
                    { time: '17:00', delayRisk: 12, capacityImpact: 8, windSpeed: 19 },
                    { time: '18:00', delayRisk: 15, capacityImpact: 10, windSpeed: 22 },
                    { time: '19:00', delayRisk: 25, capacityImpact: 18, windSpeed: 25 },
                    { time: '20:00', delayRisk: 35, capacityImpact: 25, windSpeed: 28 },
                  ]}>
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
                    <Area type="monotone" dataKey="delayRisk" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Delay Risk %" />
                    <Area type="monotone" dataKey="capacityImpact" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} name="Capacity Impact %" />
                    <Area type="monotone" dataKey="windSpeed" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Wind Speed (kt)" />
                  </AreaChart>
                </ResponsiveContainer>
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