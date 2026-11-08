import { describe, expect, it } from 'vitest';
import { exportToSVG } from '../../../src';

const viewBoxes = [
  '10 20 300 400',
  '10,20,300,400',
  '10, 20, 300, 400',
  '10\t20\t300\t400',
  '10\n20\r300\t400',
  '10  20  300  400',
  ' 10 20 300 400 ',
  ' 10 ,\t20  300,400 ',
];

describe('exportToSVG viewBox separators', () => {
  it.each(viewBoxes)('preserves dimensions for %j', async (viewBox) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', viewBox);
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '30');
    rect.setAttribute('height', '40');
    svg.appendChild(rect);

    const exported = await exportToSVG(svg, { embedResources: false });

    expect(exported.getAttribute('width')).toBe('300');
    expect(exported.getAttribute('height')).toBe('400');
    expect(exported.getAttribute('viewBox')).toBe(viewBox);
    expect(svg.hasAttribute('width')).toBe(false);
    expect(svg.hasAttribute('height')).toBe(false);
    expect(svg.getAttribute('viewBox')).toBe(viewBox);
  });
});
