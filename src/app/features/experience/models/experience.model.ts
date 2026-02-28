export interface Experience {
    readonly id: string;
    readonly company: string;
    readonly role: string;
    readonly period: string;
    readonly location: string;
    readonly type: 'fulltime' | 'freelance' | 'internship';
    readonly description: string;
    readonly achievements: Achievement[];
    readonly tags: string[];
    readonly isCurrent: boolean;
    readonly logo?: string;
}

export interface Achievement {
    readonly text: string;
    readonly metric?: string;
}
