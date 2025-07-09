import { useState } from 'react';
import { ChevronDown, ChevronRight, Building2, CheckCircle, HelpCircle, Search, Folder, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface FileItem {
  id: string;
  name: string;
  size?: string;
}

interface FolderItem {
  id: string;
  name: string;
  files: FileItem[];
}

const financialSystemData: TreeNode[] = [
  {
    id: 'sistema-financiero',
    name: 'Sistema Financiero',
    children: [
      {
        id: 'administradora-hipotecaria',
        name: 'Administradora Hipotecaria',
        children: [
          { id: 'solucion-administradora-hipotecaria', name: 'Solución Administradora Hipotecaria', isEntity: true, license: 'Administradora Hipotecaria' }
        ]
      },
      {
        id: 'afianzadora',
        name: 'Afianzadora',
        children: [
          { id: 'fogapi', name: 'FOGAPI', isEntity: true, license: 'Afianzadora' }
        ]
      },
      {
        id: 'almacen-general-deposito',
        name: 'Almacén General de Depósito',
        children: [
          { id: 'almaperu', name: 'ALMAPERU S.A.', isEntity: true, license: 'Almacén General de Depósito' },
          { id: 'almafin', name: 'ALMAFIN', isEntity: true, license: 'Almacén General de Depósito' }
        ]
      },
      {
        id: 'banca-inversion',
        name: 'Banca de Inversión',
        children: [
          { id: 'jp-morgan', name: 'JP Morgan', isEntity: true, license: 'Banca de Inversión' }
        ]
      },
      {
        id: 'banco',
        name: 'Banco',
        children: [
          { id: 'agrobanco', name: 'Agrobanco', isEntity: true, license: 'Banco' },
          { id: 'banco-central-peru', name: 'BANCO CENTRAL PERU', isEntity: true, license: 'Banco' },
          { id: 'banco-icbc', name: 'Banco ICBC', isEntity: true, license: 'Banco' },
          { id: 'nacion', name: 'Nacion', isEntity: true, license: 'Banco' },
          { id: 'banco-bci', name: 'Banco BCI', isEntity: true, license: 'Banco' },
          { id: 'banco-financiero', name: 'Banco Financiero', isEntity: true, license: 'Banco' },
          { id: 'cofide', name: 'COFIDE', isEntity: true, license: 'Banco' },
          { id: 'banco-gnb', name: 'Banco GNB', isEntity: true, license: 'Banco' },
          { id: 'banco-santander', name: 'Banco Santander', isEntity: true, license: 'Banco' },
          { id: 'banco-ripley', name: 'Banco Ripley', isEntity: true, license: 'Banco' },
          { id: 'citibank', name: 'Citibank', isEntity: true, license: 'Banco' },
          { id: 'banco-falabella', name: 'Banco Falabella', isEntity: true, license: 'Banco' },
          { id: 'banco-comercio', name: 'Banco de Comercio', isEntity: true, license: 'Banco' },
          { id: 'bank-of-china-peru', name: 'BANK OF CHINA (PERU)', isEntity: true, license: 'Banco' },
          { id: 'banco-interamericano-finanzas', name: 'Banco Interamericano de Finanzas', isEntity: true, license: 'Banco' },
          { id: 'mibanco', name: 'Mibanco', isEntity: true, license: 'Banco' },
          { id: 'banco-continental', name: 'Banco Continental', isEntity: true, license: 'Banco' },
          { id: 'scotiabank', name: 'Scotiabank', isEntity: true, license: 'Banco' },
          { id: 'banco-credito', name: 'Banco de Crédito', isEntity: true, license: 'Banco' },
          { id: 'interbank', name: 'Interbank', isEntity: true, license: 'Banco' },
          { id: 'azteca-peru', name: 'Azteca del Perú', isEntity: true, license: 'Banco' },
          { id: 'compartamos-banco', name: 'Compartamos Banco', isEntity: true, license: 'Banco' }
        ]
      },
      {
        id: 'caja-municipal',
        name: 'Caja Municipal',
        children: [
          { id: 'cmac-del-santa', name: 'CMAC Del Santa', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-maynas', name: 'CMAC Maynas', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-huancayo', name: 'CMAC Huancayo', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmcp-lima', name: 'CMCP Lima', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-tacna', name: 'CMAC Tacna', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-piura', name: 'CMAC Piura', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-arequipa', name: 'CMAC Arequipa', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-paita', name: 'CMAC Paita', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-cusco', name: 'CMAC Cusco', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-ica', name: 'CMAC Ica', isEntity: true, license: 'Caja Municipal' },
          { id: 'cmac-trujillo', name: 'CMAC Trujillo', isEntity: true, license: 'Caja Municipal' }
        ]
      },
      {
        id: 'caja-rural',
        name: 'Caja Rural',
        children: [
          { id: 'crac-los-andes', name: 'CRAC Los Andes', isEntity: true, license: 'Caja Rural' },
          { id: 'crac-incasur', name: 'CRAC Incasur', isEntity: true, license: 'Caja Rural' },
          { id: 'crac-del-centro', name: 'CRAC Del Centro', isEntity: true, license: 'Caja Rural' },
          { id: 'crac-prymera', name: 'CRAC Prymera', isEntity: true, license: 'Caja Rural' },
          { id: 'caja-cat-peru', name: 'CAJA CAT PERU', isEntity: true, license: 'Caja Rural' }
        ]
      },
      {
        id: 'derrama-caja-beneficios-sf',
        name: 'Derrama y Caja de Beneficios',
        children: [
          { id: 'derrama-magisterial', name: 'DERRAMA MAGISTERIAL', isEntity: true, license: 'Derrama y Caja de Beneficios' },
          { id: 'sesdis', name: 'SESDIS', isEntity: true, license: 'Derrama y Caja de Beneficios' }
        ]
      },
      {
        id: 'empresa-credito',
        name: 'Empresa de Crédito',
        children: [
          { id: 'edpyme-micasita', name: 'Edpyme Micasita', isEntity: true, license: 'Empresa de Crédito' },
          { id: 'empresa-credito-alternativa', name: 'Empresa de Crédito Alternativa', isEntity: true, license: 'Empresa de Crédito' },
          { id: 'empresa-creditos-santander-consumo-peru', name: 'Empresa de Créditos Santander Consumo Perú', isEntity: true, license: 'Empresa de Crédito' },
          { id: 'total-servicios-fin', name: 'TOTAL SERVICIOS FIN.', isEntity: true, license: 'Empresa de Crédito' },
          { id: 'volvo-finance-empresa-creditos', name: 'Volvo Finance Empresa de Créditos', isEntity: true, license: 'Empresa de Crédito' }
        ]
      },
      {
        id: 'empresa-emisora-dinero-electronico',
        name: 'Empresa Emisora de Dinero Electrónico',
        children: [
          { id: 'tarjetas-peruanas', name: 'Tarjetas Peruanas', isEntity: true, license: 'Empresa Emisora de Dinero Electrónico' },
          { id: 'peruana-soluciones', name: 'Peruana Soluciones', isEntity: true, license: 'Empresa Emisora de Dinero Electrónico' },
          { id: 'servitebca', name: 'Servitebca', isEntity: true, license: 'Empresa Emisora de Dinero Electrónico' },
          { id: 'gmoney', name: 'GMoney', isEntity: true, license: 'Empresa Emisora de Dinero Electrónico' }
        ]
      },
      {
        id: 'fiduciaria',
        name: 'Fiduciaria',
        children: [
          { id: 'la-fiduciaria', name: 'La Fiduciaria', isEntity: true, license: 'Fiduciaria' },
          { id: 'fiduperu', name: 'FIDUPERU', isEntity: true, license: 'Fiduciaria' },
          { id: 'corfid', name: 'Corfid', isEntity: true, license: 'Fiduciaria' }
        ]
      }
    ]
  },
  {
    id: 'sistema-asegurador',
    name: 'Sistema Asegurador',
    children: [
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
      }
    ]
  },
  {
    id: 'sistema-previsional',
    name: 'Sistema Previsional',
    children: [
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
    ]
  }
];

// Mock data for folders and files
const mockFoldersData: Record<string, FolderItem[]> = {
  'afp-integra': [
    {
      id: 'carta-at01-soc2',
      name: '201905 Carta sobre AT01 Soc2 Tipo II',
      files: [
        { id: 'carta-at01-1', name: 'CartaAT01_Soc2TipoII.pdf', size: '2.3 MB' },
        { id: 'carta-at01-2', name: 'RespuestaAT01.pdf', size: '1.8 MB' }
      ]
    },
    {
      id: 'sae18',
      name: '201905 SAE18',
      files: [
        { id: 'sae18-1', name: 'SAE18_Informe.pdf', size: '3.2 MB' },
        { id: 'sae18-2', name: 'SAE18_Anexos.pdf', size: '4.1 MB' }
      ]
    },
    {
      id: 'calificacion-2019',
      name: '201909 Calificación 2019',
      files: [
        { id: 'cal-2019-1', name: 'Calificacion2019_Final.pdf', size: '5.7 MB' },
        { id: 'cal-2019-2', name: 'Anexo_Calificacion.pdf', size: '2.9 MB' }
      ]
    },
    {
      id: 'npci-video',
      name: '202507 NPCI Video Inteligencia Palantir',
      files: [
        { id: 'npci-1', name: 'ActaN227CAROyGP06062025.pdf', size: '1.2 MB' },
        { id: 'npci-2', name: 'EvaluacionDSSIT.pdf', size: '3.4 MB' },
        { id: 'npci-3', name: 'Informe_00006_31122025.pdf', size: '2.8 MB' }
      ]
    }
  ],
  'banco-credito': [
    {
      id: 'auditoria-2024',
      name: '202401 Auditoría Integral',
      files: [
        { id: 'audit-1', name: 'InformeAuditoria2024.pdf', size: '4.5 MB' },
        { id: 'audit-2', name: 'PlanAccion.pdf', size: '1.9 MB' }
      ]
    }
  ]
};

interface FinancialSystemTreeProps {
  onEntitySelect: (entity: FinancialEntity) => void;
}

export const FinancialSystemTree = ({ onEntitySelect }: FinancialSystemTreeProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const toggleFileSelection = (fileId: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(fileId)) {
      newSelected.delete(fileId);
    } else {
      newSelected.add(fileId);
    }
    setSelectedFiles(newSelected);
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

  const filterNodes = (nodes: TreeNode[], searchTerm: string): TreeNode[] => {
    if (!searchTerm) return nodes;

    const filtered: TreeNode[] = [];
    
    for (const node of nodes) {
      const matchesName = node.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLicense = node.license?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (matchesName || matchesLicense) {
        filtered.push(node);
      } else if (node.children) {
        const filteredChildren = filterNodes(node.children, searchTerm);
        if (filteredChildren.length > 0) {
          filtered.push({
            ...node,
            children: filteredChildren
          });
        }
      }
    }
    
    return filtered;
  };

  const filteredData = filterNodes(financialSystemData, searchTerm);

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

  const renderFoldersTree = () => {
    if (!selectedEntity) return null;

    const folders = mockFoldersData[selectedEntity] || [];
    if (folders.length === 0) return null;

    const selectedEntityNode = findEntityById(selectedEntity);
    if (!selectedEntityNode) return null;

    return (
      <div className="mt-4 bg-white rounded-lg border">
        <div className="p-3 border-b bg-gray-50 rounded-t-lg">
          <h4 className="text-sm font-semibold text-gray-900">
            Carpetas - {selectedEntityNode.name}
          </h4>
        </div>
        <div className="p-2 max-h-64 overflow-y-auto">
          {folders.map(folder => (
            <div key={folder.id}>
              <div 
                className="flex items-center py-2 px-2 rounded cursor-pointer hover:bg-gray-100"
                onClick={() => toggleFolder(folder.id)}
              >
                <div className="flex items-center space-x-2 flex-1">
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                    {expandedFolders.has(folder.id) ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                  <Folder className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-gray-900">{folder.name}</span>
                </div>
              </div>
              
              {expandedFolders.has(folder.id) && (
                <div className="ml-8">
                  {folder.files.map(file => (
                    <div 
                      key={file.id}
                      className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-100 ${
                        selectedFiles.has(file.id) ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                      onClick={() => toggleFileSelection(file.id)}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="w-4" />
                        {selectedFiles.has(file.id) ? (
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        ) : (
                          <div className="w-4 h-4 border border-gray-300 rounded" />
                        )}
                        <File className="h-4 w-4 text-gray-500" />
                        <div className="flex-1">
                          <span className="text-sm text-gray-900">{file.name}</span>
                          {file.size && (
                            <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {selectedFiles.size > 0 && (
          <div className="p-3 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              {selectedFiles.size} archivo{selectedFiles.size !== 1 ? 's' : ''} seleccionado{selectedFiles.size !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    );
  };

  const findEntityById = (entityId: string): TreeNode | null => {
    const findInNodes = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === entityId && node.isEntity) {
          return node;
        }
        if (node.children) {
          const found = findInNodes(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInNodes(financialSystemData);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border">
        <div className="p-3 border-b bg-gray-50 rounded-t-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Entidades del Sistema Financiero
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar entidad o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 text-sm"
            />
          </div>
        </div>
        <div className="p-2 max-h-96 overflow-y-auto">
          {filteredData.map(category => renderNode(category))}
        </div>
      </div>

      {renderFoldersTree()}
    </div>
  );
};
