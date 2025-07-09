import { TreeNode, FolderItem } from './types';

export const financialSystemData: TreeNode[] = [
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

// Función para generar datos simulados de carpetas y archivos
const generateMockFoldersForEntity = (entityId: string, entityName: string, license: string): FolderItem[] => {
  const baseTemplates = [
    {
      prefix: '202401',
      name: 'Auditoría Integral',
      files: [
        { name: 'InformeAuditoria.pdf', size: '4.5 MB' },
        { name: 'PlanAccion.pdf', size: '1.9 MB' }
      ]
    },
    {
      prefix: '202312', 
      name: 'Estados Financieros',
      files: [
        { name: 'EstadosFinancieros.pdf', size: '6.2 MB' },
        { name: 'NotasExplicativas.pdf', size: '3.8 MB' },
        { name: 'DictamenAuditor.pdf', size: '1.5 MB' }
      ]
    },
    {
      prefix: '202403',
      name: 'Gestión de Riesgos',
      files: [
        { name: 'InformeRiesgos.pdf', size: '3.1 MB' },
        { name: 'MatrizRiesgos.xlsx', size: '892 KB' }
      ]
    }
  ];

  // Plantillas específicas por tipo de licencia
  const licenseSpecificTemplates: Record<string, Array<{prefix: string, name: string, files: Array<{name: string, size: string}>}>> = {
    'Banco': [
      {
        prefix: '202402',
        name: 'Prevención Lavado Activos',
        files: [
          { name: 'ManualPLA.pdf', size: '5.4 MB' },
          { name: 'ProcedimientosDDC.pdf', size: '2.1 MB' }
        ]
      },
      {
        prefix: '202401',
        name: 'Basilea III',
        files: [
          { name: 'BasileaIII_Reporte.pdf', size: '4.8 MB' },
          { name: 'CalculosCapital.xlsx', size: '1.2 MB' }
        ]
      }
    ],
    'AFP': [
      {
        prefix: '202401',
        name: 'Gestión de Fondos',
        files: [
          { name: 'InformeFondos.pdf', size: '3.7 MB' },
          { name: 'RentabilidadFondos.xlsx', size: '1.4 MB' }
        ]
      },
      {
        prefix: '202312',
        name: 'Aportes y Beneficios',
        files: [
          { name: 'ReporteAportes.pdf', size: '2.9 MB' },
          { name: 'CalculoBeneficios.pdf', size: '2.1 MB' }
        ]
      }
    ],
    'Seguros': [
      {
        prefix: '202312',
        name: 'Solvencia II',
        files: [
          { name: 'ReporteSolvencia.pdf', size: '6.1 MB' },
          { name: 'CalculoSCR.xlsx', size: '2.4 MB' }
        ]
      },
      {
        prefix: '202403',
        name: 'Reservas Técnicas',
        files: [
          { name: 'CalculoReservas.pdf', size: '3.7 MB' },
          { name: 'ValidacionActuarial.pdf', size: '2.9 MB' }
        ]
      }
    ],
    'Caja Municipal': [
      {
        prefix: '202402',
        name: 'Microfinanzas',
        files: [
          { name: 'InformeMicrofinanzas.pdf', size: '2.8 MB' },
          { name: 'AnalisisRiesgo.pdf', size: '1.9 MB' }
        ]
      },
      {
        prefix: '202312',
        name: 'Inclusión Financiera',
        files: [
          { name: 'ProgramaIncusion.pdf', size: '3.5 MB' },
          { name: 'IndicadoresAcceso.xlsx', size: '756 KB' }
        ]
      }
    ],
    'Caja Rural': [
      {
        prefix: '202401',
        name: 'Créditos Agrícolas',
        files: [
          { name: 'CreditosAgricolas.pdf', size: '2.6 MB' },
          { name: 'AnalisisSectorial.pdf', size: '1.8 MB' }
        ]
      }
    ],
    'Empresa de Crédito': [
      {
        prefix: '202403',
        name: 'Créditos de Consumo',
        files: [
          { name: 'CreditosConsumo.pdf', size: '3.1 MB' },
          { name: 'ScoringCredito.pdf', size: '2.4 MB' }
        ]
      }
    ],
    'Fiduciaria': [
      {
        prefix: '202401',
        name: 'Fideicomisos',
        files: [
          { name: 'InformeFideicomisos.pdf', size: '4.2 MB' },
          { name: 'AdministracionPatrimonio.pdf', size: '3.1 MB' }
        ]
      }
    ]
  };

  // Combinar plantillas base con específicas de la licencia
  const allTemplates = [...baseTemplates];
  if (licenseSpecificTemplates[license]) {
    allTemplates.push(...licenseSpecificTemplates[license]);
  }

  // Generar carpetas con IDs únicos
  return allTemplates.map((template, index) => ({
    id: `${entityId}-folder-${index}`,
    name: `${template.prefix} ${template.name}`,
    files: template.files.map((file, fileIndex) => ({
      id: `${entityId}-file-${index}-${fileIndex}`,
      name: file.name,
      size: file.size
    }))
  }));
};

// Generar datos simulados para todas las entidades
const generateAllMockFolders = (): Record<string, FolderItem[]> => {
  const mockData: Record<string, FolderItem[]> = {};
  
  const processNode = (node: TreeNode) => {
    if (node.isEntity && node.license) {
      mockData[node.id] = generateMockFoldersForEntity(node.id, node.name, node.license);
    }
    if (node.children) {
      node.children.forEach(processNode);
    }
  };

  financialSystemData.forEach(processNode);
  return mockData;
};

export const mockFoldersData: Record<string, FolderItem[]> = generateAllMockFolders();
