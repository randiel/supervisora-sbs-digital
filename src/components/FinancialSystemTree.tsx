
import { useState } from 'react';
import { ChevronDown, ChevronRight, Building2, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FinancialEntity } from './ApplicationWindow';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isEntity?: boolean;
  license?: string;
  tooltip?: string;
}

const financialSystemData: TreeNode[] = [
  {
    id: 'seguros',
    name: 'Seguros',
    children: [
      { id: 'ace', name: 'ACE', isEntity: true, license: 'Seguros' },
      { id: 'avla-peru', name: 'Avla Perú', isEntity: true, license: 'Seguros' },
      { id: 'cardif', name: 'Cardif', isEntity: true, license: 'Seguros' },
      { id: 'chubb-peru', name: 'Chubb Perú', isEntity: true, license: 'Seguros' },
      { id: 'coface', name: 'Coface', isEntity: true, license: 'Seguros' },
      { id: 'crecer-seguros', name: 'Crecer Seguros', isEntity: true, license: 'Seguros' },
      { id: 'el-pacifico-vida', name: 'El Pacífico Vida', isEntity: true, license: 'Seguros' },
      { id: 'generali-peru', name: 'Generali Perú', isEntity: true, license: 'Seguros' },
      { id: 'insur', name: 'Insur', isEntity: true, license: 'Seguros' },
      { id: 'interseguro', name: 'Interseguro', isEntity: true, license: 'Seguros' },
      { id: 'la-positiva', name: 'La Positiva', isEntity: true, license: 'Seguros' },
      { id: 'la-positiva-vida', name: 'La Positiva Vida', isEntity: true, license: 'Seguros' },
      { id: 'latina-xxx', name: 'Latina XXX', isEntity: true, license: 'Seguros' },
      { id: 'liberty-seguros', name: 'Liberty Seguros', isEntity: true, license: 'Seguros' },
      { id: 'mapfre-peru-1', name: 'Mapfre Perú', isEntity: true, license: 'Seguros' },
      { id: 'mapfre-peru-2', name: 'Mapfre Perú', isEntity: true, license: 'Seguros' },
      { id: 'ohio-national', name: 'Ohio National', isEntity: true, license: 'Seguros' },
      { id: 'pacifico-1', name: 'Pacífico', isEntity: true, license: 'Seguros' },
      { id: 'pacifico-2', name: 'Pacífico', isEntity: true, license: 'Seguros' },
      { id: 'protecta', name: 'Protecta', isEntity: true, license: 'Seguros' },
      { id: 'qualitas', name: 'Qualitas', isEntity: true, license: 'Seguros' },
      { id: 'rigel-peru', name: 'Rigel Perú', isEntity: true, license: 'Seguros' },
      { id: 'rimac', name: 'Rímac', isEntity: true, license: 'Seguros' },
      { id: 'secrex', name: 'Secrex', isEntity: true, license: 'Seguros' },
      { id: 'sura', name: 'Sura', isEntity: true, license: 'Seguros' },
      { id: 'vivir-seguros', name: 'Vivir Seguros', isEntity: true, license: 'Seguros' }
    ]
  },
  {
    id: 'afp',
    name: 'AFP',
    tooltip: 'Administradora de Fondos de Pensiones',
    children: [
      { id: 'afp-integra', name: 'AFP Integra', isEntity: true, license: 'AFP' },
      { id: 'afp-prima', name: 'AFP Prima', isEntity: true, license: 'AFP' },
      { id: 'afp-profuturo', name: 'AFP Profuturo', isEntity: true, license: 'AFP' },
      { id: 'afp-habitat', name: 'AFP Hábitat', isEntity: true, license: 'AFP' }
    ]
  },
  {
    id: 'dcb',
    name: 'DCB',
    tooltip: 'Derrama y Caja de Beneficios',
    children: [
      { id: 'caja-militar-policia', name: 'Caja Militar Policia', isEntity: true, license: 'DCB' }
    ]
  }
];

interface FinancialSystemTreeProps {
  onEntitySelect: (entity: FinancialEntity) => void;
}

export const FinancialSystemTree = ({ onEntitySelect }: FinancialSystemTreeProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleEntitySelect = (node: TreeNode) => {
    if (node.isEntity) {
      setSelectedEntity(node.id);
      onEntitySelect({
        id: node.id,
        name: node.name,
        license: node.license!
      });
    }
  };

  const renderCategoryHeader = (node: TreeNode) => {
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

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedEntity === node.id;

    return (
      <div key={node.id}>
        <div 
          className={`flex items-center py-2 px-2 rounded cursor-pointer hover:bg-gray-100 ${
            isSelected ? 'bg-blue-50 border border-blue-200' : ''
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            } else if (node.isEntity) {
              handleEntitySelect(node);
            }
          }}
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
                renderCategoryHeader(node)
              )}
            </div>
            
            {isSelected && (
              <CheckCircle className="h-4 w-4 text-blue-600 ml-auto" />
            )}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-3 border-b bg-gray-50 rounded-t-lg">
        <h3 className="text-sm font-semibold text-gray-900">
          Entidades del Sistema Financiero
        </h3>
      </div>
      <div className="p-2 max-h-96 overflow-y-auto">
        {financialSystemData.map(category => renderNode(category))}
      </div>
    </div>
  );
};
