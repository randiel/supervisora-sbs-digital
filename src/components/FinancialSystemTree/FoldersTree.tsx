
import { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, File, Eye, CheckCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FolderItem, FileItem, TreeNode } from './types';
import { mockFoldersData } from './data';
import { FilePreviewModal } from '../FilePreviewModal';

interface FoldersTreeProps {
  selectedEntity: string | null;
  expandedFolders: Set<string>;
  selectedFiles: Set<string>;
  onToggleFolder: (folderId: string) => void;
  onToggleFileSelection: (fileId: string) => void;
  onToggleFolderSelection: (folderId: string, folderFiles: string[]) => void;
  findEntityById: (entityId: string) => TreeNode | null;
  showFilesSelection?: boolean;
}

export const FoldersTree = ({
  selectedEntity,
  expandedFolders,
  selectedFiles,
  onToggleFolder,
  onToggleFileSelection,
  onToggleFolderSelection,
  findEntityById,
  showFilesSelection = false
}: FoldersTreeProps) => {
  const [previewFile, setPreviewFile] = useState<{ file: FileItem; folderName: string } | null>(null);

  if (!selectedEntity) return null;

  const folders = mockFoldersData[selectedEntity] || [];
  if (folders.length === 0) return null;

  const selectedEntityNode = findEntityById(selectedEntity);
  if (!selectedEntityNode) return null;

  const handlePreviewFile = (file: FileItem, folderName: string) => {
    setPreviewFile({ file, folderName });
  };

  const getSelectedFilesDetails = () => {
    const details: Array<{ file: FileItem; folder: string }> = [];
    
    if (selectedEntity && mockFoldersData[selectedEntity]) {
      mockFoldersData[selectedEntity].forEach(folder => {
        folder.files.forEach(file => {
          if (selectedFiles.has(file.id)) {
            details.push({ file, folder: folder.name });
          }
        });
      });
    }
    
    return details;
  };

  const selectedFilesDetails = getSelectedFilesDetails();

  return (
    <>
      <div className="mt-4 bg-white rounded-lg border">
        <div className="p-3 border-b bg-gray-50 rounded-t-lg">
          <h4 className="text-sm font-semibold text-gray-900">
            Carpetas - {selectedEntityNode.name}
          </h4>
        </div>
        <div className="p-2 max-h-64 overflow-y-auto">
          {folders.map(folder => {
            const folderFileIds = folder.files.map(file => file.id);
            const allFilesSelected = folderFileIds.length > 0 && folderFileIds.every(fileId => selectedFiles.has(fileId));
            const someFilesSelected = folderFileIds.some(fileId => selectedFiles.has(fileId));
            
            return (
              <div key={folder.id}>
                <div className="flex items-center py-2 px-2 rounded hover:bg-gray-100">
                  <div className="flex items-center space-x-2 flex-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0"
                      onClick={() => onToggleFolder(folder.id)}
                    >
                      {expandedFolders.has(folder.id) ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </Button>
                    
                    {showFilesSelection && (
                      <div 
                        onClick={() => onToggleFolderSelection(folder.id, folderFileIds)}
                        className="cursor-pointer"
                      >
                        {allFilesSelected ? (
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        ) : someFilesSelected ? (
                          <div className="w-4 h-4 border border-blue-600 rounded bg-blue-100 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 rounded" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 border border-gray-300 rounded" />
                        )}
                      </div>
                    )}
                    
                    <Folder className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-gray-900">{folder.name}</span>
                  </div>
                </div>
              
                {expandedFolders.has(folder.id) && (
                  <div className="ml-8">
                    {folder.files.map(file => (
                      <div 
                        key={file.id}
                        className={`flex items-center py-1 px-2 rounded hover:bg-gray-100 group ${
                          selectedFiles.has(file.id) ? 'bg-blue-50 border border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="w-4" />
                          {showFilesSelection && (
                            <div 
                              onClick={() => onToggleFileSelection(file.id)}
                              className="cursor-pointer"
                            >
                              {selectedFiles.has(file.id) ? (
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                              ) : (
                                <div className="w-4 h-4 border border-gray-300 rounded" />
                              )}
                            </div>
                          )}
                          <File className="h-4 w-4 text-gray-500" />
                          <div className="flex-1">
                            <span className="text-sm text-gray-900">{file.name}</span>
                            {file.size && (
                              <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreviewFile(file, folder.name);
                            }}
                          >
                            <Search className="h-3 w-3 text-gray-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {showFilesSelection && selectedFiles.size > 0 && (
          <div className="p-3 border-t bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {selectedFiles.size} archivo{selectedFiles.size !== 1 ? 's' : ''} seleccionado{selectedFiles.size !== 1 ? 's' : ''}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver detalles
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Archivos Seleccionados</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {selectedFilesDetails.map(({ file, folder }, index) => (
                    <div key={file.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{file.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">Carpeta: {folder}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Tamaño: {file.size || 'N/A'}</span>
                            <span>Entidad: {selectedEntityNode.name}</span>
                          </div>
                        </div>
                        <File className="h-8 w-8 text-gray-400 ml-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <FilePreviewModal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        file={previewFile?.file || null}
        folderName={previewFile?.folderName || ''}
      />
    </>
  );
};
