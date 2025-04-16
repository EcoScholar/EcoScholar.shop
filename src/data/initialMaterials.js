/**
 * Initial study materials data
 * @type {import('../context/StudyContext').StudyMaterial[]}
 */
export const initialMaterials = [
  {
    id: 'ebook-1',
    title: 'NCERT Physics Class 12',
    type: 'ebook',
    content: 'Full content here...',
    preview: 'Chapter 1: Electric Charges and Fields...',
    bookmarked: false,
    notes: [],
    subject: 'Physics',
    grade: '12th',
    language: 'English',
    downloadUrl: '/assets/books/ncert-physics-12.pdf',
    createdAt: new Date('2024-03-14')
  },
  {
    id: 'ebook-2',
    title: 'NCERT Chemistry Class 11',
    type: 'ebook',
    content: 'Full content here...',
    preview: 'Chapter 1: Some Basic Concepts of Chemistry...',
    bookmarked: false,
    notes: [],
    subject: 'Chemistry',
    grade: '11th',
    language: 'English',
    downloadUrl: '/assets/books/ncert-chemistry-11.pdf',
    createdAt: new Date('2024-03-14')
  },
  {
    id: 'project-1',
    title: 'Science Fair Project Guide',
    type: 'project',
    content: 'Project guide content...',
    preview: 'How to structure your science project...',
    bookmarked: false,
    notes: [],
    subject: 'Science',
    grade: '11th',
    language: 'English',
    createdAt: new Date('2024-03-14')
  },
  {
    id: 'notes-1',
    title: 'Chemistry Organic Compounds',
    type: 'notes',
    content: 'Detailed notes content...',
    preview: 'Introduction to Organic Chemistry...',
    bookmarked: false,
    notes: [],
    subject: 'Chemistry',
    grade: '12th',
    language: 'English',
    createdAt: new Date('2024-03-14')
  }
]; 