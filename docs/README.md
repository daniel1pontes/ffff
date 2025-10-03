# 🛋️ Artestofados WhatsApp Bot

Chatbot automático para WhatsApp desenvolvido para a empresa Artestofados, especializada em fabricação e reforma de estofados.

## 📋 Funcionalidades

- ✅ **Conexão com WhatsApp Web** via QR Code
- ✅ **Atendimento automatizado** 24/7
- ✅ **Coleta de informações**: nome, contato, necessidades, agendamentos
- ✅ **Fluxo inteligente** diferenciando fabricação e reforma
- ✅ **Agendamento de reuniões** online ou presenciais
- ✅ **Integração com Google Calendar**
- ✅ **Exportação de dados** para Excel
- ✅ **Interface desktop** com controles Play/Pause
- ✅ **Atalho na área de trabalho**

## 🚀 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- Conta Google com acesso ao Google Calendar API

### Passo 1: Clone ou baixe o projeto

### Passo 2: Instale as dependências
```bash
npm install
```

### Passo 3: Configure o Google Calendar API

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Calendar API**
4. Crie uma conta de serviço (Service Account):
   - Vá em "IAM & Admin" > "Service Accounts"
   - Clique em "Create Service Account"
   - Dê um nome (ex: "artestofados-bot")
   - Clique em "Create and Continue"
   - Adicione a role "Editor" ou "Calendar Owner"
   - Clique em "Done"
5. Gere as credenciais:
   - Clique na conta de serviço criada
   - Vá em "Keys" > "Add Key" > "Create new key"
   - Escolha "JSON" e clique em "Create"
   - Salve o arquivo baixado como `google-credentials.json` na raiz do projeto
6. Configure o calendário:
   - Abra seu Google Calendar
   - Clique em "Configurações" > "Configurações de compartilhamento" do calendário
   - Adicione o email da service account (encontrado no arquivo JSON)
   - Dê permissão de "Fazer alterações nos eventos"

### Passo 4: Execute a aplicação

**Modo desenvolvimento:**
```bash
npm start
```

**Gerar executável:**
```bash
# Windows
npm run build-win

# macOS
npm run build-mac

# Linux
npm run build-linux
```

O instalador será criado na pasta `dist/` e incluirá atalho para área de trabalho.

## 📱 Como usar

1. **Abra a aplicação** através do atalho na área de trabalho
2. **Clique em "Conectar WhatsApp"**
3. **Escaneie o QR Code** com seu WhatsApp (opção WhatsApp Web)
4. **Clique em "Iniciar Bot"** para ativar o atendimento automático
5. **Use "Pausar"** quando precisar interromper temporariamente
6. **Clique em "Salvar Dados"** para exportar atendimentos para Excel
7. **Desconecte** ao final do expediente (a sessão será mantida)

## 🤖 Fluxo de Atendimento

O bot segue este fluxo conversacional:

1. **Saudação** → Coleta nome do cliente
2. **Tipo de serviço** → Fabricação ou Reforma
3. **Detalhes do produto** → Tipo de estofado ou foto (reforma)
4. **Projeto** → Cliente tem projeto ou precisa de ajuda
5. **Agendamento** → Reunião online ou visita presencial
6. **Contato** → Número de telefone
7. **Data e Hora** → Agendamento do atendimento
8. **Confirmação** → Resumo e criação automática no Google Calendar

## 📊 Dados Coletados

Cada atendimento salva:
- Data/Hora do primeiro contato
- Nome do cliente
- Telefone WhatsApp
- Contato adicional
- Tipo de serviço (Fabricação/Reforma)
- Tipo de produto (Sofá, Cadeira, Poltrona, Cama, etc)
- Tem projeto definido (Sim/Não)
- Tipo de atendimento (Online/Presencial)
- Data do agendamento
- Hora do agendamento

Os dados são salvos em: `Documentos/Artestofados_Atendimentos.xlsx`

## 🔧 Estrutura do Projeto

```
artestofados-whatsapp-bot/
│
├── main.js                    # Backend Electron + WhatsApp
├── preload.js                 # Bridge segura entre frontend e backend
├── index.html                 # Interface da aplicação
├── package.json               # Configurações e dependências
├── google-credentials.json    # Credenciais Google Calendar (criar)
│
├── assets/
│   ├── icon.ico              # Ícone Windows (criar)
│   ├── icon.icns             # Ícone macOS (criar)
│   └── icon.png              # Ícone Linux (criar)
│
└── README.md                  # Este arquivo
```

## ⚙️ Tecnologias Utilizadas

- **Electron** - Framework desktop multiplataforma
- **whatsapp-web.js** - Conexão com WhatsApp Web
- **XLSX** - Exportação de dados para Excel
- **Google APIs** - Integração com Google Calendar
- **QRCode** - Geração de QR Code para autenticação
- **Electron Store** - Armazenamento de configurações

## 🛡️ Segurança

- ⚠️ **NUNCA compartilhe** o arquivo `google-credentials.json`
- ⚠️ **NUNCA faça commit** das credenciais no Git
- ✅ A sessão do WhatsApp fica armazenada localmente e criptografada
- ✅ Os dados dos clientes ficam apenas no seu computador

## 📝 Notas Importantes

1. **Primeira conexão**: Na primeira vez, será necessário escanear o QR Code
2. **Sessão persistente**: A sessão permanece ativa mesmo após fechar o app
3. **Múltiplos atendimentos**: O bot consegue gerenciar várias conversas simultâneas
4. **Pause/Play**: Use para manutenção sem desconectar
5. **Backup**: Os dados Excel são salvos em Documentos

## 🐛 Solução de Problemas

**QR Code não aparece:**
- Verifique sua conexão com internet
- Reinicie a aplicação
- Limpe os dados da sessão em: `AppData/Roaming/artestofados-whatsapp-bot/whatsapp-session/`

**Erro no Google Calendar:**
- Verifique se o arquivo `google-credentials.json` está correto
- Confirme que a API está ativada no Google Cloud
- Verifique se o email da service account tem permissão no calendário

**Bot não responde:**
- Certifique-se de que está em modo "Play" (verde)
- Verifique o log na parte inferior da aplicação
- Teste enviando "OI" para reiniciar a conversa

## 📞 Suporte

Para dúvidas ou problemas:
- Consulte o log na aplicação
- Verifique os arquivos de sessão em AppData
- Teste a conexão do WhatsApp Web manualmente

## 📄 Licença

Este projeto foi desenvolvido especificamente para Artestofados.

---

**Desenvolvido com ❤️ para Artestofados** 🛋️