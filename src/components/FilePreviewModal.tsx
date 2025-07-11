
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileItem } from './FinancialSystemTree/types';
import { FileText } from 'lucide-react';
import { useState } from 'react';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileItem | null;
  folderName: string;
}

export const FilePreviewModal = ({ isOpen, onClose, file, folderName }: FilePreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!file) return null;

  const getFileExtension = (filename: string) => {
    return filename.toLowerCase().split('.').pop() || '';
  };

  const renderFileContent = () => {
    const extension = getFileExtension(file.name);
    
    if (extension === 'pdf') {
      // Para archivos PDF, contenido simulado con múltiples páginas
      return (
        <ScrollArea className="h-full">
          <div className="w-full bg-white p-8 space-y-8">
            {/* Página 1 */}
            <div className="min-h-[1000px] border-b-2 border-gray-200 pb-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">DOCUMENTO TÉCNICO SBS</h1>
                <p className="text-lg text-gray-700">Superintendencia de Banca, Seguros y AFP</p>
                <p className="text-sm text-gray-600 mt-4">Resolución SBS N° 2024-001</p>
              </div>
              
              <div className="space-y-6 text-sm leading-relaxed">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">1. DISPOSICIONES GENERALES</h2>
                  <p className="text-gray-700 mb-4">
                    La presente resolución tiene por objeto establecer las disposiciones normativas 
                    que regulan las operaciones del sistema financiero peruano, en cumplimiento 
                    de las facultades conferidas por la Ley General del Sistema Financiero y del 
                    Sistema de Seguros y Orgánica de la Superintendencia de Banca y Seguros.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Las entidades del sistema financiero deberán ajustar sus operaciones a las 
                    disposiciones contenidas en el presente documento, siendo de aplicación 
                    obligatoria para todas las instituciones supervisadas.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Ámbito de Aplicación</h3>
                  <p className="text-gray-700 mb-3">
                    Las presentes disposiciones son aplicables a:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Empresas del sistema financiero</li>
                    <li>Empresas de seguros y reaseguros</li>
                    <li>Administradoras privadas de fondos de pensiones</li>
                    <li>Cooperativas de ahorro y crédito</li>
                    <li>Cajas municipales de ahorro y crédito</li>
                    <li>Cajas rurales de ahorro y crédito</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Definiciones</h3>
                  <p className="text-gray-700 mb-3">
                    Para efectos de la presente norma, se entiende por:
                  </p>
                  <div className="space-y-3 ml-4">
                    <div>
                      <span className="font-semibold text-gray-900">Capital Regulatorio:</span>
                      <span className="text-gray-700 ml-2">
                        Patrimonio efectivo de la entidad financiera calculado según las 
                        disposiciones vigentes.
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Riesgo Operacional:</span>
                      <span className="text-gray-700 ml-2">
                        Riesgo de pérdida resultante de la inadecuación o falla de procesos, 
                        personas y sistemas internos o eventos externos.
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Provisiones:</span>
                      <span className="text-gray-700 ml-2">
                        Reservas constituidas para cubrir posibles pérdidas en la cartera 
                        de créditos y otras operaciones.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Página 2 */}
            <div className="min-h-[1000px] border-b-2 border-gray-200 pb-8">
              <div className="space-y-6 text-sm leading-relaxed">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">2. GESTIÓN DE RIESGOS</h2>
                  <p className="text-gray-700 mb-4">
                    Las entidades financieras deberán implementar un sistema integral de 
                    gestión de riesgos que permita identificar, medir, monitorear y controlar 
                    los diferentes tipos de riesgo a los que se encuentran expuestas.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 Riesgo de Crédito</h3>
                  <p className="text-gray-700 mb-3">
                    Las entidades deberán mantener políticas y procedimientos adecuados para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Evaluación de la capacidad de pago de los deudores</li>
                    <li>Establecimiento de límites de exposición por deudor</li>
                    <li>Seguimiento continuo de la cartera de créditos</li>
                    <li>Constitución oportuna de provisiones</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">2.2 Riesgo de Mercado</h3>
                  <p className="text-gray-700 mb-3">
                    Se deberá implementar un sistema de medición y control que considere:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Riesgo de tasa de interés</li>
                    <li>Riesgo cambiario</li>
                    <li>Riesgo de precio de acciones</li>
                    <li>Riesgo de commodities</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">2.3 Riesgo de Liquidez</h3>
                  <p className="text-gray-700 mb-3">
                    Las entidades mantendrán niveles adecuados de liquidez mediante:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Diversificación de fuentes de fondeo</li>
                    <li>Mantenimiento de reservas de liquidez</li>
                    <li>Planes de contingencia para situaciones de estrés</li>
                    <li>Pruebas de estrés periódicas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Página 3 */}
            <div className="min-h-[1000px] pb-8">
              <div className="space-y-6 text-sm leading-relaxed">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">3. RATIOS PATRIMONIALES</h2>
                  <p className="text-gray-700 mb-4">
                    Las entidades del sistema financiero deberán mantener en todo momento 
                    ratios patrimoniales que no sean inferiores a los mínimos establecidos 
                    en la presente norma.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Ratio de Capital Global</h3>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700">
                      <strong>Mínimo requerido:</strong> 10% de los activos y contingentes 
                      ponderados por riesgo de crédito, más los requerimientos de patrimonio 
                      efectivo por riesgo de mercado y riesgo operacional.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Ratio de Capital Básico</h3>
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700">
                      <strong>Mínimo requerido:</strong> 6% de los activos y contingentes 
                      ponderados por riesgo de crédito.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3.3 Medidas Correctivas</h3>
                  <p className="text-gray-700 mb-3">
                    En caso de incumplimiento de los ratios mínimos, la Superintendencia 
                    podrá adoptar las siguientes medidas:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>Requerimiento de plan de regularización</li>
                    <li>Restricción en el crecimiento de operaciones</li>
                    <li>Limitación en el pago de dividendos</li>
                    <li>Intervención temporal de la entidad</li>
                  </ol>

                  <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400">
                    <h4 className="font-semibold text-gray-900 mb-2">Disposición Transitoria</h4>
                    <p className="text-sm text-gray-700">
                      Las entidades que a la fecha de entrada en vigencia de la presente 
                      norma no cumplan con los ratios establecidos, contarán con un plazo 
                      máximo de 180 días calendario para su adecuación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      );
    } else if (extension === 'docx' || extension === 'doc') {
      // Para archivos Word, contenido simulado con múltiples secciones
      return (
        <ScrollArea className="h-full">
          <div className="w-full bg-white p-8 space-y-6">
            <div className="border-b pb-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">INFORME TÉCNICO DE SUPERVISIÓN</h1>
              <p className="text-sm text-gray-600 mt-1">Superintendencia de Banca, Seguros y AFP</p>
              <p className="text-xs text-gray-500 mt-2">Código: IT-2024-0157 | Fecha: Marzo 2024</p>
            </div>
            
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. RESUMEN EJECUTIVO</h2>
                <p className="text-gray-700 mb-4">
                  El presente informe contiene los resultados de la evaluación integral realizada 
                  a la entidad financiera durante el período comprendido entre enero y marzo de 2024. 
                  La supervisión se enfocó en verificar el cumplimiento de las disposiciones 
                  normativas vigentes y evaluar la solidez del sistema de gestión de riesgos.
                </p>
                <p className="text-gray-700 mb-4">
                  Los principales hallazgos indican un desempeño satisfactorio en la mayoría 
                  de los aspectos evaluados, con algunas observaciones menores que requieren 
                  atención en el corto plazo.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Calificación General</h3>
                  <p className="text-blue-800 text-lg font-bold">SATISFACTORIO</p>
                  <p className="text-blue-700 text-sm mt-1">
                    La entidad mantiene una gestión adecuada de sus operaciones y cumple 
                    con los requerimientos normativos establecidos.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. ASPECTOS EVALUADOS</h2>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-green-400 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">2.1 Gestión de Riesgo Crediticio</h3>
                    <p className="text-gray-700 mb-2">
                      <span className="inline-block w-20 text-sm font-medium">Estado:</span>
                      <span className="text-green-600 font-semibold">CONFORME</span>
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-xs">
                      <li>Políticas de evaluación crediticia actualizadas</li>
                      <li>Procedimientos de seguimiento implementados</li>
                      <li>Ratios de morosidad dentro de parámetros aceptables</li>
                      <li>Provisiones constituidas según normativa</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">2.2 Ratios Patrimoniales</h3>
                    <p className="text-gray-700 mb-2">
                      <span className="inline-block w-20 text-sm font-medium">Estado:</span>
                      <span className="text-green-600 font-semibold">CONFORME</span>
                    </p>
                    <div className="ml-4 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Ratio de Capital Global:</span>
                        <span className="font-semibold">14.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Ratio de Capital Básico:</span>
                        <span className="font-semibold">10.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Ratio de Apalancamiento:</span>
                        <span className="font-semibold">8.5%</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-400 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">2.3 Sistema de Control Interno</h3>
                    <p className="text-gray-700 mb-2">
                      <span className="inline-block w-20 text-sm font-medium">Estado:</span>
                      <span className="text-yellow-600 font-semibold">OBSERVADO</span>
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-xs">
                      <li>Falta actualización de algunos manuales de procedimientos</li>
                      <li>Necesidad de fortalecer controles en el área de tesorería</li>
                      <li>Pendiente implementación de controles automatizados</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">2.4 Gestión de Liquidez</h3>
                    <p className="text-gray-700 mb-2">
                      <span className="inline-block w-20 text-sm font-medium">Estado:</span>
                      <span className="text-green-600 font-semibold">CONFORME</span>
                    </p>
                    <p className="text-gray-700 text-xs ml-4">
                      La entidad mantiene niveles adecuados de liquidez y cuenta con 
                      planes de contingencia actualizados.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. RECOMENDACIONES</h2>
                <p className="text-gray-700 mb-4">
                  Con base en los hallazgos identificados, se recomienda a la entidad 
                  implementar las siguientes mejoras:
                </p>

                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Recomendación 1 - Prioridad Alta</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Actualización de Manuales:</strong> Revisar y actualizar los 
                      manuales de procedimientos del área operativa dentro de los próximos 60 días.
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Plazo:</strong> 60 días | <strong>Responsable:</strong> Gerencia de Operaciones
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Recomendación 2 - Prioridad Media</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Fortalecimiento de Controles:</strong> Implementar controles 
                      adicionales en el área de tesorería y considerar la automatización 
                      de procesos críticos.
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Plazo:</strong> 90 días | <strong>Responsable:</strong> Gerencia de Riesgos
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Recomendación 3 - Prioridad Baja</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Capacitación:</strong> Desarrollar programa de capacitación 
                      continua para el personal en temas de gestión de riesgos y normativa vigente.
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Plazo:</strong> 120 días | <strong>Responsable:</strong> Gerencia de RRHH
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. SEGUIMIENTO</h2>
                <p className="text-gray-700 mb-4">
                  La entidad deberá remitir informes de avance sobre la implementación 
                  de las recomendaciones según el siguiente cronograma:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Fecha</th>
                        <th className="text-left py-2">Tipo de Reporte</th>
                        <th className="text-left py-2">Contenido</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b">
                        <td className="py-2">30 de mayo 2024</td>
                        <td className="py-2">Reporte de Avance</td>
                        <td className="py-2">Estado de implementación - Recomendación 1</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">30 de junio 2024</td>
                        <td className="py-2">Reporte Integral</td>
                        <td className="py-2">Avance general todas las recomendaciones</td>
                      </tr>
                      <tr>
                        <td className="py-2">30 de agosto 2024</td>
                        <td className="py-2">Reporte Final</td>
                        <td className="py-2">Cierre de observaciones</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t pt-6 mt-8 text-center">
                <p className="text-xs text-gray-500">
                  Este documento es confidencial y de uso exclusivo de la entidad supervisada
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Superintendencia de Banca, Seguros y AFP - División de Supervisión
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      );
    } else {
      // Para otros tipos de archivo
      return (
        <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">Archivo no compatible</p>
              <p className="text-sm text-gray-600">
                La previsualización no está disponible para archivos de tipo .{extension}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Previsualización - {file.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="h-[75vh]">
          <div className="bg-white border rounded-lg h-full overflow-hidden">
            <div className="border-b p-3 bg-gray-50 rounded-t-lg">
              <h4 className="font-semibold text-gray-900">Contenido del Documento</h4>
            </div>
            <div className="h-[calc(100%-60px)]">
              {renderFileContent()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
