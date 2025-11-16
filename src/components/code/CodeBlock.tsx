import { useState, useRef, useEffect, useCallback } from 'react';
import type { Language } from 'prism-react-renderer';

import HighlightedCode from './HighlightedCode';
import { oneDarkProTheme } from '@/styles/oneDarkProTheme';

import CopyIcon from '@/assets/icons/copy.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';

type CodeBlockProps = {
  code: string;
  fileName: string;
  language?: Language;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, fileName, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCopyTimeout = () => {
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }
  };

  const handleCopy = useCallback(async () => {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      typeof navigator === 'undefined'
    )
      return;

    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code);
      else {
        const el = document.createElement('textarea');
        el.value = code;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        el.setAttribute('readonly', 'true');
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }

      setCopied(true);
      clearCopyTimeout();
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err: unknown) {
      console.error('複製程式碼失敗：', err);
    }
  }, [code]);

  useEffect(() => {
    return () => {
      clearCopyTimeout();
    };
  }, []);

  return (
    <div className="relative max-h-[80vh] overflow-hidden rounded-lg border border-gray-700/50 bg-gray-900 shadow-2xl shadow-gray-900/50">
      <div className="flex-between-center border-b border-gray-700/50 bg-gray-800 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-red-500/80" />
            <div className="size-3 rounded-full bg-yellow-500/80" />
            <div className="size-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm font-medium text-gray-300">{fileName}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs font-medium text-gray-300 hover:text-white"
          aria-label={copied ? '已複製程式碼' : '複製程式碼'}
        >
          {copied ? (
            <CheckIcon className="size-4 stroke-white" />
          ) : (
            <CopyIcon className="size-4 stroke-white" />
          )}
          {copied ? '已複製' : '複製'}
          <span className="sr-only" aria-live="polite">
            {copied ? '程式碼已複製' : ''}
          </span>
        </button>
      </div>
      <div className="code-scrollbar max-h-[calc(80vh-52px)] overflow-x-hidden overflow-y-auto p-4">
        <HighlightedCode
          code={code}
          language={language}
          theme={oneDarkProTheme}
          lineWrapperClassName="group gap-4 px-2 py-0.5 transition-colors hover:bg-gray-700/50"
          lineNumberClassName="sticky left-0 w-10 group-hover:text-gray-300"
        />
      </div>
    </div>
  );
};

export default CodeBlock;
