'use strict';

/*
 * 25. 推箱子（Sokoban）
 *
 * 地图符号：
 *   #  墙          空格  地板
 *   .  目标点      $     箱子
 *   *  箱子在目标点
 *   @  玩家        +     玩家站在目标点
 */
const LEVELS = [
    {
        name: '热身',
        rows: [
            '########',
            '#      #',
            '#  $   #',
            '#  .   #',
            '#  @   #',
            '#      #',
            '########',
        ],
    },
    {
        name: '左右开工',
        rows: [
            '#########',
            '#       #',
            '#  $ .  #',
            '#  @    #',
            '#  $ .  #',
            '#       #',
            '#########',
        ],
    },
    {
        name: '分头行动',
        rows: [
            '##########',
            '#        #',
            '#  $  $  #',
            '#  .  .  #',
            '#        #',
            '#   @    #',
            '##########',
        ],
    },
    {
        name: '并排推进',
        rows: [
            '##########',
            '#        #',
            '#  ..    #',
            '#  $$    #',
            '#        #',
            '#   @    #',
            '##########',
        ],
    },
];

const GAP = 3;
const MAX_CELL = 58;

const boardEl = document.getElementById('board');
const levelEl = document.getElementById('level');
const movesEl = document.getElementById('moves');
const pushesEl = document.getElementById('pushes');
const winEl = document.getElementById('win');
const winDetailEl = document.getElementById('winDetail');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const undoBtn = document.getElementById('undoBtn');
const levelPickEl = document.getElementById('levelPick');

let state = null;

function cellKey(row, col) {
    return row + ',' + col;
}

function parseLevel(rows) {
    const cols = Math.max(...rows.map((row) => row.length));
    const walls = new Set();
    const targets = new Set();
    const boxes = new Set();
    let player = { row: 0, col: 0 };

    rows.forEach((row, r) => {
        for (let c = 0; c < cols; c += 1) {
            const tile = row[c] || ' ';
            const k = cellKey(r, c);

            if (tile === '#') {
                walls.add(k);
            } else if (tile === '.') {
                targets.add(k);
            } else if (tile === '$') {
                boxes.add(k);
            } else if (tile === '*') {
                boxes.add(k);
                targets.add(k);
            } else if (tile === '@') {
                player = { row: r, col: c };
            } else if (tile === '+') {
                player = { row: r, col: c };
                targets.add(k);
            }
        }
    });

    return { rows: rows.length, cols, walls, targets, boxes, player };
}

function loadLevel(index) {
    const map = parseLevel(LEVELS[index].rows);

    state = {
        index,
        ...map,
        moves: 0,
        pushes: 0,
        history: [],
        won: false,
    };

    winEl.hidden = true;
    render();
    updateHud();
}

function render() {
    fitBoard();

    const fragment = document.createDocumentFragment();

    for (let r = 0; r < state.rows; r += 1) {
        for (let c = 0; c < state.cols; c += 1) {
            const k = cellKey(r, c);
            const cell = document.createElement('div');
            cell.className = 'cell';

            if (state.walls.has(k)) {
                cell.classList.add('wall');
            } else {
                if (state.targets.has(k)) {
                    cell.classList.add('target');
                }

                if (state.boxes.has(k)) {
                    const box = document.createElement('div');
                    box.className = state.targets.has(k) ? 'box on-target' : 'box';
                    cell.appendChild(box);
                }

                if (state.player.row === r && state.player.col === c) {
                    const player = document.createElement('div');
                    player.className = 'player';
                    cell.appendChild(player);
                }
            }

            fragment.appendChild(cell);
        }
    }

    boardEl.replaceChildren(fragment);
}

function fitBoard() {
    const maxWidth = Math.min(window.innerWidth - 48, 560);
    const maxHeight = window.innerHeight - 330;
    const widthCell = Math.floor((maxWidth - (state.cols - 1) * GAP) / state.cols);
    const heightCell = Math.floor((maxHeight - (state.rows - 1) * GAP) / state.rows);
    const cell = Math.max(18, Math.min(widthCell, heightCell, MAX_CELL));

    boardEl.style.gridTemplateColumns = `repeat(${state.cols}, ${cell}px)`;
    boardEl.style.gridAutoRows = `${cell}px`;
    boardEl.style.gap = `${GAP}px`;
}

function updateHud() {
    levelEl.textContent = `${state.index + 1} / ${LEVELS.length}`;
    movesEl.textContent = state.moves;
    pushesEl.textContent = state.pushes;
    undoBtn.disabled = state.history.length === 0;

    levelPickEl.querySelectorAll('button').forEach((button, index) => {
        button.classList.toggle('active', index === state.index);
    });
}

function isInside(row, col) {
    return row >= 0 && row < state.rows && col >= 0 && col < state.cols;
}

function saveHistory() {
    state.history.push({
        player: { ...state.player },
        boxes: [...state.boxes],
        moves: state.moves,
        pushes: state.pushes,
    });
}

function move(deltaRow, deltaCol) {
    if (!state || state.won) return;

    const nextRow = state.player.row + deltaRow;
    const nextCol = state.player.col + deltaCol;

    if (!isInside(nextRow, nextCol)) return;

    const nextKey = cellKey(nextRow, nextCol);
    if (state.walls.has(nextKey)) return;

    const boxRow = nextRow + deltaRow;
    const boxCol = nextCol + deltaCol;
    const boxKey = cellKey(boxRow, boxCol);
    const hasBox = state.boxes.has(nextKey);

    if (hasBox) {
        if (!isInside(boxRow, boxCol)) return;
        if (state.walls.has(boxKey) || state.boxes.has(boxKey)) return;
    }

    saveHistory();

    if (hasBox) {
        state.boxes.delete(nextKey);
        state.boxes.add(boxKey);
        state.pushes += 1;
    }

    state.player = { row: nextRow, col: nextCol };
    state.moves += 1;

    render();
    updateHud();
    checkWin();
}

function undo() {
    if (!state || state.history.length === 0) return;

    const snapshot = state.history.pop();
    state.player = snapshot.player;
    state.boxes = new Set(snapshot.boxes);
    state.moves = snapshot.moves;
    state.pushes = snapshot.pushes;
    state.won = false;

    winEl.hidden = true;
    render();
    updateHud();
}

function checkWin() {
    const allBoxesPlaced = state.boxes.size === state.targets.size
        && [...state.boxes].every((k) => state.targets.has(k));

    if (!allBoxesPlaced) return;

    state.won = true;
    winDetailEl.textContent = `用了 ${state.moves} 步，推动箱子 ${state.pushes} 次`;
    nextBtn.textContent = state.index === LEVELS.length - 1 ? '从头再来' : '下一关';
    winEl.hidden = false;
}

function goToNextLevel() {
    if (state.index === LEVELS.length - 1) {
        loadLevel(0);
    } else {
        loadLevel(state.index + 1);
    }
}

const DIRECTIONS = {
    arrowup: [-1, 0],
    arrowdown: [1, 0],
    arrowleft: [0, -1],
    arrowright: [0, 1],
    w: [-1, 0],
    s: [1, 0],
    a: [0, -1],
    d: [0, 1],
};

window.addEventListener('keydown', (event) => {
    if (!state) return;

    const key = event.key.toLowerCase();
    const direction = DIRECTIONS[key];

    if (direction) {
        event.preventDefault();
        move(direction[0], direction[1]);
        return;
    }

    if (key === 'r') {
        event.preventDefault();
        loadLevel(state.index);
    } else if (key === 'z' || key === 'u') {
        event.preventDefault();
        undo();
    }
});

document.querySelectorAll('[data-dir]').forEach((button) => {
    button.addEventListener('click', () => {
        const [deltaRow, deltaCol] = button.dataset.dir.split(',').map(Number);
        move(deltaRow, deltaCol);
    });
});

restartBtn.addEventListener('click', () => loadLevel(state.index));
undoBtn.addEventListener('click', undo);
nextBtn.addEventListener('click', goToNextLevel);

window.addEventListener('resize', () => {
    if (state) fitBoard();
});

LEVELS.forEach((level, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = String(index + 1);
    button.title = level.name;
    button.addEventListener('click', () => loadLevel(index));
    levelPickEl.appendChild(button);
});

loadLevel(0);
