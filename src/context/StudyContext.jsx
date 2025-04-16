import React, { createContext, useContext, useState, useCallback } from 'react';
import { initialMaterials } from '../data/initialMaterials';

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

  const addMaterial = useCallback((material) => {
    setMaterials((prev) => [...prev, material]);
  }, []);

  const updateMaterial = useCallback((id, updates) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id ? { ...material, ...updates } : material
      )
    );
  }, []);

  const deleteMaterial = useCallback((id) => {
    setMaterials((prev) => prev.filter((material) => material.id !== id));
  }, []);

  const toggleBookmark = useCallback((id) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id
          ? { ...material, bookmarked: !material.bookmarked }
          : material
      )
    );
  }, []);

  const addNote = useCallback((materialId, note) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === materialId
          ? {
              ...material,
              notes: [...(material.notes || []), note],
            }
          : material
      )
    );
  }, []);

  const value = {
    materials,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    toggleBookmark,
    addNote,
  };

  return (
    <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
} 