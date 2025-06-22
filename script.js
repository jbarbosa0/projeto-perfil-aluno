document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.miniatura').forEach(img => {
    img.addEventListener('click', () =>
      (document.getElementById('foto-principal').src = img.dataset.foto)
    );
  });


  const ulUC = document.getElementById('lista-ucs');

  if (ulUC) {
    const tdUc = ulUC.parentElement;

    const btnAddUC = document.createElement('button');
    btnAddUC.textContent = '+ Adicionar UC';
    btnAddUC.style.margin = '10px 0';
    tdUc.appendChild(btnAddUC);

    ulUC.querySelectorAll('li').forEach(addSetasNasLi);

    btnAddUC.addEventListener('click', () => {
      const nova = prompt('Digite o nome da nova UC:');
      if (!nova) return;
      const li = document.createElement('li');
      li.textContent = nova;
      addSetasNasLi(li);
      ulUC.appendChild(li);
    });
  }

  function addSetasNasLi(li) {
    const span = document.createElement('span');
    span.style.marginLeft = '8px';

    const up = document.createElement('button');
    const down = document.createElement('button');
    up.textContent = '↑';
    down.textContent = '↓';
    up.style.marginLeft = down.style.marginLeft = '4px';

    up.addEventListener('click', () => mover(li, 'up'));
    down.addEventListener('click', () => mover(li, 'down'));

    span.append(up, down);
    li.appendChild(span);
  }

  function mover(item, dir) {
    const sib = dir === 'up' ? item.previousElementSibling : item.nextElementSibling;
    if (sib) (dir === 'up')
      ? item.parentNode.insertBefore(item, sib)
      : item.parentNode.insertBefore(sib, item);
  }


  const tabela = document.querySelector('table');


  const trCPF = tabela.insertRow(-1);
  trCPF.insertCell(0).innerHTML = '<strong>CPF:</strong>';
  const tdInputCPF = trCPF.insertCell(1);
  const inputCPF = Object.assign(document.createElement('input'), {
    type: 'text',
    placeholder: '000.000.000-00'
  });
  const spanErroCPF = criaSpanErro(tdInputCPF, inputCPF, /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido');


  const trEmail = [...tabela.rows]
    .find(r => r.cells[0] && r.cells[0].textContent.trim().startsWith('E-mail'));
  const tdEmailField = trEmail.cells[1];
  const valorEmail = tdEmailField.textContent.trim();
  tdEmailField.textContent = '';
  const inputEmail = Object.assign(document.createElement('input'), {
    type: 'email',
    value: valorEmail
  });
  const spanErroEmail = criaSpanErro(tdEmailField, inputEmail,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail inválido');

  function criaSpanErro(td, input, regex, msg) {
    td.appendChild(input);
    const span = document.createElement('span');
    span.style.color = 'red';
    span.style.marginLeft = '8px';
    td.appendChild(span);
    input.addEventListener('blur', () => {
      span.textContent = regex.test(input.value.trim()) ? '' : ` ${msg}`;
    });
    return span;
  }

 
  const trPerfilPessoal = [...tabela.rows]
    .find(r => r.cells[0] && r.cells[0].textContent.trim().startsWith('Perfil Pessoal'));
  const tdPerfil = trPerfilPessoal.cells[1];

  const divAddDesc = document.createElement('div');
  divAddDesc.style.marginTop = '10px';

  const inp = Object.assign(document.createElement('input'), {
    type: 'text',
    placeholder: 'Adicionar mais sobre mim...',
    style: 'width:70%'
  });
  const btnAddDesc = document.createElement('button');
  btnAddDesc.textContent = 'Adicionar';
  btnAddDesc.style.marginLeft = '6px';

  divAddDesc.append(inp, btnAddDesc);
  tdPerfil.appendChild(divAddDesc);

  const descExtra = document.createElement('ul');
  descExtra.style.marginTop = '10px';
  tdPerfil.appendChild(descExtra);

  btnAddDesc.addEventListener('click', () => {
    const txt = inp.value.trim();
    if (!txt) return;
    const li = document.createElement('li');
    li.textContent = txt;
    descExtra.appendChild(li);
    inp.value = '';
  });
});
