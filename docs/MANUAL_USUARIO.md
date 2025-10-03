# 📖 Manual do Usuário - Artestofados Bot

## 🎯 Bem-vindo!

Este é o manual completo para usar o Chatbot WhatsApp da Artestofados.

---

## 🚀 Iniciando o Bot

### 1. Abrir a Aplicação

- Clique duas vezes no atalho "Artestofados Bot" na área de trabalho
- Ou abra pelo Menu Iniciar (Windows)

### 2. Conectar ao WhatsApp

1. Clique no botão **"📱 Conectar WhatsApp"**
2. Aguarde o QR Code aparecer (5-10 segundos)
3. No seu celular:
   - Abra o WhatsApp
   - Toque nos três pontos (⋮) no canto superior direito
   - Selecione "Aparelhos conectados"
   - Toque em "Conectar um aparelho"
   - Aponte a câmera para o QR Code na tela
4. Aguarde a mensagem: **"🟢 Conectado"**

### 3. Ativar o Bot

- Clique no botão **"▶️ Iniciar Bot"**
- O status mudará para: **"🟢 Conectado - Bot Ativo"**
- Pronto! O bot já está atendendo clientes automaticamente

---

## ⏯️ Controles do Bot

### ▶️ Iniciar Bot (Play)
- **Quando usar:** Para ativar o atendimento automático
- **O que acontece:** Bot começa a responder mensagens automaticamente
- **Indicador:** Status fica verde

### ⏸️ Pausar Bot
- **Quando usar:** 
  - Durante almoço/intervalos
  - Quando precisar atender manualmente
  - Para manutenção
- **O que acontece:** Bot para de responder, mas continua conectado
- **Indicador:** Status fica amarelo
- **Importante:** Você continua online no WhatsApp

### 🔌 Desconectar
- **Quando usar:**
  - Fim do expediente
  - Quando não usar por muito tempo
  - Para trocar de conta
- **O que acontece:** 
  - Desconecta do WhatsApp
  - Salva todos os dados automaticamente
  - Precisará escanear QR Code novamente
- **Importante:** Use apenas quando realmente quiser sair

### 💾 Salvar Dados
- **Quando usar:** 
  - Ao final do dia
  - Antes de desconectar
  - Quando quiser fazer backup
- **O que acontece:**
  - Cria arquivo Excel com todos os atendimentos
  - Salva em: `Documentos/Artestofados_Atendimentos.xlsx`
- **Dica:** Faça isso diariamente!

---

## 💬 Como o Bot Funciona

### Fluxo de Atendimento Automático

O bot segue estas etapas com cada cliente:

**1. Saudação** 👋
```
Bot: Olá! Bem-vindo à Artestofados!
     Para começar, qual é o seu nome?
```

**2. Nome do Cliente**
```
Cliente: João Silva
Bot: Prazer, João Silva! Como podemos ajudá-lo?
     1️⃣ Fabricar um estofado novo
     2️⃣ Reformar um estofado existente
```

**3. Tipo de Serviço**

*Se escolher FABRICAÇÃO:*
```
Bot: Que tipo de estofado você gostaria?
     1️⃣ Sofá  2️⃣ Cadeira  3️⃣ Poltrona  4️⃣ Cama
```

*Se escolher REFORMA:*
```
Bot: Envie uma foto do estofado para avaliarmos! 📸
```

**4. Projeto**
```
Bot: Você já tem um projeto definido?
     1️⃣ Já tenho um projeto
     2️⃣ Quero ajuda para decidir
```

**5. Tipo de Atendimento**
```
Bot: Como prefere continuar?
     1️⃣ Reunião online
     2️⃣ Visitar nossa loja
```

**6. Dados de Contato**
```
Bot: Qual o melhor número de contato?
Cliente: 83999887766
```

**7. Agendamento**
```
Bot: Qual data você prefere? (DD/MM/AAAA)
Cliente: 15/12/2024

Bot: E qual horário? (HH:MM)
Cliente: 14:30
```

**8. Confirmação** ✅
```
Bot: Perfeito! Agendamento confirmado:
     📅 Data: 15/12/2024
     ⏰ Horário: 14:30
     
     Obrigado por escolher a Artestofados! 🛋️
```

---

## 📊 Monitoramento

### Painel de Estatísticas

Na interface você verá:

- **Total de Atendimentos:** Contador desde que abriu o app
- **Atendimentos Hoje:** Contador do dia atual
- **Log de Atividades:** Todas as ações em tempo real

### Interpretando o Log

```
[14:30:25] 📥 Mensagem de +55839988...
[14:30:26] 📤 Enviando saudação
[14:30:45] ✓ Atendimento concluído: João - 15/12/2024 14:30
[14:30:46] 📅 Evento criado no Google Calendar
```

**Símbolos:**
- 📥 = Mensagem recebida
- 📤 = Mensagem enviada
- ✓ = Ação concluída
- ❌ = Erro
- ⚠️ = Aviso
- 📅 = Evento no calendário
- 💾 = Dados salvos

---

## 📋 Dados Coletados

Cada atendimento salva:

| Campo | Exemplo | Descrição |
|-------|---------|-----------|
| Data/Hora | 15/12/2024 14:30 | Quando começou o atendimento |
| Nome | João Silva | Nome do cliente |
| Telefone WhatsApp | +55839988... | Número usado no WhatsApp |
| Contato | 83999887766 | Número adicional fornecido |
| Serviço | Fabricação | Tipo de serviço |
| Tipo de Produto | Sofá | O que será feito |
| Tem Projeto | Sim | Se já tem projeto definido |
| Tipo de Atendimento | Online | Reunião ou visita |
| Data Agendamento | 15/12/2024 | Data marcada |
| Hora Agendamento | 14:30 | Horário marcado |

---

## 📅 Integração com Google Calendar

### Eventos Criados Automaticamente

Para cada agendamento, o bot cria:

**Título:** Fabricação - João Silva  
**Descrição:**
```
Cliente: João Silva
Telefone: 83999887766
Serviço: Fabricação
Tipo: Sofá
Tem projeto: Sim
Tipo de atendimento: Online
```

**Lembretes:**
- 📧 Email: 1 dia antes
- 🔔 Notificação: 30 minutos antes

### Verificar Eventos

1. Abra: https://calendar.google.com
2. Os eventos aparecerão na data/hora agendadas
3. Você receberá lembretes automáticos

---

## ⚠️ Situações Especiais

### Cliente Desiste no Meio

- **O que fazer:** Nada! O bot continua aguardando
- **Tempo limite:** 30 minutos de inatividade
- **Depois:** Conversa é resetada automaticamente

### Cliente Envia Resposta Errada

O bot solicitará novamente:
```
Bot: Por favor, digite 1 ou 2.
```

### Cliente Quer Recomeçar

Cliente pode digitar:
- "OI"
- "MENU"  
- "REINICIAR"

O bot recomeçará do zero.

### Múltiplos Clientes Simultâneos

- ✅ O bot gerencia várias conversas ao mesmo tempo
- ✅ Cada cliente tem sua própria conversa independente
- ✅ Não há limite de atendimentos simultâneos

---

## 🔧 Manutenção Diária

### Checklist Matinal ☀️

- [ ] Abrir aplicação
- [ ] Verificar se está conectado (pode já estar!)
- [ ] Clicar em "Iniciar Bot"
- [ ] Verificar log de atividades

### Checklist Noturno 🌙

- [ ] Clicar em "Pausar Bot"
- [ ] Clicar em "Salvar Dados"
- [ ] Verificar Excel gerado
- [ ] (Opcional) Clicar em "Desconectar"

### Checklist Semanal 📅

- [ ] Fazer backup do Excel
- [ ] Verificar eventos no Google Calendar
- [ ] Limpar dados antigos se necessário
- [ ] Verificar se há atualizações

---

## 💾 Backup de Dados

### Automático

- Dados são salvos ao desconectar
- Eventos vão direto pro Google Calendar

### Manual

1. Clique em "Salvar Dados"
2. Vá em: `Documentos/`
3. Copie: `Artestofados_Atendimentos.xlsx`
4. Cole em pasta segura (Google Drive, OneDrive, etc)

### Recuperar Dados

Se perder dados:
- ✅ Google Calendar mantém os eventos
- ✅ Backup manual (se fez)
- ❌ Dados não salvos são perdidos

---

## 🆘 Solução de Problemas

### QR Code Não Aparece

**Sintoma:** Botão conectar clicado mas nada acontece

**Soluções:**
1. Aguarde 30 segundos
2. Feche e abra o app novamente
3. Verifique sua internet
4. Desative antivírus temporariamente
5. Execute como administrador

### Bot Não Responde

**Sintoma:** Mensagens chegam mas bot não responde

**Verificações:**
1. Status está verde? (Ativo)
2. Log mostra "📥 Mensagem recebida"?
3. Clique em "Pausar" e "Iniciar" novamente

### Eventos Não Aparecem no Calendar

**Sintoma:** Atendimento completo mas sem evento

**Soluções:**
1. Verifique sua conta Google no navegador
2. Aguarde 1-2 minutos (sincronização)
3. Veja o log: aparece "📅 Evento criado"?
4. Execute o teste: `npm run test-calendar`

### Excel Não É Gerado

**Sintoma:** Clica em salvar mas nada acontece

**Soluções:**
1. Verifique se tem atendimentos concluídos
2. Vá em `Documentos/` e busque o arquivo
3. Feche o Excel se estiver aberto
4. Execute o app como administrador

### Desconectou Sozinho

**Sintoma:** Status ficou vermelho do nada

**Causas comuns:**
- Internet caiu
- WhatsApp desconectou no celular
- Bateria do celular acabou
- Outro aparelho conectou

**Solução:** Conecte novamente

---

## 📞 Dicas e Boas Práticas

### ✅ Faça

- Mantenha o app aberto durante expediente
- Salve dados diariamente
- Verifique o log regularmente
- Faça backup semanal
- Mantenha internet estável
- Use "Pausar" nos intervalos

### ❌ Não Faça

- Não feche o app sem salvar
- Não desconecte sem necessidade
- Não delete arquivos da sessão
- Não use múltiplas contas
- Não ignore os avisos do log

---

## 🎓 Perguntas Frequentes

**P: Preciso manter o celular conectado?**  
R: Não! Após escanear o QR Code, o celular pode ser usado normalmente.

**P: Posso usar o WhatsApp normal?**  
R: Sim! O bot só responde mensagens que receber. Você pode usar normalmente.

**P: O bot responde grupos?**  
R: Não. Apenas mensagens diretas (conversas privadas).

**P: Posso personalizar as mensagens?**  
R: Sim! Edite o arquivo `config.js` (requer conhecimento técnico).

**P: Quantos clientes o bot atende por vez?**  
R: Ilimitado! Cada conversa é independente.

**P: O cliente pode enviar mensagens de voz?**  
R: O bot receberá mas não processará. Funciona apenas com texto.

**P: E se o cliente enviar foto sem texto?**  
R: No momento da reforma, o bot aceita. Fora disso, solicitará texto.

**P: Posso usar em outro computador?**  
R: Sim! Instale o app e conecte novamente. Uma sessão por vez.

**P: Os dados são seguros?**  
R: Sim! Ficam apenas no seu computador. Não são enviados para nenhum servidor externo.

---

## 📱 Contato e Suporte

Para dúvidas técnicas:
1. Consulte este manual
2. Verifique o log de atividades
3. Execute os scripts de teste
4. Consulte o README.md técnico

---

**Desenvolvido com ❤️ para Artestofados**  
**Versão 1.0.0 - 2024**

🛋️ ✨ **Bons atendimentos!** ✨ 🛋️