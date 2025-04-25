// js/riscoscompa.js

// Função para carregar os riscos do Local Storage
function carregarRiscos() {
  const storedRiscos = localStorage.getItem('riscosVigilantBR');
  if (storedRiscos) {
      return JSON.parse(storedRiscos);
  }
  return [];
}

// Função para atualizar a tabela de riscos recentes na index.html
function atualizarTabelaRiscosRecentes(riscos) {
  const tabelaRiscosRecentesBody = document.querySelector("#tabela-riscos-recentes tbody");
  if (tabelaRiscosRecentesBody) {
      tabelaRiscosRecentesBody.innerHTML = ''; // Limpa a tabela existente
      riscos.slice(0, 3).forEach(risco => { // Pega apenas os 3 primeiros
          const newRow = tabelaRiscosRecentesBody.insertRow();
          inserirCelulasRisco(newRow, risco);
      });
  }
}

// Função para inserir as células de um risco em uma linha da tabela
function inserirCelulasRisco(row, risco) {
  const setorCell = row.insertCell();
  const codigoCell = row.insertCell();
  const maquinaCell = row.insertCell();
  const descricaoCell = row.insertCell();
  const criticidadeCell = row.insertCell();
  const dataCell = row.insertCell();
  const statusCell = row.insertCell();
  const acoesCell = row.insertCell();

  setorCell.innerHTML = `<img src="/assets/images (35).jpg" /><p>${risco.setor}</p>`;
  codigoCell.textContent = risco.codigo;
  maquinaCell.innerHTML = `<p>${risco.maquina}</p>`;
  descricaoCell.textContent = risco.descricao;
  criticidadeCell.innerHTML = `<span class="status ${getClassificadorCriticidade(risco.criticidade)}">${risco.criticidade}</span>`;
  dataCell.textContent = risco.data;
  statusCell.innerHTML = `<span class="status ${getClassificadorStatus(risco.status)}">${risco.status}</span>`;

  // Se a célula de ações existir, adicionar o botão de deletar
  if (acoesCell) {
      const deletarButton = document.createElement('button');
      deletarButton.textContent = '...';
      deletarButton.classList.add('btn-deletar');
      deletarButton.addEventListener('click', () => {
          confirmarDelecaoRisco(risco.codigo);
      });
      acoesCell.appendChild(deletarButton);
  }
}

// Função auxiliar para obter a classe CSS com base na criticidade
function getClassificadorCriticidade(criticidade) {
  switch (criticidade) {
      case 'Alto':
          return 'completed';
      case 'Médio':
          return 'pending';
      case 'Baixo':
          return 'critical';
      default:
          return '';
  }
}

// Função auxiliar para obter a classe CSS com base no status
function getClassificadorStatus(status) {
  switch (status) {
      case 'Concluído':
          return 'completed';
      case 'Em analise':
          return 'pending';
      case 'Pendente':
          return 'critical';
      default:
          return '';
  }
}

// Função para inicializar a tabela de riscos recentes na index.html
function inicializarTabelaRiscosRecentesIndex() {
  if (window.location.pathname.includes('index.html')) {
      const tabelaRiscosRecentes = document.querySelector("#tabela-riscos-recentes");
      if (tabelaRiscosRecentes && tabelaRiscosRecentes.querySelector('tbody')) {
          const riscosCarregados = carregarRiscos();
          atualizarTabelaRiscosRecentes(riscosCarregados);
      }
  }
}

// Chamar a função de inicialização se estiver na index.html
inicializarTabelaRiscosRecentesIndex();

// Se estiver na página de riscos, carregar e exibir todos os riscos na tabela principal
if (window.location.pathname.includes('riscos.html')) {
  const riscosLista = document.getElementById("riscos-lista");
  const riscosCadastrados = carregarRiscos();
  if (riscosLista) {
      riscosCadastrados.forEach(risco => {
          const newRow = riscosLista.insertRow();
          inserirCelulasRisco(newRow, risco);
      });
  }
}

function confirmarDelecaoRisco(codigoParaDeletar) {
  if (confirm(`Deseja realmente deletar o risco com código: ${codigoParaDeletar}?`)) {
      deletarRisco(codigoParaDeletar);
  }
}

function deletarRisco(codigoParaDeletar) {
  let riscosCadastrados = carregarRiscos();
  riscosCadastrados = riscosCadastrados.filter(risco => risco.codigo !== codigoParaDeletar);
  localStorage.setItem('riscosVigilantBR', JSON.stringify(riscosCadastrados));
  localStorage.setItem('totalRiscos', riscosCadastrados.length);

  if (window.location.pathname.includes('riscos.html')) {
      const riscosLista = document.getElementById("riscos-lista");
      if (riscosLista) {
          riscosLista.innerHTML = '';
          riscosCadastrados.forEach(risco => {
              const newRow = riscosLista.insertRow();
              inserirCelulasRisco(newRow, risco);
          });
      }
  } else if (window.location.pathname.includes('index.html')) {
      atualizarTabelaRiscosRecentes(riscosCadastrados);
  }
}

// Overlay de Cadastro de Risco
document.addEventListener('DOMContentLoaded', function() {
  const openCadastroRiscoOverlayButton = document.getElementById("openCadastroRiscoOverlay");
  const cadastroRiscoOverlay = document.getElementById("cadastro-risco-overlay");
  const closeCadastroRiscoOverlayButton = document.querySelector(".cadastro-risco-overlay-close");
  const novoRiscoForm = document.getElementById("novoRiscoForm");

  if (openCadastroRiscoOverlayButton && cadastroRiscoOverlay && closeCadastroRiscoOverlayButton && novoRiscoForm) {
      openCadastroRiscoOverlayButton.addEventListener("click", () => {
          cadastroRiscoOverlay.style.display = "flex";
      });

      closeCadastroRiscoOverlayButton.addEventListener("click", () => {
          cadastroRiscoOverlay.style.display = "none";
          novoRiscoForm.reset();
      });

      cadastroRiscoOverlay.addEventListener("click", (event) => {
          if (event.target === cadastroRiscoOverlay) {
              cadastroRiscoOverlay.style.display = "none";
              novoRiscoForm.reset();
          }
      });

      novoRiscoForm.addEventListener("submit", function(event) {
          event.preventDefault();

          const riscoSetor = document.getElementById("risco-setor").value;
          const riscoCodigo = document.getElementById("risco-codigo").value;
          const riscoMaquina = document.getElementById("risco-maquina").value;
          const riscoDescricao = document.getElementById("risco-descricao").value;
          const riscoCriticidade = document.getElementById("risco-criticidade").value;
          const riscoData = document.getElementById("risco-data").value;
          const riscoStatus = document.getElementById("risco-status").value;

          const novoRisco = {
              setor: riscoSetor,
              codigo: riscoCodigo,
              maquina: riscoMaquina,
              descricao: riscoDescricao,
              criticidade: riscoCriticidade,
              data: riscoData,
              status: riscoStatus
          };

          let riscosCadastrados = carregarRiscos();
          riscosCadastrados.push(novoRisco);
          localStorage.setItem('riscosVigilantBR', JSON.stringify(riscosCadastrados));
          localStorage.setItem('totalRiscos', riscosCadastrados.length);

          if (window.location.pathname.includes('riscos.html')) {
              const riscosLista = document.getElementById("riscos-lista");
              if (riscosLista) {
                  const newRow = riscosLista.insertRow();
                  inserirCelulasRisco(newRow, novoRisco);
              }
          } else if (window.location.pathname.includes('index.html')) {
              const riscosCarregados = carregarRiscos();
              atualizarTabelaRiscosRecentes([novoRisco, ...riscosCarregados].slice(0, 3));
          }

          cadastroRiscoOverlay.style.display = "none";
          novoRiscoForm.reset();
      });
  }
});

// Atualizar a contagem de riscos no Dashboard
document.addEventListener('DOMContentLoaded', function() {
  const totalRiscosElement = document.querySelector('.insights li:nth-child(1) .info h3');
  const totalRiscos = localStorage.getItem('totalRiscos');

  if (totalRiscosElement && totalRiscos !== null) {
      totalRiscosElement.textContent = totalRiscos;
      totalRiscosElement.dataset.link = "/paginas/riscos.html";
      totalRiscosElement.style.cursor = "pointer";
      totalRiscosElement.addEventListener('click', function() {
          window.location.href = this.dataset.link;
      });
  }
});

// Atualizar a contagem de equipamentos no Dashboard
document.addEventListener('DOMContentLoaded', function() {
  const totalEquipamentosElement = document.querySelector('.insights li:nth-child(2) .info h3');
  const totalEquipamentos = localStorage.getItem('totalEquipamentos');

  if (totalEquipamentosElement && totalEquipamentos !== null) {
      totalEquipamentosElement.textContent = totalEquipamentos;
      totalEquipamentosElement.dataset.link = "/paginas/equipamentos.html";
      totalEquipamentosElement.style.cursor = "pointer";
      totalEquipamentosElement.addEventListener('click', function() {
          window.location.href = this.dataset.link;
      });
  }
});

// Atualizar a contagem de planos de ação no Dashboard
document.addEventListener('DOMContentLoaded', function() {
  const totalPlanosAcaoElement = document.querySelector('.insights li:nth-child(4) .info h3');
  const totalPlanosAcao = localStorage.getItem('totalPlanosAcao');

  if (totalPlanosAcaoElement && totalPlanosAcao !== null) {
      totalPlanosAcaoElement.textContent = totalPlanosAcao;
      totalPlanosAcaoElement.dataset.link = "/paginas/planodeacao.html";
      totalPlanosAcaoElement.style.cursor = "pointer";
      totalPlanosAcaoElement.addEventListener('click', function() {
          window.location.href = this.dataset.link;
      });
  }
});