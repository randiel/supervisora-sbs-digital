import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Upload, Plus, FileText, X, Eye } from 'lucide-react';
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
  metadata?: string;
}

interface PendingFile {
  file: File;
  hash: string;
  datasetId: string;
}

const getDefaultDatasets = (applicationId: string): Dataset[] => {
  switch (applicationId) {
    case 'garantias-preferidas':
      return [
        { id: 'tasaciones', name: 'Tasaciones', files: [] },
        { id: 'polizas', name: 'Pólizas', files: [] },
        { id: 'inscripciones', name: 'Inscripciones', files: [] }
      ];
    case 'busqueda-documental':
      return [
        { id: 'informes-tecnicos', name: 'Informes Técnicos SBS', files: [] },
        { id: 'informes-auditoria', name: 'Informes de Auditoría', files: [] },
        { id: 'informes-seguimiento', name: 'Informes de Seguimiento y Recomendaciones', files: [] }
      ];
    default:
      return [
        { id: 'informes-tecnicos', name: 'Informes Técnicos SBS', files: [] },
        { id: 'informes-auditoria', name: 'Informes de Auditoría', files: [] },
        { id: 'informes-seguimiento', name: 'Informes de Seguimiento y Recomendaciones', files: [] }
      ];
  }
};

export const DocumentUpload = ({ entity, application, onBack, onFilesUploaded }: DocumentUploadProps) => {
  const [datasets, setDatasets] = useState<Dataset[]>(() => getDefaultDatasets(application.id));
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [newDatasetName, setNewDatasetName] = useState('');
  const [showNewDatasetForm, setShowNewDatasetForm] = useState(false);
  const [pendingFile, setPendingFile] = useState<PendingFile | null>(null);
  const [showMetadataModal, setShowMetadataModal] = useState(false);

  const generateFileHash = (fileName: string): string => {
    // Generar un hash más realista basado en el nombre del archivo y timestamp
    const timestamp = Date.now().toString();
    const randomComponent = Math.random().toString(36).substr(2, 6);
    const nameHash = fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `SBS-${nameHash.toString(16).toUpperCase()}-${randomComponent.toUpperCase()}-${timestamp.slice(-4)}`;
  };

  const handleFileUpload = (datasetId: string, files: FileList) => {
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
        datasetId
      });
      setShowMetadataModal(true);
    });
  };

  const handleMetadataSave = (metadata: string) => {
    if (!pendingFile) return;

    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: pendingFile.file.name,
      type: pendingFile.file.type,
      size: pendingFile.file.size,
      hash: pendingFile.hash,
      uploadDate: new Date(),
      metadata: metadata || undefined
    };

    setDatasets(prev => prev.map(dataset => 
      dataset.id === pendingFile.datasetId 
        ? { ...dataset, files: [...dataset.files, uploadedFile] }
        : dataset
    ));

    toast({
      title: "Archivo procesado exitosamente",
      description: `${uploadedFile.name} se ha cargado con hash ${uploadedFile.hash}`,
    });

    setPendingFile(null);
    onFilesUploaded();
  };

  const handleMetadataModalClose = () => {
    setShowMetadataModal(false);
    // Si el usuario cierra el modal sin guardar, aún procesamos el archivo sin metadatos
    if (pendingFile) {
      handleMetadataSave('');
    }
  };

  const addNewDataset = () => {
    if (!newDatasetName.trim()) return;
    
    const newDataset: Dataset = {
      id: `custom-${Date.now()}`,
      name: newDatasetName,
      files: []
    };
    
    setDatasets(prev => [...prev, newDataset]);
    setNewDatasetName('');
    setShowNewDatasetForm(false);
    
    toast({
      title: "Carpeta creada",
      description: `Se ha creado la carpeta: ${newDatasetName}`
    });
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8 text-blue-600" />;
  };

  if (selectedDataset) {
    const dataset = datasets.find(d => d.id === selectedDataset);
    if (!dataset) return null;

    return (
      <>
        <div className="flex h-full">
          <div className="flex-1 p-6">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedDataset(null)}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Carpetas
              </Button>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Carga de Archivos - {dataset.name}
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
                    handleFileUpload(selectedDataset, e.target.files);
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="cursor-pointer" asChild>
                  <div>
                    <Upload className="h-4 w-4 mr-2" />
                    Cargar Archivos
                  </div>
                </Button>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dataset.files.map(file => (
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
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                      <p className="text-xs text-blue-600 font-mono mt-1">
                        {file.hash}
                      </p>
                      {file.metadata && (
                        <div className="mt-2 px-2 py-1 bg-green-50 rounded text-xs text-green-700">
                          Con metadatos
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
                <h3 className="text-lg font-semibold">Previsualización</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border p-6 h-96 flex flex-col">
                <div className="text-center flex-shrink-0">
                  {getFileIcon(previewFile.type)}
                  <p className="mt-4 font-medium">{previewFile.name}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Código: {previewFile.hash}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Subido: {previewFile.uploadDate.toLocaleString()}
                  </p>
                </div>
                
                {previewFile.metadata && (
                  <div className="mt-6 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Metadatos del Documento:
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 overflow-y-auto max-h-32">
                      {previewFile.metadata}
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
          fileName={pendingFile?.file.name || ''}
          fileHash={pendingFile?.hash || ''}
        />
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
          <p className="text-gray-600">
            {entity.name} - {entity.license}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {datasets.map(dataset => (
            <Card 
              key={dataset.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedDataset(dataset.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {dataset.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {dataset.files.length} archivo{dataset.files.length !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>
          ))}

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-dashed border-2 border-gray-300"
            onClick={() => setShowNewDatasetForm(true)}
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

        {showNewDatasetForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Nueva Carpeta</h3>
              <input
                type="text"
                placeholder="Nombre de la carpeta"
                value={newDatasetName}
                onChange={(e) => setNewDatasetName(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex space-x-2">
                <Button onClick={addNewDataset} className="flex-1">
                  Crear
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowNewDatasetForm(false);
                    setNewDatasetName('');
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
