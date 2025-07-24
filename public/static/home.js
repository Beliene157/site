document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('contasContainer');

  fetch('/api/recentes')
    .then(res => {
      if (!res.ok) throw new Error('Falha ao buscar contas recentes');
      return res.json();
    })
    .then(contas => {
      const contas = res.accounts;
      if (!Array.isArray(contas)) throw new Error("Formato inválido");
      
      contas.forEach(acc => {
        const card = document.createElement('div');
        card.className = 'account-card';

        // Exemplo de estrutura (ajuste conforme sua API):
        card.innerHTML = `
          <div class="card-header">
            <img src="${acc.portrait_url}" alt="Thumbnail da conta" class="card-img" />
            <div class="rank-info">
              <img src="${acc.content_tier_icon}" alt="Ícone de patente" class="tier-icon" />
              <div>${acc.patent_name}</div>
            </div>
          </div>
          <div class="card-body">
            <p><strong>Nível:</strong> ${acc.level}</p>
            <p><strong>VP:</strong> ${acc.valorant_points}</p>
            <p><strong>RP:</strong> ${acc.riot_points || '-'}</p>
            <p><strong>Skins:</strong> ${acc.skins_count}</p>
            <p><strong>Último login:</strong> ${new Date(acc.last_login).toLocaleDateString('pt-BR')}</p>
          </div>
          <div class="card-footer">
            <span class="price">R$ ${acc.price.toFixed(2)}</span>
            <a href="/compra/${acc.id}" class="buy-button">Comprar</a>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = '<p style="color:red; text-align:center;">Erro ao carregar contas recentes.</p>';
    });
});
