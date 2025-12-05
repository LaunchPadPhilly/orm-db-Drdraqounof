import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // Clear existing data
  await prisma.project.deleteMany({});
  console.log('Database cleared');

  // Create a project with a known ID for update tests
  const project1 = await prisma.project.create({
    data: {
      id: 1,
      title: 'Test Project',
      description: 'Seeded for update test',
      technologies: ['Test'],
      imageUrl: '',
      projectUrl: '',
      githubUrl: ''
    },
  });
  const project2 = await prisma.project.create({
    data: {
      title: 'Fitness Website',
      description: 'Designed a modern, responsive website prototype with accessible UI elements. Created mobile and desktop versions for consistent cross-device experience.',
      technologies: ['Figma', 'UI/UX Design', 'Responsive Design', 'Prototyping'],
      imageUrl: 'https://placehold.co/600x400',
      projectUrl: 'https://example.com/fitness-site',
      githubUrl: 'https://github.com/example/fitness-site',
    },
  });
  const project3 = await prisma.project.create({
    data: {
      title: 'Cooking Website',
      description: 'Developed a responsive recipe site with intuitive navigation and clean layout. Designed UI in Figma and built the front-end using HTML and CSS.',
      technologies: ['HTML', 'CSS', 'Figma', 'Responsive Design'],
      imageUrl: 'https://placehold.co/600x400',
      projectUrl: 'https://example.com/cooking-site',
      githubUrl: 'https://github.com/example/cooking-site',
    },
  });

  console.log('Created projects:', [project1, project2, project3]);

  // Fetch and display all projects
  const allProjects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log('\nAll projects in database:');
  console.log(JSON.stringify(allProjects, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

