import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Paperclip, FileText, ExternalLink } from 'lucide-react';
import { FinancialEntity } from './FinancialSystemTree/types';

interface SupervisorAgentProps {
  entity: FinancialEntity;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  files?: string[];
  links?: string[];
  citations?: string[];
}

interface CitedDocument {
  id: string;
  name: string;
  type: string;
  relevance: number;
}

export const SupervisorAgent = ({ entity, onBack }: SupervisorAgentProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Hola, soy el Asistente Suptech. Estoy aquí para ayudarte a analizar los resultados del proceso de analítica batch y responder tus consultas sobre la supervisión de ' + entity.name + '. ¿En qué puedo asistirte?',
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [citedDocuments, setCitedDocuments] = useState<CitedDocument[]>([]);

  const simulateAgentResponse = (userMessage: string): ChatMessage => {
    // Simular documentos citados
    const newCitedDocs: CitedDocument[] = [
      {
        id: 'doc1',
        name: 'Informe_Tecnico_SBS_2024_Q1.pdf',
        type: 'Informe Técnico',
        relevance: 0.95
      },
      {
        id: 'doc2', 
        name: 'Auditoria_Interna_Marzo_2024.pdf',
        type: 'Auditoría',
        relevance: 0.87
      }
    ];
    
    setCitedDocuments(prev => [...prev, ...newCitedDocs]);

    const responses = [
      {
        content: `Basándome en el análisis de los documentos de ${entity.name}, he encontrado información relevante sobre los indicadores de solvencia y liquidez. Los ratios de capital muestran un cumplimiento del 14.2% sobre el mínimo regulatorio del 10%. 

**Hallazgos principales:**
- Ratio de solvencia: 14.2% (Cumple)
- Indicador de liquidez: 18.5% (Por encima del mínimo)
- Exposición a riesgo crediticio: Dentro de parámetros normales

**Recomendaciones:**
1. Monitorear de cerca la cartera vencida
2. Fortalecer los procesos de gestión de riesgo operacional`,
        files: ['Informe_Tecnico_SBS_2024_Q1.pdf', 'Auditoria_Interna_Marzo_2024.pdf'],
        links: ['https://sbs.gob.pe/regulacion/basilea-iii'],
        citations: [
          'Según el párrafo 3.2 del Informe Técnico SBS Q1 2024',
          'Como se detalla en la página 15 de la Auditoría Interna de Marzo 2024'
        ]
      },
      {
        content: `He revisado los datos históricos de ${entity.name} y puedo proporcionarte un análisis comparativo del desempeño financiero:

**Tendencias identificadas:**
- Crecimiento de depósitos: +8.3% interanual
- Evolución de la cartera crediticia: +5.7% interanual
- Margen financiero: Estable en 4.2%

**Áreas de atención:**
- Incremento en provisiones por riesgo crediticio
- Necesidad de fortalecer capital de trabajo`,
        files: ['Reporte_Seguimiento_2024.pdf'],
        citations: [
          'Basado en datos del Reporte de Seguimiento 2024, sección 2.1'
        ]
      }
    ];

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'agent',
      content: responses[Math.floor(Math.random() * responses.length)].content,
      timestamp: new Date(),
      files: responses[0].files,
      links: responses[0].links,
      citations: responses[0].citations
    };
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simular respuesta del agente después de un delay
    setTimeout(() => {
      const agentResponse = simulateAgentResponse(newMessage);
      setMessages(prev => [...prev, agentResponse]);
    }, 1500);
  };

  return (
    <div className="flex h-full">
      {/* Main conversation area */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Asistente Suptech
          </h2>
          <p className="text-gray-600">
            {entity.name} - {entity.license}
          </p>

          {citedDocuments.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Documentos citados en esta conversación:
              </p>
              <div className="flex flex-wrap gap-2">
                {citedDocuments.map(doc => (
                  <Badge key={doc.id} variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    {doc.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg p-4`}>
                <div className="whitespace-pre-wrap text-sm">
                  {message.content}
                </div>
                
                {message.files && message.files.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium opacity-75">Archivos relacionados:</p>
                    {message.files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <FileText className="h-3 w-3" />
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                )}

                {message.links && message.links.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium opacity-75">Enlaces:</p>
                    {message.links.map((link, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <ExternalLink className="h-3 w-3" />
                        <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                          {link}
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {message.citations && message.citations.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium opacity-75">Citas:</p>
                    {message.citations.map((citation, index) => (
                      <div key={index} className="text-xs italic opacity-75">
                        "{citation}"
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-2 text-xs opacity-50">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe tu consulta sobre los resultados del análisis..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right sidebar with chat info */}
      <div className="w-80 border-l bg-gray-50 p-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Asistente Suptech IA</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>
              Especializado en análisis de documentos regulatorios y supervisión bancaria.
            </p>
            <p>
              Capacidades:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 ml-2">
              <li>Análisis de informes técnicos</li>
              <li>Revisión de auditorías</li>
              <li>Interpretación de indicadores</li>
              <li>Recomendaciones regulatorias</li>
            </ul>
          </CardContent>
        </Card>

        {citedDocuments.length > 0 && (
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Documentos Analizados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {citedDocuments.map(doc => (
                <div key={doc.id} className="p-2 bg-white rounded border text-xs">
                  <div className="font-medium truncate">{doc.name}</div>
                  <div className="text-gray-500">{doc.type}</div>
                  <div className="text-blue-600">
                    Relevancia: {(doc.relevance * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
