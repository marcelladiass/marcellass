Rota Inteligente: Otimização de Entregas com Algoritmos de IA para "Sabor Express" 



Descrição do Problema, Desafio Proposto e Objetivos

A "Sabor Express" é uma pequena empresa de delivery de alimentos localizada na região central da cidade, que enfrenta desafios significativos na gestão de suas entregas. Em horários de pico, como almoço e jantar, a empresa lida com rotas ineficientes, definidas manualmente com base apenas na experiência dos entregadores. Isso resulta em:
Atrasos frequentes nas entregas.

Aumento nos custos operacionais, principalmente com combustível.
Insatisfação dos clientes devido à demora e falta de previsibilidade.
Para se manter competitiva e melhorar a qualidade do serviço, a "Sabor Express" necessita de uma solução que otimize suas operações.
Nosso desafio é desenvolver uma solução inteligente, fundamentada em algoritmos de Inteligência Artificial, capaz de sugerir as rotas mais eficientes para os entregadores.
Os objetivos deste projeto são:
Reduzir o tempo médio de entrega para os clientes da "Sabor Express".
Minimizar os custos operacionais da empresa, especialmente o consumo de combustível.
Aumentar a satisfação dos clientes através de entregas mais rápidas e confiáveis.
Modernizar a gestão de entregas, substituindo a definição manual por um sistema automatizado e inteligente.



Abordagem Adotada

Para solucionar o problema da "Sabor Express", adotamos uma abordagem em duas fases principais, utilizando a modelagem de grafos para representar a cidade e combinando algoritmos de agrupamento (clustering) com algoritmos de busca de menor caminho



Modelagem da Cidade como Grafo

A cidade e seus pontos de entrega (restaurante, clientes) são representados como um grafo.
Nós (Vértices)  Cada local de interesse, como o restaurante da "Sabor Express" e os endereços dos clientes, é um nó no grafo.
Arestas: As ruas que conectam esses locais são representadas como arestas.
Pesos das Arestas: Cada aresta possui um peso que representa a distância ou o tempo estimado de percurso entre os nós, simulando as condições de tráfego. Para simplificar, neste projeto, assumimos pesos baseados em distância fixa, mas a abordagem é extensível a dados de tempo em tempo real.


Fluxo da Solução

O processo de otimização de rota segue os seguintes passos:
Geração/Carregamento de Dados: Dados do mapa (nós e arestas) e dos pedidos (localização dos clientes) são carregados ou gerados de forma simulada.
Agrupamento de Entregas (Clustering): Em situações de alta demanda (horários de pico com muitos pedidos), as localizações dos clientes são agrupadas em clusters (grupos). Cada cluster representa um conjunto de entregas que pode ser atribuído a um único entregador, otimizando a distribuição do trabalho.
Otimização de Rota por Cluster: Para cada cluster de entregas, é calculado o menor caminho que o entregador deve percorrer, partindo do restaurante, passando por todos os clientes do seu grupo e retornando ao ponto de partida (ou finalizando na última entrega). Isso é uma variação do Problema do Caixeiro Viajante (TSP) para um número reduzido de pontos, resolvido com algoritmos de busca de menor caminho e heurísticas de sequenciamento.
Sugestão de Rotas Otimizadas: As rotas calculadas são apresentadas como sugestões aos entregadores, indicando a sequência ideal de paradas.


Algoritmos Utilizados

K-Means (Aprendizado Não Supervisionado - Clustering)
Finalidade: O algoritmo K-Means é utilizado para agrupar os pedidos dos clientes em zonas geográficas próximas. Em cenários com múltiplos pedidos e entregadores, é fundamental distribuir o trabalho de forma eficiente. O K-Means ajuda a criar k grupos (onde k é o número de entregadores disponíveis ou o número de grupos desejados), minimizando a distância entre os pontos dentro de cada cluster e maximizando a distância entre os clusters.

Como funciona: Ele seleciona k centroides iniciais aleatoriamente e, iterativamente, atribui cada ponto de dado ao centroide mais próximo, em seguida, recalcula a posição dos centroides como a média dos pontos de cada cluster. O processo se repete até que os centroides não mudem significativamente.


A* Search Algorithm (Algoritmo de Busca de Menor Caminho)

Finalidade: Após o agrupamento dos pedidos, para cada entregador (ou cluster), o algoritmo A* é empregado para encontrar o menor caminho entre o restaurante e todos os pontos de entrega designados a esse entregador. Ele é uma escolha poderosa por sua eficiência em grafos grandes.

Como funciona: O A* é um algoritmo de busca informada que combina as vantagens do algoritmo de Dijkstra (garante o menor caminho) com uma heurística para guiar a busca de forma mais eficiente. Ele avalia cada nó usando a função f(n) = g(n) + h(n), onde:
g(n) é o custo do caminho do nó inicial até o nó n.

h(n) é uma estimativa heurística do custo do caminho do nó n até o nó objetivo. Neste projeto, a distância euclidiana (ou distância de Manhattan) entre o nó atual e o nó objetivo é usada como heurística, sendo uma estimativa admissível (nunca superestima o custo real).
Nota sobre o TSP (Problema do Caixeiro Viajante): Para determinar a sequência ideal de visitação aos pontos de entrega dentro de um cluster, o problema se assemelha ao TSP, que é NP-Hard. Para o escopo deste projeto e o número reduzido de pontos por cluster (gerado pelo K-Means), podemos utilizar uma heurística gulosa simples (por exemplo, visitar o cliente mais próximo não visitado) em conjunto com o A* para otimizar o caminho entre cada par de pontos na sequência

 
 Análise dos Resultados, Eficiência da Solução, Limitações Encontradas e Sugestões de Melhoria

 Análise dos Resultados e Eficiência da Solução
Nossa solução visa impactar positivamente a "Sabor Express" das seguintes maneiras:
Redução do Tempo de Entrega: Ao calcular as rotas mais curtas e eficientes, minimizamos o tempo que os entregadores levam para completar suas entregas, resultando em clientes mais satisfeitos.

Otimização de Custos: Menores distâncias percorridas significam menor consumo de combustível e menor desgaste dos veículos, reduzindo os custos operacionais da empresa.
Melhor Gerenciamento de Carga de Trabalho: O agrupamento de entregas pelo K-Means permite uma distribuição mais equilibrada dos pedidos entre os entregadores, evitando sobrecarga e otimizando a logística em horários de pico.

Escalabilidade: A abordagem baseada em algoritmos é escalável para um número maior de pedidos e entregadores, ao contrário da dependência da experiência manual.
A eficiência dos algoritmos utilizados é fundamental. O K-Means tem uma complexidade de tempo de O(nkd) (onde n é o número de pontos, k o número de clusters, e d o número de dimensões), que é razoável para a maioria dos cenários de delivery. O algoritmo A* (ou Dijkstra) possui uma complexidade de tempo de O(E + V log V) ou O(E log V) (onde E é o número de arestas e V o número de vértices no grafo), garantindo que a busca do menor caminho seja eficiente mesmo em grafos moderadamente grandes.


Limitações Encontradas

Apesar de robusta, a solução atual possui algumas limitações que podem ser abordadas em futuras iterações:
Dados Estáticos de Tráfego: A modelagem atual usa pesos de arestas fixos (distância). Isso não considera variações de tráfego em tempo real, obras, acidentes ou condições climáticas que podem alterar os tempos de percurso.
Problema do Caixeiro Viajante (TSP): Embora o K-Means agrupe os pedidos, a etapa de sequenciamento dos pontos dentro de cada cluster para obter a rota ótima global é um problema de TSP. Para um pequeno número de pontos, heurísticas simples funcionam bem, mas para clusters maiores, a otimização pode não ser globalmente ótima.
Capacidade do Entregador: A solução não considera a capacidade de carga de cada entregador (por exemplo, quantos itens cabem na mochila da moto) nem suas preferências de rota.

Janelas de Tempo de Entrega: Não há consideração para janelas de tempo específicas que os clientes possam ter para receber seus pedidos.
Múltiplos Depósitos: A solução assume um único ponto de origem (restaurante). Para empresas com várias filiais, a lógica precisaria ser expandida.

 Sugestões de Melhoria
Para aprimorar a "Rota Inteligente", as seguintes melhorias são sugeridas:
Integração com APIs de Tráfego em Tempo Real: Conectar a solução a APIs de mapas (como Google Maps API ou Waze API) permitiria obter dados de tráfego em tempo real, tornando as rotas dinamicamente adaptáveis e ainda mais precisas.
Aprendizado por Reforço (RL): Explorar algoritmos de RL para permitir que o sistema aprenda com experiências passadas (tempos de entrega reais, condições de tráfego) e adapte suas estratégias de roteamento ao longo do tempo.
Consideração de Janelas de Tempo: Implementar restrições de "Time Windows" para atender a requisitos de entrega específicos dos clientes.

Otimização de Múltiplos Depósitos:

 Estender a funcionalidade para empresas com mais de um restaurante ou centro de distribuição.

Interface Gráfica para Entregadores e Gestores: Desenvolver uma interface amigável para que os entregadores possam visualizar suas rotas no celular e os gestores possam monitorar o status das entregas.
Algoritmos Genéticos para TSP: Para otimizar o sequenciamento de pontos dentro de clusters maiores, algoritmos heurísticos como Algoritmos Genéticos podem ser explorados para encontrar soluções "boas o suficiente" em tempo razoável.


Marcella Dias - 93980
Artificial Intelligence Fundamental
EAD


