import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Search, ChevronDown, BookmarkCheck } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

const notesData = [
  {
    class: '11',
    notes: [
      {
        id: 'physics-notes-11-1',
        title: 'Physical World & Measurement',
        subject: 'Physics',
        chapter: 'Chapter 1',
        description: 'Detailed handwritten notes covering units, measurements, and errors',
        author: 'Priyanshu Ranjan',
        downloadUrl: '#' // Add Google Drive link later
      },
      {
        id: 'chemistry-notes-11-1',
        title: 'Some Basic Concepts of Chemistry',
        subject: 'Chemistry',
        chapter: 'Chapter 1',
        description: 'Comprehensive notes on atomic structure and chemical bonding',
        author: 'Ashmin Kumar',
        downloadUrl: '#' // Add Google Drive link later
      },
      {
        id: 'maths-notes-11-1',
        title: 'Sets and Functions',
        subject: 'Mathematics',
        chapter: 'Chapter 1',
        description: 'Clear and concise notes on set theory and functions',
        author: 'Razzaq Mahammed',
        downloadUrl: '#' // Add Google Drive link later
      }
    ]
  },
  {
    class: '12',
    notes: [
      {
        id: 'physics-notes-12-1',
        title: 'Electric Charges and Fields',
        subject: 'Physics',
        chapter: 'Chapter 1',
        description: 'Detailed notes on electrostatics with solved examples',
        author: 'Priyanshu Ranjan',
        downloadUrl: '#' // Add Google Drive link later
      },
      {
        id: 'chemistry-notes-12-1',
        title: 'The Solid State',
        subject: 'Chemistry',
        chapter: 'Chapter 1',
        description: 'Complete notes on crystal structures and properties',
        author: 'Ashmin Kumar',
        downloadUrl: '#' // Add Google Drive link later
      },
      {
        id: 'maths-notes-12-1',
        title: 'Relations and Functions',
        subject: 'Mathematics',
        chapter: 'Chapter 1',
        description: 'Comprehensive notes with important formulas and examples',
        author: 'Razzaq Mahammed',
        downloadUrl: '#' // Add Google Drive link later
      }
    ]
  }
];

export function HandwrittenNotes() {
  const { toggleBookmark } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('11');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filterOptions = {
    subject: ['all', 'Physics', 'Chemistry', 'Mathematics'],
    class: ['11', '12']
  };

  const currentNotes = notesData.find(data => data.class === selectedClass)?.notes || [];
  const filteredNotes = currentNotes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <PenTool className="h-12 w-12 text-purple-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Handwritten Notes
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Access our collection of high-quality handwritten notes from top students and teachers for Class {selectedClass}.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search notes by title, chapter, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-500/30 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="flex gap-2">
                {filterOptions.class.map((classNum) => (
                  <button
                    key={classNum}
                    onClick={() => setSelectedClass(classNum)}
                    className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-colors border ${
                      selectedClass === classNum
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-gray-800 border-purple-500/30 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Class {classNum}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {filterOptions.subject.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-colors border ${
                      selectedSubject === subject
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-gray-800 border-purple-500/30 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl border border-purple-500/30 overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{note.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
                        {note.subject}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-pink-500/20 text-pink-400">
                        {note.chapter}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookmark(note.id)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <BookmarkCheck className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-gray-400 mb-4">{note.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">By {note.author}</span>
                  <a
                    href={note.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Download PDF
                    <ChevronDown className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <PenTool className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">No notes found</h3>
            <p className="text-gray-300">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 