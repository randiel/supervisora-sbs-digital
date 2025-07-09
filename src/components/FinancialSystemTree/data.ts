
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

export const mockFoldersData: Record<string, FolderItem[]> = {
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
    },
    {
      id: 'estados-financieros',
      name: '202312 Estados Financieros',
      files: [
        { id: 'eeff-1', name: 'EstadosFinancieros_Dic2023.pdf', size: '6.2 MB' },
        { id: 'eeff-2', name: 'NotasExplicativas.pdf', size: '3.8 MB' },
        { id: 'eeff-3', name: 'DictamenAuditor.pdf', size: '1.5 MB' }
      ]
    },
    {
      id: 'compliance-2023',
      name: '202306 Compliance Report',
      files: [
        { id: 'comp-1', name: 'ComplianceReport_2023.pdf', size: '2.7 MB' }
      ]
    }
  ],
  'interbank': [
    {
      id: 'riesgo-operacional',
      name: '202403 Gestión Riesgo Operacional',
      files: [
        { id: 'riesgo-1', name: 'InformeRiesgoOperacional.pdf', size: '3.1 MB' },
        { id: 'riesgo-2', name: 'MatrizRiesgos.xlsx', size: '892 KB' }
      ]
    },
    {
      id: 'basilea-iii',
      name: '202312 Implementación Basilea III',
      files: [
        { id: 'basilea-1', name: 'BasileaIII_Reporte.pdf', size: '4.8 MB' },
        { id: 'basilea-2', name: 'CalculosCapital.xlsx', size: '1.2 MB' },
        { id: 'basilea-3', name: 'PlanImplementacion.pdf', size: '2.3 MB' }
      ]
    }
  ],
  'scotiabank': [
    {
      id: 'lavado-activos',
      name: '202402 Prevención Lavado Activos',
      files: [
        { id: 'pla-1', name: 'ManualPLA.pdf', size: '5.4 MB' },
        { id: 'pla-2', name: 'ProcedimientosDDC.pdf', size: '2.1 MB' }
      ]
    },
    {
      id: 'stress-testing',
      name: '202401 Stress Testing',
      files: [
        { id: 'stress-1', name: 'StressTest_Results.pdf', size: '3.9 MB' }
      ]
    },
    {
      id: 'gobierno-corporativo',
      name: '202312 Gobierno Corporativo',
      files: [
        { id: 'gc-1', name: 'InformeGobiernoCorporativo.pdf', size: '4.2 MB' },
        { id: 'gc-2', name: 'EstatutosSociales.pdf', size: '1.8 MB' }
      ]
    }
  ],
  'rimac': [
    {
      id: 'solvencia-ii',
      name: '202312 Solvencia II',
      files: [
        { id: 'solv-1', name: 'ReporteSolvenciaII.pdf', size: '6.1 MB' },
        { id: 'solv-2', name: 'CalculoSCR.xlsx', size: '2.4 MB' }
      ]
    },
    {
      id: 'reservas-tecnicas',
      name: '202403 Reservas Técnicas',
      files: [
        { id: 'rt-1', name: 'CalculoReservas.pdf', size: '3.7 MB' },
        { id: 'rt-2', name: 'ValidacionActuarial.pdf', size: '2.9 MB' },
        { id: 'rt-3', name: 'MetodologiaReservas.pdf', size: '4.1 MB' }
      ]
    }
  ],
  'pacifico-1': [
    {
      id: 'reaseguros',
      name: '202401 Programa Reaseguros',
      files: [
        { id: 'reas-1', name: 'ProgramaReaseguros2024.pdf', size: '3.8 MB' },
        { id: 'reas-2', name: 'ContratosCesion.pdf', size: '5.2 MB' }
      ]
    },
    {
      id: 'catastrofes',
      name: '202312 Análisis Catástrofes',
      files: [
        { id: 'cat-1', name: 'ModeloCatastrofes.pdf', size: '4.6 MB' }
      ]
    }
  ],
  'cmac-arequipa': [
    {
      id: 'microfinanzas',
      name: '202402 Cartera Microfinanzas',
      files: [
        { id: 'micro-1', name: 'InformeMicrofinanzas.pdf', size: '2.8 MB' },
        { id: 'micro-2', name: 'AnalisisRiesgo.pdf', size: '1.9 MB' }
      ]
    },
    {
      id: 'inclusion-financiera',
      name: '202312 Inclusión Financiera',
      files: [
        { id: 'if-1', name: 'ProgramaInclusionFinanciera.pdf', size: '3.5 MB' },
        { id: 'if-2', name: 'IndicadoresAcceso.xlsx', size: '756 KB' },
        { id: 'if-3', name: 'EducacionFinanciera.pdf', size: '2.2 MB' }
      ]
    }
  ],
  'mibanco': [
    {
      id: 'pyme-lending',
      name: '202403 Créditos PYME',
      files: [
        { id: 'pyme-1', name: 'CreditosPYME_Analisis.pdf', size: '3.1 MB' },
        { id: 'pyme-2', name: 'ScoringPYME.pdf', size: '2.4 MB' }
      ]
    },
    {
      id: 'digital-banking',
      name: '202401 Banca Digital',
      files: [
        { id: 'digital-1', name: 'EstrategiaBancaDigital.pdf', size: '4.3 MB' }
      ]
    }
  ]
};
