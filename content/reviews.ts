/**
 * Real reviews only. The reviews section stays hidden until this array has entries.
 * Never add a testimonial that didn't come from a real customer.
 */
export type Review = { name: string; business: string; quote: string; source?: string };
export const reviews: Review[] = [];
