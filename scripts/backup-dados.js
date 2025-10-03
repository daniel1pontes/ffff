const fs = require('fs');
const path = require('path');
const { app } = require('electron');

function fazerBackup() {
  try {
    const documentsPath = app.getPath('documents');
    const arquivoOriginal = path.join(documentsPath, 'Artestofados_Atendimentos.xlsx');
    
    if (!fs.existsSync(arquivoOriginal)) {
      console.log('ℹ Nenhum arquivo de dados encontrado.');
      return;
    }

    // Criar pasta de backup
    const backupPath = path.join(documentsPath, 'Artestofados_Backups');
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }

    // Nome do backup com data/hora
    const dataHora = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const arquivoBackup = path.join(backupPath, `Backup_${dataHora}.xlsx`);

    // Copiar arquivo
    fs.copyFileSync(arquivoOriginal, arquivoBackup);
    
    console.log('✓ Backup criado com sucesso!');
    console.log(`📁 Local: ${arquivoBackup}`);
    
    // Limpar backups antigos (manter últimos 10)
    limparBackupsAntigos(backupPath, 10);
    
  } catch (error) {
    console.error('❌ Erro ao fazer backup:', error);
  }
}

function limparBackupsAntigos(backupPath, quantidadeManter) {
  try {
    const arquivos = fs.readdirSync(backupPath)
      .filter(f => f.startsWith('Backup_') && f.endsWith('.xlsx'))
      .map(f => ({
        nome: f,
        caminho: path.join(backupPath, f),
        data: fs.statSync(path.join(backupPath, f)).mtime
      }))
      .sort((a, b) => b.data - a.data);

    // Remover excedentes
    if (arquivos.length > quantidadeManter) {
      const paraRemover = arquivos.slice(quantidadeManter);
      paraRemover.forEach(arquivo => {
        fs.unlinkSync(arquivo.caminho);
        console.log(`🗑️ Backup antigo removido: ${arquivo.nome}`);
      });
    }
  } catch (error) {
    console.error('Erro ao limpar backups antigos:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  fazerBackup();
}

module.exports = fazerBackup;