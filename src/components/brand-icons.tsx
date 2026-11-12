// src/components/brand-icons.tsx
// Inline marks for the channels a plan reaches, as the dashboard's Channels
// tab draws them (dashboard-api0/src/components/connectors/brand-icons.tsx).

import React from 'react';

export const WhatsAppMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.88L4 20l4.24-1.11a7.9 7.9 0 003.8.97h.01a7.94 7.94 0 007.94-7.93 7.9 7.9 0 00-2.29-5.6zM12.05 18.4a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.66.67-2.44-.16-.25a6.58 6.58 0 01-1.02-3.53 6.6 6.6 0 1113.2 0 6.6 6.6 0 01-6.59 6.62zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.19-.5.64-.62.78-.11.13-.23.15-.42.05-.2-.1-.83-.31-1.58-.98-.58-.52-.98-1.17-1.09-1.36-.11-.2-.01-.3.09-.4.09-.1.2-.23.3-.35.1-.11.13-.19.2-.32.06-.13.03-.24-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.24-.18.19-.68.66-.68 1.62s.7 1.88.79 2.01c.1.13 1.36 2.08 3.31 2.91.46.2.82.32 1.1.41.46.15.88.13 1.21.08.37-.06 1.17-.48 1.33-.94.16-.46.16-.86.11-.94-.05-.09-.18-.14-.38-.24z" />
  </svg>
);

export const TelegramMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M21.5 3.5L2.9 10.9c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.8-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.4-1.8-1.2-1.3zM8.5 14.2l9.5-6c.4-.3.8 0 .5.3l-8 7.4-.3 3.2-1.7-4.9z" />
  </svg>
);

/** A plain "T" tile with a person beside it — evokes Teams without copying its logo. */
export const TeamsMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <circle cx="18.5" cy="6.5" r="2.5" />
    <path d="M15.5 10h5.5a1 1 0 011 1v4.5a3.5 3.5 0 01-5.6 2.8c.07-.4.1-.8.1-1.3V10z" />
    <rect x="2" y="5" width="13" height="14" rx="2" />
    <path d="M5.5 8.5h6v1.8H9.4V16H7.6v-5.7H5.5z" fill="white" />
  </svg>
);

/** A twelve-ray spark — evokes Claude without copying its logo. */
export const ClaudeMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * Math.PI) / 6;
      const r = i % 2 ? 7.5 : 10;
      return (
        <line key={i} x1={12 + 2 * Math.cos(a)} y1={12 + 2 * Math.sin(a)} x2={12 + r * Math.cos(a)} y2={12 + r * Math.sin(a)} />
      );
    })}
  </svg>
);

/** Four tiles, for Microsoft sign-in (Entra ID). Draws in its own colours. */
export const MicrosoftMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="2.5" y="2.5" width="9" height="9" fill="#F25022" />
    <rect x="12.5" y="2.5" width="9" height="9" fill="#7FBA00" />
    <rect x="2.5" y="12.5" width="9" height="9" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="9" height="9" fill="#FFB900" />
  </svg>
);

/** A two-stroke "A", for Azure services. */
export const AzureMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M9 3h5.2L7.4 21H2z" />
    <path d="M15.2 7.5L22 21H9.8l6.1-1.9-3.3-5.6z" />
  </svg>
);

/** A plain "G", for Google sign-in. */
export const GoogleMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <path d="M19.5 12h-7" />
    <path d="M19.5 12a7.5 7.5 0 11-2.2-5.3" />
  </svg>
);
