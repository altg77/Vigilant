document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('overlay');
  const overlayContent = document.getElementById('risk-details');
  const closeOverlayButton = document.querySelector('.overlay-close');

  function handleRowClick(table, headers) {
    table.addEventListener('click', function(event) {
      const clickedRow = event.target.closest('tr');
      if (clickedRow) {
        let detailsHTML = '';
        for (let i = 0; i < headers.length; i++) {
          const value = clickedRow.cells[i].textContent.trim();
          detailsHTML += `<p><strong>${headers[i]}:</strong> ${value}</p>`;
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
        const planActionHeaders = ['Solução gerada', 'Código', 'Tempo da Solução', 'Risco', 'Status', 'Responsaveis', 'Prazo'];
        handleRowClick(planActionTable, planActionHeaders);
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