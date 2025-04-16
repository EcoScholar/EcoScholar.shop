import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Search, ChevronDown, BookmarkCheck, Download } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

const ebooksData = [
  {
    class: '11',
    books: [
      {
        id: 'physics-11',
        title: 'Physics Part 1',
        cover: 'https://images.app.goo.gl/SUU5346Cjmniki458',
        downloadUrl:
          'https://drive.google.com/file/d/1OccHg3qsM5VSLWVP80itC7uiB0_UJ9Hk/view?usp=sharing'
      },
      {
        id: 'physics-11',
        title: 'Physics Part 2',
        cover: 'https://images.app.goo.gl/b8HVBgU2efqvdrPz8',
        downloadUrl: 'https://drive.google.com/file/d/1iXMD_lL3WsB8sBSr3IWnHROkHn4n3SSZ/view?usp=sharing'
      },
      {
        id: 'Chemistry-11',
        title: 'Chemistry Part 1',
        cover: 'https://images.app.goo.gl/srsK4myXz4KH25BG6',
        downloadUrl: 'https://drive.google.com/file/d/1cfSJfU8HBAFfIj9rGprLDc0NOYOoY8m2/view?usp=sharing'
      },
      {
        id: 'Chemistry-11',
        title: 'Chemistry Part 2',
        cover: 'https://images.app.goo.gl/AkJkgSMhxmTRjmGg8',
        downloadUrl: 'https://drive.google.com/file/d/1lO1uHx5uy2GqiLw32DD8qn-sc5Retslw/view?usp=sharing'
      },
      {
        id: 'Biology-11',
        title: 'Biology',
        cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
        downloadUrl: 'https://drive.google.com/file/d/1TFKiuice5m2hIHNFevEtBUBGHVg7-yZE/view?usp=sharing'
      },
      {
        id: 'Maths-11',
        title: 'Mathematics',
        cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        downloadUrl: 'https://drive.google.com/file/d/1e22JNtsHHl6hBM_ZV8yaBJKFqqXn59Ic/view?usp=sharing'
      }
    ]
  },
  {
    class: '12',
    books: [
      {
        id: 'physics-12',
        title: 'Physics Part 1',
        cover: 'https://images.unsplash.com/photo-1632571401005-458e9d244591',
        downloadUrl: 'https://drive.google.com/file/d/1iifc-2mf2EPHCVDNnlwem4o9nO0Cyohx/view?usp=sharing'
      },
      {
        id: 'physics-12',
        title: 'Physics Part 2',
        cover: 'https://images.unsplash.com/photo-1632571401005-458e9d244591',
        downloadUrl: 'https://drive.google.com/file/d/1P1SQJsok65PjJHbmuDOcobFht-iKx_SZ/view?usp=sharing'
      },
      {
        id: 'chemistry-12',
        title: 'Chemistry Part 1',
        cover: 'https://images.unsplash.com/photo-1632571401005-458e9d244591',
        downloadUrl: 'https://drive.google.com/file/d/1c3VaSo7nQQOYsvvVdnPwU4LTliG3pIoK/view?usp=sharing'
      },
      {
        id: 'chemistry-12',
        title: 'Chemistry Part 2',
        cover: 'https://images.unsplash.com/photo-1632571401005-458e9d244591',
        downloadUrl: 'https://drive.google.com/file/d/1IAPx_JUzg7YKr2SgZyK5aqFM1kLBT0aD/view?usp=sharing'
      },
      {
        id: 'Biology-12',
        title: 'Biology Part 1',
        cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        downloadUrl: 'https://drive.google.com/file/d/1z-ydCjpHlLSCxo3WUELdJzd2uHzCQTGR/view?usp=sharing'
      },
      {
        id: 'Maths-12',
        title: 'Mathematics Part 1',
        cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        downloadUrl: 'https://drive.google.com/file/d/1mPiKBw8PVFAbOKTZdDjb6uBRoq2aWhgc/view?usp=sharing'
      },
      {
        id: 'Maths-12',
        title: 'Mathematics Part 2',
        cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        downloadUrl: 'https://drive.google.com/file/d/1TQn0Q8JuuVZm-tPAuGSv2QpdUE4tmbu5/view?usp=sharing'
      }
    ]
  }
];

export function Ebooks() {
  const { toggleBookmark } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('11');

  const filterOptions = {
    subject: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    class: ['11', '12']
  };

  const currentBooks = ebooksData.find(data => data.class === selectedClass)?.books || [];
  const filteredBooks = currentBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Book className="h-12 w-12 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Digital Library
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Access our comprehensive collection of digital textbooks for Class {selectedClass}. Download and start learning today.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col gap-4 mb-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search e-books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-blue-500/30 bg-gray-800/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {filterOptions.class.map((classNum) => (
                <button
                  key={classNum}
                  onClick={() => setSelectedClass(classNum)}
                  className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 border ${
                    selectedClass === classNum
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-800/50 backdrop-blur-sm border-blue-500/30 text-gray-300 hover:bg-gray-700/50 hover:border-blue-400/50'
                  }`}
                >
                  Class {classNum}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* E-books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/30 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400/50 transition-all duration-300"
            >
              {/* Book Cover Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500/90 to-cyan-500/90 relative overflow-hidden border-b border-blue-500/30 group-hover:from-blue-600/90 group-hover:to-cyan-600/90 transition-all duration-300">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Book className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-100 group-hover:text-blue-400 transition-colors duration-300">
                    {book.title}
                  </h3>
                  <button
                    onClick={() => toggleBookmark(book.id)}
                    className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition-all duration-300"
                  >
                    <BookmarkCheck className="h-6 w-6" />
                  </button>
                </div>

                {/* Download Button */}
                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-45 group-hover:rotate-90 transition-transform duration-500">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-blue-400/60 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">No books found</h3>
            <p className="text-gray-300">
              Try adjusting your search to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 