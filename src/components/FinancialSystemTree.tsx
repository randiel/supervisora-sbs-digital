
import { useState } from 'react';
import { ChevronDown, ChevronRight, Building2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FinancialEntity } from './ApplicationWindow';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isEntity?: boolean;
  license?: string;
}

const financialSystemData: TreeNode = {
  id: 'root',
  name: 'Sistema Financiero',
  children: [
    {
      id: 'banks',
      name: 'Bancos',
      children: [
        { id: 'bcp', name: 'Banco de Crédito del Perú', isEntity: true, license: 'Bancos' },
        { id: 'continental', name: 'Banco Continental', isEntity: true, license: 'Bancos' },
        { id: 'pichincha', name: 'Banco Pichincha', isEntity: true, license: 'Bancos' },
        { id: 'scotiabank', name: 'Scotiabank Perú', isEntity: true, license: 'Bancos' },
        { id: 'interbank', name: 'Interbank', isEntity: true, license: 'Bancos' }
      ]
    },
    {
      id: 'financieras',
      name: 'Financieras',
      children: [
        { id: 'crediscotia', name: 'CrediScotia Financiera', isEntity: true, license: 'Financieras' },
        { id: 'compartamos', name: 'Financiera Compartamos', isEntity: true, license: 'Financieras' },
        { id: 'proempresa', name: 'Financiera Proempresa', isEntity: true, license: 'Financieras' }
      ]
    },
    {
      id: 'cooperativas',
      name: 'Cooperativas',
      children: [
        { id: 'abaco', name: 'Cooperativa Abaco', isEntity: true, license: 'Cooperativas' },
        { id: 'san-pedro', name: 'Cooperativa San Pedro de Lajas', isEntity: true, license: 'Cooperativas' }
      ]
    },
    {
      id: 'cajas',
      name: 'Cajas',
      children: [
        { id: 'arequipa', name: 'Caja Arequipa', isEntity: true, license: 'Cajas' },
        { id: 'trujillo', name: 'Caja Trujillo', isEntity: true, license: 'Cajas' },
        { id: 'huancayo', name: 'Caja Huancayo', isEntity: true, license: 'Cajas' }
      ]
    },
    {
      id: 'seguros',
      name: 'Seguros',
      children: [
        { id: 'rimac', name: 'Rimac Seguros', isEntity: true, license: 'Seguros' },
        { id: 'pacifico', name: 'Pacífico Seguros', isEntity: true, license: 'Seguros' },
        { id: 'mapfre', name: 'Mapfre Perú', isEntity: true, license: 'Seguros' }
      ]
    },
    {
      id: 'afp',
      name: 'AFP',
      children: [
        { id: 'prima', name: 'AFP Prima', isEntity: true, license: 'AFP' },
        { id: 'integra', name: 'AFP Integra', isEntity: true, license: 'AFP' },
        { id: 'habitat', name: 'AFP Hábitat', isEntity: true, license: 'AFP' }
      ]
    }
  ]
};

interface FinancialSystemTreeProps {
  onEntitySelect: (entity: FinancialEntity) => void;
}

export const FinancialSystemTree = ({ onEntitySelect }: FinancialSystemTreeProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
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
            
            <span className={`text-sm ${node.isEntity ? 'text-gray-900' : 'font-medium text-gray-700'}`}>
              {node.name}
            </span>
            
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
        {renderNode(financialSystemData)}
      </div>
    </div>
  );
};
