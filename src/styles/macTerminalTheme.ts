import type { PrismTheme } from 'prism-react-renderer';

export const macTerminalTheme: PrismTheme = {
  plain: {
    backgroundColor: '#050505',
    color: '#9EF5FF',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#4e5b66', fontStyle: 'italic' },
    },
    {
      types: ['namespace'],
      style: { opacity: 0.7 },
    },
    {
      types: ['string', 'inserted'],
      style: { color: '#9fdc7c' },
    },
    {
      types: ['function'],
      style: { color: '#7ac7ff' },
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: '#c6cdd5' },
    },
    {
      types: ['keyword', 'selector'],
      style: { color: '#ffb86c' },
    },
    {
      types: ['boolean', 'number', 'constant'],
      style: { color: '#f7768e' },
    },
  ],
};
