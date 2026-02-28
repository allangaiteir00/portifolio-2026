import { ComponentFixture, TestBed } from '@angular/core/testing';
import '../../../../../setup-vitest';
import { SectionTitleComponent } from './section-title.component';

describe('SectionTitleComponent', () => {
  let component: SectionTitleComponent;
  let fixture: ComponentFixture<SectionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render badge when provided', () => {
    fixture.componentRef.setInput('badge', 'MY BADGE');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.section-title__badge');
    expect(badge.textContent).toContain('MY BADGE');
  });

  it('should render highlighted text with gradient class', () => {
    fixture.componentRef.setInput('preText', 'Hello ');
    fixture.componentRef.setInput('highlighted', 'World');
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('.section-title__heading');
    expect(heading.textContent).toContain('Hello World');
    expect(fixture.nativeElement.querySelector('.gradient-text').textContent).toBe('World');
  });

  it('should render subtitle when provided', () => {
    fixture.componentRef.setInput('subtitle', 'This is a subtitle');
    fixture.detectChanges();
    const subtitle = fixture.nativeElement.querySelector('.section-title__subtitle');
    expect(subtitle.textContent).toBe('This is a subtitle');
  });
});
