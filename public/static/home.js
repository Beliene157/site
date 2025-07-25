document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('contasContainer');

  fetch('/api/recentes')
    .then(res => {
      if (!res.ok) throw new Error('Falha ao buscar contas recentes');
      return res.json();
    })
    .then(resposta => {
      const contas = Object.entries(resposta);
      if (!Array.isArray(contas)) throw new Error("Formato inválido");

      contas.forEach(([id, acc]) => {
        const card = document.createElement('div');
        card.className = 'account-card';

        const lastLoginDate = new Date(acc.account_last_activity * 1000).toLocaleDateString('pt-BR');

        card.innerHTML = `
          <div class="card-header">
            <img src="${acc.imagePreviewLinks?.direct?.weapons || 'https://via.placeholder.com/400x200?text=Sem+Imagem'}" alt="Thumbnail da conta" class="card-img" />
            <div class="rank-info">
              <img src="https://www.hypecommunity.com.br/${acc.valorantRankImgPath}" alt="${acc.valorantRankTitle}" class="tier-icon" />
              <div>${acc.valorantRankTitle}</div>
            </div>
          </div>
          <div class="card-body">
            <p><strong>ID Riot:</strong> ${acc.riot_id}</p>
            <p><strong>Nível:</strong> ${acc.riot_valorant_level}</p>
            <p><strong>VP:</strong> ${acc.riot_valorant_wallet_vp}</p>
            <p><strong>RP:</strong> ${acc.riot_valorant_wallet_rp}</p>
            <p><strong>Skins:</strong> ${acc.riot_valorant_skin_count}</p>
            <p><strong>Último login:</strong> ${new Date(acc.account_last_activity * 1000).toLocaleDateString('pt-BR')}</p>
          </div>
          <div class="card-footer">
            <span class="price">R$ ${acc.price ? acc.price.toFixed(2) : 'Indisponível'}</span>
            <a href="/compra/${id}" class="buy-button">Comprar</a>
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
