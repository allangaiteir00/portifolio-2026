export interface Skill {
  readonly name: string;
  readonly level: number; // 0-100
  readonly category: SkillCategory;
  readonly icon?: string;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'cloud'
  | 'database'
  | 'devops'
  | 'methodology';

export interface SkillGroup {
  readonly category: SkillCategory;
  readonly label: string;
  readonly icon: string;
  readonly skills: Skill[];
}
