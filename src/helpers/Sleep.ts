/**
 *
 * @param ms Time to sleep in ms
 * @returns Promise<void>
 *
 * Use this for delays. E.g. await delay(1000) waits for a second.
 */
export default function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
