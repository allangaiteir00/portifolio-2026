import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss'],
})
export class SnakeGameComponent implements OnInit, OnDestroy {
  readonly gridSize = 15;
  readonly defaultSpeed = 100; // Increased base speed

  protected isVisible = signal<boolean>(false);
  protected snake = signal<Position[]>([{ x: 7, y: 7 }]);
  protected food = signal<Position>({ x: 3, y: 3 });
  protected direction = signal<Direction>('RIGHT');
  protected isGameOver = signal<boolean>(false);
  protected isPlaying = signal<boolean>(false);
  protected score = signal<number>(0);
  protected highScore = signal<number>(0);
  protected showNewRecord = signal<boolean>(false);

  protected gridRows = Array(this.gridSize).fill(0);

  private audioCtx: AudioContext | null = null;
  private reqAnimFrameId = 0;
  private lastRenderTime = 0;
  private inputQueue: Direction[] = [];
  private db: IDBDatabase | null = null;

  ngOnInit() {
    this.initDB();
  }

  private initDB() {
    const request = indexedDB.open('portfolio-db', 1);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('game_scores')) {
        db.createObjectStore('game_scores');
      }
    };
    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.loadHighScore();
    };
  }

  private loadHighScore() {
    if (!this.db) return;
    const tx = this.db.transaction('game_scores', 'readonly');
    const store = tx.objectStore('game_scores');
    const request = store.get('snakeHighScore');
    request.onsuccess = () => {
      if (request.result) this.highScore.set(request.result);
    };
  }

  private saveHighScore(score: number) {
    if (!this.db) return;
    const tx = this.db.transaction('game_scores', 'readwrite');
    const store = tx.objectStore('game_scores');
    store.put(score, 'snakeHighScore');
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isVisible() || !this.isPlaying() || this.isGameOver()) return;

    const lastDir =
      this.inputQueue.length > 0 ? this.inputQueue[this.inputQueue.length - 1] : this.direction();

    let newDir: Direction | null = null;
    switch (event.key) {
      case 'ArrowUp':
        if (lastDir !== 'DOWN') newDir = 'UP';
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (lastDir !== 'UP') newDir = 'DOWN';
        event.preventDefault();
        break;
      case 'ArrowLeft':
        if (lastDir !== 'RIGHT') newDir = 'LEFT';
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (lastDir !== 'LEFT') newDir = 'RIGHT';
        event.preventDefault();
        break;
    }

    if (newDir && this.inputQueue.length < 3) {
      this.inputQueue.push(newDir);
    }
  }

  toggleVisibility() {
    this.isVisible.set(!this.isVisible());
    if (!this.isVisible()) {
      this.stopGame();
    }
  }

  private initAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }

  private playVictoryFanfare() {
    this.playTone(440, 'sine', 0.1);
    setTimeout(() => this.playTone(554, 'sine', 0.1), 100);
    setTimeout(() => this.playTone(659, 'sine', 0.2), 200);
    setTimeout(() => this.playTone(880, 'sine', 0.4), 300);
  }

  startGame() {
    this.initAudio();
    this.snake.set([{ x: 7, y: 7 }]);
    this.direction.set('RIGHT');
    this.inputQueue = [];
    this.score.set(0);
    this.isGameOver.set(false);
    this.showNewRecord.set(false);
    this.isPlaying.set(true);
    this.spawnFood();

    if (this.reqAnimFrameId) cancelAnimationFrame(this.reqAnimFrameId);
    this.lastRenderTime = performance.now();
    this.reqAnimFrameId = requestAnimationFrame((t) => this.loop(t));
  }

  stopGame() {
    this.isPlaying.set(false);
    if (this.reqAnimFrameId) cancelAnimationFrame(this.reqAnimFrameId);
  }

  private loop(currentTime: number) {
    if (!this.isPlaying()) return;
    this.reqAnimFrameId = requestAnimationFrame((t) => this.loop(t));

    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    const speedInSeconds = this.defaultSpeed / 1000;

    if (secondsSinceLastRender < speedInSeconds) return;

    this.lastRenderTime = currentTime;
    this.updateSnake();
  }

  private updateSnake() {
    if (this.inputQueue.length > 0) {
      this.direction.set(this.inputQueue.shift()!);
    }

    const current = this.snake();
    const head = current[0];
    const dx = this.direction() === 'RIGHT' ? 1 : this.direction() === 'LEFT' ? -1 : 0;
    const dy = this.direction() === 'DOWN' ? 1 : this.direction() === 'UP' ? -1 : 0;

    const newHead = { x: head.x + dx, y: head.y + dy };

    // Check wall collisions
    if (
      newHead.x < 0 ||
      newHead.x >= this.gridSize ||
      newHead.y < 0 ||
      newHead.y >= this.gridSize
    ) {
      this.gameOver();
      return;
    }
    // Check self collisions
    if (current.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      this.gameOver();
      return;
    }

    const newSnake = [newHead, ...current];
    if (newHead.x === this.food().x && newHead.y === this.food().y) {
      this.score.update((s) => s + 10);
      this.playTone(600, 'sine', 0.1);
      this.spawnFood();
    } else {
      newSnake.pop(); // Remove tail
    }

    this.snake.set(newSnake);
  }

  private spawnFood() {
    let newX = 0,
      newY = 0;
    while (true) {
      newX = Math.floor(Math.random() * this.gridSize);
      newY = Math.floor(Math.random() * this.gridSize);
      if (!this.snake().some((s) => s.x === newX && s.y === newY)) break;
    }
    this.food.set({ x: newX, y: newY });
  }

  private gameOver() {
    this.isGameOver.set(true);

    if (this.score() > this.highScore() && this.score() > 0) {
      this.highScore.set(this.score());
      this.saveHighScore(this.score());
      this.showNewRecord.set(true);
      this.playVictoryFanfare();
    } else {
      this.playTone(150, 'sawtooth', 0.5);
    }

    this.stopGame();
  }

  protected isSnake(x: number, y: number): boolean {
    return this.snake().some((s) => s.x === x && s.y === y);
  }

  protected isHead(x: number, y: number): boolean {
    const head = this.snake()[0];
    return head.x === x && head.y === y;
  }

  ngOnDestroy() {
    this.stopGame();
  }
}
