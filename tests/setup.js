// Polyfills for jsdom that don't implement certain browser APIs

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock IntersectionObserver
class IntersectionObserver {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.elements = [];
    }
    observe(element) {
        this.elements.push(element);
    }
    unobserve(element) {
        this.elements = this.elements.filter(el => el !== element);
    }
    disconnect() {
        this.elements = [];
    }
}

global.IntersectionObserver = IntersectionObserver;

// Mock requestAnimationFrame
if (typeof window.requestAnimationFrame === 'undefined') {
    window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
}
