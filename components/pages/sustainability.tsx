'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, 
  Zap, 
  Droplets, 
  Recycle, 
  Target,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

export function SustainabilityPage() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const carbonData = [
    { month: 'Jan', actual: 4850, target: 4600, reduction: 12 },
    { month: 'Feb', actual: 4620, target: 4400, reduction: 15 },
    { month: 'Mar', actual: 4450, target: 4200, reduction: 18 },
    { month: 'Apr', actual: 4280, target: 4000, reduction: 22 },
    { month: 'May', actual: 4100, target: 3800, reduction: 25 },
    { month: 'Jun', actual: 3950, target: 3600, reduction: 28 },
  ];

  const energyData = [
    { name: '6AM', consumption: 12500, renewable: 4200, grid: 8300 },
    { name: '9AM', consumption: 18900, renewable: 6800, grid: 12100 },
    { name: '12PM', consumption: 22400, renewable: 8900, grid: 13500 },
    { name: '3PM', consumption: 24800, renewable: 9800, grid: 15000 },
    { name: '6PM', consumption: 21200, renewable: 8200, grid: 13000 },
    { name: '9PM', consumption: 16800, renewable: 6200, grid: 10600 },
  ];

  const noiseData = [
    { time: '00:00', db: 45, limit: 55, complaints: 0 },
    { time: '06:00', db: 62, limit: 65, complaints: 0 },
    { time: '12:00', db: 68, limit: 70, complaints: 2 },
    { time: '18:00', db: 71, limit: 70, complaints: 5 },
    { time: '21:00', db: 58, limit: 60, complaints: 1 },
    { time: '23:00', db: 48, limit: 55, complaints: 0 },
  ];

  const sustainabilityMetrics = [
    {
      id: 'carbon_intensity',
      name: 'Carbon Intensity',
      value: '4.1 kg CO2/pax',
      target: '3.5 kg CO2/pax',
      progress: 68,
      trend: 'down',
      change: '-12.3%',
      status: 'on_track'
    },
    {
      id: 'energy_efficiency',
      name: 'Energy Efficiency',
      value: '185 kWh/m²',
      target: '160 kWh/m²',
      progress: 74,
      trend: 'down',
      change: '-8.7%',
      status: 'on_track'
    },
    {
      id: 'water_usage',
      name: 'Water Usage',
      value: '2.8L/pax',
      target: '2.2L/pax',
      progress: 56,
      trend: 'down',
      change: '-5.2%',
      status: 'needs_attention'
    },
    {
      id: 'waste_diversion',
      name: 'Waste Diversion',
      value: '76%',
      target: '85%',
      progress: 89,
      trend: 'up',
      change: '+3.1%',
      status: 'on_track'
    },
    {
      id: 'renewable_energy',
      name: 'Renewable Energy',
      value: '42%',
      target: '60%',
      progress: 70,
      trend: 'up',
      change: '+5.4%',
      status: 'on_track'
    },
    {
      id: 'noise_compliance',
      name: 'Noise Compliance',
      value: '94.2%',
      target: '95%',
      progress: 99,
      trend: 'up',
      change: '+1.2%',
      status: 'excellent'
    }
  ];

  const initiatives = [
    {
      id: 'INIT-001',
      name: 'Solar Panel Installation Phase 2',
      category: 'Renewable Energy',
      status: 'in_progress',
      progress: 78,
      impact: '12% reduction in grid electricity',
      budget: '$2.4M',
      completion: '2024-03-15',
      co2_reduction: '1,200 tons/year'
    },
    {
      id: 'INIT-002',
      name: 'LED Lighting Retrofit',
      category: 'Energy Efficiency',
      status: 'completed',
      progress: 100,
      impact: '35% lighting energy reduction',
      budget: '$850K',
      completion: '2024-01-10',
      co2_reduction: '450 tons/year'
    },
    {
      id: 'INIT-003',
      name: 'Waste Sorting Automation',
      category: 'Waste Management',
      status: 'planning',
      progress: 15,
      impact: '15% increase in diversion rate',
      budget: '$1.8M',
      completion: '2024-06-30',
      co2_reduction: '300 tons/year'
    },
    {
      id: 'INIT-004',
      name: 'Ground Support Equipment Electrification',
      category: 'Transportation',
      status: 'in_progress',
      progress: 45,
      impact: '60% reduction in GSE emissions',
      budget: '$3.2M',
      completion: '2024-08-15',
      co2_reduction: '800 tons/year'
    },
  ];

  const complianceReports = [
    {
      id: 'RPT-001',
      name: 'Carbon Footprint Assessment',
      type: 'Annual Report',
      status: 'submitted',
      dueDate: '2024-01-31',
      submitted: '2024-01-28',
      authority: 'EPA',
      compliance: 'compliant'
    },
    {
      id: 'RPT-002',
      name: 'Noise Impact Assessment',
      type: 'Quarterly Report',
      status: 'in_review',
      dueDate: '2024-01-15',
      submitted: '2024-01-12',
      authority: 'City Environmental Dept',
      compliance: 'pending'
    },
    {
      id: 'RPT-003',
      name: 'Water Usage & Treatment Report',
      type: 'Monthly Report',
      status: 'draft',
      dueDate: '2024-02-05',
      submitted: null,
      authority: 'Water Authority',
      compliance: 'due'
    },
    {
      id: 'RPT-004',
      name: 'Sustainability Performance Report',
      type: 'Annual Report',
      status: 'approved',
      dueDate: '2023-12-31',
      submitted: '2023-12-15',
      authority: 'Airport Authority',
      compliance: 'compliant'
    },
  ];

  const generateCarbonForecast = () => {
    const forecast = Math.floor(Math.random() * 500) + 3800;
    const recommendation = forecast > 4000 ? 'Implement additional energy efficiency measures' : 'On track for carbon neutrality goals';
    alert(`AI Carbon Trajectory Forecast:\n\nPredicted annual emissions: ${forecast.toLocaleString()} tons CO2\nTarget: 3,600 tons CO2\nConfidence: 89%\n\nRecommendation: ${recommendation}`);
  };

  const exportComplianceData = (reportId: string) => {
    alert(`Generating compliance export for ${reportId}...\n\nIncluding:\n- Verified emission data\n- Energy consumption logs\n- Waste diversion metrics\n- Noise monitoring data\n- Third-party verification certificates\n\nExport will be available for download in 2-3 minutes.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sustainability Management</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Leaf className="w-3 h-3" />
            <span>Carbon: -12.3%</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Renewable: 42%</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Sustainability Dashboard</TabsTrigger>
          <TabsTrigger value="carbon">Carbon Management</TabsTrigger>
          <TabsTrigger value="energy">Energy & Resources</TabsTrigger>
          <TabsTrigger value="initiatives">Green Initiatives</TabsTrigger>
          <TabsTrigger value="compliance">Compliance & Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sustainabilityMetrics.map((metric) => (
              <Card 
                key={metric.id} 
                className={`cursor-pointer transition-all ${
                  selectedMetric === metric.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
                } ${
                  metric.status === 'excellent' ? 'border-green-200' :
                  metric.status === 'on_track' ? 'border-blue-200' :
                  metric.status === 'needs_attention' ? 'border-yellow-200' :
                  'border-red-200'
                }`}
                onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{metric.name}</h3>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                      )}
                      <span className={`text-xs ${metric.trend === 'down' ? 'text-green-600' : 'text-blue-600'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current:</span>
                      <span className="font-bold">{metric.value}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Target:</span>
                      <span className="font-medium text-slate-600">{metric.target}</span>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">{metric.progress}% to target</span>
                      <Badge 
                        variant={
                          metric.status === 'excellent' ? 'default' :
                          metric.status === 'on_track' ? 'secondary' :
                          metric.status === 'needs_attention' ? 'default' :
                          'destructive'
                        }
                        className="text-xs"
                      >
                        {metric.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carbon Trajectory */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span>Carbon Emission Trajectory</span>
                </CardTitle>
                <Button onClick={generateCarbonForecast}>
                  AI Forecast
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={carbonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={3} name="Actual Emissions (tons CO2)" />
                  <Line type="monotone" dataKey="target" stroke="#22c55e" strokeWidth={3} strokeDasharray="5 5" name="Target (tons CO2)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Carbon Neutral Goal</p>
                        <p className="text-sm text-green-600">On track for 2030 target</p>
                      </div>
                    </div>
                    <Badge variant="secondary">68% Complete</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Renewable Energy</p>
                        <p className="text-sm text-blue-600">42% of total consumption</p>
                      </div>
                    </div>
                    <Badge variant="secondary">+5.4% YoY</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Water Efficiency</p>
                        <p className="text-sm text-yellow-600">Needs improvement</p>
                      </div>
                    </div>
                    <Badge variant="default">56% to target</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">2,850</p>
                    <p className="text-sm text-slate-500">Tons CO2 Avoided (YTD)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">12.4M</p>
                      <p className="text-xs text-slate-500">kWh Renewable Energy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">76%</p>
                      <p className="text-xs text-slate-500">Waste Diverted</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-slate-600">Environmental certifications:</p>
                    <div className="flex justify-center space-x-2 mt-2">
                      <Badge variant="outline">LEED Gold</Badge>
                      <Badge variant="outline">ISO 14001</Badge>
                      <Badge variant="outline">Carbon Trust</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="carbon" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">4.1</p>
                <p className="text-sm text-slate-500">kg CO2/passenger</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingDown className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">-12.3%</p>
                <p className="text-sm text-slate-500">YoY Reduction</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">3.5</p>
                <p className="text-sm text-slate-500">Target kg CO2/pax</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">68%</p>
                <p className="text-sm text-slate-500">Progress to Goal</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Carbon Emissions by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={[
                  { category: 'Energy', scope1: 1200, scope2: 2800, scope3: 450 },
                  { category: 'Transportation', scope1: 890, scope2: 200, scope3: 3400 },
                  { category: 'Waste', scope1: 150, scope2: 100, scope3: 300 },
                  { category: 'Water', scope1: 80, scope2: 180, scope3: 120 },
                  { category: 'Supply Chain', scope1: 0, scope2: 0, scope3: 2200 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="scope1" stackId="1" stroke="#ef4444" fill="#ef4444" name="Scope 1" />
                  <Area type="monotone" dataKey="scope2" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Scope 2" />
                  <Area type="monotone" dataKey="scope3" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Scope 3" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carbon Reduction Initiatives Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Energy Efficiency</h4>
                    <p className="text-2xl font-bold text-green-600">-1,450</p>
                    <p className="text-sm text-slate-500">tons CO2/year</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Renewable Energy</h4>
                    <p className="text-2xl font-bold text-blue-600">-1,200</p>
                    <p className="text-sm text-slate-500">tons CO2/year</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Transportation</h4>
                    <p className="text-2xl font-bold text-purple-600">-800</p>
                    <p className="text-sm text-slate-500">tons CO2/year</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="renewable" stackId="1" stroke="#22c55e" fill="#22c55e" name="Renewable Energy" />
                  <Area type="monotone" dataKey="grid" stackId="1" stroke="#ef4444" fill="#ef4444" name="Grid Electricity" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span>Water Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Daily Consumption</span>
                    <span className="font-bold text-blue-600">89,400L</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recycled Water Usage</span>
                    <span className="font-bold text-green-600">34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Per Passenger Usage</span>
                    <span className="font-bold">2.8L/pax</span>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">Target: 2.2L/passenger by 2025</p>
                    <p className="text-xs text-blue-600">Need 21% reduction</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Recycle className="w-5 h-5 text-green-500" />
                  <span>Waste Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">76%</p>
                    <p className="text-sm text-slate-500">Waste Diversion Rate</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Recycling</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Composting</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Energy Recovery</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Landfill</span>
                      <span className="font-medium text-red-600">24%</span>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">Target: 85% diversion by 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Noise Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={noiseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="db" stroke="#3b82f6" strokeWidth={2} name="Noise Level (dB)" />
                  <Line type="monotone" dataKey="limit" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Limit (dB)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Green Initiatives Portfolio</CardTitle>
                <Button>
                  <Target className="w-4 h-4 mr-2" />
                  Add Initiative
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {initiatives.map((initiative) => (
                  <Card key={initiative.id} className="card-enhanced">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge variant={
                            initiative.status === 'completed' ? 'secondary' : 
                            initiative.status === 'in_progress' ? 'default' : 'outline'
                          }>
                            {initiative.status.replace('_', ' ')}
                          </Badge>
                          <h3 className="font-medium text-white">{initiative.name}</h3>
                          <Badge variant="outline">{initiative.category}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-blue-300">{initiative.progress}% Complete</p>
                          <p className="text-xs text-blue-400">Due: {initiative.completion}</p>
                        </div>
                      </div>
                      
                      <Progress value={initiative.progress} className="h-2 mb-3" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-blue-400">Environmental Impact</p>
                          <p className="font-medium text-white">{initiative.impact}</p>
                          <p className="text-sm text-green-600">{initiative.co2_reduction}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-400">Budget</p>
                          <p className="font-medium text-white">{initiative.budget}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Update Status
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Compliance & Reporting</span>
                </CardTitle>
                <Button onClick={() => exportComplianceData('all')}>
                  Export All Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceReports.map((report) => (
                  <Card key={report.id} className="card-enhanced">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge variant={report.status === 'approved' ? 'default' : 
                                        report.status === 'submitted' ? 'secondary' :
                                        report.status === 'in_review' ? 'default' : 'destructive'}>
                            {report.status.replace('_', ' ')}
                          </Badge>
                          <div>
                            <h3 className="font-medium text-white">{report.name}</h3>
                            <p className="text-sm text-blue-300">{report.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-blue-300">Due: {report.dueDate}</p>
                          {report.submitted && (
                            <p className="text-xs text-blue-400">Submitted: {report.submitted}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-blue-400">Authority</p>
                          <p className="font-medium text-white">{report.authority}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-400">Compliance Status</p>
                          <Badge variant={report.compliance === 'compliant' ? 'secondary' : 
                                        report.compliance === 'pending' ? 'default' : 'destructive'}>
                            {report.compliance}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 sci-fi-button">
                            View Report
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 sci-fi-button"
                            onClick={() => exportComplianceData(report.id)}
                          >
                            Export Data
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reports Submitted On Time</span>
                    <span className="font-bold text-green-600">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compliance Rate</span>
                    <span className="font-bold text-blue-600">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-sm text-green-800">All major certifications current</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">Water Usage Report</p>
                      <p className="text-sm text-red-600">Due in 3 days</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Complete
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">Carbon Verification</p>
                      <p className="text-sm text-yellow-600">Due in 2 weeks</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Schedule
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">Annual Sustainability Report</p>
                      <p className="text-sm text-blue-600">Due in 1 month</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Start Draft
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}