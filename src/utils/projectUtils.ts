// Utility function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Utility function to find project by slug
export function findProjectBySlug(projects: any[], slug: string) {
  return projects.find(project => generateSlug(project.title) === slug)
}

