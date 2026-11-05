// src/lib/plans.ts
//
// The workspace plans on sale, read from the gateway on the server at most
// hourly (GET /api/workspace-plans). None when the gateway cannot be reached.

import type { PricingPlan } from '@/components/Pricing';
import type { Rates } from '@/lib/display-currency';

const GATEWAY_URL = process.env.API0_GATEWAY_URL ?? 'https://gateway.api0.ai';

export async function fetchPlans(): Promise<{ plans: PricingPlan[]; rates: Rates }> {
  try {
    const res = await fetch(`${GATEWAY_URL}/api/workspace-plans`, { next: { revalidate: 3600 } });
    if (!res.ok) return { plans: [], rates: {} };
    const body = await res.json();
    return { plans: body.plans ?? [], rates: body.display_rates ?? {} };
  } catch {
    return { plans: [], rates: {} };
  }
}
