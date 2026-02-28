import { ComponentFixture, TestBed } from '@angular/core/testing';
import '../../../../../setup-vitest';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render social links', () => {
    const links = fixture.nativeElement.querySelectorAll('.footer__link');
    expect(links.length).toBe(3); // LinkedIn, GitHub, Email
  });

  it('should render copyright year 2026', () => {
    const copy = fixture.nativeElement.querySelector('.footer__copy');
    expect(copy.textContent).toContain('2026');
  });
});
