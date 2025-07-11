import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { User, Application } from '@/pages/Index';
import { FinancialSystemTree, FinancialEntity } from './FinancialSystemTree';
import { DocumentUpload } from './DocumentUpload';
import { BatchAnalytics } from './BatchAnalytics';
import { SupervisorAgent } from './SupervisorAgent';
import { DocumentSearchChat } from './DocumentSearchChat';

interface ApplicationWindowProps {
  application: Application;
  user: User;
  onBack: () => void;
}

type ActiveSection = 'main' | 'upload' | 'analytics' | 'agent';

export const ApplicationWindow = ({ application, user, onBack }: ApplicationWindowProps) => {
  const [selectedEntity, setSelectedEntity] = useState<FinancialEntity | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>('main');
  const [hasUploadedFiles, setHasUploadedFiles] = useState(false);
  const [selectedFilesCount, setSelectedFilesCount] = useState(0);

  const handleEntitySelect = (entity: FinancialEntity) => {
    setSelectedEntity(entity);
  };

  const handleFilesSelected = (count: number) => {
    setSelectedFilesCount(count);
  };

  const handleDocumentUpload = () => {
    if (!selectedEntity) return;
    setActiveSection('upload');
  };

  const handleBatchAnalytics = () => {
    if (!selectedEntity || !hasUploadedFiles) return;
    setActiveSection('analytics');
  };

  const handleSupervisorAgent = () => {
    if (!selectedEntity || !hasUploadedFiles) return;
    setActiveSection('agent');
  };

  const handleBackToMain = () => {
    setActiveSection('main');
  };

  const renderMainContent = () => {
    const isBusquedaDocumental = application.id === 'busqueda-documental';
    const showChat = isBusquedaDocumental && selectedEntity && selectedFilesCount > 0;

    return (
      <div className="flex h-full">
        <div className="flex-1 p-6">
          {showChat ? (
            <DocumentSearchChat 
              entity={selectedEntity}
              selectedFilesCount={selectedFilesCount}
            />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {isBusquedaDocumental 
                  ? "Seleccione una entidad del sistema financiero"
                  : "Seleccione una entidad del sistema financiero"
                }
              </h3>
              <p className="text-gray-600">
                {isBusquedaDocumental
                  ? "Elija una entidad del sistema financiera, el periodo (o cargue uno nuevo) para comenzar el proceso de supervisión."
                  : "Elija una entidad del árbol para comenzar el proceso de supervisión"
                }
              </p>
            </div>
          )}
        </div>
        
        <div className="w-96 border-l bg-gray-50 p-4 overflow-y-auto">
          <FinancialSystemTree 
            onEntitySelect={handleEntitySelect}
            onFilesSelected={isBusquedaDocumental ? handleFilesSelected : undefined}
            showFilesSelection={isBusquedaDocumental}
          />
          
          {selectedEntity && (
            <div className="mt-6 space-y-3">
              <div className="bg-white p-3 rounded-lg border">
                <div className="text-sm font-medium text-gray-900">
                  {selectedEntity.name}
                </div>
                <div className="text-xs text-gray-500">
                  {selectedEntity.license}
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={handleDocumentUpload}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Carga Documental
                </Button>
                
                <Button
                  onClick={handleBatchAnalytics}
                  disabled={!hasUploadedFiles}
                  variant={hasUploadedFiles ? "default" : "secondary"}
                  className="w-full"
                >
                  Analítica Batch
                </Button>
                
                <Button
                  onClick={handleSupervisorAgent}
                  disabled={!hasUploadedFiles}
                  variant={hasUploadedFiles ? "default" : "secondary"}
                  className="w-full"
                >
                  Agente Suptech
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <DocumentUpload 
            entity={selectedEntity!}
            application={application}
            onBack={handleBackToMain}
            onFilesUploaded={() => setHasUploadedFiles(true)}
          />
        );
      case 'analytics':
        return (
          <BatchAnalytics 
            entity={selectedEntity!}
            onBack={handleBackToMain}
            onGoToAgent={() => setActiveSection('agent')}
          />
        );
      case 'agent':
        return (
          <SupervisorAgent 
            entity={selectedEntity!}
            onBack={handleBackToMain}
          />
        );
      default:
        return renderMainContent();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {application.name}
              </h1>
              {selectedEntity && (
                <p className="text-sm text-gray-600">
                  {selectedEntity.name} - {selectedEntity.license}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{user.name}</span>
            <span>•</span>
            <span>{user.role}</span>
          </div>
        </div>
      </header>

      <div className="h-[calc(100vh-4rem)]">
        {renderContent()}
      </div>
    </div>
  );
};
