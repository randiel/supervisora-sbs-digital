
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Menu, User, Search, Shield, FileText } from 'lucide-react';
import { User as UserType, Application } from '@/pages/Index';
import { Sidebar } from './Sidebar';

interface DashboardProps {
  user: UserType;
  onSelectApp: (app: Application) => void;
  onLogout: () => void;
}

const transversalApplications: Application[] = [
  {
    id: 'busqueda-documental',
    name: 'Búsqueda Documental',
    description: 'Sistema de gestión y búsqueda de documentos regulatorios'
  }
];

const specializedApplications: Application[] = [
  {
    id: 'garantias-preferidas',
    name: 'Garantías Preferidas',
    description: 'Gestión y análisis de garantías preferidas del sistema financiero'
  },
  {
    id: 'cartas-fianza',
    name: 'Cartas Fianza',
    description: 'Supervisión y control de cartas fianza emitidas en el sistema financiero'
  }
];

export const Dashboard = ({ user, onSelectApp, onLogout }: DashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getAppIcon = (appId: string) => {
    switch (appId) {
      case 'busqueda-documental':
        return Search;
      case 'garantias-preferidas':
        return Shield;
      case 'cartas-fianza':
        return FileText;
      default:
        return FileText;
    }
  };

  const renderApplications = (applications: Application[]) => {
    return applications.map((app) => {
      const IconComponent = getAppIcon(app.id);
      return (
        <Card 
          key={app.id} 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-md"
          onClick={() => onSelectApp(app)}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <IconComponent className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="secondary" className="text-xs">
                SBS
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight">
              {app.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4">
              {app.description}
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Acceder
            </Button>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/f9e927dd-5f22-4e7b-b112-eb0e8b96b40b.png" 
                alt="Logo SBS" 
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-xl font-semibold text-gray-900">
                Asistente de Supervisión
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-gray-500">{user.role}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bienvenido, {user.name}
            </h2>
            <p className="text-gray-600">
              Seleccione una aplicación para comenzar la supervisión
            </p>
          </div>

          <div className="space-y-8">
            {/* Análisis Transversal */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Análisis Transversal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderApplications(transversalApplications)}
              </div>
            </div>

            {/* Análisis Especializado */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Análisis Especializado
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderApplications(specializedApplications)}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onLogout={onLogout}
      />
    </div>
  );
};
