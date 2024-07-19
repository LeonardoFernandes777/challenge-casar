import '@testing-library/jest-dom';

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();

  // Mock do IntersectionObserver
  global.IntersectionObserver = jest.fn(function(callback) {
    this.callback = callback;
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  });
});
