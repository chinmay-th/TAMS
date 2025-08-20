'use client';

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertsManagement } from '@/components/shared/alerts-management';
import { 
  Bell, 
  Menu, 
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  LogOut
} from 'lucide-react';
import { useAuth, User as UserType } from '@/lib/auth-context';
import { PageType } from './dashboard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  user: UserType;
  currentPage: PageType;
  onToggleSidebar: () => void;
}

const pageLabels: Record<PageType, string> = {
  aocc: 'Airport Operations Control Center',
  airside: 'Airside Operations',
  terminal: 'Terminal Operations',
  landside: 'Landside Operations',
  security: 'Security & Safety',
  maintenance: 'Maintenance & Engineering',
  retail: 'Retail & Revenue',
  sustainability: 'Sustainability Management',
  sop: 'Standard Operating Procedures',
  reports: 'Reports & Analytics',
  simulation: 'AI Simulation & Review Center',
};

export function Header({ user, currentPage, onToggleSidebar }: HeaderProps) {
  const { logout } = useAuth();
  const [showAlerts, setShowAlerts] = useState(false);
  
  // Debug logging
  useEffect(() => {
    console.log('Header showAlerts state:', showAlerts);
  }, [showAlerts]);

  return (
    <header className="sci-fi-header px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden text-blue-300 hover:text-white hover:bg-blue-500/20"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-white holographic-text">
              {pageLabels[currentPage]}
            </h1>
            <p className="text-sm text-blue-300">
              {user.airport_name} • {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Alerts */}
          <div className="flex items-center space-x-2">
            <Badge 
              variant="destructive" 
              className="text-xs sci-fi-badge bg-red-500/20 border-red-500 text-red-300 cursor-pointer hover:bg-red-500/30 transition-all duration-300"
              onClick={() => {
                console.log('Critical badge clicked');
                setShowAlerts(true);
              }}
            >
              <AlertCircle className="w-3 h-3 mr-1" />
              3 Critical
            </Badge>
            <Badge 
              variant="secondary" 
              className="text-xs sci-fi-badge bg-yellow-500/20 border-yellow-500 text-yellow-300 cursor-pointer hover:bg-yellow-500/30 transition-all duration-300"
              onClick={() => {
                console.log('Pending badge clicked');
                setShowAlerts(true);
              }}
            >
              <Clock className="w-3 h-3 mr-1" />
              7 Pending
            </Badge>
            <Badge 
              variant="default" 
              className="text-xs sci-fi-badge bg-green-500/20 border-green-500 text-green-300 cursor-pointer hover:bg-green-500/30 transition-all duration-300"
              onClick={() => {
                console.log('Resolved badge clicked');
                setShowAlerts(true);
              }}
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              12 Resolved
            </Badge>
          </div>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative text-blue-300 hover:text-white hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40"
            onClick={() => {
              console.log('Bell button clicked');
              setShowAlerts(true);
            }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center pulse-glow">
              8
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-blue-300 hover:text-white hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 sci-fi-card">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-blue-300 capitalize">
                    {user.role.replace('_', ' ')}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-blue-300 hover:text-white hover:bg-blue-500/20">
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-400 hover:text-red-300 hover:bg-red-500/20">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {showAlerts && (
        <AlertsManagement 
          isOpen={showAlerts} 
          onClose={() => {
            console.log('Closing alerts modal');
            setShowAlerts(false);
          }} 
        />
      )}
    </header>
  );
}