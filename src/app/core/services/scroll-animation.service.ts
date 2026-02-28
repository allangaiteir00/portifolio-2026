import { Injectable, OnDestroy } from '@angular/core';

export interface ScrollEntry {
    element: Element;
    onEnter: () => void;
    onLeave?: () => void;
}

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService implements OnDestroy {
    private observer: IntersectionObserver;
    private readonly entryMap = new Map<Element, ScrollEntry>();

    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
        );
    }

    observe(entry: ScrollEntry): void {
        this.entryMap.set(entry.element, entry);
        this.observer.observe(entry.element);
    }

    unobserve(element: Element): void {
        this.observer.unobserve(element);
        this.entryMap.delete(element);
    }

    ngOnDestroy(): void {
        this.observer.disconnect();
    }

    private handleIntersection(entries: IntersectionObserverEntry[]): void {
        for (const entry of entries) {
            const registered = this.entryMap.get(entry.target);
            if (!registered) continue;

            if (entry.isIntersecting) {
                registered.onEnter();
            } else if (registered.onLeave) {
                registered.onLeave();
            }
        }
    }
}
