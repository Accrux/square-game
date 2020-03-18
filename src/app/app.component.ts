import {
  Component,
  ViewChildren,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit
} from "@angular/core";
import { SquareComponent } from "./square/square.component";
import {GameService} from './services/game.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChildren(SquareComponent) squares: Array<SquareComponent>;
  squaresAmount: number = 100;
  squaresArr = [];
  childsReady:boolean = false;
  gameStarted:boolean = false;
  gameEnd: boolean;
  delay: number;

  constructor(private cdr: ChangeDetectorRef, private gameService:GameService) {
    for (let i = 0; i <= this.squaresAmount - 1; i++) {
      this.squaresArr.push({ index: i });
    }
    
  }

  ngAfterViewInit() {
    this.childsCreated();
    this.cdr.detectChanges();
  }

  ngOnInit(){
    this.gameService.currentGameFinised.subscribe(status => this.childsReady = status)
   }
  
  childsCreated() {
    this.childsReady = true;
  }

    startGame(delay:string){
      this.delay = parseInt(delay);
      this.childsReady = false;
      this.gameService.startGame(this.squares, this.delay);
    }

}
