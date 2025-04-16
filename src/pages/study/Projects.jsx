import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ChevronDown, BookmarkCheck } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

const projectsData = [
  {
    id: 'Airline-reservation-system-java-master',
    title: 'Airline Reservation System',
    subject: 'Java',
    type: 'project',
    description: 'Source code for Airline Reservation System in java',
    downloadUrl: 'https://drive.google.com/file/d/1GW4mhJjn2bddCfZQ8S__LeI-CRF30MTJ/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1GW4mhJjn2bddCfZQ8S__LeI-CRF30MTJ/view?usp=sharing'
  },
  {
    id: 'Art-Gallary-php-master',
    title: 'Art Gallary Management System',
    subject: 'PHP',
    type: 'project',
    description: 'Source code for Art Gallary Management System in php',
    downloadUrl: 'https://drive.google.com/file/d/1iexDKI3veZb5OTXpmyl9gB26-GGkOOyn/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1iexDKI3veZb5OTXpmyl9gB26-GGkOOyn/view?usp=sharing'
  },
  {
    id: 'ATM-Simultaneous-Python-Project-master',
    title: 'ATM Simultaneous Python Project',
    subject: 'Python',
    type: 'project',
    description: 'Source code for ATM Simultaneous Python Project in python',
    downloadUrl: 'https://drive.google.com/file/d/1kGk8BJLsV2XCVl1wPGa-nvogwssy3j8u/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1kGk8BJLsV2XCVl1wPGa-nvogwssy3j8u/view?usp=sharing'
  },
  {
    id: 'Attendance-Management-System-With-JAVA-master',
    title: 'Attendance Management System With JAVA',
    subject: 'JAVA',
    type: 'project',
    description: 'Source code for Attendance Management System With JAVA in java',
    downloadUrl: 'https://drive.google.com/file/d/1bWFCAfalZ7O7HiH7h4JPV-9swTSnjGfX/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1bWFCAfalZ7O7HiH7h4JPV-9swTSnjGfX/view?usp=sharing'
  },
  {
    id: 'Bus-Ticketing-System-Java-Jsp-project-master',
    title: 'Bus Ticketing System',
    subject: 'JAVA',
    type: 'project',
    description: 'Source code for Bus Ticketing System in java',
    downloadUrl: 'https://drive.google.com/file/d/1pqRILYvEbNYRrTBK7DAS0bQ15T5qV8Pm/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1pqRILYvEbNYRrTBK7DAS0bQ15T5qV8Pm/view?usp=sharing'
  },
  {
    id: 'Car-Rental-Syatem-PHP-MYSQL-master',
    title: 'Car Rental System',
    subject: 'PHP',
    type: 'project',
    description: 'Source code for Car Rental System in php',
    downloadUrl: 'https://drive.google.com/file/d/1zMEFjQHI6eo528gbNqfgKB0gdWYRWSgt/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1zMEFjQHI6eo528gbNqfgKB0gdWYRWSgt/view?usp=sharing'
  },
  {
    id: 'Casino-Game-in-PHP-master',
    title: 'Casino Game in PHP',
    subject: 'PHP',
    type: 'project',
    description: 'Source code for Casino Game in php',
    downloadUrl: 'https://drive.google.com/file/d/1flgvU9VU2R7CtoxsK28OKt0ADEbguD-y/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1flgvU9VU2R7CtoxsK28OKt0ADEbguD-y/view?usp=sharing'
  },
  {
    id: 'College-Management-System in Php_5.5 FIXED to latest PHP version',
    title: 'College Management System in Php_5.5 FIXED to latest PHP version',
    subject: 'PHP, MYSQL',
    type: 'project',
    description: 'Source code for College Management System in php',
    downloadUrl: 'https://drive.google.com/file/d/1oUn6uBdHNtwxyiU0-KFYY-myiP6AeX0s/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1oUn6uBdHNtwxyiU0-KFYY-myiP6AeX0s/view?usp=sharing'
  },
  {
    id: 'College-Networking-Site-using-PHP-MySQL',
    title: 'College Networking Site using PHP MySQL',
    subject: 'PHP, MYSQL',
    type: 'project',
    description: 'Source code for College Networking Site using PHP MySQL',
    downloadUrl: 'https://drive.google.com/file/d/1dMDnZdR9FiMBCaGBMLVQDAOSPRUjB8RK/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1dMDnZdR9FiMBCaGBMLVQDAOSPRUjB8RK/view?usp=sharing'
  },
  {
    id: 'Complaint-Management-System-Project-IN-Python-master',
    title: 'Complaint Management System Project IN Python',
    subject: 'Python',
    type: 'project',
    description: 'Source code for Complaint Management System Project IN Python',
    downloadUrl: 'https://drive.google.com/file/d/1KbxjEmmVL9xiZYWXmSxgIV3hicw-Kf7L/view?usp=sharing',
    sourceCodeUrl: 'https://drive.google.com/file/d/1KbxjEmmVL9xiZYWXmSxgIV3hicw-Kf7L/view?usp=sharing'
  },
];

export function Projects() {
  const { toggleBookmark } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const filterOptions = {
    type: ['all', 'project', 'practical'],
  };

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || project.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-12 w-12 text-emerald-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Projects & Practical Notes
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Access our comprehensive collection of project guidelines and practical manuals.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects and practical notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-500/30 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="flex gap-2">
                {filterOptions.type.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-colors border ${
                      selectedType === type
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-gray-800 border-emerald-500/30 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl border border-emerald-500/30 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
              onClick={handleScrollToTop}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{project.title}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 mb-2">
                      {project.subject}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 mb-2 ml-2">
                      {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(project.id)}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <BookmarkCheck className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <a
                    href={project.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Download PDF
                    <ChevronDown className="h-4 w-4" />
                  </a>
                  {project.sourceCodeUrl && (
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Source Code
                      <ChevronDown className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 