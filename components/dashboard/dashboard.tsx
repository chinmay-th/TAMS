'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { AOCCHome } from '../pages/aocc-home';
import { AirsidePage } from '../pages/airside';
import { TerminalPage } from '../pages/terminal';
import { LandsidePage } from '../pages/landside';
import { SecurityPage } from '../pages/security';
import { MaintenancePage } from '../pages/maintenance';
import { RetailPage } from '../pages/retail';
import { SustainabilityPage } from '../pages/sustainability';
import { SOPConsolePage } from '../pages/sop-console';
import { ReportsPage } from '../pages/reports';

export type PageType = 
  | 'aocc'
  | 'airside'
  | 'terminal'
  | 'landside'
  | 'security'
  | 'maintenance'
  | 'retail'
  | 'sustainability'
  | 'sop'
  | 'reports';

export function Dashboard() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('aocc');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'aocc':
        return <AOCCHome />;
      case 'airside':
        return <AirsidePage />;
      case 'terminal':
        return <TerminalPage />;
      case 'landside':
        return <LandsidePage />;
      case 'security':
        return <SecurityPage />;
      case 'maintenance':
        return <MaintenancePage />;
      case 'retail':
        return <RetailPage />;
      case 'sustainability':
        return <SustainabilityPage />;
      case 'sop':
        return <SOPConsolePage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <AOCCHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Sidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={user?.role || 'aocc_operator'}
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header 
          user={user!}
          currentPage={currentPage}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="p-6 animate-fade-in-up">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}