const fs = require('fs');
const path = require('path');
const { app } = require('electron');

function limparSessao() {
  try {
    const sessionPath = path.join(app.getPath('userData'), 'whatsapp-session');
    
    if (fs.existsSync(sessionPath)) {
      fs.rmSync(sessionPath, { recursive: true, force: true });
      console.log('✓ Sessão do WhatsApp removida com sucesso!');
      console.log('Você precisará escanear o QR Code novamente.');
    } else {
      console.log('ℹ Nenhuma sessão encontrada.');
    }
  } catch (error) {
    console.error('❌ Erro ao limpar sessão:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  limparSessao();
}

module.exports = limparSessao;