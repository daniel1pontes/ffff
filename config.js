module.exports = {
  // Informações da Empresa
  empresa: {
    nome: 'Artestofados',
    telefone: '(83) 9999-9999',
    endereco: 'Rua Exemplo, 123 - João Pessoa/PB',
    horarioFuncionamento: 'Segunda a Sexta: 8h às 18h'
  },

  // Configurações do Bot
  bot: {
    // Tempo para resetar conversa inativa (em minutos)
    tempoResetConversa: 60,
    
    // Mensagens padrão
    mensagemBoasVindas: "Olá! 👋 Bem-vindo à *Artestofados*! 🛋️\n\nSomos especializados em fabricação e reforma de estofados.\n\nPara começar, qual é o seu nome?",
    
    mensagemForaHorario: "Olá! No momento estamos fora do horário de atendimento.\n\n📅 Horário: {horario}\n\nDeixe sua mensagem que responderemos assim que possível!",
    
    mensagemErro: "Desculpe, ocorreu um erro. Por favor, tente novamente ou digite *MENU* para voltar ao início.",
    
    // Palavras-chave para reiniciar
    palavrasChaveReinicio: ['oi', 'olá', 'menu', 'início', 'reiniciar', 'começar']
  },

  // Tipos de produtos
  produtos: {
    fabricacao: ['Sofá', 'Cadeira', 'Poltrona', 'Cama', 'Puff', 'Banco', 'Cabeceira'],
    reforma: ['Sofá', 'Cadeira', 'Poltrona', 'Outro']
  },

  // Horários disponíveis para agendamento
  horariosDisponiveis: [
    '07:30', '08:30', '09:30', '10:30', '11:30', '12:30',
    '14:30', '15:30', '16:30', '17:00'
  ],

  // Configurações do Excel
  excel: {
    nomeArquivo: 'Artestofados_Atendimentos.xlsx',
    nomePlanilha: 'Atendimentos',
    colunas: [
      'Data/Hora',
      'Nome',
      'Telefone WhatsApp',
      'Contato',
      'Serviço',
      'Tipo de Produto',
      'Tem Projeto',
      'Tipo de Atendimento',
      'Data Agendamento',
      'Hora Agendamento',
      'Status',
      'Observações'
    ]
  },

  // Configurações do Google Calendar
  calendar: {
    // Duração padrão dos eventos (em horas)
    duracaoEvento: 1,
    
    // Lembretes
    lembretes: [
      { method: 'email', minutes: 24 * 60 }, // 1 dia antes
      { method: 'popup', minutes: 30 }        // 30 minutos antes
    ],
    
    // Cores dos eventos (opcional)
    cores: {
      fabricacao: '9', // Azul
      reforma: '11'    // Vermelho
    }
  },

  // Validações
  validacoes: {
    telefone: {
      minLength: 10,
      maxLength: 11,
      regex: /^[0-9]{10,11}$/
    },
    
    data: {
      formato: 'DD/MM/AAAA',
      regex: /^(\d{2})\/(\d{2})\/(\d{4})$/
    },
    
    hora: {
      formato: 'HH:MM',
      regex: /^([01]\d|2[0-3]):([0-5]\d)$/
    }
  },

  // Mensagens de validação
  mensagensValidacao: {
    telefoneInvalido: 'Número de telefone inválido. Por favor, digite apenas os números (DDD + Número).\nExemplo: 83999887766',
    dataInvalida: 'Data inválida. Por favor, use o formato DD/MM/AAAA.\nExemplo: 15/12/2024',
    horaInvalida: 'Horário inválido. Por favor, use o formato HH:MM.\nExemplo: 14:30',
    horaIndisponivel: 'Horário não disponível. Escolha entre:\n{horarios}'
  },

  // URLs úteis
  urls: {
    site: 'https://www.artestofados.com.br',
    instagram: 'https://instagram.com/artestofados',
    facebook: 'https://facebook.com/artestofados',
    whatsapp: 'https://wa.me/5583999999999'
  }
};