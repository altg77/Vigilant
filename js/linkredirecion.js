  const listItems = document.querySelectorAll('li');

  listItems.forEach(item => {
    item.addEventListener('click', () => {
      // Tenta pegar o link do atributo 'data-link' dentro do item
      const linkElement = item.querySelector('[data-link]');
      if (linkElement && linkElement.dataset.link) {
        window.location.href = linkElement.dataset.link;
      } else {
        console.log('Nenhum link de dados encontrado neste item.');
        // Você pode adicionar aqui alguma ação padrão se não houver link no data-link
      }
    });
  });

  const clickableHeaders = document.querySelectorAll('[data-link]');

  clickableHeaders.forEach(header => {
    header.addEventListener('click', () => {
      if (header.dataset.link) {
        window.location.href = header.dataset.link;
      } else {
        console.log('Nenhum link de dados encontrado neste título.');
      }
    });
  });