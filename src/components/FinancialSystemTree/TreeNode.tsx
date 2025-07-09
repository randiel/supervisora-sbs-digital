
import { ChevronDown, ChevronRight, Building2, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TreeNode as TreeNodeType, FinancialEntity } from './types';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface TreeNodeProps {
  node: TreeNodeType;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: (nodeId: string) => void;
  onEntitySelect: (entity: FinancialEntity) => void;
}

export const TreeNode = ({ 
  node, 
  level, 
  isExpanded, 
  isSelected, 
  onToggle, 
  onEntitySelect 
}: TreeNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      onToggle(node.id);
    } else if (node.isEntity) {
      onEntitySelect({
        id: node.id,
        name: node.name,
        license: node.license!
      });
    }
  };

  const renderCategoryHeader = () => {
    if (node.tooltip) {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center space-x-1 cursor-help">
              <span className="font-medium text-gray-700">{node.name}</span>
              <HelpCircle className="h-3 w-3 text-gray-400" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-64 p-3">
            <p className="text-sm text-gray-600">{node.tooltip}</p>
          </HoverCardContent>
        </HoverCard>
      );
    }
    
    return <span className="font-medium text-gray-700">{node.name}</span>;
  };

  return (
    <div>
      <div 
        className={`flex items-center py-2 px-2 rounded cursor-pointer hover:bg-gray-100 ${
          isSelected ? 'bg-blue-50 border border-blue-200' : ''
        }`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-2 flex-1">
          {hasChildren && (
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          )}
          
          {!hasChildren && <div className="w-4" />}
          
          {node.isEntity ? (
            <Building2 className="h-4 w-4 text-blue-600" />
          ) : (
            <div className="w-4 h-4 bg-gray-300 rounded" />
          )}
          
          <div className="text-sm">
            {node.isEntity ? (
              <span className="text-gray-900">{node.name}</span>
            ) : (
              renderCategoryHeader()
            )}
          </div>
          
          {isSelected && (
            <CheckCircle className="h-4 w-4 text-blue-600 ml-auto" />
          )}
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              isExpanded={isExpanded}
              isSelected={isSelected}
              onToggle={onToggle}
              onEntitySelect={onEntitySelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
