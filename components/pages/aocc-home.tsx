'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plane, 
  AlertTriangle, 
  Clock, 
  Users, 
  Car, 
  Shield,
  Mic,
  Search,
  Activity,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { KPIDetailModal } from '@/components/shared/kpi-detail-modal';

export function AOCCHome() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [showKPIModal, setShowKPIModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const kpiData = [
    { name: '6AM', departures: 12, arrivals: 8, delays: 2 },
    { name: '8AM', departures: 24, arrivals: 18, delays: 5 },
    { name: '10AM', departures: 32, arrivals: 28, delays: 3 },
    { name: '12PM', departures: 28, arrivals: 35, delays: 7 },
    { name: '2PM', departures: 35, arrivals: 30, delays: 4 },
    { name: '4PM', departures: 42, arrivals: 38, delays: 8 },
  ];

  const events = [
    { id: 1, time: '14:32', type: 'alert', severity: 'high', message: 'Runway 10L/28R - Bird activity detected', source: 'Wildlife Management' },
    { id: 2, time: '14:28', type: 'info', severity: 'medium', message: 'Gate B12 - Aircraft docking completed', source: 'AVDGS' },
    { id: 3, time: '14:25', type: 'warning', severity: 'medium', message: 'Terminal 3 - Queue length exceeding threshold at Security Checkpoint C', source: 'Queue Management' },
    { id: 4, time: '14:20', type: 'info', severity: 'low', message: 'BHS Conveyor 7A - Maintenance completed', source: 'Maintenance System' },
    { id: 5, time: '14:15', type: 'alert', severity: 'high', message: 'Parking Structure P3 - 95% capacity reached', source: 'Parking Management' },
  ];

  const operationalMetrics = [
    { label: 'Active Flights', value: '127', change: '+5', trend: 'up', icon: Plane },
    { label: 'Critical Alerts', value: '3', change: '-2', trend: 'down', icon: AlertTriangle },
    { label: 'Average Delay', value: '12min', change: '+3min', trend: 'up', icon: Clock },
    { label: 'Terminal Occupancy', value: '78%', change: '+5%', trend: 'up', icon: Users },
    { label: 'Parking Utilization', value: '89%', change: '+12%', trend: 'up', icon: Car },
    { label: 'Security Incidents', value: '0', change: '0', trend: 'neutral', icon: Shield },
  ];

  const handleKPIClick = (metric: any) => {
    setSelectedKPI({
      id: metric.label.toLowerCase().replace(/\s+/g, '_'),
      name: metric.label,
      value: metric.value,
      unit: metric.label.includes('Delay') ? 'minutes' : metric.label.includes('Occupancy') || metric.label.includes('Utilization') ? 'percentage' : 'count',
      trend: metric.trend,
      change: metric.change,
      status: metric.trend === 'up' && metric.label.includes('Alert') ? 'critical' : 
              metric.trend === 'up' && metric.label.includes('Delay') ? 'warning' : 'good',
      target: metric.label.includes('Delay') ? '8min' : 
              metric.label.includes('Occupancy') ? '75%' : 
              metric.label.includes('Alert') ? '0' : 'N/A',
      description: `Real-time monitoring of ${metric.label.toLowerCase()} across all airport operations with AI-powered analytics and predictive insights`
    });
    setShowKPIModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Live Status Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white card-enhanced glow-blue cyber-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold holographic-text neon-glow">Chicago O'Hare International Airport</h2>
            <p className="text-blue-100">Airport Operations Control Center - Live Status</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-mono">{currentTime.toLocaleTimeString()}</p>
            <p className="text-blue-100">{currentTime.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Search and Voice Control */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search flights, gates, incidents, or ask a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 sci-fi-input"
          />
        </div>
        <Button
          variant={isListening ? "destructive" : "outline"}
          onClick={() => setIsListening(!isListening)}
          className="flex items-center space-x-2 sci-fi-button"
        >
          <Mic className="w-4 h-4" />
          <span>{isListening ? 'Stop Listening' : 'Voice Command'}</span>
        </Button>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {operationalMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card 
              key={index} 
              className="kpi-card cyber-border cursor-pointer"
              onClick={() => handleKPIClick(metric)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-blue-400" />
                  {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-400 pulse-glow" />}
                  {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-400 pulse-glow" />}
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-white neon-glow">{metric.value}</p>
                  <p className="text-xs text-blue-300">{metric.label}</p>
                  <p className={`text-xs ${metric.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                    {metric.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Airport Map */}
        <div className="lg:col-span-2">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span>Live Airport Operations Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="sci-fi-chart rounded-lg p-8 min-h-[400px] flex items-center justify-center relative">
                {/* Simplified Airport Layout */}
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 400 300" className="w-full h-full">
                    {/* Runways */}
                    <rect x="50" y="100" width="300" height="8" fill="hsl(217, 91%, 60%)" />
                    <rect x="50" y="150" width="300" height="8" fill="hsl(217, 91%, 60%)" />
                    <rect x="50" y="200" width="300" height="8" fill="hsl(217, 91%, 60%)" />
                    
                    {/* Terminal Buildings */}
                    <rect x="150" y="50" width="100" height="40" fill="hsl(217, 91%, 60%)" />
                    <text x="200" y="75" textAnchor="middle" fill="white" fontSize="12">Terminal 1</text>
                    
                    {/* Aircraft Icons */}
                    <circle cx="100" cy="104" r="4" fill="hsl(0, 84%, 60%)" className="pulse-glow" />
                    <circle cx="200" cy="154" r="4" fill="hsl(142, 76%, 36%)" className="pulse-glow" />
                    <circle cx="300" cy="204" r="4" fill="hsl(47, 96%, 53%)" className="pulse-glow" />
                    
                    {/* Gates */}
                    {Array.from({ length: 8 }, (_, i) => (
                      <rect key={i} x={160 + i * 10} y="90" width="6" height="15" fill="hsl(217, 91%, 40%)" />
                    ))}
                  </svg>
                  
                  {/* Live Status Indicators */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-red-500 rounded-full status-critical"></div>
                      <span className="text-white">Runway 10L - Bird Alert</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full status-online"></div>
                      <span className="text-white">Runway 14R - Active</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full status-warning"></div>
                      <span className="text-white">Runway 22L - Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Events Timeline */}
        <div>
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-white">Live Event Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge 
                        variant={event.severity === 'high' ? 'destructive' : 
                                event.severity === 'medium' ? 'default' : 'secondary'}
                        className="text-xs sci-fi-badge"
                      >
                        {event.time}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{event.message}</p>
                      <p className="text-xs text-blue-300">{event.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Flight Operations Chart */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="text-white">Flight Operations - Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="sci-fi-chart rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="departures" fill="hsl(217, 91%, 60%)" name="Departures" />
              <Bar dataKey="arrivals" fill="hsl(142, 76%, 36%)" name="Arrivals" />
              <Bar dataKey="delays" fill="hsl(0, 84%, 60%)" name="Delays" />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {selectedKPI && (
        <KPIDetailModal 
          isOpen={showKPIModal} 
          onClose={() => setShowKPIModal(false)} 
          kpi={selectedKPI} 
        />
      )}
    </div>
  );
}