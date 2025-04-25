document.addEventListener('DOMContentLoaded', function() {
    const riscosPrevistosLista = document.getElementById('riscos-previstos-lista');
    const riscosCadastrados = carregarRiscos(); // Assuming this function exists in riscoscompa.js
  
    if (riscosPrevistosLista && riscosCadastrados.length > 0) {
      const maquinaRiscos = {};
  
      // Organizar os riscos cadastrados por máquina
      riscosCadastrados.forEach(risco => {
        if (!maquinaRiscos[risco.maquina]) {
          maquinaRiscos[risco.maquina] = [];
        }
        maquinaRiscos[risco.maquina].push(risco.descricao);
      });
  
      const previsoesDeRiscos = [];
  
      // Analisar os riscos por máquina e gerar possíveis novos riscos (simples exemplo)
      for (const maquina in maquinaRiscos) {
        const historicoRiscos = maquinaRiscos[maquina];
        const setoresUnicos = [...new Set(riscosCadastrados.filter(r => r.maquina === maquina).map(r => r.setor))];
        const dataAnalise = new Date().toLocaleDateString();
  
        if (historicoRiscos.length >= 1) {
          // Simples lógica para prever um novo risco: combinar palavras de riscos anteriores
          const todasAsPalavras = historicoRiscos.join(' ').toLowerCase().split(/\s+/);
          const palavrasComuns = {};
          todasAsPalavras.forEach(palavra => {
            palavrasComuns[palavra] = (palavrasComuns[palavra] || 0) + 1;
          });
  
          const palavrasMaisComuns = Object.entries(palavrasComuns)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 3) // Pegar as 3 palavras mais comuns
            .map(item => item[0]);
  
          if (palavrasMaisComuns.length > 1) {
            const possivelRisco = `Possível ocorrência de problema relacionado a ${palavrasMaisComuns.join(', ')}`;
            const taxaDeRisco = Math.min(0.9, historicoRiscos.length * 0.1 + Math.random() * 0.2).toFixed(2); // Simulação de taxa de risco
  
            setoresUnicos.forEach(setor => {
              previsoesDeRiscos.push({
                setor: setor,
                codigo: `IA-${maquina}-${Date.now().toString().slice(-4)}`, // Código gerado
                maquina: maquina,
                taxa: taxaDeRisco,
                data: dataAnalise,
                possivelRisco: possivelRisco
              });
            });
          } else if (historicoRiscos.length > 0) {
            // Se houver histórico, mas poucas palavras comuns, sugerir algo genérico
            const taxaDeRisco = Math.min(0.7, historicoRiscos.length * 0.1 + Math.random() * 0.3).toFixed(2);
            setoresUnicos.forEach(setor => {
              previsoesDeRiscos.push({
                setor: setor,
                codigo: `IA-${maquina}-${Date.now().toString().slice(-4)}`,
                maquina: maquina,
                taxa: taxaDeRisco,
                data: dataAnalise,
                possivelRisco: `Possível recorrência de problemas na máquina ${maquina}`
              });
            });
          }
        } else {
          // Se não houver histórico de riscos para a máquina, sugerir um risco genérico com baixa probabilidade
          setoresUnicos.forEach(setor => {
            previsoesDeRiscos.push({
              setor: setor,
              codigo: `IA-${maquina}-${Date.now().toString().slice(-4)}`,
              maquina: maquina,
              taxa: (Math.random() * 0.3).toFixed(2),
              data: dataAnalise,
              possivelRisco: `Possível surgimento de novos riscos na máquina ${maquina}`
            });
          });
        }
      }
  
      // Exibir os riscos previstos na tabela
      previsoesDeRiscos.forEach(riscoPrevisto => {
        const newRow = riscosPrevistosLista.insertRow();
        const setorCell = newRow.insertCell();
        const codigoCell = newRow.insertCell();
        const maquinaCell = newRow.insertCell();
        const taxaCell = newRow.insertCell();
        const dataCell = newRow.insertCell();
        const possivelRiscoCell = newRow.insertCell();
  
        setorCell.innerHTML = `<img src="/assets/images (35).jpg" /><p>${riscoPrevisto.setor}</p>`;
        codigoCell.textContent = riscoPrevisto.codigo;
        maquinaCell.innerHTML = `<p>${riscoPrevisto.maquina}</p>`;
        taxaCell.textContent = `${parseFloat(riscoPrevisto.taxa) * 100}%`;
        dataCell.textContent = riscoPrevisto.data;
        possivelRiscoCell.textContent = riscoPrevisto.possivelRisco;
      });

      localStorage.setItem('previsoesDeRiscos', JSON.stringify(previsoesDeRiscos));

    } 
    
    else if (riscosPrevistosLista) {
      riscosPrevistosLista.innerHTML = '<tr><td colspan="6">Nenhum risco cadastrado para análise.</td></tr>';
    }
  });
  
  // Função para carregar os riscos do Local Storage (certifique-se de que esta função esteja acessível)
  function carregarRiscos() {
    const storedRiscos = localStorage.getItem('riscosVigilantBR');
    if (storedRiscos) {
      return JSON.parse(storedRiscos);
    }
    return [];
  }