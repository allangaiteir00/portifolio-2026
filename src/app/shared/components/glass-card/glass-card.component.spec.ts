import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import '../../../../../setup-vitest';
import { GlassCardComponent } from './glass-card.component';

@Component({
  standalone: true,
  imports: [GlassCardComponent],
  template: `<app-glass-card>Test Content</app-glass-card>`,
})
class TestHostComponent {}

describe('GlassCardComponent', () => {
  it('should render content via ng-content', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, GlassCardComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test Content');
  });

  it('should apply/remove hoverable class based on input', async () => {
    await TestBed.configureTestingModule({
      imports: [GlassCardComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(GlassCardComponent);
    const component = fixture.componentInstance;

    // Test default
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.glass-card');
    expect(card.classList.contains('hoverable')).toBe(true);

    // Test false
    fixture.componentRef.setInput('hoverable', false);
    fixture.detectChanges();
    expect(card.classList.contains('hoverable')).toBe(false);

    // Test true
    fixture.componentRef.setInput('hoverable', true);
    fixture.detectChanges();
    expect(card.classList.contains('hoverable')).toBe(true);
  });
});
