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
2. Como você otimiza a performance do frontend ao lidar com grandes volumes de dados e múltiplos componentes, especialmente utilizando paginação e renderização condicional?
3. Quais métodos e frameworks de teste (unitários e de integração) você empregaria para assegurar a qualidade dos componentes customizados e da interface?
4. Quais práticas de segurança específicas para o frontend você implementaria para prevenir vulnerabilidades como XSS, CSRF e manipulação inadequada do DOM?
5. Como garantir a compatibilidade e responsividade dos componentes customizados em diferentes navegadores e dispositivos, mantendo uma experiência consistente para o usuário?
6. De que forma você estruturaria a comunicação com a API (incluindo versionamento de endpoints) e trataria erros de forma a manter a robustez da aplicação?

Obs: Forneça apenas respostas textuais; não é necessário implementar as perguntas acima.

