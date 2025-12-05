'use client';

import { useState } from 'react';
import TechnologyInput from './TechnologyInput';

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    technologies: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }
    if (formData.imageUrl && !validateUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    if (formData.projectUrl && !validateUrl(formData.projectUrl)) {
      newErrors.projectUrl = 'Please enter a valid URL';
    }
    if (formData.githubUrl && !validateUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await onSubmit(formData);
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Project Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={errors.description ? 'border-red-500' : ''}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <TechnologyInput
          technologies={formData.technologies}
          onChange={(techs) => handleChange('technologies', techs)}
          error={errors.technologies}
        />

        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            className={errors.imageUrl ? 'border-red-500' : ''}
          />
          {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
        </div>

        <div>
          <label htmlFor="projectUrl">Project URL</label>
          <input
            id="projectUrl"
            type="text"
            value={formData.projectUrl}
            onChange={(e) => handleChange('projectUrl', e.target.value)}
            className={errors.projectUrl ? 'border-red-500' : ''}
          />
          {errors.projectUrl && <p className="error">{errors.projectUrl}</p>}
        </div>

        <div>
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            id="githubUrl"
            type="text"
            value={formData.githubUrl}
            onChange={(e) => handleChange('githubUrl', e.target.value)}
            className={errors.githubUrl ? 'border-red-500' : ''}
          />
          {errors.githubUrl && <p className="error">{errors.githubUrl}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Project...' : 'Create Project'}
        </button>
        <button type="button" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
      </form>
    </div>
  );
}