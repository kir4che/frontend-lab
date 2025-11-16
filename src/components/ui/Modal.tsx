import { useEffect } from 'react';
import { cn } from '@/utils/cn';
import XMarkIcon from '@/assets/icons/xmark.svg?react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  scrollerRef?: React.Ref<HTMLDivElement>;
  titleId?: string;
  ariaLabel?: string;
  closeOnBackdrop?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  scrollerRef,
  titleId,
  ariaLabel,
  closeOnBackdrop = true,
  containerClassName,
  contentClassName,
}) => {
  // 防止背景滾動
  useEffect(() => {
    if (!isOpen) return;
    const { body, documentElement } = document;

    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    body.style.overflow = 'hidden';
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // 按 ESC 關閉 Modal
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={closeOnBackdrop ? onClose : undefined}
      className="flex-center fixed inset-0 z-30 overflow-hidden bg-black/40 backdrop-blur max-xl:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={titleId ? undefined : ariaLabel}
    >
      <div
        className={cn('relative mx-auto w-full max-w-7xl rounded-2xl bg-white', containerClassName)}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-8 z-50"
          aria-label="關閉視窗"
        >
          <XMarkIcon className="size-5 stroke-white" />
        </button>
        <div
          ref={scrollerRef}
          className={cn('relative max-h-[80vh] overflow-auto', contentClassName)}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
