import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  teams = new BehaviorSubject<Team[]>([]);
  min: number = 5;
  max: number = 10;
  getTeams() {
    return this.teams.asObservable();
  }
  constructor() {
    let teams = [];
    teams.push({
      name: 'Zuffrey',
      rounds: [],
    });

    teams.push({
      name: 'Anwander',
      rounds: [],
    });

    this.teams.next(teams);
  }

  roundWon(teamIndex: number) {
    let teams = this.teams.getValue();

    const lastRound =
      teams[teamIndex].rounds[teams[teamIndex].rounds.length - 1];
    lastRound.won = true;

    this.teams.next(teams);
  }

  nextRound(inputMin?: number, inputMax?: number) {
    const min = inputMin || this.min;
    const max = inputMax || this.max;
    const teams = this.teams.getValue();
    let numberOfPlayers = Math.floor(Math.random() * (max - min + 1) + min);
    teams[0].rounds.push({
      numberOfPlayers,
      won: false,
    });
    numberOfPlayers = Math.floor(Math.random() * (max - min + 1) + min);
    teams[1].rounds.push({
      numberOfPlayers,
      won: false,
    });

    this.teams.next(teams);
  }
}

export interface Team {
  name: string;
  rounds: Round[];
}

export interface Round {
  numberOfPlayers: number;
  won: boolean;
}
