import '@angular/compiler';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { vi } from 'vitest';
import 'zone.js';
import 'zone.js/testing';

// IntersectionObserver Mock
class IntersectionObserverMock {
  constructor(
    public callback: Function,
    public options: any,
  ) {
    IntersectionObserverMock.lastInstance = this;
  }
  static lastInstance: any = null;
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}

(globalThis as any).IntersectionObserver = IntersectionObserverMock;

// AudioContext Mock
class AudioContextMock {
  state = 'suspended';
  currentTime = 0;
  resume() {
    this.state = 'running';
    return Promise.resolve();
  }
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {},
    };
  }
  createGain() {
    return {
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: () => {},
    };
  }
  destination = {};
}
(globalThis as any).AudioContext = AudioContextMock;
(globalThis as any).webkitAudioContext = AudioContextMock;

// IndexedDB Mock (Simplified)
const indexedDBMock = {
  open: () => ({
    onupgradeneeded: null,
    onsuccess: null,
    onerror: null,
    result: {
      transaction: () => ({
        objectStore: () => ({
          get: () => ({ onsuccess: null }),
          put: () => ({ onsuccess: null }),
        }),
      }),
    },
  }),
};
(globalThis as any).indexedDB = indexedDBMock;

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
