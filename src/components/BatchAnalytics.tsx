
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Play, Download } from 'lucide-react';
import { FinancialEntity } from './ApplicationWindow';
import { toast } from '@/hooks/use-toast';

interface BatchAnalyticsProps {
  entity: FinancialEntity;
  onBack: () => void;
  onGoToAgent: () => void;
}

interface AnalysisResult {
  id: string;
  supervisado: string;
  supervisor: string;
  fechaLanzamiento: Date;
  duracion: number;
  fechaCorte: string;
  estado: 'En Ejecución' | 'Finalizado';
  resultado?: string;
}

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const years = Array.from({ length: new Date().getFullYear() - 2021 }, (_, i) => 2022 + i);

export const BatchAnalytics = ({ entity, onBack, onGoToAgent }: BatchAnalyticsProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const handleExecuteAnalysis = () => {
    if (!selectedMonth || !selectedYear) {
      toast({
        title: "Error",
        description: "Por favor seleccione el mes y año de análisis",
        variant: "destructive"
      });
      return;
    }

    const newResult: AnalysisResult = {
      id: Math.random().toString(36).substr(2, 9),
      supervisado: entity.name,
      supervisor: 'Juan Pérez',
      fechaLanzamiento: new Date(),
      duracion: 0,
      fechaCorte: `${selectedMonth}-${selectedYear}`,
      estado: 'En Ejecución'
    };

    setResults(prev => [newResult, ...prev]);

    toast({
      title: "Análisis iniciado",
      description: `Se ha iniciado el análisis batch para ${entity.name}`
    });

    // Simular finalización del análisis
    setTimeout(() => {
      setResults(prev => prev.map(result => 
        result.id === newResult.id 
          ? {
              ...result,
              estado: 'Finalizado' as const,
              duracion: Math.floor(Math.random() * 15) + 5,
              resultado: `${entity.name.replace(/\s+/g, '_')}_${selectedMonth}_${selectedYear}.zip`
            }
          : result
      ));

      toast({
        title: "Análisis completado",
        description: "El análisis batch ha finalizado exitosamente"
      });
    }, 3000);
  };

  const handleDownloadResult = (fileName: string) => {
    toast({
      title: "Descarga iniciada",
      description: `Descargando ${fileName}`
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analítica Batch
        </h2>
        <p className="text-gray-600">
          {entity.name} - {entity.license}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Período de Análisis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mes
                </label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar año" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 space-y-2">
                <Button 
                  onClick={handleExecuteAnalysis}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!selectedMonth || !selectedYear}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Ejecutar Análisis
                </Button>

                <Button 
                  onClick={onGoToAgent}
                  variant="outline"
                  className="w-full"
                  disabled={results.length === 0}
                >
                  Agente Suptech
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resultados de Análisis</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No hay análisis ejecutados. Ejecute un análisis para ver los resultados.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3 font-medium">Supervisado</th>
                        <th className="text-left p-3 font-medium">Supervisor</th>
                        <th className="text-left p-3 font-medium">Fecha/Hora</th>
                        <th className="text-left p-3 font-medium">Duración</th>
                        <th className="text-left p-3 font-medium">Fecha Corte</th>
                        <th className="text-left p-3 font-medium">Estado</th>
                        <th className="text-left p-3 font-medium">Resultado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result) => (
                        <tr key={result.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{result.supervisado}</td>
                          <td className="p-3">{result.supervisor}</td>
                          <td className="p-3">
                            {result.fechaLanzamiento.toLocaleString()}
                          </td>
                          <td className="p-3">
                            {result.duracion > 0 ? `${result.duracion} min` : '-'}
                          </td>
                          <td className="p-3">{result.fechaCorte}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              result.estado === 'Finalizado' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {result.estado}
                            </span>
                          </td>
                          <td className="p-3">
                            {result.resultado && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadResult(result.resultado!)}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                {result.resultado}
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
