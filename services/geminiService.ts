
import { GoogleGenAI, Type } from "@google/genai";
import { Point, OptimizationResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const optimizationSchema = {
  type: Type.OBJECT,
  properties: {
    clusters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          clusterId: { type: Type.NUMBER },
          points: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.NUMBER },
                x: { type: Type.NUMBER },
                y: { type: Type.NUMBER },
              },
            },
          },
        },
        required: ['clusterId', 'points'],
      },
    },
    routes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          clusterId: { type: Type.NUMBER },
          ordered_path: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                x: { type: Type.NUMBER },
                y: { type: Type.NUMBER },
              },
            },
          },
          explanation: { type: Type.STRING },
        },
        required: ['clusterId', 'ordered_path', 'explanation'],
      },
    },
    overall_summary: { type: Type.STRING },
  },
  required: ['clusters', 'routes', 'overall_summary'],
};


export const getOptimizedRoute = async (points: Point[], depot: Point): Promise<OptimizationResponse> => {
  const prompt = `
    Você é um especialista em otimização de logística de IA para uma empresa de entrega de comida chamada "Sabor Express".
    Sua tarefa é resolver um problema de otimização de rotas.

    Contexto:
    - O depósito (ponto de partida e chegada) está nas coordenadas (${depot.x}, ${depot.y}).
    - Temos 2 entregadores disponíveis.
    - As coordenadas do mapa variam de (0,0) no canto superior esquerdo a (800, 600) no canto inferior direito.

    Pontos de entrega:
    ${JSON.stringify(points.map(p => ({id: p.id, x: p.x, y: p.y})))}

    Suas tarefas são:
    1.  **Agrupar as entregas:** Agrupe os pontos de entrega em 2 clusters eficientes, um para cada entregador. Use uma lógica semelhante ao algoritmo K-Means para minimizar a distância dos pontos ao centro do cluster.
    2.  **Otimizar a rota para cada cluster:** Para cada cluster, determine a ordem ideal dos pontos de entrega para minimizar a distância total da viagem (Problema do Caixeiro Viajante). A rota de cada entregador deve começar no depósito (${depot.x}, ${depot.y}), visitar todos os pontos em seu cluster atribuído e retornar ao depósito.
    3.  **Forneça a saída em formato JSON.**

    Por favor, forneça sua resposta estritamente no formato JSON especificado no esquema. Não adicione nenhum texto extra ou explicações fora da estrutura JSON.
    O ID do depósito no caminho ordenado deve ser "depot".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: optimizationSchema,
      },
    });

    const text = response.text.trim();
    // Sanitize response by removing potential markdown backticks
    const cleanText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const parsedResponse = JSON.parse(cleanText) as OptimizationResponse;
    return parsedResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get optimized routes from AI. Please check the console for details.");
  }
};
