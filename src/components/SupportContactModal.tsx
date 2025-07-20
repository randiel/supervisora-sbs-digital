import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Phone, Mail } from 'lucide-react';

interface SupportContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportContactModal = ({ isOpen, onClose }: SupportContactModalProps) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim() || !email.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, ingrese su teléfono y correo electrónico",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simular proceso de contacto
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      setPhone('');
      setEmail('');
      
      toast({
        title: "Solicitud enviada exitosamente",
        description: "Un técnico de Mesa de Ayuda se contactará con usted en breve"
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            Contactar con Mesa de Ayuda
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Número de teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ej: +51 999 888 777"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ej: usuario@sbs.gob.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Información importante</p>
                <p className="text-xs text-blue-700 mt-1">
                  Un técnico especializado se comunicará con usted dentro de las próximas 2 horas durante horario hábil.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Enviando..." : "Solicitar contacto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};