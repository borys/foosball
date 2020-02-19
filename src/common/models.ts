export enum ExperienceLevel {
  BEGINNER = 'Beginner',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export enum Teams {
  TEAM_A,
  TEAM_B
}

export interface PlayerGameResult {
  player: Player;
  score: number;
}

export type NullablePlayerGameResult = PlayerGameResult | null;

export type GameId = number;
export interface Game {
  id?: GameId;
  [Teams.TEAM_A]: NullablePlayerGameResult[];
  [Teams.TEAM_B]: NullablePlayerGameResult[];
}

export type PlayerId = number;
export interface Player {
  id: PlayerId;
  name: string;
  level: ExperienceLevel;
  victories: number;
  goalsScored: number;
  gamesPlayed: number;
  email: string;
  photo: string;
}
