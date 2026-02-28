export interface TimelineItem {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly description: string;
  readonly achievements: string[];
  readonly tags: string[];
  readonly isCurrent: boolean;
}
