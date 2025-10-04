const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');
const XLSX = require('xlsx');
const { google } = require('googleapis');
const Store = require('electron-store');
const fs = require('fs');

const store = new Store();
let mainWindow;
let whatsappClient;
let botActive = false;
let conversations = {};
let clientData = [];

// Criar janela principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 950,
    icon: path.join(__dirname, 'assets', 'b2.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    resizable: false,
    autoHideMenuBar: true
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (whatsappClient) {
      whatsappClient.destroy();
    }
    app.quit();
  }
});

// Conectar WhatsApp
ipcMain.on('connect-whatsapp', async (event) => {
  try {
    event.reply('log', 'Iniciando conexão com WhatsApp...');
    
    whatsappClient = new Client({
      authStrategy: new LocalAuth({
        dataPath: path.join(app.getPath('userData'), 'whatsapp-session')
      }),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-software-rasterizer'
        ]
      }
    });

    // QR Code
    whatsappClient.on('qr', async (qr) => {
      try {
        const qrDataUrl = await QRCode.toDataURL(qr);
        event.reply('qr-received', qrDataUrl);
        event.reply('log', 'QR Code gerado. Escaneie com seu WhatsApp.');
      } catch (error) {
        event.reply('log', `❌ Erro ao gerar QR Code: ${error.message}`);
      }
    });

    // Autenticado
    whatsappClient.on('authenticated', () => {
      event.reply('log', '✓ WhatsApp autenticado! Aguardando conexão...');
    });

    // Pronto para usar
    whatsappClient.on('ready', () => {
      event.reply('whatsapp-connected');
      event.reply('log', '✅ WhatsApp conectado e pronto para uso!');
    });

    // Falha na autenticação
    whatsappClient.on('auth_failure', (msg) => {
      event.reply('log', `❌ Falha na autenticação: ${msg}`);
      event.reply('whatsapp-disconnected');
    });

    // Desconectado
    whatsappClient.on('disconnected', (reason) => {
      event.reply('whatsapp-disconnected');
      event.reply('log', `🔌 Desconectado: ${reason}`);
      botActive = false;
    });

    // Loading screen
    whatsappClient.on('loading_screen', (percent, message) => {
      event.reply('log', `Carregando: ${percent}% - ${message}`);
    });

    // Mensagens recebidas
    whatsappClient.on('message', async (message) => {
      if (botActive && !message.fromMe && message.from.endsWith('@c.us')) {
        try {
          await handleIncomingMessage(message, event);
        } catch (error) {
          event.reply('log', `❌ Erro ao processar mensagem: ${error.message}`);
        }
      }
    });

    // Inicializar cliente
    await whatsappClient.initialize();
    
  } catch (error) {
    event.reply('log', `❌ Erro ao conectar: ${error.message}`);
    event.reply('whatsapp-disconnected');
  }
});

// Desconectar WhatsApp
ipcMain.on('disconnect-whatsapp', async (event) => {
  try {
    if (whatsappClient) {
      await whatsappClient.destroy();
      whatsappClient = null;
      botActive = false;
      
      // Salvar dados antes de desconectar
      if (clientData.length > 0) {
        const filePath = saveToExcel();
        if (filePath) {
          event.reply('log', `💾 Dados salvos automaticamente em: ${filePath}`);
        }
      }
      
      event.reply('whatsapp-disconnected');
      event.reply('log', '🔌 Desconectado do WhatsApp');
    }
  } catch (error) {
    event.reply('log', `❌ Erro ao desconectar: ${error.message}`);
  }
});

// Ativar/Pausar Bot
ipcMain.on('toggle-bot', (event, active) => {
  botActive = active;
  if (active) {
    event.reply('log', '✅ Bot iniciado - Pronto para atender clientes');
  } else {
    event.reply('log', '⏸️ Bot pausado');
  }
});

// Processar mensagens recebidas
async function handleIncomingMessage(message, event) {
  const phoneNumber = message.from;
  const messageText = message.body.trim();

  event.reply('log', `📥 Mensagem de ${phoneNumber.substring(0, 15)}...: ${messageText.substring(0, 30)}...`);

  // Verificar palavras de reinício
  const palavrasReinicio = ['oi', 'olá', 'menu', 'início', 'reiniciar', 'começar'];
  if (palavrasReinicio.includes(messageText.toLowerCase())) {
    delete conversations[phoneNumber];
  }

  if (!conversations[phoneNumber]) {
    conversations[phoneNumber] = {
      step: 'greeting',
      data: {
        phone: phoneNumber,
        timestamp: new Date().toISOString()
      }
    };
    
    const greetingMsg = "Olá! 👋 Bem-vindo à *Artestofados*! 🛋️\n\nSomos especializados em fabricação e reforma de estofados.\n\nPara começar, qual é o seu nome?";
    await message.reply(greetingMsg);
    event.reply('log', `📤 Saudação enviada para ${phoneNumber.substring(0, 15)}...`);
    return;
  }

  const conversation = conversations[phoneNumber];
  let response = '';

  switch (conversation.step) {
    case 'greeting':
      conversation.data.name = messageText;
      conversation.step = 'askService';
      response = `Prazer em conhecê-lo, ${messageText}! 😊\n\nComo podemos ajudá-lo hoje?\n\n1️⃣ Fabricar um estofado novo\n2️⃣ Reformar um estofado existente\n\nDigite 1 ou 2:`;
      break;

    case 'askService':
      if (messageText === '1') {
        conversation.data.service = 'Fabricação';
        conversation.step = 'handleFabricar';
        response = "Perfeito! Que tipo de estofado você gostaria de fabricar?\n\n1️⃣ Sofá\n2️⃣ Cadeira\n3️⃣ Poltrona\n4️⃣ Cama\n\nDigite o número:";
      } else if (messageText === '2') {
        conversation.data.service = 'Reforma';
        conversation.step = 'waitPhoto';
        response = "Ótimo! Para avaliarmos melhor, você poderia enviar uma foto do estofado que deseja reformar? 📸\n\n(Ou digite *PULAR* para continuar sem foto)";
      } else {
        response = "Por favor, digite *1* para Fabricação ou *2* para Reforma.";
      }
      break;

    case 'handleFabricar':
      const tipos = ['Sofá', 'Cadeira', 'Poltrona', 'Cama'];
      const tipoIndex = parseInt(messageText) - 1;
      if (tipoIndex >= 0 && tipoIndex < 4) {
        conversation.data.productType = tipos[tipoIndex];
        conversation.step = 'askProject';
        response = "Você já tem um projeto definido ou gostaria de decidir o modelo junto com nossa equipe?\n\n1️⃣ Já tenho um projeto\n2️⃣ Quero ajuda para decidir\n\nDigite 1 ou 2:";
      } else {
        response = "Por favor, digite um número de *1* a *4*.";
      }
      break;

    case 'waitPhoto':
      if (message.hasMedia || messageText.toLowerCase() === 'pular') {
        conversation.data.photo = message.hasMedia ? 'Foto recebida' : 'Sem foto';
        conversation.data.productType = 'Reforma de estofado';
        conversation.step = 'askProject';
        response = message.hasMedia 
          ? "Obrigado pela foto! 📸\n\nVocê já tem um projeto definido ou gostaria de decidir junto com nossa equipe?\n\n1️⃣ Já tenho um projeto\n2️⃣ Quero ajuda para decidir\n\nDigite 1 ou 2:"
          : "Ok! Vamos continuar.\n\nVocê já tem um projeto definido ou gostaria de decidir junto com nossa equipe?\n\n1️⃣ Já tenho um projeto\n2️⃣ Quero ajuda para decidir\n\nDigite 1 ou 2:";
      } else {
        response = "Por favor, envie a *foto* do estofado ou digite *PULAR* para continuar.";
      }
      break;

    case 'askProject':
      if (messageText === '1' || messageText === '2') {
        conversation.data.hasProject = messageText === '1' ? 'Sim' : 'Não';
        conversation.step = 'askMeeting';
        response = "Excelente! Como você prefere continuar?\n\n1️⃣ Agendar reunião online\n2️⃣ Visitar nossa loja\n\nDigite 1 ou 2:";
      } else {
        response = "Por favor, digite *1* ou *2*.";
      }
      break;

    case 'askMeeting':
      if (messageText === '1' || messageText === '2') {
        conversation.data.meetingType = messageText === '1' ? 'Reunião Online' : 'Visita Presencial';
        conversation.step = 'askContact';
        response = "Perfeito! Para finalizar, preciso de algumas informações:\n\nQual o melhor número de contato?\n\n(Digite apenas os números, exemplo: 83999887766)";
      } else {
        response = "Por favor, digite *1* ou *2*.";
      }
      break;

    case 'askContact':
      conversation.data.contact = messageText;
      conversation.step = 'askDate';
      response = "Qual data você prefere para o atendimento?\n\n(Use o formato: DD/MM/AAAA)\n\nExemplo: 15/12/2024";
      break;

    case 'askDate':
      if (isValidDate(messageText)) {
        conversation.data.date = messageText;
        conversation.step = 'askTime';
        response = "E qual horário você prefere?\n\n(Use o formato: HH:MM)\n\nExemplo: 14:30";
      } else {
        response = "Data inválida. Por favor, use o formato *DD/MM/AAAA*\n\nExemplo: 15/12/2024";
      }
      break;

    case 'askTime':
      if (isValidTime(messageText)) {
        conversation.data.time = messageText;
        conversation.step = 'finished';
        
        // Salvar dados do cliente
        clientData.push({ ...conversation.data });
        
        // Criar evento no Google Calendar
        await createCalendarEvent(conversation.data, event);
        
        response = `Perfeito! ✅\n\n*AGENDAMENTO CONFIRMADO*\n\n👤 Nome: ${conversation.data.name}\n📞 Contato: ${conversation.data.contact}\n🛋️ Serviço: ${conversation.data.service}\n📦 Tipo: ${conversation.data.productType}\n📅 Data: ${conversation.data.date}\n⏰ Horário: ${conversation.data.time}\n📍 Tipo: ${conversation.data.meetingType}\n\nEnviaremos uma confirmação e mais detalhes em breve.\n\n*Obrigado por escolher a Artestofados!* 🛋️✨`;
        
        event.reply('log', `✅ Atendimento concluído: ${conversation.data.name} - ${conversation.data.date} ${conversation.data.time}`);
        
        // Limpar conversa após 5 minutos
        setTimeout(() => {
          delete conversations[phoneNumber];
        }, 300000);
      } else {
        response = "Horário inválido. Por favor, use o formato *HH:MM*\n\nExemplo: 14:30";
      }
      break;

    default:
      response = "Desculpe, ocorreu um erro. Vamos começar novamente?\n\nDigite *OI* para reiniciar o atendimento.";
  }

  if (response) {
    await message.reply(response);
    event.reply('log', `📤 Resposta enviada`);
  }
}

// Validar data
function isValidDate(dateString) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;
  
  const [, day, month, year] = dateString.match(regex);
  const date = new Date(year, month - 1, day);
  
  return date.getDate() == day && 
         date.getMonth() == month - 1 && 
         date.getFullYear() == year;
}

// Validar horário
function isValidTime(timeString) {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(timeString);
}

// Salvar dados em Excel
function saveToExcel() {
  try {
    const ws = XLSX.utils.json_to_sheet(clientData.map(client => ({
      'Data/Hora': new Date(client.timestamp).toLocaleString('pt-BR'),
      'Nome': client.name,
      'Telefone WhatsApp': client.phone,
      'Contato': client.contact,
      'Serviço': client.service,
      'Tipo de Produto': client.productType,
      'Tem Projeto': client.hasProject,
      'Tipo de Atendimento': client.meetingType,
      'Data Agendamento': client.date,
      'Hora Agendamento': client.time
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Atendimentos');

    const filePath = path.join(app.getPath('documents'), 'Artestofados_Atendimentos.xlsx');
    XLSX.writeFile(wb, filePath);

    return filePath;
  } catch (error) {
    console.error('Erro ao salvar Excel:', error);
    return null;
  }
}

// Criar evento no Google Calendar
async function createCalendarEvent(data, event) {
  try {
    const credentialsPath = path.join(__dirname, 'google-credentials.json');
    
    if (!fs.existsSync(credentialsPath)) {
      event.reply('log', '⚠️ Google Calendar não configurado (arquivo google-credentials.json não encontrado)');
      return;
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath));
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Converter data e hora
    const [day, month, year] = data.date.split('/');
    const [hour, minute] = data.time.split(':');
    const startDateTime = new Date(year, month - 1, day, hour, minute);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

    const calendarEvent = {
      summary: `${data.service} - ${data.name}`,
      description: `Cliente: ${data.name}\nTelefone: ${data.contact}\nServiço: ${data.service}\nTipo: ${data.productType}\nTem projeto: ${data.hasProject}\nTipo de atendimento: ${data.meetingType}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Sao_Paulo'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Sao_Paulo'
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 }
        ]
      }
    };

    await calendar.events.insert({
      calendarId: 'primary',
      resource: calendarEvent
    });

    event.reply('log', `📅 Evento criado no Google Calendar: ${data.name}`);
  } catch (error) {
    event.reply('log', `⚠️ Não foi possível criar evento no Calendar: ${error.message}`);
  }
}

// Salvar dados manualmente
ipcMain.on('save-data', (event) => {
  if (clientData.length > 0) {
    const filePath = saveToExcel();
    if (filePath) {
      event.reply('log', `💾 Dados salvos em: ${filePath}`);
    } else {
      event.reply('log', '❌ Erro ao salvar dados');
    }
  } else {
    event.reply('log', 'ℹ️ Nenhum dado para salvar');
  }
});