import { ComponentFixture, TestBed } from '@angular/core/testing';
import '../../../../../setup-vitest';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct variant and size classes', () => {
    fixture.componentRef.setInput('variant', 'outline');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('variant-outline')).toBe(true);
    expect(button.classList.contains('size-lg')).toBe(true);
  });

  it('should set button type', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('submit');
  });

  it('should be disabled when input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should render icon when provided', () => {
    const mockIcon = '<i class="test-icon"></i>';
    fixture.componentRef.setInput('icon', mockIcon);
    fixture.detectChanges();

    const iconSpan = fixture.nativeElement.querySelector('.btn__icon');
    expect(iconSpan).toBeTruthy();
    expect(iconSpan.innerHTML).toContain('test-icon');
  });
});
