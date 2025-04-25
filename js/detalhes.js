document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('overlay');
  const overlayContent = document.getElementById('risk-details');
  const closeOverlayButton = document.querySelector('.overlay-close');

  function handleRowClick(table, visibleHeaders) {
      table.addEventListener('click', function(event) {
          const clickedRow = event.target.closest('tr');
          if (clickedRow) {
              let detailsHTML = '';

              // Para todas as páginas, exibir os cabeçalhos e valores visíveis
              for (let i = 0; i < visibleHeaders.length; i++) {
                  const value = clickedRow.cells[i].textContent.trim();
                  detailsHTML += `<div class="detail-item"><strong>${visibleHeaders[i]}:</strong> ${value}</div>`;
              }

              // Se estiver na página de Plano de Ação, exibir os detalhes extras dos data-* attributes
              if (window.location.pathname.includes('planodeacao.html')) {
                  detailsHTML += '<hr>';
                  detailsHTML += `<div class="detail-item"><strong>Análise da IA:</strong> ${clickedRow.dataset.analise || 'Não disponível'}</div>`;
                  detailsHTML += `<div class="detail-item"><strong>Solução Proposta pela IA:</strong> ${clickedRow.dataset.solucaoDetalhada || 'Não disponível'}</div>`;
                  const acoes = JSON.parse(clickedRow.dataset.acoes || '[]');
                  let actionsHTML = '<div class="detail-item"><strong>Ações a serem tomadas:</strong><div class="actions-list">';
                  acoes.forEach(action => {
                      const trimmedAction = action.trim();
                      if (trimmedAction) {
                          const parts = trimmedAction.split(':');
                          let actionText = trimmedAction;
                          if (parts.length > 1) {
                              actionText = parts.slice(1).join(':').trim();
                          }
                          actionsHTML += `<label><input type="checkbox"> <span>${actionText}</span></label>`;
                      }
                  });
                  actionsHTML += '</div></div>';
                  detailsHTML += actionsHTML;

               
              }

              overlayContent.innerHTML = detailsHTML;
              overlay.style.display = 'flex';
          }
      });
  }

  if (overlay && overlayContent && closeOverlayButton) {
      // Lógica para a página de Dashboard (Riscos)
      if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
          const riskTable = document.querySelector('.bottom-data .orders table tbody');
          if (riskTable) {
              const riskHeaders = ['Setor', 'Código', 'Máquina', 'Descrição', 'Criticidade', 'Data de Identificação', 'Status'];
              handleRowClick(riskTable, riskHeaders);
          }
      }

      // Lógica para a página de Equipamentos
      if (window.location.pathname.includes('equipamentos.html')) {
          const equipmentTable = document.querySelector('.bottom-data .orders table tbody');
          if (equipmentTable) {
              const equipmentHeaders = ['Equipamentos', 'Código', 'Modelo', 'Setor', 'Status'];
              handleRowClick(equipmentTable, equipmentHeaders);
          }
      }

      // Lógica para a página de Riscos
      if (window.location.pathname.includes('riscos.html')) {
          const riskTable = document.querySelector('.bottom-data .orders table tbody');
          if (riskTable) {
              const riskHeaders = ['Setor', 'Código', 'Máquina', 'Descrição', 'Criticidade', 'Data de Identificação', 'Status'];
              handleRowClick(riskTable, riskHeaders);
          }
      }

      // Lógica para a página de Plano de Ação
      if (window.location.pathname.includes('planodeacao.html')) {
          const planActionTable = document.querySelector('.bottom-data .orders table tbody');
          if (planActionTable) {
              // Os cabeçalhos visíveis agora são: 'Solução gerada', 'Código', 'Tempo da Solução', 'Risco', 'Status', 'Responsaveis', 'Prazo'
              const planActionVisibleHeaders = ['Solução gerada', 'Código', 'Tempo da Solução', 'Risco', 'Status', 'Responsaveis', 'Prazo'];
              handleRowClick(planActionTable, planActionVisibleHeaders);
          }
      }

      // Lógica para as outras páginas (semelhante às anteriores)
      if (window.location.pathname.includes('relatorios.html')) {
          const relaTable = document.querySelector('.bottom-data .orders table tbody');
          if (relaTable) {
              const relaHeaders = ['Relatorios', 'Datas', 'Status', 'Tipo'];
              handleRowClick(relaTable, relaHeaders);
          }
      }

      if (window.location.pathname.includes('Colaboradores.html')) {
          const colabTable = document.querySelector('.bottom-data .orders table tbody');
          if (colabTable) {
              const colabHeaders = ['Nome', 'Contato', 'Cargo'];
              handleRowClick(colabTable, colabHeaders);
          }
      }

      if (window.location.pathname.includes('analiserisco.html')) {
          const analiTable = document.querySelector('.bottom-data .orders table tbody');
          if (analiTable) {
              const analiHeaders = ['Setores', 'Código', 'Máquina Associada' , 'Taxa de risco' , 'Data de analise'];
              handleRowClick(analiTable, analiHeaders);
          }
      }

      closeOverlayButton.addEventListener('click', function() {
          overlay.style.display = 'none';
      });

      overlay.addEventListener('click', function(event) {
          if (event.target === overlay) {
              overlay.style.display = 'none';
          }
      });
  }
});