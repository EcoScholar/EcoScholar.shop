import React, { createContext, useContext, useState, useCallback } from 'react';
import { initialMaterials } from '../../data/initialMaterials';

// Define types for better type safety
/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} content
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} StudyMaterial
 * @property {string} id
 * @property {string} title
 * @property {'ebook' | 'project' | 'notes'} type
 * @property {string} content
 * @property {string} preview
 * @property {boolean} bookmarked
 * @property {Note[]} notes
 * @property {string} subject
 * @property {string} grade
 * @property {string} language
 * @property {string} [downloadUrl]
 */

const StudyContext = createContext(null);

export function StudyProvider({ children }) {
  const [materials, setMaterials] = useState(initialMaterials);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Enhanced bookmark toggle with error handling
  const toggleBookmark = useCallback((materialId) => {
    try {
      setMaterials(prevMaterials => {
        const material = prevMaterials.find(m => m.id === materialId);
        if (!material) {
          throw new Error(`Material with ID ${materialId} not found`);
        }
        return prevMaterials.map(material =>
          material.id === materialId
            ? { ...material, bookmarked: !material.bookmarked }
            : material
        );
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Enhanced note adding with validation
  const addNote = useCallback((materialId, noteContent) => {
    try {
      if (!noteContent?.trim()) {
        throw new Error('Note content cannot be empty');
      }

      setMaterials(prevMaterials => {
        const material = prevMaterials.find(m => m.id === materialId);
        if (!material) {
          throw new Error(`Material with ID ${materialId} not found`);
        }

        const newNote = {
          id: Date.now().toString(),
          content: noteContent,
          createdAt: new Date()
        };

        return prevMaterials.map(material =>
          material.id === materialId
            ? { ...material, notes: [...material.notes, newNote] }
            : material
        );
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Add new material
  const addMaterial = useCallback((newMaterial) => {
    try {
      if (!newMaterial.title || !newMaterial.type || !newMaterial.subject) {
        throw new Error('Missing required fields for new material');
      }

      setMaterials(prevMaterials => [
        ...prevMaterials,
        {
          ...newMaterial,
          id: `${newMaterial.type}-${Date.now()}`,
          bookmarked: false,
          notes: [],
          createdAt: new Date()
        }
      ]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Delete note
  const deleteNote = useCallback((materialId, noteId) => {
    try {
      setMaterials(prevMaterials => {
        const material = prevMaterials.find(m => m.id === materialId);
        if (!material) {
          throw new Error(`Material with ID ${materialId} not found`);
        }

        return prevMaterials.map(material =>
          material.id === materialId
            ? {
                ...material,
                notes: material.notes.filter(note => note.id !== noteId)
              }
            : material
        );
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Filter materials
  const filterMaterials = useCallback(({ type, subject, grade }) => {
    return materials.filter(material => {
      const matchesType = !type || material.type === type;
      const matchesSubject = !subject || material.subject === subject;
      const matchesGrade = !grade || material.grade === grade;
      return matchesType && matchesSubject && matchesGrade;
    });
  }, [materials]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    materials,
    loading,
    error,
    toggleBookmark,
    addNote,
    deleteNote,
    addMaterial,
    filterMaterials,
    clearError
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}

export default StudyContext; 