'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionConfirmationModal } from '@/components/shared/action-confirmation-modal';
import { 
  Plane, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle,
  Radar,
  Wind,
  Eye
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { KPIDetailModal } from '@/components/shared/kpi-detail-modal';

export function AirsidePage() {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [showKPIModal, setShowKPIModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);

  const runwayData = [
    { name: '10:00', runway10L: 8, runway14R: 12, runway22L: 6 },
    { name: '11:00', runway10L: 12, runway14R: 15, runway22L: 8 },
    { name: '12:00', runway10L: 15, runway14R: 18, runway22L: 10 },
    { name: '13:00', runway10L: 18, runway14R: 22, runway22L: 12 },
    { name: '14:00', runway10L: 22, runway14R: 25, runway22L: 15 },
    { name: '15:00', runway10L: 20, runway14R: 24, runway22L: 14 },
  ];

  const taxiTimes = [
    { gate: 'A1', predicted: 8, actual: 9, x: 1, y: 8 },
    { gate: 'A5', predicted: 12, actual: 11, x: 5, y: 12 },
    { gate: 'B3', predicted: 15, actual: 16, x: 3, y: 15 },
    { gate: 'B7', predicted: 18, actual: 17, x: 7, y: 18 },
    { gate: 'C2', predicted: 22, actual: 23, x: 2, y: 22 },
    { gate: 'C9', predicted: 25, actual: 24, x: 9, y: 25 },
  ];

  const flights = [
    { id: 'UA1234', aircraft: 'B737-800', stand: 'A12', gate: 'A12', scheduledDep: '14:30', estimatedDep: '14:35', status: 'boarding', tobt: '14:32', tsat: '14:40' },
    { id: 'AA5678', aircraft: 'A320', stand: 'B7', gate: 'B7', scheduledDep: '14:45', estimatedDep: '14:48', status: 'pushback', tobt: '14:45', tsat: '14:52' },
    { id: 'DL9012', aircraft: 'B777-300', stand: 'C3', gate: 'C3', scheduledDep: '15:00', estimatedDep: '15:05', status: 'taxi', tobt: '15:02', tsat: '15:08' },
    { id: 'WN3456', aircraft: 'B737-700', stand: 'A8', gate: 'A8', scheduledDep: '15:15', estimatedDep: '15:12', status: 'ready', tobt: '15:10', tsat: '15:15' },
  ];

  const stands = [
    { id: 'A12', status: 'occupied', aircraft: 'UA1234', avdgs: 'operational', lastMaintenance: '2 days ago' },
    { id: 'A8', status: 'occupied', aircraft: 'WN3456', avdgs: 'operational', lastMaintenance: '1 day ago' },
    { id: 'B7', status: 'occupied', aircraft: 'AA5678', avdgs: 'fault', lastMaintenance: '5 days ago' },
    { id: 'C3', status: 'occupied', aircraft: 'DL9012', avdgs: 'operational', lastMaintenance: '3 days ago' },
    { id: 'A15', status: 'available', aircraft: null, avdgs: 'operational', lastMaintenance: '1 day ago' },
    { id: 'B12', status: 'maintenance', aircraft: null, avdgs: 'maintenance', lastMaintenance: 'Today' },
  ];

  const optimizeTSAT = (flightId: string) => {
    const flight = flights.find(f => f.id === flightId);
    if (flight) {
      setPendingAction({
        title: `TSAT Optimization - ${flightId}`,
        type: 'optimization',
        description: `AI-optimized Target Start-up Approval Time for ${flightId}`,
        details: [
          'Predictive taxi time analysis',
          'Traffic flow optimization',
          'Weather impact assessment',
          'Fuel efficiency calculation'
        ],
        assignee: 'Air Traffic Control',
        eta: '5 minutes',
        confidence: 94
      });
      setShowActionModal(true);
    }
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
        </div>
      </div>
      
      {selectedKPI && (
        <KPIDetailModal 
          isOpen={showKPIModal} 
          onClose={() => setShowKPIModal(false)} 
          kpi={selectedKPI} 
        />
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tobt-tsat">TOBT/TSAT Optimizer</TabsTrigger>
          <TabsTrigger value="stands">Stand & Gate View</TabsTrigger>
          <TabsTrigger value="tracking">Surface Tracking</TabsTrigger>
          <TabsTrigger value="weather">Weather & METAR</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Runway Utilization */}
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Radar className="w-5 h-5" />
                <span>Runway Utilization Heatmap</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={runwayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="runway10L" stroke="#3b82f6" strokeWidth={2} name="Runway 10L/28R" />
                  <Line type="monotone" dataKey="runway14R" stroke="#22c55e" strokeWidth={2} name="Runway 14R/32L" />
                  <Line type="monotone" dataKey="runway22L" stroke="#f59e0b" strokeWidth={2} name="Runway 22L/04R" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Active Flights Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="sci-fi-card">
              <CardHeader>
                <CardTitle>Active Flight Movements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flights.map((flight) => (
                    <div key={flight.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Plane className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="font-medium">{flight.id}</p>
                          <p className="text-sm text-slate-500">{flight.aircraft}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={flight.status === 'boarding' ? 'secondary' : 
                                      flight.status === 'pushback' ? 'default' : 
                                      flight.status === 'taxi' ? 'destructive' : 'default'}>
                          {flight.status}
                        </Badge>
                        <p className="text-sm text-slate-500 mt-1">Stand {flight.stand}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="sci-fi-card">
              <CardHeader>
                <CardTitle>Taxi Time Prediction vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart data={taxiTimes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="predicted" name="Predicted (min)" />
                    <YAxis dataKey="actual" name="Actual (min)" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Taxi Times" dataKey="actual" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tobt-tsat" className="space-y-6">
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle>AI-Powered TOBT/TSAT Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flights.map((flight) => (
                  <div key={flight.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4" />
                      <span className="font-medium">{flight.id}</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">TOBT</p>
                      <p className="font-mono">{flight.tobt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">TSAT</p>
                      <p className="font-mono">{flight.tsat}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Scheduled</p>
                      <p className="font-mono">{flight.scheduledDep}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Estimated</p>
                      <p className="font-mono">{flight.estimatedDep}</p>
                    </div>
                    <div>
                      <Button 
                        size="sm" 
                        onClick={() => optimizeTSAT(flight.id)}
                        className="w-full"
                      >
                        Optimize TSAT
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stands" className="space-y-6">
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle>Aircraft Stand & AVDGS Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stands.map((stand) => (
                  <Card key={stand.id} className="widget-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white">Stand {stand.id}</h3>
                        <Badge variant={stand.status === 'occupied' ? 'default' : 
                                      stand.status === 'available' ? 'secondary' : 'destructive'}>
                          {stand.status}
                        </Badge>
                      </div>
                      {stand.aircraft && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Plane className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-blue-300">{stand.aircraft}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${stand.avdgs === 'operational' ? 'bg-green-500' : 
                                                                 stand.avdgs === 'fault' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-sm text-blue-300">AVDGS: {stand.avdgs}</span>
                      </div>
                      <p className="text-xs text-blue-400">Last maintenance: {stand.lastMaintenance}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Radar className="w-5 h-5" />
                <span>Surface Movement Tracking (A-SMGCS/ADS-B/MLAT)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-6 min-h-[400px] text-white">
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    {/* Airport Layout */}
                    <rect x="50" y="150" width="400" height="6" fill="#4ade80" />
                    <rect x="50" y="200" width="400" height="6" fill="#4ade80" />
                    <rect x="50" y="250" width="400" height="6" fill="#4ade80" />
                    
                    {/* Taxiways */}
                    <rect x="100" y="100" width="6" height="250" fill="#60a5fa" />
                    <rect x="200" y="100" width="6" height="250" fill="#60a5fa" />
                    <rect x="300" y="100" width="6" height="250" fill="#60a5fa" />
                    
                    {/* Aircraft Positions */}
                    <circle cx="120" cy="153" r="8" fill="#ef4444">
                      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="135" y="158" fill="#ef4444" fontSize="10">UA1234</text>
                    
                    <circle cx="220" cy="203" r="8" fill="#f59e0b">
                      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="235" y="208" fill="#f59e0b" fontSize="10">AA5678</text>
                    
                    <circle cx="320" cy="253" r="8" fill="#22c55e">
                      <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <text x="335" y="258" fill="#22c55e" fontSize="10">DL9012</text>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current METAR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-sm bg-slate-100 p-4 rounded-lg">
                  INTL 151851Z 28012KT 10SM FEW030 SCT250 24/18 A3012 RMK AO2 SLP203 T02440183 56014
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Wind</p>
                    <p className="font-medium">280° @ 12kt</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Visibility</p>
                    <p className="font-medium">10 SM</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Temperature</p>
                    <p className="font-medium">24°C / 18°C</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Pressure</p>
                    <p className="font-medium">30.12 inHg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terminal Aerodrome Forecast (TAF)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">15:00 - 18:00</p>
                      <p className="text-sm text-slate-500">Wind: 290° @ 15kt, Visibility: 10SM</p>
                    </div>
                    <Badge variant="secondary">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">18:00 - 21:00</p>
                      <p className="text-sm text-slate-500">Wind: 270° @ 18kt G25kt, Visibility: 8SM</p>
                    </div>
                    <Badge variant="default">Caution</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">21:00 - 00:00</p>
                      <p className="text-sm text-slate-500">Wind: 250° @ 22kt G30kt, Visibility: 6SM</p>
                    </div>
                    <Badge variant="destructive">Alert</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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