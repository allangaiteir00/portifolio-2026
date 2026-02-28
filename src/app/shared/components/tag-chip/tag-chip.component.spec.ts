import { ComponentFixture, TestBed } from '@angular/core/testing';
import '../../../../../setup-vitest';
import { TagChipComponent } from './tag-chip.component';

describe('TagChipComponent', () => {
  let component: TagChipComponent;
  let fixture: ComponentFixture<TagChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagChipComponent);
    component = fixture.componentInstance;
  });

  it('should render label', () => {
    fixture.componentRef.setInput('label', 'Angular');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('Angular');
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const tag = fixture.nativeElement.querySelector('.tag');
    expect(tag.classList.contains('size-sm')).toBe(true);
  });
});
