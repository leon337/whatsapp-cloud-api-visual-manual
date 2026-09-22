
(() => {
  const sections = [...document.querySelectorAll('.content .section')];
  if (!sections.length) return;

  const storageKey = 'mcf-wa-alpha2-state-v1';
  const helpBySection = {
    mapa: 'Se esta arquitetura ainda parece abstrata, pense em três caixas: o celular do cliente, a infraestrutura da Meta e o seu servidor. Seu servidor envia pela API e recebe eventos pelo webhook.',
    prereq: 'Não avance se você ainda não possui conta Meta/Developer e um ambiente de teste. Marque cada pré-requisito antes de continuar.',
    app: 'Se você não encontrar o caso de uso do WhatsApp, confirme que está criando um App compatível no Meta for Developers. A interface pode variar; use a documentação oficial vinculada.',
    api: 'Procure especificamente WABA ID e Phone Number ID. Eles são identificadores diferentes. Não copie access tokens para documentos públicos.',
    token: 'Para teste inicial, token temporário serve. Para fluxo duradouro, use System User conforme o guia oficial e armazene o token apenas no backend.',
    mensagem: 'Se a API aceitar a requisição mas nada chegar, não trate HTTP 200 como entrega. Verifique o webhook de status e a janela de atendimento.',
    webhook: 'Verifique três pontos: URL HTTPS alcançável, Verify Token idêntico e assinatura do campo messages. Depois valide a assinatura dos POSTs.',
    janela: 'A janela de 24h é reiniciada por nova interação do usuário. Fora dela, use template aprovado.',
    templates: 'Se um template falhar, confira nome exato, idioma, parâmetros e status APPROVED.',
    numero: 'Número adicionado não significa número registrado. Confira o status connected e o fluxo de registro para Cloud API.',
    deploy: 'Use o checklist como gate. Se um item de segurança estiver pendente, não trate a integração como pronta para produção.',
    avancado: 'Embedded Signup é um fluxo avançado. Não é requisito para aprender a integração básica ou para um primeiro backend próprio.',
    debug: 'Comece pelo estado observável: resposta da API, evento webhook, status da mensagem e logs do servidor. Evite adivinhar a causa.',
    fontes: 'Use as fontes oficiais para conferir mudanças de versão, permissões e nomes de telas.'
  };

  const layerText = {
    fazer: {
      label: '🟢 Faça comigo',
      text: 'Execute somente a ação desta etapa. Observe o screenshot, localize o elemento indicado e confirme o resultado esperado antes de avançar.'
    },
    entender: {
      label: '🔵 Entenda',
      text: 'Agora conecte a ação ao modelo mental: identifique o que esta configuração representa na arquitetura e por que ela é necessária.'
    },
    engenharia: {
      label: '🟣 Engenharia',
      text: 'Revise segurança, contratos de API, estados de erro, observabilidade e implicações de produção relacionadas a esta etapa.'
    }
  };

  let state = { mode: 'reference', step: 0, done: [] };
  try {
    state = { ...state, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };
  } catch {}

  state.step = Math.max(0, Math.min(Number(state.step) || 0, sections.length - 1));
  state.done = Array.isArray(state.done) ? state.done : [];

  const toolbar = document.createElement('div');
  toolbar.className = 'alpha2-toolbar';
  toolbar.innerHTML = `
    <div class="left">
      <span class="alpha2-badge">V2.0.0-ALPHA.2</span>
      <button class="mode-btn" data-mode="guided">Modo Guiado</button>
      <button class="mode-btn" data-mode="reference">Modo Consulta</button>
    </div>
    <div class="right"><span class="guide-progress" id="alpha2Progress"></span></div>
  `;
  document.body.prepend(toolbar);

  const actions = document.createElement('div');
  actions.className = 'guide-actions';
  actions.innerHTML = `
    <button class="guide-btn" id="guidePrev">← Anterior</button>
    <button class="guide-btn" id="guideHelp">Preciso de ajuda</button>
    <button class="guide-btn done" id="guideDone">✓ Consegui</button>
    <button class="guide-btn primary" id="guideNext">Próximo →</button>
  `;
  document.body.append(actions);

  for (const section of sections) {
    const deck = document.createElement('div');
    deck.className = 'layer-deck';
    deck.innerHTML = `
      <div class="layer-tabs">
        <button class="layer-btn active" data-layer="fazer">🟢 Faça comigo</button>
        <button class="layer-btn" data-layer="entender">🔵 Entenda</button>
        <button class="layer-btn" data-layer="engenharia">🟣 Engenharia</button>
      </div>
      <div class="layer-panel"><strong>Faça comigo.</strong> ${layerText.fazer.text}</div>
    `;
    const head = section.querySelector('.section-head');
    if (head) head.insertAdjacentElement('afterend', deck);

    const help = document.createElement('div');
    help.className = 'help-panel';
    help.innerHTML = `<h3>Vamos resolver esta etapa</h3><p>${helpBySection[section.id] || 'Compare a tela atual com o resultado esperado e volte à fonte oficial desta etapa antes de prosseguir.'}</p>`;
    deck.insertAdjacentElement('afterend', help);

    deck.querySelectorAll('.layer-btn').forEach(btn => btn.addEventListener('click', () => {
      deck.querySelectorAll('.layer-btn').forEach(x => x.classList.toggle('active', x === btn));
      const item = layerText[btn.dataset.layer];
      deck.querySelector('.layer-panel').innerHTML = `<strong>${item.label}.</strong> ${item.text}`;
    }));
  }

  const heroLead = document.querySelector('.hero .lead');
  if (heroLead) {
    const start = document.createElement('div');
    start.className = 'alpha2-start';
    start.innerHTML = `
      <button class="primary" data-start="guided">Começar no Modo Guiado</button>
      <button data-start="reference">Abrir como Consulta</button>
    `;
    heroLead.insertAdjacentElement('afterend', start);
    start.querySelectorAll('button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.start)));
  }

  function persist() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function update() {
    document.body.classList.toggle('guided-mode', state.mode === 'guided');
    toolbar.querySelectorAll('.mode-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === state.mode));
    sections.forEach((s, i) => {
      s.classList.toggle('guided-active', i === state.step);
      s.classList.toggle('guided-complete', state.done.includes(s.id));
    });
    const current = sections[state.step];
    const doneCount = state.done.length;
    document.querySelector('#alpha2Progress').textContent =
      state.mode === 'guided'
        ? `Passo ${state.step + 1} de ${sections.length} · ${doneCount} concluído(s)`
        : `${doneCount} etapa(s) concluída(s) · consulta livre`;
    document.querySelector('#guidePrev').disabled = state.step === 0;
    document.querySelector('#guideNext').disabled = state.step === sections.length - 1;
    document.querySelector('#guideDone').textContent = state.done.includes(current.id) ? '✓ Concluído' : '✓ Consegui';
    persist();
  }

  function go(index) {
    state.step = Math.max(0, Math.min(index, sections.length - 1));
    const current = sections[state.step];
    history.replaceState(null, '', '#' + current.id);
    update();
    if (state.mode === 'guided') window.scrollTo({ top: toolbar.offsetHeight, behavior: 'smooth' });
  }

  function setMode(mode) {
    state.mode = mode;
    update();
    if (mode === 'guided') go(state.step);
  }

  toolbar.querySelectorAll('.mode-btn').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
  document.querySelector('#guidePrev').addEventListener('click', () => go(state.step - 1));
  document.querySelector('#guideNext').addEventListener('click', () => go(state.step + 1));
  document.querySelector('#guideDone').addEventListener('click', () => {
    const id = sections[state.step].id;
    if (!state.done.includes(id)) state.done.push(id);
    update();
  });
  document.querySelector('#guideHelp').addEventListener('click', () => {
    const panel = sections[state.step].querySelector('.help-panel');
    if (panel) panel.classList.toggle('open');
  });

  const hashIndex = sections.findIndex(s => '#' + s.id === location.hash);
  if (hashIndex >= 0) state.step = hashIndex;
  update();
})();
