import { ComponentFixture, TestBed } from '@angular/core/testing';
import '../../../../../../../setup-vitest';
import { SnakeGameComponent } from './snake-game.component';

describe('SnakeGameComponent', () => {
  let component: SnakeGameComponent;
  let fixture: ComponentFixture<SnakeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle visibility', () => {
    expect(component['isVisible']()).toBe(false);
    component.toggleVisibility();
    expect(component['isVisible']()).toBe(true);
  });

  it('should start game and initialize snake', () => {
    component.startGame();
    expect(component['isPlaying']()).toBe(true);
    expect(component['snake']().length).toBe(1);
    expect(component['score']()).toBe(0);
  });

  it('should handle keyboard input', () => {
    component['isVisible'].set(true);
    component['isPlaying'].set(true);

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    window.dispatchEvent(event);

    expect(component['inputQueue']).toContain('DOWN');
  });

  it('should update snake position and detect collision', () => {
    component.startGame();
    component['direction'].set('RIGHT');
    component['snake'].set([{ x: 14, y: 7 }]); // Edge of 15x15 grid

    // Manual move
    component['updateSnake']();

    expect(component['isGameOver']()).toBe(true);
    expect(component['isPlaying']()).toBe(false);
  });

  it('should eat food and increase score', () => {
    component.startGame();
    const head = component['snake']()[0];
    component['food'].set({ x: head.x + 1, y: head.y });
    component['direction'].set('RIGHT');

    component['updateSnake']();

    expect(component['score']()).toBe(10);
    expect(component['snake']().length).toBe(2);
  });

  it('should stop game on destroy', () => {
    component.startGame();
    component.ngOnDestroy();
    expect(component['isPlaying']()).toBe(false);
  });

  it('should handle self-collision', () => {
    component.startGame();
    // Create a long snake and make it bite itself
    component['snake'].set([
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 6, y: 6 },
      { x: 5, y: 6 },
      { x: 5, y: 5 },
    ]);
    component['updateSnake']();
    expect(component['isGameOver']()).toBe(true);
  });

  it('should queue multiple inputs and process them', () => {
    component.startGame();
    component['isVisible'].set(true);
    // Current move is RIGHT. Queue DOWN then LEFT
    component.handleKeyDown({ key: 'ArrowDown', preventDefault: () => {} } as any);
    component.handleKeyDown({ key: 'ArrowLeft', preventDefault: () => {} } as any);

    expect(component['inputQueue']).toEqual(['DOWN', 'LEFT']);

    component['updateSnake']();
    expect(component['direction']()).toBe('DOWN');
    expect(component['inputQueue']).toEqual(['LEFT']);

    component['updateSnake']();
    expect(component['direction']()).toBe('LEFT');
    expect(component['inputQueue']).toEqual([]);
  });

  it('should update high score and show record', () => {
    component['highScore'].set(50);
    component['score'].set(100);
    component['gameOver']();

    expect(component['highScore']()).toBe(100);
    expect(component['showNewRecord']()).toBe(true);
  });

  it('should verify snake positions with helpers', () => {
    const pos = { x: 7, y: 7 };
    component['snake'].set([pos]);

    expect(component['isSnake'](pos.x, pos.y)).toBe(true);
    expect(component['isSnake'](0, 0)).toBe(false);
    expect(component['isHead'](pos.x, pos.y)).toBe(true);
  });

  it('should remove tail when food is not eaten', () => {
    const initialLength = component['snake']().length;
    component['food'].set({ x: 0, y: 0 }); // Far away
    component['updateSnake']();
    expect(component['snake']().length).toBe(initialLength);
  });

  it('should load high score from IDB if db exists', () => {
    const mockDb = {
      transaction: vi.fn().mockReturnValue({
        objectStore: vi.fn().mockReturnValue({
          get: vi.fn().mockReturnValue({ onsuccess: null }),
        }),
      }),
    };
    component['db'] = mockDb as any;
    component['loadHighScore']();
    expect(mockDb.transaction).toHaveBeenCalled();
  });
});
