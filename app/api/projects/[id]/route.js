import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    
    // Validate that id is a number
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;

    try {
      const project = await prisma.project.update({
        where: { id: projectId },
        data: {
          title,
          description,
          imageUrl,
          projectUrl,
          githubUrl,
          technologies
        }
      });

      return NextResponse.json(project);
    } catch (updateError) {
      if (updateError.code === 'P2025') {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      throw updateError;
    }
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    try {
      await prisma.project.delete({
        where: { id: projectId }
      });

      return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (deleteError) {
      if (deleteError.code === 'P2025') {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      throw deleteError;
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}