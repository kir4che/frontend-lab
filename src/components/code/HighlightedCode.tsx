import { Highlight, type Language, type PrismTheme } from 'prism-react-renderer';
import { cn } from '@/utils/cn';

type HighlightedCodeProps = {
  code: string;
  language?: Language;
  theme: PrismTheme;
  className?: string;
  lineWrapperClassName?: string;
  showLineNumbers?: boolean;
  lineNumberClassName?: string;
};

const HighlightedCode: React.FC<HighlightedCodeProps> = ({
  code,
  language = 'tsx',
  theme,
  className,
  lineWrapperClassName,
  showLineNumbers = true,
  lineNumberClassName,
}) => (
  <Highlight code={code} language={language} theme={theme}>
    {({ tokens, getLineProps, getTokenProps }) => (
      <pre
        className={cn(
          'm-0 min-w-full overflow-x-hidden font-mono text-sm leading-relaxed',
          className,
        )}
        style={{ tabSize: 2 }}
      >
        {tokens.map((line, lineIndex) => (
          <div
            key={lineIndex}
            {...getLineProps({ line })}
            className={cn('flex items-start gap-3', lineWrapperClassName)}
          >
            {showLineNumbers && (
              <span
                className={cn(
                  'text-xs leading-snug text-gray-500 tabular-nums select-none',
                  lineNumberClassName,
                )}
                aria-hidden="true"
              >
                {lineIndex + 1}
              </span>
            )}
            <div className="flex-1">
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} {...getTokenProps({ token })} />
              ))}
            </div>
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default HighlightedCode;
