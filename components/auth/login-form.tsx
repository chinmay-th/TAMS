'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plane, Shield, Settings, Wrench, BarChart3 } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Try demo accounts below.');
    }
    setIsLoading(false);
  };

  const demoAccounts = [
    { email: 'aocc@airport.com', role: 'AOCC Operator', icon: BarChart3, color: 'text-blue-500' },
    { email: 'airside@airport.com', role: 'Airside Supervisor', icon: Plane, color: 'text-green-500' },
    { email: 'terminal@airport.com', role: 'Terminal Supervisor', icon: Settings, color: 'text-orange-500' },
    { email: 'security@airport.com', role: 'Security Supervisor', icon: Shield, color: 'text-red-500' },
    { email: 'maintenance@airport.com', role: 'Maintenance Engineer', icon: Wrench, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 grid-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 glow-blue">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 holographic-text">Astrikos AI S!aP</h1>
          <p className="text-slate-300">Total Airport Management System</p>
          <p className="text-sm text-slate-400 mt-2">Chicago O'Hare International Airport</p>
        </div>

        <Card className="sci-fi-card backdrop-blur-lg animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-slate-300">
              Access the integrated airport operations platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sci-fi-input placeholder:text-slate-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="sci-fi-input placeholder:text-slate-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && (
                <Alert className="bg-red-500/10 border-red-500/20 text-red-300">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button 
                type="submit" 
                className="w-full sci-fi-button"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="text-center text-sm text-slate-400 mb-4">Demo Accounts (password: demo)</div>
              <div className="space-y-2">
                {demoAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <Button
                      key={account.email}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3 hover:bg-blue-500/20 text-white border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                      onClick={() => {
                        setEmail(account.email);
                        setPassword('demo');
                      }}
                    >
                      <Icon className={`w-4 h-4 mr-2 ${account.color}`} />
                      <div>
                        <div className="font-medium">{account.role}</div>
                        <div className="text-xs text-slate-400">{account.email}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}