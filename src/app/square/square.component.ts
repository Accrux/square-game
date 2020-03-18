import { 
  Component, 
  HostBinding, 
  OnInit 
} from "@angular/core";
import { GameService } from '../services/game.service';

@Component({
  selector: "app-square",
  templateUrl: "./square.component.html",
  styleUrls: ["./square.component.scss"]
})
export class SquareComponent implements OnInit {
  @HostBinding("class.flex-item")
  
  STATE_DEFAULT = 1;
  STATE_ACTIVE = 2;
  STATE_OK = 3;
  STATE_FAILED = 4;

  state = this.STATE_DEFAULT;

  get squareStateClass() {
    switch (this.state) {
      case this.STATE_ACTIVE:
        return "square-active";

      case this.STATE_OK:
        return "square-ok";

      case this.STATE_FAILED:
        return "square-failed";
    }
      
    return "";
  }

  constructor(private gameService: GameService) {}

  onClick() {
    this.gameService.onClicked(this)
  }

  ngOnInit(): void {}
}
