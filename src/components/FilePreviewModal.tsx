
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileItem } from './FinancialSystemTree/types';
import { FileText } from 'lucide-react';
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

  const getFileExtension = (filename: string) => {
    return filename.toLowerCase().split('.').pop() || '';
  };

  const renderFileContent = () => {
    const extension = getFileExtension(file.name);
    
    if (extension === 'pdf') {
      // Para archivos PDF, usamos un iframe o visor PDF
      return (
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">Documento PDF</p>
              <p className="text-sm text-gray-600 mt-2">
                En un entorno real, aquí se mostraría el contenido del archivo PDF usando un visor como PDF.js
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border text-left text-sm">
                <h4 className="font-semibold mb-2">Contenido simulado del PDF:</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>DOCUMENTO TÉCNICO SBS</strong></p>
                  <p>Superintendencia de Banca, Seguros y AFP</p>
                  <p className="border-t pt-2 mt-3">
                    Este documento contiene información regulatoria y técnica 
                    relacionada con las operaciones del sistema financiero peruano.
                  </p>
                  <p>Las normativas aquí establecidas son de cumplimiento obligatorio 
                    para todas las entidades supervisadas.</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Evaluación de riesgos operacionales</li>
                    <li>Cumplimiento de ratios patrimoniales</li>
                    <li>Gestión de liquidez</li>
                    <li>Políticas de provisiones</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (extension === 'docx' || extension === 'doc') {
      // Para archivos Word
      return (
        <div className="w-full h-full bg-white rounded-lg border">
          <div className="p-6 space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-gray-900">INFORME TÉCNICO</h3>
              <p className="text-sm text-gray-600 mt-1">Superintendencia de Banca, Seguros y AFP</p>
            </div>
            
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">1. RESUMEN EJECUTIVO</h4>
                <p className="text-gray-700">
                  El presente informe tiene por objetivo evaluar el cumplimiento de las disposiciones 
                  normativas establecidas por la Superintendencia de Banca, Seguros y AFP para las 
                  entidades del sistema financiero.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">2. ANÁLISIS DE CUMPLIMIENTO</h4>
                <p className="text-gray-700">
                  Durante el período de evaluación se han identificado los siguientes aspectos:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li>Ratio de capital global: Dentro de los parámetros establecidos</li>
                  <li>Gestión de riesgo crediticio: Satisfactorio</li>
                  <li>Políticas de provisiones: Conforme a normativa</li>
                  <li>Sistema de control interno: Requiere fortalecimiento</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">3. RECOMENDACIONES</h4>
                <p className="text-gray-700">
                  Se recomienda implementar las siguientes mejoras en un plazo no mayor a 90 días:
                </p>
                <ol className="list-decimal list-inside mt-2 text-gray-700 space-y-1">
                  <li>Fortalecer los controles internos en el área operativa</li>
                  <li>Actualizar los manuales de procedimientos</li>
                  <li>Capacitar al personal en nuevas normativas</li>
                </ol>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg mt-4">
                <p className="text-xs text-blue-600">
                  <strong>Nota:</strong> Este es contenido simulado para demostración. 
                  En un entorno real, se mostraría el contenido actual del documento Word.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Para otros tipos de archivo
      return (
        <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">Archivo no compatible</p>
              <p className="text-sm text-gray-600">
                La previsualización no está disponible para archivos de tipo .{extension}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Previsualización - {file.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[75vh]">
          {/* Panel de información del archivo */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Información del Archivo</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Nombre:</span>
                <p className="text-gray-600 mt-1 break-words">{file.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Carpeta:</span>
                <p className="text-gray-600 mt-1">{folderName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tamaño:</span>
                <p className="text-gray-600 mt-1">{file.size || 'N/A'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tipo:</span>
                <p className="text-gray-600 mt-1">{getFileExtension(file.name).toUpperCase()}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Última modificación:</span>
                <p className="text-gray-600 mt-1">{new Date().toLocaleDateString('es-ES')}</p>
              </div>
            </div>
          </div>

          {/* Panel de previsualización del contenido */}
          <div className="lg:col-span-3">
            <div className="bg-white border rounded-lg h-full overflow-hidden">
              <div className="border-b p-3 bg-gray-50 rounded-t-lg">
                <h4 className="font-semibold text-gray-900">Contenido del Documento</h4>
              </div>
              <div className="h-[calc(100%-60px)] overflow-y-auto">
                {renderFileContent()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
