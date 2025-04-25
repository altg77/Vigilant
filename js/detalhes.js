document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('overlay');
  const overlayContent = document.getElementById('risk-details');
  const closeOverlayButton = document.querySelector('.overlay-close');

  function handleRowClick(table, headers, hiddenHeaders) {
    table.addEventListener('click', function(event) {
      const clickedRow = event.target.closest('tr');
      if (clickedRow) {
        let detailsHTML = '';
        const visibleHeaders = headers; // Apenas os cabeçalhos visíveis

        // Exibe os cabeçalhos e valores visíveis
        for (let i = 0; i < visibleHeaders.length; i++) {
          const value = clickedRow.cells[i].textContent.trim();
          detailsHTML += `<div class="detail-item"><strong>${visibleHeaders[i]}:</strong> ${value}</div>`;
        }

        if (hiddenHeaders && hiddenHeaders.length > 0) {
          detailsHTML += '<hr>';
          for (let i = 0; i < hiddenHeaders.length; i++) {
            const hiddenIndex = visibleHeaders.length + i;
            if (clickedRow.cells.length > hiddenIndex) {
              const hiddenValue = clickedRow.cells[hiddenIndex].textContent.trim();
              detailsHTML += `<div class="detail-item"><strong>${hiddenHeaders[i]}:</strong> ${hiddenValue}</div>`;

              if (hiddenHeaders[i] === 'Ações a serem tomadas') {
                const actions = hiddenValue.split('\n');
                let actionsHTML = '<div class="actions-list">';
                actions.forEach(action => {
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
                actionsHTML += '</div>';
                detailsHTML += actionsHTML; // Adiciona a lista de ações abaixo do título "Ações a serem tomadas"
              }
            }
          }
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
        const planActionHeaders = ['Solução gerada', 'Análise da IA', 'Solução Proposta pela IA', 'Ações a serem tomadas'];
        const planActionHiddenHeaders = ['Código', 'Tempo da Solução', 'Risco', 'Status', 'Responsaveis', 'Prazo'];
        handleRowClick(planActionTable, planActionHeaders, planActionHiddenHeaders);
      }
    }


    // Lógica para a página de Relatorios
    if (window.location.pathname.includes('relatorios.html')) {
      const relaTable = document.querySelector('.bottom-data .orders table tbody');
      if (relaTable) {
        const relaHeaders = ['Relatorios', 'Datas', 'Status', 'Tipo'];
        handleRowClick(relaTable, relaHeaders);
      }
    }

       // Lógica para a página de Colaboradores
       if (window.location.pathname.includes('Colaboradores.html')) {
        const colabTable = document.querySelector('.bottom-data .orders table tbody');
        if (colabTable) {
          const colabHeaders = ['Nome', 'Contato', 'Cargo'];
          handleRowClick(colabTable, colabHeaders);
        }
      }

          // Lógica para a página de IA
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