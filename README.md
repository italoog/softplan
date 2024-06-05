```markdown
# Softplan - Sistema de Gerenciamento de Usuários

Este projeto é um sistema de gerenciamento de usuários desenvolvido com Next.js,
React, TypeScript e várias outras bibliotecas.
Ele permite aos administradores adicionar, editar, pesquisar e deletar usuários,
bem como aos usuários se autenticarem e visualizarem informações do sistema.

## Estrutura do Projeto

### Principais Diretórios e Arquivos

- `pages/`: Contém as páginas do Next.js.
- `components/`: Contém componentes reutilizáveis, como `LoginCard`, `RegistrationForm`, `AddUser`, `User`, e `Search`.
- `hooks/`: Contém hooks personalizados, como `useAuth` para gerenciamento de autenticação.
- `services/`: Contém a configuração do Axios para fazer chamadas à API.
- `styles/`: Contém módulos CSS para estilização dos componentes.
- `server.js`: Servidor JSON Server configurado para simular uma API RESTful.

### Principais Bibliotecas Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **React Hook Form**: Biblioteca para gerenciamento de formulários.
- **Yup**: Biblioteca para validação de schemas.
- **Axios**: Cliente HTTP para fazer requisições.
- **React Toastify**: Biblioteca para exibição de notificações.
- **JSON Server**: Ferramenta para criar uma API RESTful fake rapidamente.
- **JSON Server Auth**: Middleware para adicionar autenticação ao JSON Server.
- **Concurrently**: Executa múltiplos comandos simultaneamente.

## Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento do Next.js e o JSON Server simultaneamente.
- `build`: Compila a aplicação Next.js para produção.
- `start`: Inicia a aplicação Next.js e o JSON Server em produção.
- `lint`: Executa o linter do Next.js.
- `start:json-server`: Inicia o JSON Server isoladamente.

## Como Executar o Projeto

### Pré-requisitos

- Node.js e npm ou yarn instalados na máquina.

### Instalação
```
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/softplan.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd softplan
   ```
3. Instale as dependências:
   ```bash
   yarn install
   ```

### Executar em Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:
```bash
yarn dev
```

Isso iniciará tanto o servidor Next.js quanto o JSON Server.

### Compilar e Iniciar em Produção

Para compilar a aplicação para produção, execute:
```bash
yarn build
```

Para iniciar o servidor em produção, execute:
```bash
yarn start
```

### Configuração do JSON Server

O JSON Server está configurado no arquivo `server.js` e os dados de usuários são armazenados em `./mock/db.json`. O JSON Server Auth é utilizado para adicionar autenticação básica à API.

#### Usuários Padrão

O arquivo `db.json` contém os seguintes usuários padrão:

1. **Usuário Comum**
   - **Email**: italo@softpan.com
   - **Senha**: 123456
   - **Nome**: Italo Gomes
   - **Tipo**: USER
   - **ID**: 1

2. **Administrador**
   - **Email**: admin@softpan.com
   - **Senha**: root
   - **Nome**: admin
   - **Tipo**: ADMIN
   - **ID**: 2

## Vídeo de Demonstração

Confira o vídeo abaixo para ver o sistema em funcionamento:

[Demonstração do Sistema](https://www.youtube.com/watch?v=ifu4y1VXB3M)



## Decisões Tomadas

1. **Next.js como Framework Principal**: Utilizado para facilitar a construção de aplicações React com renderização do lado do servidor e geração de sites estáticos.
2. **TypeScript para Tipagem**: Escolhido para garantir maior robustez e qualidade de código.
3. **React Hook Form e Yup para Formulários**: Utilizados para simplificar o gerenciamento de formulários e validação de dados.
4. **Axios para Requisições HTTP**: Utilizado por sua simplicidade e flexibilidade na realização de chamadas à API.
5. **JSON Server para API Fake**: Escolhido para simular rapidamente uma API RESTful durante o desenvolvimento.
6. **React Toastify para Notificações**: Utilizado para fornecer feedback visual ao usuário de forma clara e estilizada.

## Autenticação

O hook `useAuth` é utilizado para gerenciar a autenticação dos usuários. Ele fornece métodos para login, logout e verificação do tipo de usuário (admin ou user).

## Componentes Principais

- **LoginCard**: Formulário de login.
- **RegistrationForm**: Formulário para adicionar ou editar usuários.
- **AddUser**: Componente para adicionar usuários, visível apenas para administradores.
- **User**: Componente que exibe as informações de um usuário e permite editar ou deletar, se o usuário for um administrador.
- **Search**: Componente para pesquisar usuários por email.

## Licença

Este projeto está licenciado sob a MIT License.
```
---
Desenvolvido com 💜+☕ por Italo Gomes.
