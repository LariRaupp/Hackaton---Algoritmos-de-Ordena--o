// Atividade II – Hackaton - Algoritmos de Ordenação - Problema 1
// Alunos: Larissa Raupp e Matheus Padilha
// Prof: Dr. Clóvis Silveira
// Disciplina: Estrutura de Dados
// Algoritmo: Quicksort e Heapsort crescente e decrescente
// --------------------------------------------------------

// -----------------------------
// Abas (UI)
// -----------------------------
const tabButtons = document.querySelectorAll(".tab-btn");
const tabSections = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    // ativa o botão clicado
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    // mostra a seção correspondente
    tabSections.forEach((sec) =>
      sec.classList.toggle("active", sec.id === tab)
    );
  });
});

// -----------------------------
// Estruturas de dados
// -----------------------------
// Listas independentes para cada aba
let pessoasQuick = [];
let pessoasHeap = [];

// -----------------------------
// Função para atualizar a tabela
// -----------------------------
function atualizarTabela(idTabela, lista) {
  const tbody = document.querySelector(`#${idTabela} tbody`);
  tbody.innerHTML = "";
  for (const p of lista) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.id}</td><td>${p.nome}</td><td>${p.idade}</td>`;
    tbody.appendChild(tr);
  }
}

// -----------------------------
// QUICKSORT
// -----------------------------
function quicksort(arr, chave, crescente = true) {
  if (!Array.isArray(arr)) return []; // garante que arr é um array
  if (arr.length <= 1) return structuredClone(arr);

  const pivot = arr[arr.length - 1]; // escolhe o último elemento como pivô
  const menores = [];
  const maiores = [];

  // separa os elementos em menores e maiores em relação ao pivô
  for (let i = 0; i < arr.length - 1; i++) {
    const a = arr[i][chave];
    const b = pivot[chave];
    const vaiParaMenores = crescente ? a < b : a > b;
    (vaiParaMenores ? menores : maiores).push(arr[i]);
  }

  // concatena: quicksort(menores), pivô, quicksort(maiores)
  return [
    ...quicksort(menores, chave, crescente),
    structuredClone(pivot),
    ...quicksort(maiores, chave, crescente),
  ];
}

// -----------------------------
// HEAPSORT
// -----------------------------
function heapify(a, n, i, chave, crescente) {
  let maior = i;
  const esq = 2 * i + 1;
  const dir = 2 * i + 2;

  if (crescente) {
    // max-heap para ordem crescente
    if (esq < n && a[esq][chave] > a[maior][chave]) maior = esq;
    if (dir < n && a[dir][chave] > a[maior][chave]) maior = dir;
  } else {
    // min-heap para ordem decrescente
    if (esq < n && a[esq][chave] < a[maior][chave]) maior = esq;
    if (dir < n && a[dir][chave] < a[maior][chave]) maior = dir;
  }

  if (maior !== i) {
    [a[i], a[maior]] = [a[maior], a[i]];
    heapify(a, n, maior, chave, crescente);
  }
}

function heapsort(arr, chave, crescente = true) {
  if (!Array.isArray(arr)) return [];
  const a = structuredClone(arr);
  const n = a.length;

  // constrói o heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(a, n, i, chave, crescente);
  }

  // retira elementos do heap
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(a, i, 0, chave, crescente);
  }

  // crescente=true -> crescente | crescente=false -> decrescente
  return a;
}

// -----------------------------
// QUICKSORT: formulário e menu
// -----------------------------
document.getElementById("formQuick").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById("qId").value, 10);
  const nome = document.getElementById("qNome").value.trim();
  const idade = parseInt(document.getElementById("qIdade").value, 10);

  if (Number.isNaN(id) || Number.isNaN(idade) || !nome) {
    alert("Preencha ID, Nome e Idade corretamente.");
    return;
  }
  pessoasQuick.push({ id, nome, idade });
  e.target.reset();
  atualizarTabela("qTabela", pessoasQuick);
});

document.getElementById("qExemplo").addEventListener("click", () => {
  pessoasQuick = [
    { id: 3, nome: "Maria", idade: 22 },
    { id: 1, nome: "Ana", idade: 19 },
    { id: 2, nome: "João", idade: 25 },
    { id: 4, nome: "Pedro", idade: 20 },
  ];
  atualizarTabela("qTabela", pessoasQuick);
});

document.getElementById("qLimpar").addEventListener("click", () => {
  pessoasQuick = [];
  atualizarTabela("qTabela", pessoasQuick);
});

document.getElementById("qOrdenar").addEventListener("click", () => {
  const opcao = document.getElementById("qOpcao").value; // "1","2","3"
  const ordem = document.getElementById("qOrdem").value; // "c" ou "d"
  const crescente = ordem !== "d";
  let chave;

  switch (opcao) {
    case "1":
      chave = "id";
      break;
    case "2":
      chave = "nome";
      break;
    case "3":
      chave = "idade";
      break;
    default:
      alert("Opção inválida.");
      return;
  }

  const ordenada = quicksort(pessoasQuick, chave, crescente);
  atualizarTabela("qTabela", ordenada);
});

// -----------------------------
// HEAPSORT: formulário e menu
// -----------------------------
document.getElementById("formHeap").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById("hId").value, 10);
  const nome = document.getElementById("hNome").value.trim();
  const idade = parseInt(document.getElementById("hIdade").value, 10);

  if (Number.isNaN(id) || Number.isNaN(idade) || !nome) {
    alert("Preencha ID, Nome e Idade corretamente.");
    return;
  }
  pessoasHeap.push({ id, nome, idade });
  e.target.reset();
  atualizarTabela("hTabela", pessoasHeap);
});

document.getElementById("hExemplo").addEventListener("click", () => {
  pessoasHeap = [
    { id: 7, nome: "Bruna", idade: 31 },
    { id: 5, nome: "Felipe", idade: 18 },
    { id: 9, nome: "Carla", idade: 27 },
    { id: 6, nome: "Otávio", idade: 23 },
  ];
  atualizarTabela("hTabela", pessoasHeap);
});

document.getElementById("hLimpar").addEventListener("click", () => {
  pessoasHeap = [];
  atualizarTabela("hTabela", pessoasHeap);
});

document.getElementById("hOrdenar").addEventListener("click", () => {
  const opcao = document.getElementById("hOpcao").value;
  const ordem = document.getElementById("hOrdem").value;
  const crescente = ordem !== "d";
  let chave;

  switch (opcao) {
    case "1":
      chave = "id";
      break;
    case "2":
      chave = "nome";
      break;
    case "3":
      chave = "idade";
      break;
    default:
      alert("Opção inválida.");
      return;
  }

  const ordenada = heapsort(pessoasHeap, chave, crescente);
  atualizarTabela("hTabela", ordenada);
});

// inicia com tabelas vazias
atualizarTabela("qTabela", pessoasQuick);
atualizarTabela("hTabela", pessoasHeap);
