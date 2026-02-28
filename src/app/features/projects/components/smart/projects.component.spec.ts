import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { vi } from 'vitest';
import '../../../../../../setup-vitest';
import { GithubService } from '../../services/github.service';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let githubServiceMock: any;
  let scrollSpyMock: any;

  beforeEach(async () => {
    vi.useFakeTimers();
    githubServiceMock = {
      loading: signal(false),
      repositories: signal([
        {
          id: 999,
          name: 'gh-repo',
          description: 'gh-desc',
          html_url: 'gh-url',
          language: 'TS',
          topics: ['gh-topic'],
          fork: false,
        },
      ]),
      loadRepositories: vi.fn(),
      error: signal(null),
    };

    scrollSpyMock = {
      observeSection: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        { provide: GithubService, useValue: githubServiceMock },
        { provide: ScrollSpyService, useValue: scrollSpyMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadRepositories on init', () => {
    expect(githubServiceMock.loadRepositories).toHaveBeenCalled();
  });

  it('should merge local projects and github projects', () => {
    const projects = component['allProjects']();
    expect(projects.length).toBeGreaterThan(3);
    expect(projects.some((p) => p.id === '999')).toBe(true);
  });

  it('should filter projects by category', () => {
    component['activeFilter'].set('saas');
    fixture.detectChanges();
    const filtered = component['filteredProjects']();
    expect(filtered.every((p) => p.category === 'saas')).toBe(true);
  });

  it('should update visibleCards with stagger delay', () => {
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
    expect(component['visibleCards']().size).toBeGreaterThan(0);
  });

  it('should update activeFilter after timeout in setFilter', () => {
    component['visibleCards'].set(new Set(['insight-ai']));
    component['setFilter']('fintech');

    expect(component['visibleCards']().size).toBe(0);
    expect(component['activeFilter']()).not.toBe('fintech');

    vi.advanceTimersByTime(120);
    expect(component['activeFilter']()).toBe('fintech');
  });

  it('should check card visibility', () => {
    component['visibleCards'].set(new Set(['insight-ai']));
    expect(component['isCardVisible']('insight-ai')).toBe(true);
    expect(component['isCardVisible']('other')).toBe(false);
  });
});
