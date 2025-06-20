# Documentação do App Toledo Extintores

## 1. Objetivo

O aplicativo “Toledo Extintores” foi desenvolvido para facilitar o controle, cadastro, consulta e gestão de extintores de incêndio em empresas ou estabelecimentos. O app permite que usuários autorizados cadastrem, editem, visualizem e monitorem o estoque de extintores, além de alertar sobre validade e fornecer um painel de controle visual.

O objetivo é digitalizar e simplificar o processo de gestão de extintores, tornando-o mais eficiente, seguro e acessível.

## 2. Tecnologias Utilizadas

- React Native (Expo)
- Expo Router
- TypeScript
- React Navigation
- Axios
- Zod
- React Native Chart Kit
- Context API
- EAS Build
- Node.js
- API RESTful (backend)

Essas tecnologias garantem performance, segurança, facilidade de manutenção e uma ótima experiência de usuário.

## 3. Estrutura do Projeto

```
src/
  app/
    _layout.tsx           // Configuração de rotas e navegação
    SplashScreen.tsx      // Tela de splash (abertura)
    index.tsx             // Tela de login
    CadastroUsuario.tsx   // Cadastro de novos usuários
    ListaExtintor.tsx     // Listagem de extintores
    extintorDetalhe.tsx   // Detalhes de um extintor
    EditarExtintor.tsx    // Edição de extintor
    EstoqueExtintor.tsx   // Controle de estoque por classe
    DashboardExtintor.tsx // Dashboard com gráficos
    profile.tsx           // Perfil do usuário
    tabsBar.tsx           // Barra de navegação inferior
    components/
      extintor.tsx        // Cadastro de extintor
    contexts/
      authContext.tsx     // Contexto de autenticação
    libs/
      axios.ts            // Instância do Axios
  hooks/
    useAuth.ts            // Hook de autenticação
    useCrud.ts            // Hook CRUD para extintores
    useUserAuth.ts        // Funções de autenticação de usuário
```

A estrutura foi pensada para separar responsabilidades e facilitar a manutenção.

## 4. Fluxo de Uso

### 4.1 SplashScreen

- Tela inicial com logo e nome do app.
- Após alguns segundos, redireciona para a tela de login.

### 4.2 Login

- Usuário insere email e senha.
- Validação dos dados.
- Se autenticado, navegação para o app principal (Tabs).
- Possibilidade de cadastrar novo usuário.

### 4.3 Cadastro de Usuário

- Formulário para nome, email e senha.
- Validação dos campos.
- Retorna para login após cadastro.

### 4.4 Navegação Principal (Tabs)

- **Extintores**: Lista todos os extintores cadastrados, com busca e alerta de vencidos.
- **Cadastrar**: Tela para cadastrar novo extintor.
- **Perfil**: Visualização e edição dos dados do usuário.
- **Dashboard**: Gráficos de quantidade por classe de extintor.
- **Sair**: Logout do app.

### 4.5 Detalhes e Edição

- Ao clicar em um extintor, exibe detalhes, com opções de editar ou excluir.
- Edição permite alterar dados do extintor.

### 4.6 Estoque

- Visualização do estoque agrupado por classe.
- Permite registrar entrada e saída de extintores.

## 5. Funcionalidades Principais

- Autenticação de Usuário: Login, cadastro e logout.
- Cadastro e Edição de Extintores: Inclusão, alteração e exclusão.
- Listagem e Busca: Filtro por nome ou classe.
- Alerta de Vencimento: Notificação de extintores vencidos.
- Dashboard: Gráficos de quantidade por classe.
- Controle de Estoque: Movimentação de entrada e saída.
- Perfil do Usuário: Visualização e edição de dados pessoais.
- Navegação segura: Reset de histórico após login/logout para evitar travamentos.
- Interface responsiva e moderna.
- Validação de dados em todos os formulários.
- Alertas e feedbacks visuais para o usuário.

## 6. Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute o app:
   ```bash
   npx expo start
   ```
3. Para gerar APK:
   ```bash
   eas build -p android --profile preview
   ```

> É necessário ter Node.js, Expo CLI e EAS CLI instalados.
> O APK gerado pode ser instalado diretamente em dispositivos Android.

**Dica:** Use o Expo Go para testar rapidamente durante o desenvolvimento.

## 7. Considerações Finais

O app foi desenvolvido visando praticidade, segurança e facilidade de uso, com interface moderna e responsiva. O fluxo de navegação foi ajustado para evitar travamentos e garantir uma boa experiência ao usuário.

O projeto pode ser expandido para incluir:

- Notificações push para extintores vencidos.
- Exportação de relatórios.
- Multiusuário com diferentes permissões.
- Integração com outros sistemas de gestão.

Dúvidas ou sugestões? Entre em contato com o desenvolvedor.

## 8. Screenshots

Adicione aqui prints das principais telas do app para facilitar a apresentação.

- SplashScreen
- Login
- Cadastro de Usuário
- Lista de Extintores
- Cadastro/Edição de Extintor
- Dashboard
- Perfil do Usuário

> Para adicionar imagens, salve-as na pasta `docs/screenshots` e referencie aqui:
> ![SplashScreen](./screenshots/splash.png)

## 9. FAQ

**1. O app funciona offline?**

- Não, é necessário conexão com a internet para acessar e atualizar os dados.

**2. Como cadastrar um novo usuário?**

- Na tela de login, clique em "Cadastrar Usuário" e preencha os dados.

**3. Como gerar o APK?**

- Siga as instruções em Como Executar.

**4. O app pode ser usado em iOS?**

- O projeto é compatível, mas o build e publicação para iOS exigem conta Apple Developer.

**5. Como restaurar a senha?**

- No momento, a recuperação de senha não está implementada.

**6. Como expandir o app?**

- Veja sugestões em Considerações Finais.
