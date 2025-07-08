
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AdditionalParametersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (parameters: AdditionalParameters) => void;
}

export interface AdditionalParameters {
  garantiaMonth: string;
  garantiaYear: string;
  cartaFianzaMonth: string;
  cartaFianzaYear: string;
  otrosParametros: string;
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const YEARS = Array.from({ length: new Date().getFullYear() - 2021 }, (_, i) => 2022 + i);

export const AdditionalParametersModal = ({ isOpen, onClose, onConfirm }: AdditionalParametersModalProps) => {
  const [parameters, setParameters] = useState<AdditionalParameters>({
    garantiaMonth: '',
    garantiaYear: '',
    cartaFianzaMonth: '',
    cartaFianzaYear: '',
    otrosParametros: ''
  });

  const handleConfirm = () => {
    onConfirm(parameters);
    onClose();
  };

  const handleCancel = () => {
    setParameters({
      garantiaMonth: '',
      garantiaYear: '',
      cartaFianzaMonth: '',
      cartaFianzaYear: '',
      otrosParametros: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Parámetros Adicionales</DialogTitle>
          <DialogDescription>
            Configure los parámetros adicionales para el análisis batch
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="garantia" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="garantia">Periodo Garantía</TabsTrigger>
            <TabsTrigger value="carta-fianza">Periodo Carta Fianza</TabsTrigger>
            <TabsTrigger value="otros">Otros Parámetros</TabsTrigger>
          </TabsList>

          <TabsContent value="garantia" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="garantia-month">Mes de Vigencia</Label>
                <Select 
                  value={parameters.garantiaMonth} 
                  onValueChange={(value) => setParameters(prev => ({...prev, garantiaMonth: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="garantia-year">Año de Vigencia</Label>
                <Select 
                  value={parameters.garantiaYear} 
                  onValueChange={(value) => setParameters(prev => ({...prev, garantiaYear: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar año" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="carta-fianza" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="carta-month">Mes de Vigencia</Label>
                <Select 
                  value={parameters.cartaFianzaMonth} 
                  onValueChange={(value) => setParameters(prev => ({...prev, cartaFianzaMonth: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="carta-year">Año de Vigencia</Label>
                <Select 
                  value={parameters.cartaFianzaYear} 
                  onValueChange={(value) => setParameters(prev => ({...prev, cartaFianzaYear: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar año" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="otros" className="space-y-4">
            <div>
              <Label htmlFor="otros-parametros">Parámetros Técnicos/Metadatos</Label>
              <Textarea
                id="otros-parametros"
                placeholder="Ingrese parámetros técnicos adicionales o metadatos para el análisis..."
                value={parameters.otrosParametros}
                onChange={(e) => setParameters(prev => ({...prev, otrosParametros: e.target.value}))}
                rows={6}
                className="mt-2"
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
            Confirmar Parámetros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
