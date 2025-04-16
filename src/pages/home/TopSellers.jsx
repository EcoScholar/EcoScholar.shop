import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Stationary", "Special Feature Items", "Class 1-5", "Class 6-10", "11 & 12", "UG/PG", "Competitive", "Business", "Technology", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
    const [screenSize, setScreenSize] = useState({
        isMobile: window.innerWidth < 768,
        isSmallMobile: window.innerWidth < 400
    });

    const {data: books = []} = useFetchAllBooksQuery();
  
    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase());

    // Handle responsive layout
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                isMobile: window.innerWidth < 768,
                isSmallMobile: window.innerWidth < 400
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='top-sellers-container overflow-hidden px-1.5 sm:px-2 md:px-4'>
            <h2 className={`top-sellers-heading ${screenSize.isSmallMobile ? 'text-lg' : screenSize.isMobile ? 'text-xl' : 'text-2xl'} font-semibold ${screenSize.isSmallMobile ? 'mb-2' : screenSize.isMobile ? 'mb-3' : 'mb-4'}`}>
                Top Sellers
            </h2>
            {/* category filtering */}
            <div className={`${screenSize.isSmallMobile ? 'mb-2' : screenSize.isMobile ? 'mb-4' : 'mb-8'} flex items-center`}>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" 
                    id="category" 
                    className={`category-select ${screenSize.isSmallMobile ? 'text-xs' : screenSize.isMobile ? 'text-sm' : 'text-base'} ${screenSize.isSmallMobile ? 'p-0.5' : screenSize.isMobile ? 'p-1' : 'p-2'} rounded`}>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 xs:gap-1.5 sm:gap-2 md:gap-6">
                {
                    filteredBooks.length > 0 && filteredBooks.slice(0, 10).map((book, index) => (
                        <div key={index} className={`h-full border border-gray-200 overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-center ${screenSize.isSmallMobile ? 'max-w-[170px] mx-auto' : ''}`}>
                            <BookCard book={book} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TopSellers
