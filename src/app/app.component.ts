import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <div>
      <div>
        <span>The winner is {{winner}}</span>
      </div>
      <div>
        <span>Next Player is {{player}}</span>
      </div>
      <div>
        <button type="button" (click)="startGame()" >Reset</button>
      </div>
      <div>
          @for(row of [0,1,2]; track row) {
          <div class="cell-container">
            @for(column of [0,1,2]; track column) {
              <button
                type="button"
                class="cells"
                (click)="onCellClick(row,column)"
              >
                {{grid[row][column]}}
              </button>
            }
          </div>
          }
      </div>
    </div>
  `,
  styles: `
  .cell-container {
    display:flex;
    flex-direction:row;
    .cells {
      width:40px;
      height:40px;
      margin: 2px;
    }
  }
  `
})
export class AppComponent implements OnInit {
  grid: string[][] = [];
  player = "";
  winner = "";
  gameOver = false;
  winningPositions = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],

    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],

    [[0,0],[1,1],[2,2]],
    [[2,0],[1,1],[0,2]],
  ];

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.grid = [["","",""],["","",""],["","",""]];
    this.player = "X";
    this.gameOver = false;
    this.winner = "";
  }


  onCellClick(row:number, column: number) {
    if (this.gameOver) {
      return;
    }
    if (this.grid[row][column] === "") {
      this.grid[row][column] = this.player;
      this.checkForWinner();
      if (this.winner !== "") {
        this.gameOver = true;
        this.player = "";
        return;
      }
      this.swapPlayers();
    }
    this.gameOver = this.isGridFilled();
  }

  checkForWinner() {
    const won = this.winningPositions.some((positions) =>{
      return positions.every(position => {
        const [row, column] = position;
        return this.grid[row][column] === this.player;
      });
    })
    if (won) {
      this.winner = this.player;
    }
  }

  isGridFilled(): boolean {
    return this.grid.every((row) => row.every((cell) => cell !== ""));
  }

  swapPlayers() {
    if (this.player === "X") {
      this.player = "O"
    } else {
      this.player = "X";
    }
  }

}
