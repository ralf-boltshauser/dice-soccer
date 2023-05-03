import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService, Round, Team } from 'src/app/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  displayedColumns: string[] = ['zuf', 'anw'];

  data: CombinedRound[] = [];

  isAdmin = false;

  lastRoundActive: boolean = false;

  teams: Team[] = [];
  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.url.subscribe((url) => {
      console.log(url);
      this.isAdmin = url[0].path == 'admin';
    });
    gameService.getTeams().subscribe((teams) => {
      this.lastRoundActive = true;
      teams.forEach((team) => {
        if (team.rounds.length == 0) {
          this.lastRoundActive = false;
        } else {
          if (team.rounds[team.rounds.length - 1].won == true) {
            this.lastRoundActive = false;
          }
        }
      });

      this.teams = teams;
      this.data = teams[0].rounds
        .map((round, index) => {
          return {
            zuf: round,
            anw: teams[1].rounds[index],
          };
        })
        .reverse();
    });
  }

  getTotalWins(index: number) {
    return this.teams[index].rounds.filter((round) => round.won).length;
  }

  setWin(index: number) {
    this.gameService.roundWon(index);
    this.gameService.nextRound();
  }
}

export interface CombinedRound {
  zuf: Round;
  anw: Round;
}
