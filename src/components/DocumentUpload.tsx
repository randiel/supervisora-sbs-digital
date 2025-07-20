import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Upload, Plus, FileText, X, Filter, CheckCircle2 } from 'lucide-react';
import { FinancialEntity } from './FinancialSystemTree/types';
import { Application } from '@/pages/Index';
import { toast } from '@/hooks/use-toast';
import { FileMetadataModal } from './FileMetadataModal';

interface DocumentUploadProps {
  entity: FinancialEntity;
  application: Application;
  onBack: () => void;
  onFilesUploaded: () => void;
}

interface Dataset {
  id: string;
  name: string;
  files: UploadedFile[];
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  hash: string;
  uploadDate: Date;
  metadata?: Record<string, string>;
}

interface Folder {
  id: string;
  name: string;
  period: string; // formato: YYYYMM
  files: UploadedFile[];
}

interface PendingFile {
  file: File;
  hash: string;
  datasetId: string;
}

// Datos de ejemplo para las carpetas por entidad
const getEntityFolders = (entityId: string): Folder[] => {
  const foldersByEntity: Record<string, Folder[]> = {
    'integra': [
      { id: '1', name: 'Auditoría Integral', period: '202401', files: [] },
      { id: '2', name: 'Estados Financieros', period: '202312', files: [] },
      { id: '3', name: 'Gestión de Riesgos', period: '202403', files: [] },
      { id: '4', name: 'Gestión de Fondos', period: '202401', files: [] },
      { id: '5', name: 'Aportes y Beneficios', period: '202312', files: [] },
      { id: '6', name: 'Inversiones', period: '202402', files: [] },
      { id: '7', name: 'Compliance', period: '202404', files: [] }
    ],
    'prima': [
      { id: '8', name: 'Auditoría Integral', period: '202401', files: [] },
      { id: '9', name: 'Estados Financieros', period: '202403', files: [] },
      { id: '10', name: 'Gestión de Riesgos', period: '202402', files: [] },
      { id: '11', name: 'Provisiones Técnicas', period: '202401', files: [] },
      { id: '12', name: 'Solvencia', period: '202312', files: [] }
    ]
  };
  
  return foldersByEntity[entityId] || [];
};

export const DocumentUpload = ({ entity, application, onBack, onFilesUploaded }: DocumentUploadProps) => {
  const [folders, setFolders] = useState<Folder[]>(() => getEntityFolders(entity.id));
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedMonth, setSelectedMonth] = useState<string>('01');
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderYear, setNewFolderYear] = useState('2024');
  const [newFolderMonth, setNewFolderMonth] = useState('01');
  const [pendingFile, setPendingFile] = useState<PendingFile | null>(null);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [isLoadingToAssistant, setIsLoadingToAssistant] = useState(false);
  const [fileProgress, setFileProgress] = useState<Record<string, number>>({});
  const [completedFiles, setCompletedFiles] = useState<Set<string>>(new Set());
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const generateFileHash = (fileName: string): string => {
    // Generar un hash más realista basado en el nombre del archivo y timestamp
    const timestamp = Date.now().toString();
    const randomComponent = Math.random().toString(36).substr(2, 6);
    const nameHash = fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `SBS-${nameHash.toString(16).toUpperCase()}-${randomComponent.toUpperCase()}-${timestamp.slice(-4)}`;
  };

  const handleFileUpload = (folderId: string, files: FileList) => {
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                         'text/plain'];
    
    Array.from(files).forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Archivo no permitido",
          description: `${file.name} no es un tipo de archivo permitido`,
          variant: "destructive"
        });
        return;
      }

      const hash = generateFileHash(file.name);
      
      // Configurar archivo pendiente para mostrar modal
      setPendingFile({
        file,
        hash,
        datasetId: folderId
      });
      setShowMetadataModal(true);
    });
  };

  const handleMetadataSave = (metadata: Record<string, string>) => {
    if (!pendingFile) return;

    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: pendingFile.file.name,
      type: pendingFile.file.type,
      size: pendingFile.file.size,
      hash: pendingFile.hash,
      uploadDate: new Date(),
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined
    };

    setFolders(prev => prev.map(folder => 
      folder.id === pendingFile.datasetId 
        ? { ...folder, files: [...folder.files, uploadedFile] }
        : folder
    ));

    toast({
      title: "Archivo procesado exitosamente",
      description: `${uploadedFile.name} se ha cargado con hash ${uploadedFile.hash}`,
    });

    // Limpiar estado
    setPendingFile(null);
    setShowMetadataModal(false);
    onFilesUploaded();
  };

  const handleMetadataSkip = () => {
    if (!pendingFile) return;

    // Crear archivo sin metadatos
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: pendingFile.file.name,
      type: pendingFile.file.type,
      size: pendingFile.file.size,
      hash: pendingFile.hash,
      uploadDate: new Date(),
      metadata: undefined // Sin metadatos
    };

    setFolders(prev => prev.map(folder => 
      folder.id === pendingFile.datasetId 
        ? { ...folder, files: [...folder.files, uploadedFile] }
        : folder
    ));

    toast({
      title: "Archivo cargado sin metadatos",
      description: `${uploadedFile.name} se ha cargado con hash ${uploadedFile.hash}`,
    });

    // Limpiar estado
    setPendingFile(null);
    setShowMetadataModal(false);
    onFilesUploaded();
  };

  const handleMetadataModalClose = () => {
    // Solo cerrar el modal sin procesar el archivo
    setShowMetadataModal(false);
    setPendingFile(null);
  };

  const addNewFolder = () => {
    if (!newFolderName.trim()) return;
    
    // Usar el año y mes del filtro de periodo actual
    const period = `${selectedYear}${selectedMonth.padStart(2, '0')}`;
    const newFolder: Folder = {
      id: `custom-${Date.now()}`,
      name: newFolderName,
      period,
      files: []
    };
    
    setFolders(prev => [...prev, newFolder]);
    setNewFolderName('');
    setShowNewFolderForm(false);
    
    toast({
      title: "Carpeta creada",
      description: `Se ha creado la carpeta: ${newFolderName} (${period})`
    });
  };

  const handleConfirmAddToAssistant = () => {
    if (!selectedFolder) return;
    
    const folder = folders.find(f => f.id === selectedFolder);
    if (!folder || folder.files.length === 0) return;

    setShowConfirmationModal(true);
  };

  const handleAddToAssistant = async () => {
    if (!selectedFolder) return;
    
    const folder = folders.find(f => f.id === selectedFolder);
    if (!folder || folder.files.length === 0) return;

    setShowConfirmationModal(false);
    setIsLoadingToAssistant(true);
    setFileProgress({});
    setCompletedFiles(new Set());
    setIsLoadingComplete(false);
    
    try {
      // Inicializar progreso de todos los archivos en 0
      const initialProgress: Record<string, number> = {};
      folder.files.forEach(file => {
        initialProgress[file.id] = 0;
      });
      setFileProgress(initialProgress);

      // Crear promesas para cada archivo con duraciones aleatorias
      const filePromises = folder.files.map(file => {
        return new Promise<void>((resolve) => {
          // Duración aleatoria entre 3 y 45 segundos para cada archivo
          const randomDuration = Math.floor(Math.random() * (45000 - 3000 + 1)) + 3000;
          const intervalTime = 150; // Actualizar cada 150ms
          const totalSteps = randomDuration / intervalTime;
          let currentStep = 0;

          const progressInterval = setInterval(() => {
            currentStep++;
            const progress = (currentStep / totalSteps) * 100;
            
            setFileProgress(prev => ({
              ...prev,
              [file.id]: Math.min(progress, 100)
            }));

            if (currentStep >= totalSteps) {
              clearInterval(progressInterval);
              setCompletedFiles(prev => new Set([...prev, file.id]));
              resolve();
            }
          }, intervalTime);
        });
      });

      // Esperar a que todos los archivos terminen
      await Promise.all(filePromises);
      
      setIsLoadingToAssistant(false);
      setIsLoadingComplete(true);
      
      toast({
        title: "Conocimiento agregado exitosamente",
        description: `${folder.files.length} archivo(s) fueron agregados al asistente`,
      });
      
    } catch (error) {
      setIsLoadingToAssistant(false);
      setFileProgress({});
      setCompletedFiles(new Set());
      toast({
        title: "Error al agregar conocimiento",
        description: "Hubo un problema al cargar los archivos al asistente",
        variant: "destructive"
      });
    }
  };

  // Filtrar carpetas por año y mes
  const filteredFolders = folders.filter(folder => {
    const folderYear = folder.period.substring(0, 4);
    const folderMonth = folder.period.substring(4, 6);
    return folderYear === selectedYear && folderMonth === selectedMonth.padStart(2, '0');
  });

  // Generar arrays para los selectores
  const availableYears = ['2022', '2023', '2024', '2025'];
  const availableMonths = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' }
  ];

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8 text-blue-600" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeLabel = (type: string): string => {
    switch (type) {
      case 'application/pdf':
        return 'Documento PDF';
      case 'application/msword':
        return 'Documento Word';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'Documento Word';
      case 'text/plain':
        return 'Archivo de Texto';
      default:
        return 'Documento';
    }
  };

  if (selectedFolder) {
    const folder = folders.find(f => f.id === selectedFolder);
    if (!folder) return null;

    return (
      <>
        <div className="flex h-full">
          <div className="flex-1 p-6">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedFolder(null)}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Carpetas
              </Button>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Carga de Archivos - {folder.name}
              </h2>
              <p className="text-gray-600">
                {entity.name} - {entity.license}
              </p>
            </div>

            <div className="mb-6">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileUpload(selectedFolder, e.target.files);
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button 
                  className="cursor-pointer" 
                  asChild
                  disabled={isLoadingToAssistant}
                >
                  <div>
                    <Upload className="h-4 w-4 mr-2" />
                    {isLoadingToAssistant ? 'Cargando...' : 'Cargar Archivos'}
                  </div>
                </Button>
              </label>
            </div>

            {/* Botón para agregar conocimiento al asistente */}
            {folder.files.length > 0 && (
              <div className="mb-6">
                <Button 
                  onClick={handleConfirmAddToAssistant}
                  disabled={isLoadingToAssistant || isLoadingComplete}
                  className={`transition-colors duration-200 ${
                    isLoadingComplete 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {isLoadingToAssistant ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Agregando al asistente...
                    </>
                  ) : isLoadingComplete ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Conocimiento agregado
                    </>
                  ) : (
                    "Agregar conocimiento a Asistente"
                  )}
                </Button>
              </div>
            )}

            {/* Sección de progreso de carga contextual - solo mostrar si hay progreso real */}
            {(isLoadingToAssistant || (isLoadingComplete && Object.keys(fileProgress).length > 0)) && (
              <div className="mb-6 p-6 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Carga Contextual de Archivos
                </h3>
                
                <div className="space-y-4">
                  {folder.files.map((file, index) => {
                    const fileProgressValue = fileProgress[file.id] || 0;
                    const isFileCompleted = completedFiles.has(file.id);
                    
                    return (
                      <div key={file.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                        <div className="flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)} • {file.hash}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                          {isFileCompleted ? (
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              <span className="text-xs text-green-600 font-medium">Completado</span>
                            </div>
                          ) : isLoadingToAssistant ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-12 text-xs text-gray-600 text-right">
                                {Math.round(fileProgressValue)}%
                              </div>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${fileProgressValue}%` }}
                                ></div>
                              </div>
                              {fileProgressValue > 0 && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              )}
                            </div>
                          ) : (
                            <div className="h-5 w-5"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  {isLoadingComplete ? (
                    <div className="flex items-center text-green-800">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">
                        ✅ Todos los archivos han sido analizados y agregados correctamente al contexto del agente
                      </span>
                    </div>
                  ) : isLoadingToAssistant ? (
                    <div className="flex items-center justify-between text-blue-800">
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 mr-2"></div>
                        <span className="text-sm">
                          Analizando contenido y agregando al contexto del agente...
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {completedFiles.size}/{folder.files.length} completados
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {folder.files.map(file => (
                <Card 
                  key={file.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setPreviewFile(file)}
                >
                  <CardContent className="p-4 text-center">
                    {getFileIcon(file.type)}
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(file.size)}
                      </p>
                      <p className="text-xs text-blue-600 font-mono mt-1">
                        {file.hash}
                      </p>
                      {file.metadata && (
                        <div className="mt-2 px-2 py-1 bg-green-50 rounded text-xs text-green-700">
                          {Object.keys(file.metadata).length} metadatos
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {previewFile && (
            <div className="w-1/2 border-l bg-gray-50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Información del Archivo</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <div className="text-center">
                  {getFileIcon(previewFile.type)}
                  <p className="mt-4 font-medium text-lg">{previewFile.name}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium text-gray-600">Tipo:</span>
                    <span className="text-sm text-gray-900">{getFileTypeLabel(previewFile.type)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium text-gray-600">Tamaño:</span>
                    <span className="text-sm text-gray-900">{formatFileSize(previewFile.size)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium text-gray-600">Código Hash:</span>
                    <span className="text-sm text-blue-600 font-mono">{previewFile.hash}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium text-gray-600">Fecha de Carga:</span>
                    <span className="text-sm text-gray-900">
                      {previewFile.uploadDate.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-600">Estado:</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      previewFile.metadata 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {previewFile.metadata ? 'Con metadatos' : 'Sin metadatos'}
                    </span>
                  </div>
                </div>
                
                {previewFile.metadata && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Metadatos del Documento:
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2 max-h-32 overflow-y-auto">
                      {Object.entries(previewFile.metadata).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="font-medium text-gray-700">{key}:</span>{' '}
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <FileMetadataModal
          isOpen={showMetadataModal}
          onClose={handleMetadataModalClose}
          onSave={handleMetadataSave}
          onSkip={handleMetadataSkip}
          fileName={pendingFile?.file.name || ''}
          fileHash={pendingFile?.hash || ''}
        />

        {/* Modal de confirmación para agregar conocimiento */}
        <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmar agregado de conocimiento</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-sm text-gray-600 mb-4">
                ¿Estás seguro de que deseas agregar los siguientes archivos al asistente?
              </p>
              
              <div className="max-h-60 overflow-y-auto space-y-2">
                {selectedFolder && folders.find(f => f.id === selectedFolder)?.files.map(file => (
                  <div key={file.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Total: {selectedFolder ? folders.find(f => f.id === selectedFolder)?.files.length || 0 : 0} archivo(s)
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmationModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAddToAssistant}
                className="flex-1"
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Carga Documental
          </h2>
          <p className="text-gray-600 mb-6">
            {entity.name} - {entity.license}
          </p>
          
          {/* Filtros de Período */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filtros de Período</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year-select">Año</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger id="year-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="month-select">Mes</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger id="month-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMonths.map(month => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFolders.map(folder => (
            <Card 
              key={folder.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedFolder(folder.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {folder.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {folder.files.length} archivo{folder.files.length !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>
          ))}

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-dashed border-2 border-gray-300"
            onClick={() => setShowNewFolderForm(true)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-600 mb-2">
                Agregar Carpeta
              </h3>
              <p className="text-sm text-gray-400">
                Crear nueva carpeta
              </p>
            </CardContent>
          </Card>
        </div>

        {showNewFolderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Nueva Carpeta</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="folder-name">Nombre de la carpeta</Label>
                  <Input
                    id="folder-name"
                    placeholder="Ej: Auditoría Integral"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Período seleccionado:</strong> {availableMonths.find(m => m.value === selectedMonth)?.label} {selectedYear}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    La carpeta se creará para este período
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-6">
                <Button onClick={addNewFolder} className="flex-1">
                  Crear
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowNewFolderForm(false);
                    setNewFolderName('');
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
