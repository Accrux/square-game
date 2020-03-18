import { Injectable, Output, Input } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { BehaviorSubject, TimeInterval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  squares: Array<SquareComponent>;
  randomSquare:SquareComponent;
  public playerScore:number = 0;
  public machineScore: number = 0;
  public gameFinished: boolean = false;
  private playerScoreService = new BehaviorSubject<number>(this.playerScore)
  private machineScoreService = new BehaviorSubject<number>(this.machineScore)
  private gameFinishedService = new BehaviorSubject<boolean>(this.gameFinished)
  public timer;
  public resultModalText: string;
  public delay: number;

  constructor(public dialog: MatDialog) { }

  openDialog(result: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {dialogText:result}
    });
  }

  currentPlayerScore = this.playerScoreService.asObservable();
  currentMachineScore = this.machineScoreService.asObservable();
  currentGameFinised = this.gameFinishedService.asObservable();

  changePlayerScore(score: number) {
    this.playerScoreService.next(score)
  }

  changeMachineScore(score: number) {
    this.machineScoreService.next(score)
  }

  setGameStatus(status: boolean) {
    this.gameFinishedService.next(status)
  }

  startGame(squares, delay) {
    debugger;
    this.delay = delay ? delay : 1000
    this.squares = squares
    this.startAttempt();
  }

  startAttempt() {
    if(this.playerScore === 10 || this.machineScore === 10) {
      this.endGame(this.timer);
      return;
    }

    this.randomSquare = this.getNewRandomSquare(this.squares);
    this.randomSquare.state = this.randomSquare.STATE_ACTIVE;

   this.timer = setTimeout(
      function () {
        if (this.randomSquare.state == this.randomSquare.STATE_ACTIVE) {
          this.randomSquare.state = this.randomSquare.STATE_FAILED;
          this.changeMachineScore(this.machineScore+=1)
        }
        this.startAttempt();    
      }.bind(this)
      ,this.delay
    );
}

getNewRandomSquare(squares) {
  let randomDefaultSquare = squares.toArray().filter(item => item.state === 1)
  let random = Math.floor(Math.random() * randomDefaultSquare.length);
  return randomDefaultSquare[random];
}

onClicked(clickedSquare:SquareComponent):void {
  if(this.playerScore === 10 || this.machineScore === 10) {
    this.endGame(this.timer);
    return;
  }
      if(clickedSquare.state === this.randomSquare.STATE_ACTIVE) {
        clickedSquare.state = clickedSquare.STATE_OK
       this.changePlayerScore(this.playerScore+=1);
      }
      return;
    }

    endGame(timer){
      this.playerScore > this.machineScore ? this.resultModalText = 'You win' : this.resultModalText = 'You loose'
      this.openDialog(this.resultModalText);
      this.resetScrore();
      clearTimeout(timer)
      this.squares.forEach(square=>square.state = square.STATE_DEFAULT)
      this.setGameStatus(true)
    }

    resetScrore(){
      this.playerScore = 0;
      this.machineScore = 0;
      this.changeMachineScore(0);
      this.changePlayerScore(0);
    }
}


