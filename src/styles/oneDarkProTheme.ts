import type { PrismTheme } from 'prism-react-renderer';

export const oneDarkProTheme: PrismTheme = {
  plain: {
    backgroundColor: '#282c34',
    color: '#abb2bf',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#5c6370', fontStyle: 'italic' },
    },
    {
      types: ['namespace'],
      style: { opacity: 0.7 },
    },
    {
      types: ['string', 'attr-value'],
      style: { color: '#98c379' },
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: '#abb2bf' },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: { color: '#d19a66' },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: { color: '#c678dd' },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: { color: '#e06c75' },
    },
    {
      types: ['function-variable'],
      style: { color: '#61afef' },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: { color: '#e06c75' },
    },
  ],
};
