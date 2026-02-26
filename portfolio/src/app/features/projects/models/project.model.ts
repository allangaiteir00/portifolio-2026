export interface Project {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly longDescription: string;
    readonly tags: string[];
    readonly links: ProjectLinks;
    readonly featured: boolean;
    readonly category: ProjectCategory;
}

export interface ProjectLinks {
    readonly github?: string;
    readonly live?: string;
    readonly demo?: string;
}

export type ProjectCategory = 'saas' | 'fintech' | 'portfolio' | 'api' | 'all';
