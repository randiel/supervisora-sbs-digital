
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Plus, X } from 'lucide-react';

interface FileMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (metadata: Record<string, string>) => void;
  onSkip: () => void; // Nueva prop para manejar omitir
  fileName: string;
  fileHash: string;
}

interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}

export const FileMetadataModal = ({ isOpen, onClose, onSave, onSkip, fileName, fileHash }: FileMetadataModalProps) => {
  const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePair[]>([
    { id: '1', key: '', value: '' }
  ]);

  const addKeyValuePair = () => {
    const newPair: KeyValuePair = {
      id: Date.now().toString(),
      key: '',
      value: ''
    };
    setKeyValuePairs([...keyValuePairs, newPair]);
  };

  const removeKeyValuePair = (id: string) => {
    if (keyValuePairs.length > 1) {
      setKeyValuePairs(keyValuePairs.filter(pair => pair.id !== id));
    }
  };

  const updateKeyValuePair = (id: string, field: 'key' | 'value', newValue: string) => {
    setKeyValuePairs(keyValuePairs.map(pair => 
      pair.id === id ? { ...pair, [field]: newValue } : pair
    ));
  };

  const handleSave = () => {
    const metadata = keyValuePairs.reduce((acc, pair) => {
      if (pair.key.trim() && pair.value.trim()) {
        acc[pair.key.trim()] = pair.value.trim();
      }
      return acc;
    }, {} as Record<string, string>);
    
    onSave(metadata);
    setKeyValuePairs([{ id: '1', key: '', value: '' }]);
  };

  const handleSkip = () => {
    setKeyValuePairs([{ id: '1', key: '', value: '' }]);
    onSkip(); // Llamar a la función para cargar sin metadatos
  };

  const handleCancel = () => {
    setKeyValuePairs([{ id: '1', key: '', value: '' }]);
    onClose(); // Solo cerrar sin procesar el archivo
  };

  // Verificar si hay metadatos válidos ingresados
  const hasValidMetadata = keyValuePairs.some(pair => 
    pair.key.trim() && pair.value.trim()
  );

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
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Metadatos (Clave - Valor)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addKeyValuePair}
                className="text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Agregar
              </Button>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {keyValuePairs.map((pair, index) => (
                <div key={pair.id} className="flex gap-2 items-center">
                  <Input
                    placeholder="Clave"
                    value={pair.key}
                    onChange={(e) => updateKeyValuePair(pair.id, 'key', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Valor"
                    value={pair.value}
                    onChange={(e) => updateKeyValuePair(pair.id, 'value', e.target.value)}
                    className="flex-1"
                  />
                  {keyValuePairs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyValuePair(pair.id)}
                      className="px-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-xs text-gray-500">
              Ejemplo: Tipo → "Informe de Auditoría", Periodo → "Q3 2024", Área → "Gestión de Riesgos"
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 pt-4">
          {hasValidMetadata ? (
            // Solo mostrar Guardar y Cancelar si hay metadatos
            <>
              <Button onClick={handleSave} className="flex-1">
                Guardar Metadatos
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="flex-1"
                title="Cancelar y no cargar el archivo"
              >
                Cancelar
              </Button>
            </>
          ) : (
            // Solo mostrar Omitir y Cancelar si no hay metadatos
            <>
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="flex-1"
                title="Cargar archivo sin metadatos"
              >
                Omitir
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleCancel}
                className="flex-1"
                title="Cancelar y no cargar el archivo"
              >
                Cancelar
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
