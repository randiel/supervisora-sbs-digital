
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { User, Home, Settings, LogOut, Shield } from 'lucide-react';
import { User as UserType } from '@/pages/Index';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  onLogout: () => void;
}

export const Sidebar = ({ isOpen, onClose, user, onLogout }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', action: onClose },
    { icon: User, label: 'Perfil', action: () => {} },
    { icon: Settings, label: 'Configuración', action: () => {} },
    { icon: Shield, label: 'Seguridad', action: () => {} },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">SBS</span>
            </div>
            <div>
              <SheetTitle className="text-left">Plataforma de Supervisión</SheetTitle>
              <p className="text-sm text-gray-500">SBS Perú</p>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-sm text-blue-600 font-medium">{user.role}</div>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start h-12"
                onClick={item.action}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="pt-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
