'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Wrench, 
  PlayCircle, 
  Target,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: {
    title: string;
    type: 'maintenance' | 'workflow' | 'control' | 'forecast' | 'optimization' | 'sop' | 'offer';
    priority?: 'high' | 'medium' | 'low';
    assignee?: string;
    eta?: string;
    description?: string;
    impact?: string;
    confidence?: number;
    details?: string[];
  };
}

export function ActionConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  action 
}: ActionConfirmationModalProps) {
  const getActionIcon = () => {
    switch (action.type) {
      case 'maintenance':
        return <Wrench className="w-6 h-6 text-orange-400" />;
      case 'workflow':
        return <PlayCircle className="w-6 h-6 text-blue-400" />;
      case 'control':
        return <Target className="w-6 h-6 text-purple-400" />;
      case 'forecast':
        return <Info className="w-6 h-6 text-cyan-400" />;
      case 'optimization':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'sop':
        return <PlayCircle className="w-6 h-6 text-red-400" />;
      case 'offer':
        return <Target className="w-6 h-6 text-yellow-400" />;
      default:
        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl modal-content cyber-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-white neon-glow">
            {getActionIcon()}
            <span className="holographic-text">Execute Action</span>
            {action.priority && (
              <Badge variant={
                action.priority === 'high' ? 'destructive' : 
                action.priority === 'medium' ? 'default' : 'secondary'
              }>
                {action.priority.toUpperCase()}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-blue-300">
            Confirm the execution of this action
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Action Details */}
          <div className="card-enhanced p-6">
            <h3 className="text-lg font-medium text-white mb-4">{action.title}</h3>
            
            {action.description && (
              <p className="text-blue-300 mb-4">{action.description}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {action.assignee && (
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">Assigned to:</span>
                  <span className="text-white font-medium">{action.assignee}</span>
                </div>
              )}
              
              {action.eta && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">ETA:</span>
                  <span className="text-white font-medium">{action.eta}</span>
                </div>
              )}
            </div>

            {action.impact && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-300 mb-1">Expected Impact</h4>
                <p className="text-white">{action.impact}</p>
              </div>
            )}

            {action.confidence && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-300">AI Confidence Level</span>
                  <span className="text-white font-medium">{action.confidence}%</span>
                </div>
                <div className="w-full bg-blue-500/20 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full" 
                    style={{ width: `${action.confidence}%` }}
                  ></div>
                </div>
              </div>
            )}

            {action.details && action.details.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-blue-300 mb-2">Action Details</h4>
                <ul className="space-y-1">
                  {action.details.map((detail, index) => (
                    <li key={index} className="text-sm text-white flex items-start space-x-2">
                      <span className="text-blue-400">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirmation Buttons */}
          <div className="flex space-x-4">
            <Button 
              onClick={handleConfirm}
              className="flex-1 sci-fi-button"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Execute Action
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}