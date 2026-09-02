import { createRoot } from 'react-dom/client';
import { describe, it, expect } from '@jest/globals';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<App />);
    expect(div).toBeDefined();
  });
});
