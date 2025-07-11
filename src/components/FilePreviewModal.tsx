
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileItem } from './FinancialSystemTree/types';
import { FileText, Download, X } from 'lucide-react';
import { useState } from 'react';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileItem | null;
  folderName: string;
}

export const FilePreviewModal = ({ isOpen, onClose, file, folderName }: FilePreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!file) return null;

  const simulatePreviewContent = () => {
    const fileType = file.name.toLowerCase();
    
    if (fileType.includes('informe') || fileType.includes('reporte')) {
      return (
        <div className="space-y-4 text-sm">
          <div className="border-b pb-2">
            <h4 className="font-semibold">INFORME TÉCNICO SBS</h4>
            <p className="text-gray-600">Documento Nº: {Math.floor(Math.random() * 10000) + 1000}</p>
          </div>
          <div className="space-y-2">
            <p><strong>Resumen Ejecutivo:</strong></p>
            <p className="text-gray-700">
              El presente informe analiza el cumplimiento de las normas prudenciales establecidas 
              por la Superintendencia de Banca, Seguros y AFP. Se identificaron las siguientes observaciones...
            </p>
            <p><strong>Principales Hallazgos:</strong></p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Cumplimiento del ratio de capital: 98.5%</li>
              <li>Gestión de riesgos operacionales</li>
              <li>Evaluación de cartera crediticia</li>
            </ul>
            <p><strong>Recomendaciones:</strong></p>
            <p className="text-gray-700">
              Se recomienda implementar las mejoras sugeridas en un plazo no mayor a 90 días...
            </p>
          </div>
        </div>
      );
    } else if (fileType.includes('auditoria')) {
      return (
        <div className="space-y-4 text-sm">
          <div className="border-b pb-2">
            <h4 className="font-semibold">INFORME DE AUDITORÍA</h4>
            <p className="text-gray-600">Período: {new Date().getFullYear()}</p>
          </div>
          <div className="space-y-2">
            <p><strong>Alcance de la Auditoría:</strong></p>
            <p className="text-gray-700">
              Evaluación integral de los procesos operativos y controles internos implementados 
              durante el período fiscal...
            </p>
            <p><strong>Observaciones:</strong></p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Control de riesgos: Satisfactorio</li>
              <li>Procedimientos contables: Conforme</li>
              <li>Gestión documental: Requiere mejoras</li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4 text-sm">
          <div className="border-b pb-2">
            <h4 className="font-semibold">DOCUMENTO TÉCNICO</h4>
            <p className="text-gray-600">Archivo: {file.name}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">
              Este documento contiene información técnica relacionada con las operaciones 
              y regulaciones del sistema financiero supervisado por la SBS.
            </p>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">
                Contenido simulado para efectos de demostración. 
                En un entorno real, aquí se mostraría el contenido actual del documento.
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleDownload = () => {
    setIsLoading(true);
    // Simular descarga
    setTimeout(() => {
      setIsLoading(false);
      // En un entorno real, aquí se iniciaría la descarga del archivo
      console.log(`Descargando archivo: ${file.name}`);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Previsualización - {file.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[60vh]">
          {/* Panel de información del archivo */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Información del Archivo</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Nombre:</span>
                <p className="text-gray-600">{file.name}</p>
              </div>
              <div>
                <span className="font-medium">Carpeta:</span>
                <p className="text-gray-600">{folderName}</p>
              </div>
              <div>
                <span className="font-medium">Tamaño:</span>
                <p className="text-gray-600">{file.size || 'N/A'}</p>
              </div>
              <div>
                <span className="font-medium">Tipo:</span>
                <p className="text-gray-600">Documento PDF</p>
              </div>
              <div>
                <span className="font-medium">Última modificación:</span>
                <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleDownload} 
                disabled={isLoading}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isLoading ? 'Descargando...' : 'Descargar Archivo'}
              </Button>
            </div>
          </div>

          {/* Panel de previsualización del contenido */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg h-full">
              <div className="border-b p-3 bg-gray-50 rounded-t-lg">
                <h4 className="font-semibold text-gray-900">Contenido del Documento</h4>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                {simulatePreviewContent()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
