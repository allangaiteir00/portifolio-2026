export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface SnakeGameState {
  readonly snake: readonly Position[];
  readonly food: Position;
  readonly direction: Direction;
  readonly isGameOver: boolean;
  readonly score: number;
  readonly isPlaying: boolean;
}
