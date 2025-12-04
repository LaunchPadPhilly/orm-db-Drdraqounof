import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/projects - Get all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, description, technologies, imageUrl, projectUrl, githubUrl } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      )
    }


    if (!technologies || !Array.isArray(technologies) || technologies.length === 0) {
      return NextResponse.json(
        { error: 'Technologies is required and must be a non-empty array' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        technologies,
        imageUrl: imageUrl || null,
        projectUrl: projectUrl || null,
        githubUrl: githubUrl || null
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
