'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Eye, TrendingUp, Users, Clock, DollarSign, Target, AlertTriangle, CheckCircle, Activity, Zap, Brain, BarChart3, PieChart, LineChart, Camera, Move3D, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface SimulationStep {
  id: string;
  name: string;
  duration: number;
  aiIntervention: string;
  confidence: number;
  status: 'pending' | 'active' | 'completed';
  metrics: {
    throughput: number;
    waitTime: number;
    efficiency: number;
  };
}

interface TangibleResult {
  category: string;
  metric: string;
  baseline: string;
  improved: string;
  improvement: string;
  annualValue: number;
  confidence: number;
}

const SimulationPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState('passenger-turnaround');
  const [cameraAngle, setCameraAngle] = useState({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState(1);

  const scenarios = [
    { id: 'passenger-turnaround', name: 'Outbound Passenger Turnaround', duration: '120 min' },
    { id: 'aircraft-turnaround', name: 'Aircraft Turnaround Operations', duration: '45 min' },
    { id: 'security-incident', name: 'Security Incident Response', duration: '30 min' },
    { id: 'weather-disruption', name: 'Weather Disruption Management', duration: '180 min' }
  ];

  const passengerSteps: SimulationStep[] = [
    {
      id: 'terminal-entry',
      name: 'Terminal Entry & ID Check',
      duration: 3,
      aiIntervention: 'Facial recognition pre-screening reduces wait time by 40%',
      confidence: 94,
      status: 'completed',
      metrics: { throughput: 450, waitTime: 1.8, efficiency: 92 }
    },
    {
      id: 'check-in',
      name: 'Check-in & Verification',
      duration: 8,
      aiIntervention: 'AI document verification and seat optimization',
      confidence: 97,
      status: 'completed',
      metrics: { throughput: 180, waitTime: 4.2, efficiency: 89 }
    },
    {
      id: 'baggage-drop',
      name: 'Baggage Drop-off',
      duration: 5,
      aiIntervention: 'Automated baggage sizing and weight prediction',
      confidence: 91,
      status: 'active',
      metrics: { throughput: 240, waitTime: 2.1, efficiency: 95 }
    },
    {
      id: 'security',
      name: 'Security Screening',
      duration: 12,
      aiIntervention: 'AI threat detection and queue optimization',
      confidence: 98,
      status: 'pending',
      metrics: { throughput: 320, waitTime: 6.8, efficiency: 87 }
    },
    {
      id: 'immigration',
      name: 'Immigration Control',
      duration: 6,
      aiIntervention: 'Biometric e-gate processing with risk assessment',
      confidence: 96,
      status: 'pending',
      metrics: { throughput: 280, waitTime: 2.4, efficiency: 93 }
    },
    {
      id: 'customs',
      name: 'Customs Declaration',
      duration: 4,
      aiIntervention: 'AI risk profiling for selective screening',
      confidence: 89,
      status: 'pending',
      metrics: { throughput: 360, waitTime: 1.2, efficiency: 96 }
    },
    {
      id: 'airside',
      name: 'Airside Activities',
      duration: 45,
      aiIntervention: 'Personalized routing and service recommendations',
      confidence: 85,
      status: 'pending',
      metrics: { throughput: 800, waitTime: 0, efficiency: 78 }
    },
    {
      id: 'gate-processing',
      name: 'Gate Processing',
      duration: 8,
      aiIntervention: 'Predictive boarding sequence optimization',
      confidence: 93,
      status: 'pending',
      metrics: { throughput: 220, waitTime: 3.5, efficiency: 91 }
    },
    {
      id: 'boarding',
      name: 'Aircraft Boarding',
      duration: 25,
      aiIntervention: 'AI-driven boarding group optimization',
      confidence: 88,
      status: 'pending',
      metrics: { throughput: 150, waitTime: 8.2, efficiency: 84 }
    },
    {
      id: 'cabin-prep',
      name: 'Cabin Preparation',
      duration: 4,
      aiIntervention: 'Automated manifest verification and seating',
      confidence: 99,
      status: 'pending',
      metrics: { throughput: 180, waitTime: 0.5, efficiency: 98 }
    }
  ];

  const tangibleResults: TangibleResult[] = [
    {
      category: 'Operational Efficiency',
      metric: 'Average Turnaround Time',
      baseline: '120 min',
      improved: '82 min',
      improvement: '-31.7%',
      annualValue: 8500000,
      confidence: 94
    },
    {
      category: 'Operational Efficiency',
      metric: 'Security Screening Throughput',
      baseline: '320 pax/hr',
      improved: '480 pax/hr',
      improvement: '+50.0%',
      annualValue: 4200000,
      confidence: 97
    },
    {
      category: 'Financial Impact',
      metric: 'Operational Cost per Passenger',
      baseline: '$28.50',
      improved: '$20.04',
      improvement: '-29.7%',
      annualValue: 6800000,
      confidence: 91
    },
    {
      category: 'Financial Impact',
      metric: 'Revenue per Passenger',
      baseline: '$45.20',
      improved: '$67.90',
      improvement: '+50.2%',
      annualValue: 9200000,
      confidence: 88
    },
    {
      category: 'Passenger Experience',
      metric: 'Satisfaction Score',
      baseline: '3.2/5.0',
      improved: '4.6/5.0',
      improvement: '+43.8%',
      annualValue: 0,
      confidence: 92
    },
    {
      category: 'Passenger Experience',
      metric: 'Missed Flight Rate',
      baseline: '2.8%',
      improved: '0.9%',
      improvement: '-67.9%',
      annualValue: 0,
      confidence: 95
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < passengerSteps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const totalAnnualValue = tangibleResults.reduce((sum, result) => sum + (result.annualValue || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Simulation & Review Center</h2>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedScenario} 
            onChange={(e) => setSelectedScenario(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
          >
            {scenarios.map(scenario => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name} ({scenario.duration})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3D Simulation Viewport */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Move3D className="w-5 h-5 mr-2 text-blue-400" />
            3D Terminal Simulation
          </h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
              <RotateCw className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* 3D Visualization Area */}
        <div className="relative h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          {/* Terminal Layout */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Terminal Sections */}
              <div className="absolute top-4 left-4 w-16 h-12 bg-blue-600 rounded opacity-80 flex items-center justify-center text-xs">
                Entry
              </div>
              <div className="absolute top-4 left-24 w-20 h-12 bg-green-600 rounded opacity-80 flex items-center justify-center text-xs">
                Check-in
              </div>
              <div className="absolute top-4 left-48 w-16 h-12 bg-yellow-600 rounded opacity-80 flex items-center justify-center text-xs">
                Baggage
              </div>
              <div className="absolute top-20 left-4 w-24 h-16 bg-red-600 rounded opacity-80 flex items-center justify-center text-xs">
                Security
              </div>
              <div className="absolute top-20 left-32 w-20 h-12 bg-purple-600 rounded opacity-80 flex items-center justify-center text-xs">
                Immigration
              </div>
              <div className="absolute top-40 left-4 w-32 h-20 bg-indigo-600 rounded opacity-80 flex items-center justify-center text-xs">
                Airside Lounge
              </div>
              <div className="absolute bottom-4 left-4 w-20 h-16 bg-orange-600 rounded opacity-80 flex items-center justify-center text-xs">
                Gate
              </div>
              <div className="absolute bottom-4 right-4 w-24 h-16 bg-teal-600 rounded opacity-80 flex items-center justify-center text-xs">
                Aircraft
              </div>

              {/* Animated Passenger Flow */}
              <div className="absolute top-8 left-8 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-8 left-28 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-8 left-52 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* AI Intervention Indicators */}
              {currentStep >= 2 && (
                <div className="absolute top-2 left-52 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
              )}
              
              {/* Real-time Metrics Overlay */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-60 rounded p-3 text-sm">
                <div className="text-cyan-400 font-semibold mb-2">Live Metrics</div>
                <div>Throughput: {passengerSteps[currentStep]?.metrics.throughput || 0}/hr</div>
                <div>Wait Time: {passengerSteps[currentStep]?.metrics.waitTime || 0} min</div>
                <div>Efficiency: {passengerSteps[currentStep]?.metrics.efficiency || 0}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlay}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
            <select 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
            >
              <option value={0.5}>0.5x Speed</option>
              <option value={1}>1x Speed</option>
              <option value={2}>2x Speed</option>
              <option value={4}>4x Speed</option>
            </select>
          </div>
          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {passengerSteps.length}
          </div>
        </div>
      </div>

      {/* Step-by-Step Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            Process Steps
          </h3>
          <div className="space-y-3">
            {passengerSteps.map((step, index) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg border-l-4 ${
                  index === currentStep
                    ? 'bg-blue-900 border-blue-400'
                    : index < currentStep
                    ? 'bg-green-900 border-green-400'
                    : 'bg-gray-700 border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{step.name}</h4>
                  <div className="flex items-center space-x-2">
                    {index < currentStep && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {index === currentStep && <Activity className="w-4 h-4 text-blue-400 animate-pulse" />}
                    <span className="text-sm text-gray-400">{step.duration} min</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">{step.aiIntervention}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-400">AI Confidence: {step.confidence}%</span>
                  <div className="flex space-x-4">
                    <span>Throughput: {step.metrics.throughput}/hr</span>
                    <span>Wait: {step.metrics.waitTime}min</span>
                    <span>Efficiency: {step.metrics.efficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-400" />
            AI Interventions
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-purple-900 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Active AI Systems</h4>
                <span className="text-sm bg-purple-700 px-2 py-1 rounded">Live</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Queue Optimization</div>
                  <div className="text-green-400">94.2% Efficiency</div>
                </div>
                <div>
                  <div className="text-gray-400">Predictive Analytics</div>
                  <div className="text-blue-400">97.1% Accuracy</div>
                </div>
                <div>
                  <div className="text-gray-400">Resource Allocation</div>
                  <div className="text-yellow-400">89.5% Optimal</div>
                </div>
                <div>
                  <div className="text-gray-400">Bottleneck Detection</div>
                  <div className="text-red-400">2 Critical</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cyan-900 rounded-lg">
              <h4 className="font-medium mb-2">Performance Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Time Savings</span>
                  <span className="text-green-400">+32%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Reduction</span>
                  <span className="text-green-400">+29.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>Passenger Satisfaction</span>
                  <span className="text-green-400">+43.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Operational Efficiency</span>
                  <span className="text-green-400">+38.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tangible Results Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center">
            <Target className="w-6 h-6 mr-2 text-green-400" />
            Tangible Results Analysis
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">
              ${(totalAnnualValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-400">Total Annual Value</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          {tangibleResults.map((result, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-gray-300">{result.category}</h4>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                  {result.confidence}% confidence
                </span>
              </div>
              <h5 className="font-semibold mb-3">{result.metric}</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Baseline:</span>
                  <span>{result.baseline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Improved:</span>
                  <span className="text-green-400">{result.improved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Change:</span>
                  <span className={result.improvement.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                    {result.improvement}
                  </span>
                </div>
                {result.annualValue > 0 && (
                  <div className="flex justify-between pt-2 border-t border-gray-600">
                    <span className="text-gray-400">Annual Value:</span>
                    <span className="text-yellow-400 font-semibold">
                      ${(result.annualValue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ROI Analysis */}
        <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-400" />
            Return on Investment Analysis
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">$5.0M</div>
              <div className="text-sm text-gray-400">Total Investment</div>
              <div className="text-xs text-gray-500 mt-1">AI Systems, Training, Infrastructure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">${(totalAnnualValue / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-gray-400">Annual Returns</div>
              <div className="text-xs text-gray-500 mt-1">Operational + Revenue + Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">18 mo</div>
              <div className="text-sm text-gray-400">Payback Period</div>
              <div className="text-xs text-gray-500 mt-1">Break-even timeline</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">576%</div>
              <div className="text-sm text-gray-400">5-Year ROI</div>
              <div className="text-xs text-gray-500 mt-1">Total return on investment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;