
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, FileText, Bot, User } from 'lucide-react';
import { FinancialEntity } from './FinancialSystemTree/types';

interface DocumentSearchChatProps {
  entity: FinancialEntity;
  selectedFilesCount: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: string[];
}

export const DocumentSearchChat = ({ entity, selectedFilesCount }: DocumentSearchChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hola, soy el asistente de búsqueda documental. He detectado que has seleccionado ${selectedFilesCount} archivo${selectedFilesCount !== 1 ? 's' : ''} de ${entity.name}. ¿En qué puedo ayudarte con el análisis de estos documentos?`,
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const simulateAssistantResponse = (userMessage: string): ChatMessage => {
    const responses = [
      {
        content: `He analizado los documentos seleccionados de ${entity.name}. Basándome en los archivos disponibles, puedo proporcionarte información sobre:

**Hallazgos principales:**
- Indicadores de cumplimiento regulatorio
- Análisis de riesgo crediticio
- Evaluación de solvencia patrimonial

**¿Te gustaría que profundice en algún aspecto específico?**`,
        files: ['Informe_Técnico_SBS_2024.pdf', 'Auditoría_Interna_Q1.pdf']
      },
      {
        content: `He encontrado información relevante en los documentos de ${entity.name}:

**Indicadores clave:**
- Ratio de capital: Dentro de parámetros normales
- Liquidez: Cumple con requisitos mínimos
- Gestión de riesgo: Implementación adecuada

**Recomendaciones:**
- Mantener seguimiento de indicadores de liquidez
- Revisar políticas de gestión de riesgo crediticio`,
        files: ['Reporte_Seguimiento_2024.pdf']
      },
      {
        content: `Basándome en el análisis de los documentos seleccionados, he identificado los siguientes aspectos:

**Cumplimiento regulatorio:**
- Las normativas SBS están siendo aplicadas correctamente
- Los reportes presentan consistencia en la información
- Se evidencia un sistema de control interno robusto

**¿Necesitas que revise algún aspecto específico de la documentación?**`,
        files: ['Informe_Cumplimiento_SBS.pdf', 'Control_Interno_2024.pdf']
      }
    ];

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)].content,
      timestamp: new Date(),
      files: responses[0].files
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
    setIsTyping(true);

    // Simular respuesta del asistente después de un delay
    setTimeout(() => {
      const assistantResponse = simulateAssistantResponse(newMessage);
      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Búsqueda Documental</h3>
            <p className="text-sm text-gray-600">{entity.name} - {entity.license}</p>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {selectedFilesCount} archivo{selectedFilesCount !== 1 ? 's' : ''} seleccionado{selectedFilesCount !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl flex ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white ml-2' 
                  : 'bg-gray-100 text-gray-900 mr-2'
              }`}>
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

                <div className="mt-2 text-xs opacity-50">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-3xl flex flex-row space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-gray-100 text-gray-900 rounded-lg p-3 mr-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu consulta sobre los documentos seleccionados..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
