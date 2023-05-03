import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  min = 5;
  max = 10;

  constructor(private gameService: GameService) {}

  startNewRound() {
    this.gameService.min = this.min;
    this.gameService.max = this.max;
    this.gameService.nextRound(this.min, this.max);
  }
}
