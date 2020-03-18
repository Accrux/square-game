import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit{
  public playerScore:number=0;
  public machineScore: number = 0;
  
  constructor(private gameService : GameService){}

  ngOnInit(){
   this.gameService.currentPlayerScore.subscribe(playerScore => this.playerScore = playerScore)
   this.gameService.currentMachineScore.subscribe(machineScore => this.machineScore = machineScore)
  }
}

