import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  activeSection = signal<string>('hero');

  private observer: IntersectionObserver;
  private readonly sectionMap = new Map<Element, string>();

  constructor() {
    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
      threshold: 0.3,
      rootMargin: `-${72}px 0px 0px 0px`,
    });
  }

  observeSection(element: Element, sectionId: string): void {
    this.sectionMap.set(element, sectionId);
    this.observer.observe(element);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible.length > 0) {
      const sectionId = this.sectionMap.get(visible[0].target);
      if (sectionId) {
        this.activeSection.set(sectionId);
      }
    }
  }
}
