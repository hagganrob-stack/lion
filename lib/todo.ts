/** True for unfinished placeholder copy (strings that start with TODO_). Never shown to the public. */
export const isTodo = (s?: string) => !s || s.startsWith("TODO_");
/** Review banners (legal templates etc.) show everywhere except the live production site. */
export const showReviewNotes = process.env.VERCEL_ENV !== "production";
