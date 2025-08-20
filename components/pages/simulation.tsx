'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Settings, 
  Eye, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Zap, 
  Brain, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Camera, 
  Move3D, 
  RotateCw, 
  ZoomIn, 
  ZoomOut,
  Plane,
  Shield,
  Cloud,
  Wrench,
  Navigation,
  MapPin,
  Timer,
  Gauge
} from 'lucide-react';

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
  position: { x: number; y: number };
  aiImpact: {
    timeSaved: number;
    costReduction: number;
    satisfactionImprovement: number;
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

interface UseCase {
  id: string;
  name: string;
  duration: string;
  description: string;
  steps: SimulationStep[];
  totalImpact: {
    timeReduction: number;
    costSavings: number;
    satisfactionGain: number;
    annualValue: number;
  };
}

const SimulationPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState('passenger-turnaround');
  const [cameraAngle, setCameraAngle] = useState({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState('overview');
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Enhanced Use Cases with Complete Step Definitions
  const useCases: UseCase[] = [
    {
      id: 'passenger-turnaround',
      name: 'Outbound Passenger Turnaround',
      duration: '120 min',
      description: 'Complete passenger journey from terminal entry to aircraft boarding',
      totalImpact: {
        timeReduction: 31.7,
        costSavings: 8500000,
        satisfactionGain: 43.8,
        annualValue: 28400000
      },
      steps: [
        {
          id: 'terminal-entry',
          name: 'Terminal Entry & ID Check',
          duration: 3,
          aiIntervention: 'AI facial recognition pre-screening reduces wait time by 40%',
          confidence: 94,
          status: 'pending',
          metrics: { throughput: 450, waitTime: 1.8, efficiency: 92 },
          position: { x: 50, y: 150 },
          aiImpact: { timeSaved: 1.2, costReduction: 15, satisfactionImprovement: 8 }
        },
        {
          id: 'check-in',
          name: 'Check-in & Verification',
          duration: 8,
          aiIntervention: 'AI document verification and seat optimization',
          confidence: 97,
          status: 'pending',
          metrics: { throughput: 180, waitTime: 4.2, efficiency: 89 },
          position: { x: 150, y: 150 },
          aiImpact: { timeSaved: 3.2, costReduction: 25, satisfactionImprovement: 12 }
        },
        {
          id: 'baggage-drop',
          name: 'Baggage Drop-off',
          duration: 5,
          aiIntervention: 'Automated baggage sizing and weight prediction',
          confidence: 91,
          status: 'pending',
          metrics: { throughput: 240, waitTime: 2.1, efficiency: 95 },
          position: { x: 250, y: 150 },
          aiImpact: { timeSaved: 1.8, costReduction: 18, satisfactionImprovement: 6 }
        },
        {
          id: 'security',
          name: 'Security Screening',
          duration: 12,
          aiIntervention: 'AI threat detection and queue optimization',
          confidence: 98,
          status: 'pending',
          metrics: { throughput: 320, waitTime: 6.8, efficiency: 87 },
          position: { x: 350, y: 150 },
          aiImpact: { timeSaved: 4.8, costReduction: 35, satisfactionImprovement: 15 }
        },
        {
          id: 'immigration',
          name: 'Immigration Control',
          duration: 6,
          aiIntervention: 'Biometric e-gate processing with risk assessment',
          confidence: 96,
          status: 'pending',
          metrics: { throughput: 280, waitTime: 2.4, efficiency: 93 },
          position: { x: 450, y: 150 },
          aiImpact: { timeSaved: 2.4, costReduction: 22, satisfactionImprovement: 10 }
        },
        {
          id: 'customs',
          name: 'Customs Declaration',
          duration: 4,
          aiIntervention: 'AI risk profiling for selective screening',
          confidence: 89,
          status: 'pending',
          metrics: { throughput: 360, waitTime: 1.2, efficiency: 96 },
          position: { x: 550, y: 150 },
          aiImpact: { timeSaved: 1.6, costReduction: 12, satisfactionImprovement: 5 }
        },
        {
          id: 'airside',
          name: 'Airside Activities',
          duration: 45,
          aiIntervention: 'Personalized routing and service recommendations',
          confidence: 85,
          status: 'pending',
          metrics: { throughput: 800, waitTime: 0, efficiency: 78 },
          position: { x: 350, y: 250 },
          aiImpact: { timeSaved: 8.5, costReduction: 45, satisfactionImprovement: 25 }
        },
        {
          id: 'gate-processing',
          name: 'Gate Processing',
          duration: 8,
          aiIntervention: 'Predictive boarding sequence optimization',
          confidence: 93,
          status: 'pending',
          metrics: { throughput: 220, waitTime: 3.5, efficiency: 91 },
          position: { x: 450, y: 300 },
          aiImpact: { timeSaved: 2.8, costReduction: 20, satisfactionImprovement: 8 }
        },
        {
          id: 'boarding',
          name: 'Aircraft Boarding',
          duration: 25,
          aiIntervention: 'AI-driven boarding group optimization',
          confidence: 88,
          status: 'pending',
          metrics: { throughput: 150, waitTime: 8.2, efficiency: 84 },
          position: { x: 550, y: 350 },
          aiImpact: { timeSaved: 6.2, costReduction: 38, satisfactionImprovement: 18 }
        },
        {
          id: 'cabin-prep',
          name: 'Cabin Preparation',
          duration: 4,
          aiIntervention: 'Automated manifest verification and seating',
          confidence: 99,
          status: 'pending',
          metrics: { throughput: 180, waitTime: 0.5, efficiency: 98 },
          position: { x: 600, y: 400 },
          aiImpact: { timeSaved: 1.5, costReduction: 8, satisfactionImprovement: 3 }
        }
      ]
    },
    {
      id: 'aircraft-turnaround',
      name: 'Aircraft Turnaround Operations',
      duration: '45 min',
      description: 'Complete aircraft servicing from arrival to departure',
      totalImpact: {
        timeReduction: 28.5,
        costSavings: 6200000,
        satisfactionGain: 35.2,
        annualValue: 18900000
      },
      steps: [
        {
          id: 'aircraft-arrival',
          name: 'Aircraft Arrival & Parking',
          duration: 3,
          aiIntervention: 'AI-guided precision parking with AVDGS optimization',
          confidence: 96,
          status: 'pending',
          metrics: { throughput: 12, waitTime: 0.8, efficiency: 94 },
          position: { x: 100, y: 200 },
          aiImpact: { timeSaved: 0.8, costReduction: 120, satisfactionImprovement: 5 }
        },
        {
          id: 'passenger-disembark',
          name: 'Passenger Disembarkation',
          duration: 8,
          aiIntervention: 'Optimized jetbridge positioning and crowd flow management',
          confidence: 92,
          status: 'pending',
          metrics: { throughput: 180, waitTime: 2.5, efficiency: 88 },
          position: { x: 200, y: 200 },
          aiImpact: { timeSaved: 2.2, costReduction: 180, satisfactionImprovement: 8 }
        },
        {
          id: 'baggage-unload',
          name: 'Baggage Unloading',
          duration: 12,
          aiIntervention: 'AI-coordinated baggage handling with predictive sorting',
          confidence: 89,
          status: 'pending',
          metrics: { throughput: 450, waitTime: 0, efficiency: 91 },
          position: { x: 300, y: 200 },
          aiImpact: { timeSaved: 3.5, costReduction: 250, satisfactionImprovement: 12 }
        },
        {
          id: 'aircraft-cleaning',
          name: 'Aircraft Cleaning',
          duration: 15,
          aiIntervention: 'Smart cleaning route optimization and quality assurance',
          confidence: 87,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 85 },
          position: { x: 400, y: 200 },
          aiImpact: { timeSaved: 4.2, costReduction: 320, satisfactionImprovement: 6 }
        },
        {
          id: 'catering-service',
          name: 'Catering & Provisioning',
          duration: 10,
          aiIntervention: 'Predictive catering load optimization based on passenger data',
          confidence: 93,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 89 },
          position: { x: 500, y: 200 },
          aiImpact: { timeSaved: 2.8, costReduction: 180, satisfactionImprovement: 4 }
        },
        {
          id: 'fuel-service',
          name: 'Fuel Service',
          duration: 8,
          aiIntervention: 'AI-calculated optimal fuel load with weather and route analysis',
          confidence: 95,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 93 },
          position: { x: 600, y: 200 },
          aiImpact: { timeSaved: 1.8, costReduction: 450, satisfactionImprovement: 2 }
        },
        {
          id: 'maintenance-check',
          name: 'Maintenance Inspection',
          duration: 6,
          aiIntervention: 'Predictive maintenance alerts and automated inspection logging',
          confidence: 91,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 87 },
          position: { x: 400, y: 300 },
          aiImpact: { timeSaved: 1.5, costReduction: 280, satisfactionImprovement: 1 }
        },
        {
          id: 'baggage-load',
          name: 'Baggage Loading',
          duration: 10,
          aiIntervention: 'AI weight distribution and loading sequence optimization',
          confidence: 94,
          status: 'pending',
          metrics: { throughput: 380, waitTime: 0, efficiency: 92 },
          position: { x: 300, y: 300 },
          aiImpact: { timeSaved: 2.8, costReduction: 220, satisfactionImprovement: 8 }
        },
        {
          id: 'passenger-board',
          name: 'Passenger Boarding',
          duration: 18,
          aiIntervention: 'Optimized boarding sequence with real-time adjustments',
          confidence: 88,
          status: 'pending',
          metrics: { throughput: 160, waitTime: 5.2, efficiency: 86 },
          position: { x: 200, y: 300 },
          aiImpact: { timeSaved: 5.8, costReduction: 380, satisfactionImprovement: 15 }
        },
        {
          id: 'pushback-taxi',
          name: 'Pushback & Taxi',
          duration: 5,
          aiIntervention: 'AI route optimization and conflict-free taxi planning',
          confidence: 97,
          status: 'pending',
          metrics: { throughput: 12, waitTime: 1.2, efficiency: 95 },
          position: { x: 100, y: 300 },
          aiImpact: { timeSaved: 1.2, costReduction: 150, satisfactionImprovement: 3 }
        }
      ]
    },
    {
      id: 'security-incident',
      name: 'Security Incident Response',
      duration: '30 min',
      description: 'Coordinated response to security threats with AI-assisted decision making',
      totalImpact: {
        timeReduction: 45.2,
        costSavings: 2800000,
        satisfactionGain: 28.5,
        annualValue: 8900000
      },
      steps: [
        {
          id: 'threat-detection',
          name: 'Threat Detection & Alert',
          duration: 1,
          aiIntervention: 'AI threat assessment with confidence scoring and risk analysis',
          confidence: 98,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 97 },
          position: { x: 100, y: 200 },
          aiImpact: { timeSaved: 0.5, costReduction: 50, satisfactionImprovement: 2 }
        },
        {
          id: 'alert-dispatch',
          name: 'Security Alert Dispatch',
          duration: 2,
          aiIntervention: 'Automated multi-channel alert system with priority routing',
          confidence: 99,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 98 },
          position: { x: 200, y: 200 },
          aiImpact: { timeSaved: 1.2, costReduction: 80, satisfactionImprovement: 3 }
        },
        {
          id: 'area-isolation',
          name: 'Area Isolation & Evacuation',
          duration: 5,
          aiIntervention: 'AI-guided evacuation routing with real-time crowd management',
          confidence: 94,
          status: 'pending',
          metrics: { throughput: 500, waitTime: 2.5, efficiency: 89 },
          position: { x: 300, y: 200 },
          aiImpact: { timeSaved: 2.8, costReduction: 180, satisfactionImprovement: 8 }
        },
        {
          id: 'response-deployment',
          name: 'Security Response Deployment',
          duration: 3,
          aiIntervention: 'Optimal resource allocation with predictive staffing needs',
          confidence: 92,
          status: 'pending',
          metrics: { throughput: 12, waitTime: 0.8, efficiency: 91 },
          position: { x: 400, y: 200 },
          aiImpact: { timeSaved: 1.5, costReduction: 120, satisfactionImprovement: 5 }
        },
        {
          id: 'threat-assessment',
          name: 'Threat Assessment & Analysis',
          duration: 8,
          aiIntervention: 'AI-powered threat analysis with historical pattern matching',
          confidence: 96,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 94 },
          position: { x: 500, y: 200 },
          aiImpact: { timeSaved: 3.2, costReduction: 200, satisfactionImprovement: 6 }
        },
        {
          id: 'containment',
          name: 'Threat Containment',
          duration: 6,
          aiIntervention: 'Coordinated containment strategy with real-time adjustments',
          confidence: 88,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 86 },
          position: { x: 600, y: 200 },
          aiImpact: { timeSaved: 2.5, costReduction: 150, satisfactionImprovement: 4 }
        },
        {
          id: 'all-clear',
          name: 'All-Clear Verification',
          duration: 3,
          aiIntervention: 'Multi-sensor verification with AI confidence assessment',
          confidence: 97,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 95 },
          position: { x: 500, y: 300 },
          aiImpact: { timeSaved: 1.8, costReduction: 100, satisfactionImprovement: 3 }
        },
        {
          id: 'operations-resume',
          name: 'Operations Resumption',
          duration: 2,
          aiIntervention: 'Phased reopening with passenger flow optimization',
          confidence: 93,
          status: 'pending',
          metrics: { throughput: 800, waitTime: 1.5, efficiency: 88 },
          position: { x: 400, y: 300 },
          aiImpact: { timeSaved: 1.2, costReduction: 80, satisfactionImprovement: 5 }
        }
      ]
    },
    {
      id: 'weather-disruption',
      name: 'Weather Disruption Management',
      duration: '180 min',
      description: 'Comprehensive weather impact management with AI-driven recovery',
      totalImpact: {
        timeReduction: 38.7,
        costSavings: 12500000,
        satisfactionGain: 42.3,
        annualValue: 35600000
      },
      steps: [
        {
          id: 'weather-monitoring',
          name: 'Weather Monitoring & Prediction',
          duration: 15,
          aiIntervention: 'AI weather analysis with 6-hour precision forecasting',
          confidence: 94,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 92 },
          position: { x: 100, y: 200 },
          aiImpact: { timeSaved: 8.5, costReduction: 450, satisfactionImprovement: 12 }
        },
        {
          id: 'impact-assessment',
          name: 'Operational Impact Assessment',
          duration: 10,
          aiIntervention: 'Predictive impact modeling with scenario planning',
          confidence: 91,
          status: 'pending',
          metrics: { throughput: 1, waitTime: 0, efficiency: 89 },
          position: { x: 200, y: 200 },
          aiImpact: { timeSaved: 5.2, costReduction: 320, satisfactionImprovement: 8 }
        },
        {
          id: 'flight-rescheduling',
          name: 'Flight Rescheduling & Optimization',
          duration: 25,
          aiIntervention: 'AI-driven schedule optimization with passenger impact minimization',
          confidence: 88,
          status: 'pending',
          metrics: { throughput: 45, waitTime: 12.5, efficiency: 85 },
          position: { x: 300, y: 200 },
          aiImpact: { timeSaved: 15.8, costReduction: 850, satisfactionImprovement: 18 }
        },
        {
          id: 'passenger-notification',
          name: 'Passenger Communication',
          duration: 5,
          aiIntervention: 'Personalized multi-channel communication with rebooking options',
          confidence: 96,
          status: 'pending',
          metrics: { throughput: 2500, waitTime: 0, efficiency: 94 },
          position: { x: 400, y: 200 },
          aiImpact: { timeSaved: 2.8, costReduction: 180, satisfactionImprovement: 15 }
        },
        {
          id: 'resource-reallocation',
          name: 'Resource Reallocation',
          duration: 20,
          aiIntervention: 'Dynamic staff and equipment optimization',
          confidence: 87,
          status: 'pending',
          metrics: { throughput: 150, waitTime: 8.2, efficiency: 83 },
          position: { x: 500, y: 200 },
          aiImpact: { timeSaved: 12.5, costReduction: 680, satisfactionImprovement: 10 }
        },
        {
          id: 'ground-operations',
          name: 'Ground Operations Adjustment',
          duration: 30,
          aiIntervention: 'Weather-adaptive ground handling with safety prioritization',
          confidence: 89,
          status: 'pending',
          metrics: { throughput: 25, waitTime: 15.8, efficiency: 81 },
          position: { x: 600, y: 200 },
          aiImpact: { timeSaved: 18.2, costReduction: 920, satisfactionImprovement: 12 }
        },
        {
          id: 'passenger-services',
          name: 'Enhanced Passenger Services',
          duration: 45,
          aiIntervention: 'AI-coordinated comfort services and rebooking assistance',
          confidence: 92,
          status: 'pending',
          metrics: { throughput: 800, waitTime: 25.5, efficiency: 86 },
          position: { x: 400, y: 300 },
          aiImpact: { timeSaved: 22.5, costReduction: 1200, satisfactionImprovement: 25 }
        },
        {
          id: 'recovery-operations',
          name: 'Recovery Operations',
          duration: 30,
          aiIntervention: 'Phased recovery with predictive capacity management',
          confidence: 85,
          status: 'pending',
          metrics: { throughput: 65, waitTime: 18.2, efficiency: 82 },
          position: { x: 300, y: 300 },
          aiImpact: { timeSaved: 16.8, costReduction: 890, satisfactionImprovement: 20 }
        }
      ]
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
    },
    {
      category: 'Resource Optimization',
      metric: 'Staff Productivity Index',
      baseline: '72%',
      improved: '96%',
      improvement: '+33.3%',
      annualValue: 3200000,
      confidence: 89
    },
    {
      category: 'Resource Optimization',
      metric: 'Equipment Utilization',
      baseline: '68%',
      improved: '89%',
      improvement: '+30.9%',
      annualValue: 2800000,
      confidence: 86
    }
  ];

  const currentUseCase = useCases.find(uc => uc.id === selectedScenario) || useCases[0];
  const currentStepData = currentUseCase.steps[currentStep];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < currentUseCase.steps.length) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const newStep = prev + 1;
          if (newStep < currentUseCase.steps.length) {
            // Update step status
            currentUseCase.steps[prev].status = 'completed';
            if (newStep < currentUseCase.steps.length) {
              currentUseCase.steps[newStep].status = 'active';
            }
            return newStep;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, (2000 / speed));
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, currentStep, currentUseCase.steps]);

  // Enhanced 3D Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw 3D grid
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 20; i++) {
      const x = (i / 20) * canvas.width;
      const y = (i / 20) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw terminal structure
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Draw process steps
    currentUseCase.steps.forEach((step, index) => {
      const x = (step.position.x / 700) * canvas.width;
      const y = (step.position.y / 500) * canvas.height;
      
      // Step circle
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      
      if (index < currentStep) {
        ctx.fillStyle = '#22c55e'; // Completed
      } else if (index === currentStep) {
        ctx.fillStyle = '#3b82f6'; // Active
      } else {
        ctx.fillStyle = '#64748b'; // Pending
      }
      
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Step number
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText((index + 1).toString(), x, y + 4);

      // AI intervention indicator
      if (index === currentStep) {
        ctx.beginPath();
        ctx.arc(x + 25, y - 25, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Connection lines
      if (index < currentUseCase.steps.length - 1) {
        const nextStep = currentUseCase.steps[index + 1];
        const nextX = (nextStep.position.x / 700) * canvas.width;
        const nextY = (nextStep.position.y / 500) * canvas.height;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.strokeStyle = index < currentStep ? '#22c55e' : '#64748b';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });

    // Draw passenger flow animation
    if (isPlaying && currentStepData) {
      const flowX = (currentStepData.position.x / 700) * canvas.width;
      const flowY = (currentStepData.position.y / 500) * canvas.height;
      
      // Animated passenger dots
      for (let i = 0; i < 5; i++) {
        const offset = (Date.now() / 100 + i * 50) % 200;
        ctx.beginPath();
        ctx.arc(flowX + offset - 100, flowY + 10, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    }

  }, [currentStep, currentUseCase, isPlaying, currentStepData]);

  const handlePlay = () => {
    if (currentStep >= currentUseCase.steps.length) {
      setCurrentStep(0);
      currentUseCase.steps.forEach(step => step.status = 'pending');
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    currentUseCase.steps.forEach(step => step.status = 'pending');
  };

  const executeAIIntervention = (stepId: string) => {
    const step = currentUseCase.steps.find(s => s.id === stepId);
    if (step) {
      setPendingAction({
        title: `Execute AI Intervention: ${step.name}`,
        type: 'optimization',
        description: step.aiIntervention,
        details: [
          `Time Saved: ${step.aiImpact.timeSaved} minutes`,
          `Cost Reduction: $${step.aiImpact.costReduction.toLocaleString()}`,
          `Satisfaction Improvement: +${step.aiImpact.satisfactionImprovement}%`,
          `AI Confidence: ${step.confidence}%`
        ],
        confidence: step.confidence,
        eta: `${step.duration} minutes`
      });
      setShowActionModal(true);
    }
  };

  const totalAnnualValue = tangibleResults.reduce((sum, result) => sum + (result.annualValue || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Simulation & Review Center</h2>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedScenario} 
            onChange={(e) => {
              setSelectedScenario(e.target.value);
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            className="px-3 py-2 bg-slate-800 border border-blue-500/30 rounded-lg text-white sci-fi-input"
          >
            {useCases.map(useCase => (
              <option key={useCase.id} value={useCase.id}>
      <Tabs defaultValue="digital-twin" className="w-full">
              </option>
            ))}
          </select>
          <Badge variant="outline" className="sci-fi-badge">
            {currentUseCase.steps.length} Steps
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="simulation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="digital-twin">3D Digital Twin</TabsTrigger>
          <TabsTrigger value="simulation">3D Simulation</TabsTrigger>
          <TabsTrigger value="analysis">Step Analysis</TabsTrigger>
          <TabsTrigger value="intelligence">AI Intelligence</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="digital-twin" className="space-y-6">
          <DigitalTwinSimulation />
        </TabsContent>

        <TabsContent value="simulation" className="space-y-6">
          {/* Enhanced 3D Simulation Viewport */}
          <Card className="card-enhanced">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2 text-white neon-glow">
                  <Move3D className="w-5 h-5 text-blue-400" />
                  <span>Advanced 3D Terminal Simulation</span>
                  <Badge className="sci-fi-badge">Live</Badge>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setCameraAngle({x: 0, y: 0, z: 0})}>
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setZoom(zoom * 1.2)}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setZoom(zoom * 0.8)}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas 
                  ref={canvasRef}
                  className="w-full h-96 rounded-lg border border-blue-500/30 bg-slate-900"
                  style={{ transform: `scale(${zoom})` }}
                />
                
                {/* Real-time Metrics Overlay */}
                <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-blue-400" />
                    Live Metrics
                  </h4>
                  {currentStepData && (
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Throughput:</span>
                        <span className="text-white font-medium">{currentStepData.metrics.throughput}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Wait Time:</span>
                        <span className="text-white font-medium">{currentStepData.metrics.waitTime} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Efficiency:</span>
                        <span className="text-white font-medium">{currentStepData.metrics.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">AI Confidence:</span>
                        <span className="text-green-400 font-medium">{currentStepData.confidence}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Current Step Info */}
                {currentStepData && (
                  <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 max-w-md">
                    <h4 className="text-sm font-medium text-white mb-2">
                      Step {currentStep + 1}: {currentStepData.name}
                    </h4>
                    <p className="text-xs text-blue-300 mb-2">{currentStepData.aiIntervention}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {currentStepData.duration} min
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {currentStepData.confidence}% confidence
                      </Badge>
                      <Button 
                        size="sm" 
                        className="sci-fi-button text-xs px-2 py-1"
                        onClick={() => executeAIIntervention(currentStepData.id)}
                      >
                        Execute AI
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Simulation Controls */}
          <Card className="card-enhanced">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button onClick={handlePlay} className="sci-fi-button">
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="sci-fi-button">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <select 
                    value={speed} 
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="px-3 py-2 bg-slate-800 border border-blue-500/30 rounded-lg text-white"
                  >
                    <option value={0.5}>0.5x Speed</option>
                    <option value={1}>1x Speed</option>
                    <option value={2}>2x Speed</option>
                    <option value={4}>4x Speed</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <Timer className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white">
                      {Math.round((currentStep / currentUseCase.steps.length) * 100)}% Complete
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="sci-fi-badge">
                    Step {currentStep + 1} of {currentUseCase.steps.length}
                  </Badge>
                  <Badge variant="secondary" className="sci-fi-badge">
                    {currentUseCase.duration} Total
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4">
                <Progress value={(currentStep / currentUseCase.steps.length) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Step-by-Step Analysis */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <span>Process Step Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentUseCase.steps.map((step, index) => (
                  <Card
                    key={step.id}
                    className={`transition-all duration-300 ${
                      index === currentStep
                        ? 'border-blue-500 bg-blue-500/10'
                        : index < currentStep
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-slate-600 bg-slate-800/50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index < currentStep ? 'bg-green-500 text-white' :
                            index === currentStep ? 'bg-blue-500 text-white' :
                            'bg-slate-600 text-slate-300'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{step.name}</h4>
                            <p className="text-sm text-blue-300">{step.aiIntervention}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {index < currentStep && <CheckCircle className="w-5 h-5 text-green-400" />}
                          {index === currentStep && <Activity className="w-5 h-5 text-blue-400 animate-pulse" />}
                          <Badge variant="outline" className="text-xs">
                            {step.duration} min
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {step.confidence}% AI
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center p-2 bg-slate-700/50 rounded">
                          <div className="text-lg font-bold text-blue-400">{step.metrics.throughput}</div>
                          <div className="text-xs text-slate-400">Throughput/hr</div>
                        </div>
                        <div className="text-center p-2 bg-slate-700/50 rounded">
                          <div className="text-lg font-bold text-yellow-400">{step.metrics.waitTime}</div>
                          <div className="text-xs text-slate-400">Wait Time (min)</div>
                        </div>
                        <div className="text-center p-2 bg-slate-700/50 rounded">
                          <div className="text-lg font-bold text-green-400">{step.metrics.efficiency}%</div>
                          <div className="text-xs text-slate-400">Efficiency</div>
                        </div>
                        <div className="text-center p-2 bg-slate-700/50 rounded">
                          <div className="text-lg font-bold text-purple-400">{step.aiImpact.timeSaved}</div>
                          <div className="text-xs text-slate-400">Time Saved (min)</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-300">
                          Cost Reduction: <span className="text-green-400 font-medium">${step.aiImpact.costReduction.toLocaleString()}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executeAIIntervention(step.id)}
                          className="sci-fi-button"
                        >
                          <Brain className="w-3 h-3 mr-1" />
                          AI Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          {/* AI Intelligence Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>AI Performance Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">94.2%</div>
                      <div className="text-sm text-slate-400">AI Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">97.1%</div>
                      <div className="text-sm text-slate-400">Prediction Success</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Queue Optimization</span>
                        <span className="text-white">89.5%</span>
                      </div>
                      <Progress value={89.5} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Resource Allocation</span>
                        <span className="text-white">92.3%</span>
                      </div>
                      <Progress value={92.3} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Bottleneck Detection</span>
                        <span className="text-white">96.8%</span>
                      </div>
                      <Progress value={96.8} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Target className="w-5 h-5 text-green-400" />
                  <span>Use Case Impact Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">
                      ${(currentUseCase.totalImpact.annualValue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-slate-400">Annual Value</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-400">
                        -{currentUseCase.totalImpact.timeReduction}%
                      </div>
                      <div className="text-xs text-slate-400">Time Reduction</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">
                        ${(currentUseCase.totalImpact.costSavings / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-slate-400">Cost Savings</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">
                        +{currentUseCase.totalImpact.satisfactionGain}%
                      </div>
                      <div className="text-xs text-slate-400">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Intervention Timeline */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white">AI Intervention Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500/30"></div>
                <div className="space-y-4">
                  {currentUseCase.steps.map((step, index) => (
                    <div key={step.id} className="relative flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                        index < currentStep ? 'bg-green-500 text-white' :
                        index === currentStep ? 'bg-blue-500 text-white animate-pulse' :
                        'bg-slate-600 text-slate-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{step.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {step.confidence}% AI
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              -{step.aiImpact.timeSaved}min
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-blue-300 mb-2">{step.aiIntervention}</p>
                        <div className="text-xs text-slate-400">
                          Impact: ${step.aiImpact.costReduction.toLocaleString()} saved, +{step.aiImpact.satisfactionImprovement}% satisfaction
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {/* Comprehensive Tangible Results */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card className="card-enhanced text-center">
              <CardContent className="p-6">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  ${(totalAnnualValue / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-slate-400">Total Annual Value</div>
              </CardContent>
            </Card>
            <Card className="card-enhanced text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">576%</div>
                <div className="text-sm text-slate-400">5-Year ROI</div>
              </CardContent>
            </Card>
            <Card className="card-enhanced text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">18mo</div>
                <div className="text-sm text-slate-400">Payback Period</div>
              </CardContent>
            </Card>
            <Card className="card-enhanced text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">+43.8%</div>
                <div className="text-sm text-slate-400">Satisfaction Gain</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results Analysis */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white">Detailed Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {tangibleResults.map((result, index) => (
                  <Card key={index} className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {result.confidence}% confidence
                        </Badge>
                      </div>
                      <h4 className="font-medium text-white mb-3">{result.metric}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Baseline:</span>
                          <span className="text-white">{result.baseline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Improved:</span>
                          <span className="text-green-400 font-medium">{result.improved}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Change:</span>
                          <span className={`font-medium ${
                            result.improvement.startsWith('+') ? 'text-green-400' : 'text-blue-400'
                          }`}>
                            {result.improvement}
                          </span>
                        </div>
                        {result.annualValue > 0 && (
                          <div className="flex justify-between pt-2 border-t border-slate-600">
                            <span className="text-slate-400">Annual Value:</span>
                            <span className="text-yellow-400 font-bold">
                              ${(result.annualValue / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ROI Breakdown */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <span>Return on Investment Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-red-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">$5.0M</div>
                  <div className="text-sm text-slate-400 mb-2">Total Investment</div>
                  <div className="text-xs text-slate-500">AI Systems, Training, Infrastructure</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    ${(totalAnnualValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-slate-400 mb-2">Annual Returns</div>
                  <div className="text-xs text-slate-500">Operational + Revenue + Efficiency</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">18 mo</div>
                  <div className="text-sm text-slate-400 mb-2">Payback Period</div>
                  <div className="text-xs text-slate-500">Break-even timeline</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">576%</div>
                  <div className="text-sm text-slate-400 mb-2">5-Year ROI</div>
                  <div className="text-xs text-slate-500">Total return on investment</div>
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
};

// 3D Digital Twin Simulation Component
function DigitalTwinSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 5, rotX: 0, rotY: 0 });
  const [digitalTwinData, setDigitalTwinData] = useState({
    terminals: [
      { id: 'T1', name: 'Terminal 1', status: 'operational', load: 78, passengers: 2400, gates: 12, active: true },
      { id: 'T2', name: 'Terminal 2', status: 'operational', load: 85, passengers: 3200, gates: 16, active: true },
      { id: 'T3', name: 'Terminal 3', status: 'maintenance', load: 45, passengers: 1800, gates: 10, active: false }
    ],
    runways: [
      { id: 'RW10L', name: 'Runway 10L/28R', status: 'active', traffic: 92, operations: 45, weather: 'clear' },
      { id: 'RW14R', name: 'Runway 14R/32L', status: 'active', traffic: 78, operations: 38, weather: 'clear' },
      { id: 'RW22L', name: 'Runway 22L/04R', status: 'closed', traffic: 0, operations: 0, weather: 'maintenance' }
    ],
    systems: [
      { id: 'BHS', name: 'Baggage Handling', status: 'operational', efficiency: 94, throughput: 12500, alerts: 0 },
      { id: 'HVAC', name: 'Climate Control', status: 'operational', efficiency: 87, load: 78, alerts: 1 },
      { id: 'POWER', name: 'Power Systems', status: 'operational', efficiency: 96, load: 82, alerts: 0 },
      { id: 'SECURITY', name: 'Security Systems', status: 'operational', efficiency: 98, coverage: 100, alerts: 0 },
      { id: 'COMMS', name: 'Communications', status: 'operational', efficiency: 99, uptime: 99.8, alerts: 0 }
    ],
    sensors: [
      { id: 'TEMP_001', type: 'Temperature', location: 'Terminal 1', value: 23.5, status: 'normal' },
      { id: 'FLOW_002', type: 'Passenger Flow', location: 'Security A', value: 180, status: 'high' },
      { id: 'NOISE_003', type: 'Noise Level', location: 'Runway 10L', value: 68, status: 'normal' },
      { id: 'AIR_004', type: 'Air Quality', location: 'Terminal 2', value: 85, status: 'good' },
      { id: 'POWER_005', type: 'Power Load', location: 'Main Grid', value: 22.4, status: 'normal' }
    ]
  });
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw terminals
      digitalTwinData.terminals.forEach((terminal, index) => {
        const x = 150 + index * 200;
        const y = 150;
        const width = 120;
        const height = 80;

        // Terminal building
        ctx.fillStyle = terminal.active ? 'rgba(59, 130, 246, 0.3)' : 'rgba(156, 163, 175, 0.3)';
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = terminal.active ? '#3b82f6' : '#9ca3af';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // Load indicator
        const loadHeight = (terminal.load / 100) * height;
        ctx.fillStyle = terminal.load > 90 ? '#ef4444' : terminal.load > 75 ? '#f59e0b' : '#22c55e';
        ctx.fillRect(x + width - 10, y + height - loadHeight, 8, loadHeight);

        // Terminal label
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(terminal.name, x + width / 2, y + height / 2);
        ctx.font = '10px Inter';
        ctx.fillText(`${terminal.passengers} pax`, x + width / 2, y + height / 2 + 15);
        ctx.fillText(`${terminal.load}% load`, x + width / 2, y + height / 2 + 28);

        // Passenger flow animation
        if (isRunning && terminal.active) {
          const time = Date.now() / 1000;
          for (let i = 0; i < 5; i++) {
            const passengerX = x + 20 + (i * 20) + Math.sin(time + i) * 10;
            const passengerY = y + 40 + Math.cos(time + i) * 5;
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(passengerX, passengerY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Draw runways
      digitalTwinData.runways.forEach((runway, index) => {
        const x = 100;
        const y = 350 + index * 60;
        const width = 500;
        const height = 20;

        // Runway
        ctx.fillStyle = runway.status === 'active' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)';
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = runway.status === 'active' ? '#22c55e' : '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // Aircraft animation
        if (isRunning && runway.status === 'active') {
          const time = Date.now() / 2000;
          const aircraftX = x + (time % 1) * width;
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(aircraftX - 10, y + 5, 20, 10);
        }

        // Runway label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(runway.name, x + 10, y + 15);
        ctx.fillText(`${runway.operations} ops/day`, x + 150, y + 15);
      });

      // Draw system status indicators
      digitalTwinData.systems.forEach((system, index) => {
        const x = 50;
        const y = 50 + index * 30;
        
        // Status indicator
        ctx.fillStyle = system.status === 'operational' ? '#22c55e' : '#ef4444';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        // System name and efficiency
        ctx.fillStyle = '#ffffff';
        ctx.font = '11px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(`${system.name}: ${system.efficiency}%`, x + 15, y + 4);
      });

      // Draw sensor data overlay
      if (selectedSystem) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(canvas.width - 250, 50, 200, 200);
        ctx.strokeStyle = '#3b82f6';
        ctx.strokeRect(canvas.width - 250, 50, 200, 200);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Inter';
        ctx.textAlign = 'left';
        ctx.fillText('System Details', canvas.width - 240, 75);
        
        const system = digitalTwinData.systems.find(s => s.id === selectedSystem);
        if (system) {
          ctx.font = '11px Inter';
          ctx.fillText(`Name: ${system.name}`, canvas.width - 240, 95);
          ctx.fillText(`Status: ${system.status}`, canvas.width - 240, 110);
          ctx.fillText(`Efficiency: ${system.efficiency}%`, canvas.width - 240, 125);
          ctx.fillText(`Alerts: ${system.alerts}`, canvas.width - 240, 140);
        }
      }

      if (isRunning) {
        requestAnimationFrame(render);
      }
    };

    render();
    if (isRunning) {
      const interval = setInterval(render, 16); // 60 FPS
      return () => clearInterval(interval);
    }
  }, [isRunning, selectedSystem, digitalTwinData]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if clicked on a system indicator
    digitalTwinData.systems.forEach((system, index) => {
      const systemX = 50;
      const systemY = 50 + index * 30;
      const distance = Math.sqrt((x - systemX) ** 2 + (y - systemY) ** 2);
      
      if (distance < 20) {
        setSelectedSystem(system.id);
        setPendingAction({
          title: `Analyze ${system.name}`,
          type: 'forecast',
          description: `Deep analysis of ${system.name} performance`,
          details: [
            `Current Efficiency: ${system.efficiency}%`,
            `Status: ${system.status}`,
            `Active Alerts: ${system.alerts}`,
            'Real-time monitoring active',
            'Predictive analytics enabled'
          ],
          confidence: 94
        });
        setShowActionModal(true);
      }
    });
  };

  const executeDigitalTwinAction = (actionType: string) => {
    setPendingAction({
      title: `Execute ${actionType}`,
      type: 'control',
      description: `Digital Twin ${actionType} operation`,
      details: [
        'Real-time data synchronization',
        'AI model validation',
        'System state update',
        'Performance optimization',
        'Predictive analysis refresh'
      ],
      eta: '2-3 minutes'
    });
    setShowActionModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white holographic-text">3D Digital Twin Simulation</h3>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Database className="w-3 h-3" />
            <span>Real-time Sync</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Wifi className="w-3 h-3" />
            <span>IoT Connected</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 3D Digital Twin Viewport */}
        <div className="lg:col-span-3">
          <Card className="card-enhanced cyber-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2 text-white neon-glow">
                  <Move3D className="w-5 h-5 text-blue-400" />
                  <span>Digital Twin Viewport</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full status-online"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => setIsRunning(!isRunning)}
                    className="sci-fi-button"
                  >
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isRunning ? 'Pause' : 'Start'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => executeDigitalTwinAction('Reset')}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-auto bg-slate-900 rounded-lg border border-blue-500/30 cursor-crosshair"
                  onClick={handleCanvasClick}
                />
                
                {/* 3D Controls Overlay */}
                <div className="absolute top-4 right-4 space-y-2">
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 border border-blue-500/30">
                    <div className="grid grid-cols-2 gap-1">
                      <Button size="sm" variant="ghost" className="p-1">
                        <ZoomIn className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-1">
                        <ZoomOut className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-1">
                        <RotateCw className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-1">
                        <Camera className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Real-time Metrics Overlay */}
                <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-blue-300">Active Terminals:</span>
                      <p className="text-white font-bold">{digitalTwinData.terminals.filter(t => t.active).length}/3</p>
                    </div>
                    <div>
                      <span className="text-blue-300">Total Passengers:</span>
                      <p className="text-white font-bold">{digitalTwinData.terminals.reduce((sum, t) => sum + t.passengers, 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-blue-300">System Health:</span>
                      <p className="text-green-400 font-bold">98.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Digital Twin Controls */}
        <div className="space-y-6">
          {/* System Status */}
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Cpu className="w-5 h-5 text-green-400" />
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {digitalTwinData.systems.map((system) => (
                  <div 
                    key={system.id} 
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedSystem === system.id ? 'bg-blue-500/20 border border-blue-500' : 'bg-blue-500/10 hover:bg-blue-500/15'
                    }`}
                    onClick={() => setSelectedSystem(system.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{system.name}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        system.status === 'operational' ? 'bg-green-500 status-online' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-300">Efficiency:</span>
                      <span className="text-white">{system.efficiency}%</span>
                    </div>
                    <Progress value={system.efficiency} className="h-1 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* IoT Sensors */}
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Activity className="w-5 h-5 text-blue-400" />
                <span>IoT Sensors</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {digitalTwinData.sensors.map((sensor) => (
                  <div key={sensor.id} className="flex items-center justify-between p-2 bg-blue-500/10 rounded">
                    <div>
                      <p className="text-white text-xs font-medium">{sensor.type}</p>
                      <p className="text-blue-300 text-xs">{sensor.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-xs font-bold">{sensor.value}</p>
                      <Badge variant={sensor.status === 'normal' ? 'secondary' : 'destructive'} className="text-xs">
                        {sensor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Digital Twin Actions */}
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Target className="w-5 h-5 text-purple-400" />
                <span>Twin Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full sci-fi-button" 
                  size="sm"
                  onClick={() => executeDigitalTwinAction('Sync Data')}
                >
                  <Database className="w-4 h-4 mr-2" />
                  Sync Real-time Data
                </Button>
                <Button 
                  className="w-full sci-fi-button" 
                  size="sm" 
                  variant="outline"
                  onClick={() => executeDigitalTwinAction('Run Prediction')}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  AI Prediction
                </Button>
                <Button 
                  className="w-full sci-fi-button" 
                  size="sm" 
                  variant="outline"
                  onClick={() => executeDigitalTwinAction('Optimize Systems')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Optimize Performance
                </Button>
                <Button 
                  className="w-full sci-fi-button" 
                  size="sm" 
                  variant="outline"
                  onClick={() => executeDigitalTwinAction('Generate Report')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {pendingAction && (
        <ActionConfirmationModal
          isOpen={showActionModal}
          onClose={() => setShowActionModal(false)}
          onConfirm={() => {
            console.log('Digital Twin Action executed:', pendingAction);
          }}
          action={pendingAction}
        />
      )}
    </div>
  );
}

export default SimulationPage;