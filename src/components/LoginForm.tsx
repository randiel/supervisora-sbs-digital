
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLogin: (email: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.endsWith('@sbs.gob.pe')) {
      toast({
        title: "Error de acceso",
        description: "Solo se permite el acceso con correos institucionales @sbs.gob.pe",
        variant: "destructive"
      });
      return;
    }

    if (!password) {
      toast({
        title: "Error",
        description: "Por favor ingrese su contraseña",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular validación
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email);
      toast({
        title: "Acceso exitoso",
        description: "Bienvenido a la Plataforma de Supervisión SBS"
      });
    }, 1500);
  };

  const handleForgotPassword = () => {
    toast({
      title: "Recuperación de contraseña",
      description: "Se ha enviado un enlace de recuperación a su correo institucional"
    });
  };

  const handleAzureLogin = () => {
    toast({
      title: "Azure AD",
      description: "Redirigiendo a Azure Active Directory..."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">SBS</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Plataforma de Supervisión</h1>
            <p className="text-gray-600 mt-2">Superintendencia de Banca, Seguros y AFP</p>
            <Badge variant="outline" className="mt-2">República del Perú</Badge>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center text-gray-800">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Correo Electrónico Institucional
                </label>
                <Input
                  type="email"
                  placeholder="usuario@sbs.gob.pe"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Verificando..." : "Acceder"}
              </Button>
            </form>

            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-11"
                onClick={handleForgotPassword}
              >
                Olvidé mi contraseña
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-11 border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={handleAzureLogin}
              >
                Acceder con Azure AD
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500">
          Sistema exclusivo para personal autorizado de la SBS
        </p>
      </div>
    </div>
  );
};
