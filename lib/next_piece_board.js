class NextPieceBoard {
  constructor() {
    this.grid = [[null, null, null, null], [null, null, null, null]];
    this.numberRows = this.grid.length;
    this.rowLength = this.grid[0].length;
    this.nextPiece = null;
    this.pieces = {
      1: { symbol: "B",
           positions: [[0, 1], [0,2], [1,1], [1,2]]
         },
      2: { symbol: "S",
           positions: [[0,0], [0,1], [0,2], [0,3]]
         },
      3: { symbol: "LL",
           positions: [[0,0], [0,1], [1,0], [0,2]],
         },
      4: { symbol: "RL",
           positions: [[0,1], [0,0], [1,2], [0,2]],
         },
      5: { symbol: "LZ",
           positions: [[0,0], [0,1], [1,1],[1,2]],
         },
      6: { symbol: "RZ",
           positions: [[0,1], [0,2], [1,1], [1,0]]
         },
      7: { symbol: "T",
           positions: [[0,0], [0,2], [1,1], [0,1]]
         },
    };
  }

  resetGrid() {
    this.grid = [[null, null, null, null],[null, null, null, null]];
  }

  setPiece() {
    const nextPieceInfo = this.pieces[this.nextPiece];
    nextPieceInfo.positions.forEach((position) => {
      this.grid[position[0]][position[1]] = nextPieceInfo.symbol;
    });
  }

  update() {
    this.resetGrid();
    this.setPiece();
  }
}

module.exports = NextPieceBoard;
