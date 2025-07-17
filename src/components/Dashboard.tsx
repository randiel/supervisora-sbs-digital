
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Menu, Search, Shield, FileText, TrendingUp, Filter } from 'lucide-react';
import { User as UserType, Application } from '@/pages/Index';
import { Sidebar } from './Sidebar';

interface DashboardProps {
  user: UserType;
  onSelectApp: (app: Application) => void;
  onLogout: () => void;
}

interface SpecializedApplication extends Application {
  topic: string;
}

const TRANSVERSAL_APPLICATIONS: Application[] = [
  {
    id: 'busqueda-documental',
    name: 'Búsqueda Documental',
    description: 'Sistema de gestión y búsqueda de documentos'
  }
];

const SPECIALIZED_APPLICATIONS: SpecializedApplication[] = [
  {
    id: 'garantias-preferidas',
    name: 'Evaluación de Garantías Preferidas',
    description: 'Gestión y análisis de garantías preferidas del sistema financiero',
    topic: 'Confiabilidad de datos'
  },
  {
    id: 'cartas-fianza',
    name: 'Evaluación de Cartas Fianza',
    description: 'Supervisión y control de cartas fianza emitidas en el sistema financiero',
    topic: 'Confiabilidad de datos'
  },
  {
    id: 'contratos-deuda-subordinada',
    name: 'Evaluación de Contratos de Deuda Subordinada',
    description: 'Análisis y supervisión de contratos de deuda subordinada en el sistema financiero',
    topic: 'Supervisión de gestión de riesgos de mercado'
  }
];

const TOPIC_FILTERS = [
  'Todos los tópicos',
  'Confiabilidad de datos',
  'Supervisión de gestión de riesgos de mercado',
  'Supervisión de gestión de riesgos de liquidez',
  'Supervisión de riesgos de conglomerados'
];

// Mapeo de iconos por aplicación
const APP_ICONS = {
  'busqueda-documental': Search,
  'garantias-preferidas': Shield,
  'cartas-fianza': FileText,
  'contratos-deuda-subordinada': TrendingUp
} as const;

export const Dashboard = ({ user, onSelectApp, onLogout }: DashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Todos los tópicos');

  const getAppIcon = (appId: string) => {
    return APP_ICONS[appId as keyof typeof APP_ICONS] || FileText;
  };

  const renderApplicationCard = (app: Application) => {
    const IconComponent = getAppIcon(app.id);
    
    return (
      <Card 
        key={app.id} 
        className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary/20 bg-white"
        onClick={() => onSelectApp(app)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="secondary" className="text-xs font-medium bg-accent/10 text-accent-foreground">
              SBS
            </Badge>
          </div>
          <CardTitle className="text-lg leading-tight text-gray-900 group-hover:text-primary transition-colors">
            {app.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm mb-6 line-clamp-3">
            {app.description}
          </p>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
            Acceder
          </Button>
        </CardContent>
      </Card>
    );
  };

  const filteredSpecializedApplications = selectedTopic === 'Todos los tópicos' 
    ? SPECIALIZED_APPLICATIONS 
    : SPECIALIZED_APPLICATIONS.filter(app => app.topic === selectedTopic);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/60 sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/f9e927dd-5f22-4e7b-b112-eb0e8b96b40b.png" 
                  alt="Logo SBS" 
                  className="w-6 h-6 object-contain filter brightness-0 invert"
                />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Asistente de Supervisión
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
              <img 
                src="/lovable-uploads/c2d804d2-3ef6-4777-ba96-73e5ab43dc93.png" 
                alt="Usuario" 
                className="h-5 w-5 object-contain"
              />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-gray-500 text-xs">Supervisor SBS</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-10">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Bienvenido, {user.name}
              </h2>
              <p className="text-gray-600 text-lg">
                Seleccione una herramienta para comenzar la supervisión
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {/* Análisis Transversal */}
            <section>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Análisis Transversal
                </h3>
                <p className="text-gray-600 max-w-3xl">
                  Estas herramientas permiten realizar análisis entre múltiples documentos y fuentes de información
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {TRANSVERSAL_APPLICATIONS.map(renderApplicationCard)}
              </div>
            </section>

            {/* Análisis Especializado */}
            <section>
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Análisis Especializado
                    </h3>
                    <p className="text-gray-600 max-w-3xl">
                      Estas herramientas están enfocadas a ciertos productos del sistema financiero y permiten realizar análisis cruzados
                    </p>
                  </div>
                  
                  {/* Filtro de Tópicos */}
                  <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm border border-gray-200/50">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger className="w-64 border-0 shadow-none focus:ring-0">
                        <SelectValue placeholder="Filtrar por tópico" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOPIC_FILTERS.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSpecializedApplications.map(renderApplicationCard)}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/60 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600">
              © 2025 Superintendencia de Banca, Seguros y AFP. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Sistema de Supervisión</span>
              <span>•</span>
              <span>v2.0</span>
            </div>
          </div>
        </div>
      </footer>

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onLogout={onLogout}
      />
    </div>
  );
};
