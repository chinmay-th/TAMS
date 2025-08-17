'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Plane, 
  Building2, 
  Car, 
  Shield, 
  Wrench, 
  ShoppingCart, 
  Leaf,
  FileText,
  PlayCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PageType } from './dashboard';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  userRole: string;
}

const menuItems = [
  { id: 'aocc', label: 'AOCC Home', icon: BarChart3, roles: ['aocc_operator', 'administrator'] },
  { id: 'airside', label: 'Airside', icon: Plane, roles: ['aocc_operator', 'airside_supervisor', 'administrator'] },
  { id: 'terminal', label: 'Terminal', icon: Building2, roles: ['aocc_operator', 'terminal_supervisor', 'administrator'] },
  { id: 'landside', label: 'Landside', icon: Car, roles: ['aocc_operator', 'terminal_supervisor', 'administrator'] },
  { id: 'security', label: 'Security & Safety', icon: Shield, roles: ['aocc_operator', 'security_supervisor', 'administrator'] },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, roles: ['aocc_operator', 'maintenance_engineer', 'administrator'] },
  { id: 'retail', label: 'Retail & Revenue', icon: ShoppingCart, roles: ['commercial_manager', 'administrator'] },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf, roles: ['sustainability_manager', 'administrator'] },
  { id: 'sop', label: 'SOP Console', icon: PlayCircle, roles: ['aocc_operator', 'security_supervisor', 'administrator'] },
  { id: 'reports', label: 'Reports', icon: FileText, roles: ['aocc_operator', 'administrator'] },
];

export function Sidebar({ currentPage, onPageChange, collapsed, onToggleCollapse, userRole }: SidebarProps) {
  const filteredItems = menuItems.filter(item => 
    item.roles.includes(userRole) || item.roles.includes('administrator')
  );

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full sci-fi-sidebar transition-all duration-300 z-50",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
        {!collapsed && (
          <div>
            <h2 className="text-lg font-semibold text-white holographic-text">Astrikos AI S!aP</h2>
            <p className="text-xs text-blue-300">TAMS Platform</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-blue-300 hover:text-white hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-1 px-3">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12 px-3 transition-all duration-300 border border-transparent",
                    collapsed ? "justify-center px-2" : "justify-start",
                    isActive 
                      ? "bg-blue-600/30 text-white border-blue-500 glow-blue" 
                      : "text-blue-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/40"
                  )}
                  onClick={() => onPageChange(item.id as PageType)}
                >
                  <Icon className={cn("w-5 h-5", collapsed ? "mr-0" : "mr-3")} />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="sci-fi-card p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full status-online"></div>
              <span className="text-xs text-blue-300">System Status: Online</span>
            </div>
            <div className="text-xs text-blue-400 mt-1">KORD - O'Hare Intl</div>
          </div>
        </div>
      )}
    </div>
  );
}