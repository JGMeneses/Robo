function createBoard(rows, cols) {
    const board = document.getElementById('board');
    board.classList.add('board');
    board.cols = cols;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }

    return board;
}

function createRobo(board, position) {
    const cell = board.children[position.y * board.cols + position.x];
    const robo = document.createElement('div');
    robo.id = 'robo';
    cell.appendChild(robo);
    return robo;
}

function moveRobo(board, positions, robo) {
    const { x, y } = positions[robo];
    const [nextCell, move] = getNextCellAndMove(board, positions, robo);

    if (nextCell && !nextCell.classList.contains('block')) {
        board.children[y * board.cols + x].removeChild(robo);
        nextCell.appendChild(robo);
        positions[robo] = getNextPosition(positions[robo], move);
    }
}

function getNextCellAndMove(board, positions, robo) {
    const { x, y } = positions[robo];

// define as possíveis movimentações do robô
const possibleMoves = [
{ x, y: y - 1, move: 1 }, // cima
{ x: x + 1, y, move: 2 }, // direita
{ x, y: y + 1, move: 3 }, // baixo
{ x: x - 1, y, move: 4 } // esquerda
];

// verifica qual é a próxima célula disponível para movimentação
for (const move of possibleMoves) {
const nextCell = board.children[move.y * board.cols + move.x];
if (nextCell && !nextCell.classList.contains('block')) {
return [nextCell, move.move];
}
}

// caso não haja células disponíveis, retorna null
return [null, null];
}

// função para obter a próxima posição do robô após um movimento bem sucedido
function getNextPosition(position, move) {
    // atualiza a posição do robô de acordo com a movimentação
    switch (move) {
      case 1: // cima
        return { x: position.x, y: position.y - 1 };
      case 2: // direita
        return { x: position.x + 1, y: position.y };
      case 3: // baixo
        return { x: position.x, y: position.y + 1 };
      case 4: // esquerda
        return { x: position.x - 1, y: position.y };
      default:
        return position;
    }
  }
  

function addBlocks(board, numBlocks) {
    for (let i = 0; i < numBlocks; i++) {
      const cell = board.children[Math.floor(Math.random() * board.children.length)];
      if (!cell.classList.contains('block')) {
        cell.classList.add('block');
      } else {
        i--;
      }
    }
}
  


  
createBoard(5, 5); // chama a função para criar o tabuleiro
addBlocks(board, 4); // adiciona blocos aleatoriamente

const robo = createRobo(board, positions[0]); // cria o robô e adiciona-o ao tabuleiro

// loop de movimentação do robô
setInterval(() => {
  moveRobo(board, positions, robo);
}, 1000);
// A função "createBoard" cria um tabuleiro na página HTML, com um número de linhas e colunas especificado pelos argumentos "rows" e "cols", respectivamente.
// A primeira linha da função obtém a referência do elemento HTML com id "board" e a atribui à constante "board".
// A segunda linha adiciona a classe "board" à lista de classes do elemento "board", que será usada posteriormente no arquivo CSS para estilizar o tabuleiro.
// O laço de repetição cria um número de células igual ao produto das variáveis "rows" e "cols".
// A cada iteração do laço, uma nova célula é criada e adicionada ao final do elemento "board" usando o método "appendChild".
// Por fim, a função retorna o elemento "board" completo com todas as células criadas e adicionadas a ele.