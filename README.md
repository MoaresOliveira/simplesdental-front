# Desafio Frontend – Requisitos

Este documento apresenta os requisitos para implementação do frontend, garantindo compatibilidade com as regras e endpoints definidos no backend.

## 1. Validações

Você deve ajustar as entidades (model e sql) de acordo com as regras abaixo: 

- `Product.name` é obrigatório, não pode ser vazio e deve ter no máximo 100 caracteres.
- `Product.description` é opcional e pode ter no máximo 255 caracteres.
- `Product.price` é obrigatório deve ser > 0.
- `Product.status` é obrigatório.
- `Product.category` é obrigatório.
- `Category.name` deve ter no máximo 100 caracteres.
- `Category.description` é opcional e pode ter no máximo 255 caracteres.

## 2. Refatoração
- Devido às constantes atualizações do Angular e Angular Material, substitua todas as ocorrências de `mat-form-field` por componentes customizados para inputs e textareas, que sejam parametrizáveis e reutilizáveis em todos os formulários.

## 3. Otimização de Performance
- Ajuste as listagens e consultas para suportar paginação, conforme implementado no backend, garantindo o desempenho mesmo com grande volume de dados.

## 4. Refatoração  
- Atualize os componentes de produto para utilizar a nova versão da API:
  - Use o endpoint **`/api/v2/products`** para todas as operações relacionadas a produtos.

## 6. Autenticação e Gerenciamento de Usuários

Implemente as seguintes funcionalidades:

- **Usuários Admin**
  - Crie componentes para listagem e edição de usuários (apenas para usuários com role `admin`).

- **Profile do Usuário**
  - Implemente um formulário que permita ao usuário visualizar seus dados (`name`, `email`, `role`) e alterar sua senha.
  - Exiba, ao lado dos menus de "Products" e "Categories", o nome do usuário autenticado com um link para o profile.
    - Utilize o endpoint **`/auth/context`** para obter os dados do usuário (id, email e role).
 

## 7. Permissões e Controle de Acesso

Adapte as telas e funcionalidades de acordo com a role do usuário:

- Usuários com role `admin` possuem acesso completo (criar, editar e excluir produtos, categorias e usuários).
- Outros usuários terão acesso limitado conforme definido nos requisitos do projeto.

---

# Perguntas

1. Considerando uma aplicação frontend complexa, qual arquitetura (ex.: component-based, Flux/Redux ou MVVM) você adotaria e por que?
   
   Arquitetura *component-based*, e pensando numa aplicação angular talvez utilizando NgRx também, pois component-based permite melhor manutenção, testabilidade e até divisão entre membros ou equipes, e o NgRx permite controlar estados globais da aplicação de forma mais simples do que cada componente guardando ou buscando esses estados de lugares diferentes sem garantias.
2. Como você otimiza a performance do frontend ao lidar com grandes volumes de dados e múltiplos componentes, especialmente utilizando paginação e renderização condicional?

     1. Utilizando páginação do lado do servidor, evitando trazer muitos dados de uma vez
     2. Caching de dados que não alteram com frequência, ou em alguns casos até da páginação server-side.
     3. Virtual scrolling e lazy loading - Renderizar elementos apenas visiveis ou apenas quando buscado.
     4. Memoization - Basicamente um cache para funções baseado nos parâmetros recebidos.
     5. Renderização condicional - renderizar algo somente quando necessário ou quando os dados estiverem carregados
3. Quais métodos e frameworks de teste (unitários e de integração) você empregaria para assegurar a qualidade dos componentes customizados e da interface?
   
   Normalmente utilizo Jest para testes unitários e de integração. Fazendo testes unitários para componentes usando mocks focando nas lógica e funções, testes de componente focando também no template e funcionalidades através da interação com os elementos e também testes de services com chamadas HTTP simuladas. Mas também pode ser usado algumas ferramentas como o Cypress, para fazer o teste de ponta a ponta da aplicação, garantindo o funcionamento desde o input do usuário na interface até o output da aplicação para o usuário na interface.
4. Quais práticas de segurança específicas para o frontend você implementaria para prevenir vulnerabilidades como XSS, CSRF e manipulação inadequada do DOM?

   Vulnerabilidades como CSRF já são mitigadas com o uso de token JWT no header da requisição e o uso correto de métodos HTTP (evitar GET para operações de alteração), vulnerabilidades como XSS, já são mais raras no Angular graças ao *data binding* nativo do angular (Ex.: {{ valor }}), que já escapa os caracteres "perigosos", porém ainda assim precisa de cuidado com o uso de innerHtml e document.write, eval e etc. E o Angular oferece um utilitário chamado DomSanitizer que permite validar valores antes de renderizar dinamicamente no HTML.
5. Como garantir a compatibilidade e responsividade dos componentes customizados em diferentes navegadores e dispositivos, mantendo uma experiência consistente para o usuário?

   Para garantir a responsividade temos algumas opções como utilizar CSS Grid/Flexbox, valores dinâmicos e media queries, frameworks como Angular Material, TailwindCSS. Para a compatibilidade, para o estilo, alguns *pre-processors* como o Sass, já gera propriedades especificas para certos navegadores, para o javascript, podemos usar polyfills, que "ensinam" os navegadores como executar alguma função que eles não reconheçam, e oferecer fallbacks para certas funcionalidades. Fora isso, somente testes para identificar falhas de compatibilidade e podermos corrigir.
6. De que forma você estruturaria a comunicação com a API (incluindo versionamento de endpoints) e trataria erros de forma a manter a robustez da aplicação?

   Manter o caminho base de endpoints em um arquivo enviroment, para facilitar a troca de versões se necessários, Services ficariam responsáveis pelas requisições, utilizando interceptors para adicionar token ou outras informações necessárias em cada requisição e também para capturar e tratar o erro da respostas, podendo redirecionar para uma página de erro ou então notificar o usuário de alguma forma, podendo implementar *retry* e *timeout* em alguns casos para tentar novamente mas não parar o sistema por muito tempo. E implementar indicadores de carregamento em certos componentes para dar uma feedback visual para o usuário que algo está acontecendo.

Obs: Forneça apenas respostas textuais; não é necessário implementar as perguntas acima.

