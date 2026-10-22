# Nina Mural 🎨

**Nina Mural** é uma aplicação web de mural virtual onde usuários podem deixar recados anônimos para o mundo. A proposta é espalhar positividade através de mensagens curtas exibidas em um layout visual inspirado em post-its coloridos.

## Funcionalidades

- **Criar recados**: Envie mensagens de até 280 caracteres
- **Visualizar mural**: Veja todas as mensagens em um grid responsivo com cards coloridos
- **Excluir recados**: Remova mensagens do mural
- **Animações fluidas**: Transições suaves ao adicionar/remover mensagens
- **Design responsivo**: Funciona em dispositivos móveis e desktop

## Stack Tecnológica

### Frontend
- **React 18** com TypeScript
- **Vite** para bundling e desenvolvimento
- **Tailwind CSS** para estilização
- **Radix UI** para componentes acessíveis
- **Framer Motion** para animações
- **TanStack Query** (React Query) para gerenciamento de estado do servidor
- **Wouter** para roteamento
- **date-fns** para formatação de datas

### Backend
- **Node.js** com **Express**
- **PostgreSQL** como banco de dados
- **Drizzle ORM** para acesso ao banco de dados
- **Zod** para validação de schemas

## Estrutura de Pastas

```
├── client/                 # Código do frontend
│   ├── public/             # Arquivos estáticos (favicon)
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   └── ui/         # Componentes de UI (shadcn/ui)
│   │   ├── hooks/          # Hooks customizados
│   │   ├── lib/            # Utilitários e configurações
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── App.tsx         # Componente raiz
│   │   ├── main.tsx        # Ponto de entrada
│   │   └── index.css       # Estilos globais
│   └── index.html          # Template HTML
├── server/                 # Código do backend
│   ├── db.ts               # Conexão com banco de dados
│   ├── index.ts            # Ponto de entrada do servidor
│   ├── routes.ts           # Rotas da API
│   ├── static.ts           # Servir arquivos estáticos
│   ├── storage.ts          # Camada de acesso a dados
│   └── vite.ts             # Integração com Vite (dev)
├── shared/                 # Código compartilhado
│   ├── routes.ts           # Definições de rotas da API
│   └── schema.ts           # Schema do banco (Drizzle)
├── script/
│   └── build.ts            # Script de build
├── drizzle.config.ts       # Configuração do Drizzle Kit
├── tailwind.config.ts      # Configuração do Tailwind
├── vite.config.ts          # Configuração do Vite
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts
```

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a variável de ambiente (veja seção abaixo)

4. Execute as migrações do banco de dados:
   ```bash
   npm run db:push
   ```

## Variáveis de Ambiente

| Variável       | Descrição                              |
|----------------|----------------------------------------|
| `DATABASE_URL` | URL de conexão com o PostgreSQL        |
| `PORT`         | Porta do servidor (padrão: 5000)       |

## Como Executar

### Desenvolvimento

```bash
npm run dev
```

O servidor iniciará na porta configurada (padrão: 5000) e servirá tanto a API quanto o frontend com hot-reload.

### Produção

```bash
npm run build
npm start
```

### Verificação de tipos

```bash
npm run check
```

## API

| Método   | Endpoint            | Descrição                   |
|----------|---------------------|-----------------------------|
| `GET`    | `/api/messages`     | Lista todas as mensagens    |
| `POST`   | `/api/messages`     | Cria uma nova mensagem      |
| `DELETE` | `/api/messages/:id` | Remove uma mensagem por ID  |

## Licença

MIT
