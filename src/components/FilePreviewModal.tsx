import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText } from 'lucide-react';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  fileHash?: string;
  // Props para compatibilidad con FoldersTree
  file?: any;
  folderName?: string;
}

export const FilePreviewModal = ({ 
  isOpen, 
  onClose, 
  fileName, 
  fileType, 
  fileSize, 
  fileHash,
  file,
  folderName
}: FilePreviewModalProps) => {
  
  // Determinar los datos a usar (direct props o desde file object)
  const actualFileName = fileName || file?.name || 'Archivo sin nombre';
  const actualFileType = fileType || file?.type || 'application/pdf';
  const actualFileSize = fileSize || file?.size || 0;
  const actualFileHash = fileHash || file?.hash || 'N/A';
  
  const getFileTypeLabel = (type: string): string => {
    switch (type) {
      case 'application/pdf':
        return 'PDF';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'Word';
      case 'text/plain':
        return 'Texto';
      default:
        return 'Documento';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Simulación del contenido del archivo
  const getSimulatedContent = () => {
    const fileTypeLabel = getFileTypeLabel(actualFileType);
    
    switch (actualFileType) {
      case 'application/pdf':
        return `INFORME DE AUDITORÍA FINANCIERA
Superintendencia de Banca, Seguros y AFP

RESUMEN EJECUTIVO
Este documento presenta los hallazgos principales de la auditoría realizada durante el período fiscal correspondiente.

SECCIÓN 1: ANÁLISIS DE RIESGOS
• Evaluación de controles internos
• Identificación de vulnerabilidades
• Recomendaciones de mejora

SECCIÓN 2: CUMPLIMIENTO NORMATIVO
• Adherencia a regulaciones SBS
• Implementación de políticas
• Monitoreo continuo

CONCLUSIONES
Los resultados de la auditoría demuestran un nivel adecuado de control y gestión de riesgos, con oportunidades de mejora identificadas.`;

      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return `MEMORANDO INTERNO
Para: Gerencia General
De: Área de Compliance
Fecha: ${new Date().toLocaleDateString('es-ES')}

ASUNTO: Reporte de Cumplimiento Regulatorio

Por medio del presente, se informa sobre el estado actual del cumplimiento regulatorio de la entidad:

1. INDICADORES CLAVE
   - Ratio de solvencia: Dentro de parámetros
   - Liquidez: Adecuada
   - Provisiones: Correctamente constituidas

2. OBSERVACIONES
   - Actualización de políticas pendiente
   - Capacitación de personal requerida

3. RECOMENDACIONES
   - Implementar mejoras en procesos
   - Fortalecer controles internos

Atentamente,
Área de Compliance`;

      case 'text/plain':
        return `NOTAS DE REUNIÓN
Fecha: ${new Date().toLocaleDateString('es-ES')}
Participantes: Equipo de Gestión de Riesgos

AGENDA:
1. Revisión de indicadores mensuales
2. Análisis de nuevas regulaciones
3. Plan de acción trimestral

DECISIONES TOMADAS:
- Actualizar matriz de riesgos
- Revisar límites de exposición
- Programar auditoría interna

PRÓXIMOS PASOS:
- Preparar informe ejecutivo
- Coordinar con áreas involucradas
- Seguimiento semanal de avances`;

      default:
        return `Contenido del documento: ${actualFileName}
        
Este es un documento del tipo ${fileTypeLabel} que contiene información importante para el análisis y procesamiento por parte del asistente.

El archivo ha sido procesado y catalogado correctamente en el sistema de gestión documental.`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Vista Previa del Documento
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Información del archivo */}
          <div className="bg-gray-50 p-4 rounded-lg flex-shrink-0">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Nombre:</span>
                <p className="text-gray-900 break-words">{actualFileName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Tipo:</span>
                <p className="text-gray-900">{getFileTypeLabel(actualFileType)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Tamaño:</span>
                <p className="text-gray-900">{formatFileSize(actualFileSize)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Hash:</span>
                <p className="text-blue-600 font-mono text-xs break-all">{actualFileHash}</p>
              </div>
              {folderName && (
                <div className="col-span-2">
                  <span className="font-medium text-gray-600">Carpeta:</span>
                  <p className="text-gray-900">{folderName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contenido simulado */}
          <div className="flex-1 overflow-hidden flex flex-col border rounded-lg bg-white min-h-0">
            <div className="flex items-center gap-2 p-4 pb-3 border-b flex-shrink-0 bg-gray-50">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Contenido del documento (vista previa simulada)
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                {getSimulatedContent()}
              </pre>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
            <p className="text-xs text-blue-800">
              <strong>Nota:</strong> Esta es una vista previa simulada del contenido. 
              El documento real será procesado por el asistente para análisis contextual.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};