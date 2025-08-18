'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionConfirmationModal } from './action-confirmation-modal';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Thermometer,
  Activity,
  Zap
} from 'lucide-react';

interface HeatmapZone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  density: number;
  capacity: number;
  dwellTime: number;
  flowRate: number;
  temperature: 'low' | 'medium' | 'high' | 'critical';
}

export function PassengerHeatmap() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState('live');
  const [heatmapData, setHeatmapData] = useState<HeatmapZone[]>([]);
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setHeatmapData([
        {
          id: 'security-a',
          name: 'Security Checkpoint A',
          x: 100,
          y: 150,
          width: 80,
          height: 40,
          density: 85,
          capacity: 100,
          dwellTime: 12.5,
          flowRate: 180,
          temperature: 'high'
        },
        {
          id: 'security-b',
          name: 'Security Checkpoint B',
          x: 200,
          y: 150,
          width: 80,
          height: 40,
          density: 95,
          capacity: 100,
          dwellTime: 18.2,
          flowRate: 165,
          temperature: 'critical'
        },
        {
          id: 'food-court-a',
          name: 'Food Court A',
          x: 50,
          y: 250,
          width: 120,
          height: 60,
          density: 78,
          capacity: 200,
          dwellTime: 35.8,
          flowRate: 95,
          temperature: 'high'
        },
        {
          id: 'gate-area-b',
          name: 'Gate Area B15-B20',
          x: 300,
          y: 200,
          width: 100,
          height: 80,
          density: 65,
          capacity: 150,
          dwellTime: 45.2,
          flowRate: 120,
          temperature: 'medium'
        },
        {
          id: 'retail-corridor',
          name: 'Retail Corridor C',
          x: 180,
          y: 320,
          width: 140,
          height: 30,
          density: 42,
          capacity: 80,
          dwellTime: 8.5,
          flowRate: 220,
          temperature: 'medium'
        },
        {
          id: 'baggage-claim',
          name: 'Baggage Claim 1',
          x: 350,
          y: 350,
          width: 100,
          height: 50,
          density: 88,
          capacity: 120,
          dwellTime: 22.3,
          flowRate: 85,
          temperature: 'high'
        },
        {
          id: 'immigration',
          name: 'Immigration Hall',
          x: 120,
          y: 100,
          width: 160,
          height: 40,
          density: 72,
          capacity: 180,
          dwellTime: 15.7,
          flowRate: 145,
          temperature: 'medium'
        },
        {
          id: 'departure-lounge',
          name: 'Departure Lounge',
          x: 400,
          y: 120,
          width: 80,
          height: 60,
          density: 55,
          capacity: 100,
          dwellTime: 28.4,
          flowRate: 75,
          temperature: 'low'
        }
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getHeatColor = (temperature: string, opacity: number = 0.7) => {
    switch (temperature) {
      case 'critical':
        return `rgba(239, 68, 68, ${opacity})`;
      case 'high':
        return `rgba(245, 158, 11, ${opacity})`;
      case 'medium':
        return `rgba(59, 130, 246, ${opacity})`;
      case 'low':
        return `rgba(34, 197, 94, ${opacity})`;
      default:
        return `rgba(156, 163, 175, ${opacity})`;
    }
  };

  const selectedZoneData = heatmapData.find(zone => zone.id === selectedZone);

  const generateAlert = (zone: HeatmapZone) => {
    if (zone.temperature === 'critical') {
      setPendingAction({
        title: `CRITICAL ALERT: ${zone.name}`,
        type: 'workflow',
        priority: 'high',
        description: 'Critical passenger density threshold exceeded',
        details: [
          `Density: ${zone.density}% (Critical threshold exceeded)`,
          `Dwell Time: ${zone.dwellTime} minutes`,
          `Flow Rate: ${zone.flowRate} pax/hour`,
          'Deploy additional staff immediately',
          'Open alternative routes',
          'Implement crowd control measures',
          'Update passenger information displays'
        ],
        eta: '10 minutes'
      });
      setShowActionModal(true);
    } else {
      setPendingAction({
        title: `Zone Analysis: ${zone.name}`,
        type: 'forecast',
        description: 'Passenger flow analysis results',
        details: [
          `Density: ${zone.density}%`,
          `Dwell Time: ${zone.dwellTime} minutes`,
          `Flow Rate: ${zone.flowRate} pax/hour`,
          `Status: ${zone.temperature.toUpperCase()}`,
          'No immediate action required'
        ]
      });
      setShowActionModal(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Passenger Flow Heatmap</h3>
        <div className="flex items-center space-x-2">
          {['live', '1h', '4h', '24h'].map((period) => (
            <Button
              key={period}
              size="sm"
              variant={timeframe === period ? 'default' : 'outline'}
              onClick={() => setTimeframe(period)}
              className="sci-fi-button"
            >
              {period === 'live' ? 'Live' : period}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Visualization */}
        <div className="lg:col-span-2">
          <Card className="card-enhanced cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white neon-glow">
                <Activity className="w-5 h-5 text-blue-400" />
                <span>Real-time Passenger Density</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full status-online"></div>
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-slate-900 rounded-lg p-4 min-h-[500px] overflow-hidden">
                {/* Terminal Layout SVG */}
                <svg viewBox="0 0 500 450" className="w-full h-full">
                  {/* Terminal Building Outline */}
                  <rect x="30" y="80" width="440" height="320" fill="none" stroke="hsl(217, 91%, 60%)" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="250" y="70" textAnchor="middle" fill="hsl(217, 91%, 60%)" fontSize="14" fontWeight="bold">Terminal Layout</text>
                  
                  {/* Zone Overlays with Heat Colors */}
                  {heatmapData.map((zone) => (
                    <g key={zone.id}>
                      <rect
                        x={zone.x}
                        y={zone.y}
                        width={zone.width}
                        height={zone.height}
                        fill={getHeatColor(zone.temperature, 0.6)}
                        stroke={getHeatColor(zone.temperature, 1)}
                        strokeWidth="2"
                        rx="4"
                        className="cursor-pointer transition-all duration-300 hover:stroke-width-3"
                        onClick={() => {
                          setSelectedZone(zone.id);
                          generateAlert(zone);
                        }}
                      >
                        <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite" />
                      </rect>
                      
                      {/* Zone Labels */}
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 - 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {zone.name}
                      </text>
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 + 8}
                        textAnchor="middle"
                        fill="white"
                        fontSize="9"
                        className="pointer-events-none"
                      >
                        {zone.density}%
                      </text>
                    </g>
                  ))}
                  
                  {/* Flow Direction Arrows */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="hsl(142, 76%, 36%)" />
                    </marker>
                  </defs>
                  
                  {/* Passenger Flow Arrows */}
                  <line x1="60" y1="130" x2="100" y2="130" stroke="hsl(142, 76%, 36%)" strokeWidth="2" markerEnd="url(#arrowhead)">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="180" y1="170" x2="220" y2="170" stroke="hsl(142, 76%, 36%)" strokeWidth="2" markerEnd="url(#arrowhead)">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="280" y1="190" x2="320" y2="190" stroke="hsl(142, 76%, 36%)" strokeWidth="2" markerEnd="url(#arrowhead)">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
                  <h4 className="text-sm font-medium text-white mb-2">Density Levels</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: getHeatColor('low') }}></div>
                      <span className="text-xs text-white">Low (0-50%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: getHeatColor('medium') }}></div>
                      <span className="text-xs text-white">Medium (51-75%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: getHeatColor('high') }}></div>
                      <span className="text-xs text-white">High (76-90%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: getHeatColor('critical') }}></div>
                      <span className="text-xs text-white">Critical (90%+)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone Details and Controls */}
        <div className="space-y-6">
          {/* Zone Statistics */}
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle className="text-white">Zone Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                    <Users className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-blue-400">
                      {heatmapData.reduce((sum, zone) => sum + Math.floor(zone.density * zone.capacity / 100), 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-300">Total Passengers</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-yellow-400">
                      {heatmapData.filter(zone => zone.temperature === 'critical').length}
                    </p>
                    <p className="text-xs text-yellow-300">Critical Zones</p>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-green-500/10 rounded-lg">
                  <Activity className="w-6 h-6 text-green-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-400">
                    {Math.round(heatmapData.reduce((sum, zone) => sum + zone.flowRate, 0) / heatmapData.length)}
                  </p>
                  <p className="text-xs text-green-300">Avg Flow Rate (pax/hr)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Details */}
          {selectedZoneData && (
            <Card className="sci-fi-card">
              <CardHeader>
                <CardTitle className="text-white">Zone Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-white">{selectedZoneData.name}</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Density</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-blue-500/20 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full" 
                            style={{ width: `${selectedZoneData.density}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-bold">{selectedZoneData.density}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Dwell Time</span>
                      <span className="text-white font-bold">{selectedZoneData.dwellTime} min</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Flow Rate</span>
                      <span className="text-white font-bold">{selectedZoneData.flowRate} pax/hr</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Capacity</span>
                      <span className="text-white font-bold">
                        {Math.floor(selectedZoneData.density * selectedZoneData.capacity / 100)}/{selectedZoneData.capacity}
                      </span>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={
                      selectedZoneData.temperature === 'critical' ? 'destructive' :
                      selectedZoneData.temperature === 'high' ? 'default' :
                      'secondary'
                    }
                    className="w-full justify-center"
                  >
                    {selectedZoneData.temperature.toUpperCase()} DENSITY
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full sci-fi-button" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Deploy Staff
                </Button>
                <Button className="w-full sci-fi-button" size="sm" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Update Signage
                </Button>
                <Button className="w-full sci-fi-button" size="sm" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
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
            console.log('Action executed:', pendingAction);
          }}
          action={pendingAction}
        />
      )}
    </div>
  );
}