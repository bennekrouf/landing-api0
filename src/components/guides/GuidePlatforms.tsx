// src/components/guides/GuidePlatforms.tsx
//
// The small marks at the bottom right of a guide card: which products the
// guide is about, so a reader spots theirs at a glance. Keyed by guide
// number, which is the same guide in both languages.

import React from 'react';
import {
  AzureMark,
  ClaudeMark,
  GoogleMark,
  MicrosoftMark,
  TeamsMark,
  TelegramMark,
  WhatsAppMark,
} from '@/components/brand-icons';

type Platform = 'claude' | 'teams' | 'whatsapp' | 'telegram' | 'microsoft' | 'azure' | 'google';

const PLATFORMS: Record<Platform, { name: string; Mark: React.FC<{ className?: string }>; color: string }> = {
  claude: { name: 'Claude', Mark: ClaudeMark, color: 'text-[#D97757]' },
  teams: { name: 'Microsoft Teams', Mark: TeamsMark, color: 'text-[#5B5FC7]' },
  whatsapp: { name: 'WhatsApp', Mark: WhatsAppMark, color: 'text-[#25D366]' },
  telegram: { name: 'Telegram', Mark: TelegramMark, color: 'text-[#229ED9]' },
  microsoft: { name: 'Microsoft (Entra ID)', Mark: MicrosoftMark, color: '' },
  azure: { name: 'Azure', Mark: AzureMark, color: 'text-[#0078D4]' },
  google: { name: 'Google', Mark: GoogleMark, color: 'text-[#4285F4]' },
};

/** Guide number → the products it covers, the main one first. */
const GUIDE_PLATFORMS: Record<number, Platform[]> = {
  1: ['claude'],
  2: ['teams', 'azure'],
  3: ['claude', 'microsoft'],
  4: ['claude', 'teams', 'whatsapp', 'telegram'],
  5: ['azure', 'microsoft', 'claude'],
  6: ['azure', 'microsoft'],
  7: ['teams', 'azure'],
  8: ['whatsapp'],
  9: ['telegram'],
  10: ['claude', 'teams', 'whatsapp', 'telegram'],
  11: ['microsoft', 'azure', 'google'],
};

export function GuidePlatforms({ number, label }: { number: number; label: string }) {
  const platforms = GUIDE_PLATFORMS[number];
  if (!platforms?.length) return null;
  return (
    <ul aria-label={label} className="ml-auto flex items-center gap-2">
      {platforms.map((p) => {
        const { name, Mark, color } = PLATFORMS[p];
        return (
          <li key={p} title={name} className={`flex ${color}`}>
            <Mark className="h-5 w-5" />
            <span className="sr-only">{name}</span>
          </li>
        );
      })}
    </ul>
  );
}
