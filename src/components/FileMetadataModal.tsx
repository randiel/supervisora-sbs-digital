
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface FileMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (metadata: string) => void;
  fileName: string;
  fileHash: string;
}

export const FileMetadataModal = ({ isOpen, onClose, onSave, fileName, fileHash }: FileMetadataModalProps) => {
  const [metadata, setMetadata] = useState('');

  const handleSave = () => {
    onSave(metadata);
    setMetadata('');
    onClose();
  };

  const handleCancel = () => {
    setMetadata('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Metadatos del Archivo
          </DialogTitle>
          <DialogDescription>
            Agregue información adicional que ayude al agente a organizar y procesar este documento.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-gray-900 mb-1">
              Archivo: {fileName}
            </div>
            <div className="text-xs text-blue-600 font-mono">
              Hash: {fileHash}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="metadata">
              Descripción y contexto del documento
            </Label>
            <Textarea
              id="metadata"
              placeholder="Ej: Informe de auditoría Q3 2024, contiene observaciones sobre gestión de riesgos crediticios y recomendaciones de mejora para el área de compliance..."
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="text-xs text-gray-500">
              Esta información ayudará al agente supervisorio a contextualizar el documento
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            Guardar Metadatos
          </Button>
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Omitir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
