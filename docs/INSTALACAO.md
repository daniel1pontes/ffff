# 📦 Guia Completo de Instalação - Artestofados Bot

## 🎯 Instalação Rápida (5 minutos)

### 1️⃣ Instalar Node.js

**Windows:**
1. Baixe em: https://nodejs.org/
2. Escolha versão LTS (recomendada)
3. Execute o instalador
4. Clique em "Next" até finalizar
5. Reinicie o computador

**Verificar instalação:**
```bash
node --version
npm --version
```

### 2️⃣ Baixar o Projeto

Extraia o arquivo ZIP do projeto em uma pasta de sua preferência.

### 3️⃣ Instalar Dependências

Abra o Terminal/CMD na pasta do projeto e execute:

```bash
npm install
```

Aguarde alguns minutos para baixar todas as bibliotecas.

### 4️⃣ Configurar Google Calendar (IMPORTANTE)

#### A) Criar Projeto no Google Cloud

1. Acesse: https://console.cloud.google.com/
2. Faça login com sua conta Google
3. Clique em "Selecionar projeto" > "Novo projeto"
4. Nome: "Artestofados Bot"
5. Clique em "Criar"

#### B) Ativar Google Calendar API

1. No menu lateral: "APIs e Serviços" > "Biblioteca"
2. Pesquise: "Google Calendar API"
3. Clique nela e depois em "Ativar"

#### C) Criar Service Account

1. Menu: "APIs e Serviços" > "Credenciais"
2. Clique: "Criar credenciais" > "Conta de serviço"
3. Nome: "artestofados-bot"
4. Clique: "Criar e continuar"
5. Função: Selecione "Editor" ou "Proprietário"
6. Clique: "Concluir"

#### D) Baixar Credenciais JSON

1. Clique na conta de serviço criada
2. Aba "Chaves" > "Adicionar chave" > "Criar nova chave"
3. Tipo: JSON
4. Clique "Criar"
5. Arquivo será baixado automaticamente
6. **RENOMEIE** para: `google-credentials.json`
7. **MOVA** para a pasta raiz do projeto

#### E) Compartilhar Calendário

1. Abra: https://calendar.google.com/
2. Clique nas configurações do seu calendário (⚙️)
3. "Configurações de compartilhamento"
4. "Adicionar pessoas"
5. Cole o email da service account (está no arquivo JSON, campo "client_email")
6. Permissão: "Fazer alterações nos eventos"
7. Clique "Enviar"

### 5️⃣ Criar Ícones da Aplicação

Crie uma pasta `assets/` na raiz do projeto e adicione:
- `icon.ico` (Windows) - 256x256px
- `icon.icns` (macOS) - 512x512px  
- `icon.png` (Linux) - 512x512px

**Dica:** Use um conversor online como https://convertio.co/

### 6️⃣ Testar a Aplicação

```bash
npm start
```

A aplicação deve abrir. Teste:
1. Conectar WhatsApp
2. Escanear QR Code
3. Iniciar Bot
4. Enviar uma mensagem de teste

### 7️⃣ Gerar Executável Final

**Para Windows:**
```bash
npm run build-win
```

**Para macOS:**
```bash
npm run build-mac
```

**Para Linux:**
```bash
npm run build-linux
```

O instalador será criado em: `dist/`

### 8️⃣ Instalar no Computador

1. Vá na pasta `dist/`
2. Execute o instalador
3. Siga as instruções
4. Atalho será criado na área de trabalho

## ✅ Checklist Pós-Instalação

- [ ] Node.js instalado e funcionando
- [ ] Dependências instaladas (`node_modules/` existe)
- [ ] `google-credentials.json` na raiz do projeto
- [ ] Calendário compartilhado com service account
- [ ] Ícones criados na pasta `assets/`
- [ ] Aplicação abre com `npm start`
- [ ] QR Code aparece ao clicar em "Conectar"
- [ ] Bot responde mensagens de teste
- [ ] Excel é gerado ao clicar em "Salvar Dados"
- [ ] Eventos aparecem no Google Calendar
- [ ] Executável gerado com sucesso

## 🆘 Problemas Comuns

### "npm não é reconhecido"
**Solução:** Node.js não foi instalado corretamente. Reinstale.

### "Erro ao instalar dependências"
**Solução:** 
```bash
npm cache clean --force
npm install
```

### "google-credentials.json não encontrado"
**Solução:** Verifique se o arquivo está na raiz do projeto (mesma pasta do package.json)

### "QR Code não aparece"
**Solução:** 
- Verifique sua internet
- Desative antivírus temporariamente
- Execute como administrador

### "Eventos não aparecem no Calendar"
**Solução:**
- Verifique o email no arquivo JSON
- Confirme que o calendário está compartilhado
- Teste manualmente a API no Google Cloud Console

### "Erro ao gerar executável"
**Solução:**
```bash
npm install electron-builder --save-dev
npm run build-win
```

## 🔄 Atualização da Aplicação

Para atualizar o bot:

1. Substitua os arquivos do projeto
2. Execute: `npm install` (caso tenha novas dependências)
3. Gere novo executável: `npm run build-win`
4. Instale a nova versão

## 🎓 Vídeos Tutoriais Recomendados

- **Node.js para iniciantes:** YouTube - "Como instalar Node.js"
- **Google Cloud Console:** YouTube - "Google Calendar API tutorial"
- **Electron Build:** YouTube - "Como criar executável Electron"

## 📞 Precisa de Ajuda?

1. Consulte o README.md
2. Verifique o log da aplicação
3. Pesquise o erro no Google
4. Verifique a documentação oficial das bibliotecas

---

**Pronto! 🎉 Seu bot está instalado e funcionando!**