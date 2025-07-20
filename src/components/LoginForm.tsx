
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { SupportContactModal } from './SupportContactModal';

interface LoginFormProps {
  onLogin: (email: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleAzureLogin = async () => {
    setIsLoading(true);
    
    toast({
      title: "Conectando con Azure AD",
      description: "Redirigiendo al portal de Microsoft..."
    });

    // Simular el proceso de autenticación de Azure AD
    setTimeout(() => {
      toast({
        title: "Autenticación en progreso",
        description: "Verificando credenciales con Azure Active Directory..."
      });

      // Simular el tiempo de autenticación
      setTimeout(() => {
        setIsLoading(false);
        
        // Simular un usuario autenticado exitosamente
        const mockUser = "supervisor.sbs@sbs.gob.pe";
        
        onLogin(mockUser);
        
        toast({
          title: "Acceso exitoso",
          description: "Bienvenido al Asistente de Supervisión SBS"
        });
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/f9e927dd-5f22-4e7b-b112-eb0e8b96b40b.png" 
              alt="Logo SBS" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Asistente de Supervisión</h1>
            <p className="text-gray-600 mt-2">Superintendencia de Banca, Seguros y AFP</p>
            <Badge variant="outline" className="mt-2">República del Perú</Badge>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center text-gray-800">Iniciar Sesión</CardTitle>
            <p className="text-sm text-gray-600 text-center">
              Inicia sesión con tu cuenta de usuario de la SBS
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button
                onClick={handleAzureLogin}
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                  ¿Problemas para acceder?
                </p>
                <button 
                  className="text-xs text-blue-600 hover:text-blue-700 underline"
                  onClick={() => setIsSupportModalOpen(true)}
                >
                  Contactar soporte técnico
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            Sistema exclusivo para personal autorizado de la SBS
          </p>
          <p className="text-xs text-gray-400">
            Protegido por Microsoft Azure Active Directory
          </p>
        </div>
      </div>
      
      <SupportContactModal 
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
};
