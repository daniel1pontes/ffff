const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function testarGoogleCalendar() {
  try {
    console.log('🔍 Verificando credenciais...');
    
    const credentialsPath = path.join(__dirname, '..', 'google-credentials.json');
    
    if (!fs.existsSync(credentialsPath)) {
      console.error('❌ Arquivo google-credentials.json não encontrado!');
      console.log('📝 Certifique-se de que o arquivo está na raiz do projeto.');
      return;
    }

    console.log('✓ Arquivo de credenciais encontrado');
    
    const credentials = JSON.parse(fs.readFileSync(credentialsPath));
    console.log('✓ Credenciais carregadas');
    console.log(`📧 Service Account: ${credentials.client_email}`);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    console.log('🔐 Autenticando...');
    const calendar = google.calendar({ version: 'v3', auth });

    console.log('📅 Buscando calendários...');
    const calendarList = await calendar.calendarList.list();
    
    if (calendarList.data.items && calendarList.data.items.length > 0) {
      console.log('\n✅ CONEXÃO BEM SUCEDIDA!\n');
      console.log('📋 Calendários disponíveis:');
      calendarList.data.items.forEach((cal, index) => {
        console.log(`${index + 1}. ${cal.summary} (${cal.id})`);
      });
      
      // Criar evento de teste
      console.log('\n🧪 Criando evento de teste...');
      const agora = new Date();
      const daquiUmaHora = new Date(agora.getTime() + 60 * 60 * 1000);
      
      const evento = {
        summary: 'TESTE - Artestofados Bot',
        description: 'Este é um evento de teste criado pelo bot.',
        start: {
          dateTime: agora.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        end: {
          dateTime: daquiUmaHora.toISOString(),
          timeZone: 'America/Sao_Paulo'
        }
      };

      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: evento
      });

      console.log('✅ Evento de teste criado com sucesso!');
      console.log(`🔗 Link: ${response.data.htmlLink}`);
      console.log('\n✨ Tudo funcionando perfeitamente!');
      
    } else {
      console.log('\n⚠️ Nenhum calendário encontrado!');
      console.log('📝 Verifique se você compartilhou o calendário com:');
      console.log(`   ${credentials.client_email}`);
    }
    
  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.log('\n💡 Solução:');
      console.log('1. Verifique se o arquivo google-credentials.json está correto');
      console.log('2. Certifique-se de que a API está ativada no Google Cloud Console');
      console.log('3. Verifique se a service account tem as permissões corretas');
    } else if (error.message.includes('Calendar usage limits exceeded')) {
      console.log('\n💡 Você atingiu o limite de requisições. Aguarde alguns minutos.');
    } else if (error.message.includes('Not found')) {
      console.log('\n💡 Calendário não encontrado. Compartilhe seu calendário com:');
      console.log(`   ${credentials.client_email}`);
    }
  }
}

// Executar teste
testarGoogleCalendar();