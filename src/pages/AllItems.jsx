import React, { useState, useRef, useEffect } from 'react'
import BookCard from './books/BookCard';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';
import Loading from '../n.components/Loading';

const categories = [
    "All Books", "Stationary", "Special_Features", "Class 1_5", "Class 6_10", "Class 11_12", "UG/PG", "Competitive", "Business", "Technology", "Fiction", "Horror", "Adventure"
];

const languages = ["English", "Odia","Hindi", "Bengali", "Marathi", "Telugu", "Kannada"];
const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "popularity", label: "Popularity" },
    { value: "price_low_to_high", label: "Price - Low to High" },
    { value: "price_high_to_low", label: "Price - High to Low" },
    { value: "newest", label: "Newest First" }
];

const ratings = [4, 3, 2, 1];

const AllItems = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Books");
    const [priceRange, setPriceRange] = useState({ min: 'min', max: '10000+' });
    const [selectedRating, setSelectedRating] = useState(0);
    const [sortBy, setSortBy] = useState("relevance");
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [inStock, setInStock] = useState(false);
    const [selectedPriceButton, setSelectedPriceButton] = useState(null);
    const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();
    
    const minPriceOptions = [100, 300, 500, 1000, 1500, 2000, 2500];
    const maxPriceOptions = [500, 1000, 1500, 2000, 2500, 5000];
    
    const priceRangeButtons = [
        { label: 'All', min: 'min', max: '10000+' },
        { label: 'Under ₹300', min: 'min', max: '300' },
        { label: '₹300 - ₹500', min: '300', max: '500' },
        { label: '₹500 - ₹1000', min: '500', max: '1000' },
        { label: '₹1000 - ₹2000', min: '1000', max: '2000' },
        { label: '₹2000 - ₹5000', min: '2000', max: '5000' },
        { label: 'Above ₹5000', min: '5000', max: '10000+' },
    ];
    
    const handlePriceButtonClick = (button) => {
        setSelectedPriceButton(button.label);
        setPriceRange({ min: button.min, max: button.max });
    };
    
    const isPriceButtonSelected = (button) => {
        if (selectedPriceButton === button.label) return true;
        
        if (!selectedPriceButton && 
            priceRange.min === button.min && 
            priceRange.max === button.max) {
            return true;
        }
        
        return false;
    };

    const handleLanguageToggle = (lang) => {
        if (selectedLanguages.includes(lang)) {
            setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
        } else {
            setSelectedLanguages([...selectedLanguages, lang]);
        }
    };

    const filteredBooks = books.filter(book => {
        if (!book || typeof book !== 'object') return false;

        const categoryMatch = selectedCategory === "All Books" || 
            (book.category && (
                book.category.toString().toLowerCase() === selectedCategory.toLowerCase() ||
                (selectedCategory === "Special Feature Items" && book.category.toString().toLowerCase() === "special_features")
            ));

        const bookPrice = Number(book.newPrice) || 0;
        const minFilter = priceRange.min === 'min' ? 0 : Number(priceRange.min);
        const maxFilter = priceRange.max === '10000+' ? Infinity : Number(priceRange.max);
        const priceMatch = bookPrice >= minFilter && bookPrice <= maxFilter;

        const bookRating = Number(book.rating) || 0;
        const ratingMatch = selectedRating === 0 || bookRating >= selectedRating;

        const languageMatch = selectedLanguages.length === 0 || 
            (book.language && selectedLanguages.includes(book.language));

        const stockMatch = !inStock || (book.stock && book.stock > 0);

        return categoryMatch && priceMatch && ratingMatch && languageMatch && stockMatch;
    });

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        const priceA = Number(a?.newPrice) || 0;
        const priceB = Number(b?.newPrice) || 0;
        
        switch (sortBy) {
            case "price_low_to_high":
                return priceA - priceB;
            case "price_high_to_low":
                return priceB - priceA;
            case "newest":
                const dateA = a?.createdAt ? new Date(a.createdAt) : new Date(0);
                const dateB = b?.createdAt ? new Date(b.createdAt) : new Date(0);
                return dateB - dateA;
            default:
                return 0;
        }
    });

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    
    // Close mobile filters when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                setIsMobileFiltersOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile filters are open
    useEffect(() => {
        if (isMobileFiltersOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileFiltersOpen]);

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">Error loading books. Please try again later.</p>
        </div>
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Mobile Filters Toggle Button */}
            <div className="lg:hidden sticky top-0 z-50 bg-gray-900 p-1">
                <button
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                    className="w-full flex items-center justify-center space-x-1 bg-green-600 text-white px-2 py-1 rounded text-xs"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span>Filters & Sort</span>
                </button>
            </div>

            <div className="container mx-auto px-1 lg:px-2">
                {/* Sort Bar */}
                <div className="bg-gray-900 py-1 px-2 flex flex-col lg:flex-row items-start lg:items-center text-xs mb-1">
                    <span className="text-gray-400 mb-0.5 lg:mb-0">Showing {sortedBooks.length} results</span>
                    <div className="w-full lg:w-auto lg:ml-auto flex flex-wrap items-center gap-2">
                        <span className="text-green-400">Sort By</span>
                        <div className="flex flex-wrap gap-2">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setSortBy(option.value)}
                                    className={`${sortBy === option.value ? 'text-green-400' : 'text-gray-400'} hover:text-green-300 whitespace-nowrap text-xs`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-1">
                    {/* Filters Sidebar */}
                    <aside className={`lg:relative z-40 lg:z-0 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'} transition-all duration-300 ease-in-out`}>
                        {/* Mobile Overlay - Only show when filters open */}
                        <div 
                            className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 ${isMobileFiltersOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                            onClick={() => setIsMobileFiltersOpen(false)}
                        />
                        
                        {/* Filter Content for Mobile */}
                        <div className="lg:hidden sticky top-[29px] z-40 w-full max-h-[calc(100vh-29px)] overflow-hidden bg-gray-900 shadow-lg shadow-green-900/20">
                            <div className="h-full flex flex-col">
                                {/* Mobile Close Button */}
                                <div className="sticky top-0 z-20 flex justify-between items-center p-2 border-b border-green-800 bg-gray-900">
                                    <h3 className="text-green-400 text-sm">Filters</h3>
                                    <button
                                        onClick={() => setIsMobileFiltersOpen(false)}
                                        className="text-gray-400 hover:text-white p-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Scrollable Content Container for Mobile */}
                                <div className="overflow-y-auto overscroll-contain max-h-[60vh] scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800">
                                    {/* Categories Section */}
                                    <div className="border-b border-green-800">
                                        <h4 className="sticky top-0 z-10 p-2 text-xs font-medium text-green-400 uppercase bg-gray-900/95 backdrop-blur-sm text-center">Categories</h4>
                                        <div className="px-2 pb-2 space-y-1 text-center">
                                            {categories.map((category, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`cursor-pointer hover:text-green-400 py-1 text-xs ${category === "All Books" ? "font-medium" : ""} ${selectedCategory === category ? "text-green-400" : "text-gray-300"}`}
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setIsMobileFiltersOpen(false);
                                                    }}
                                                >
                                                    {category}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range Section */}
                                    <div className="border-b border-green-800">
                                        <h4 className="sticky top-0 z-10 p-2 text-xs font-medium text-green-400 uppercase bg-gray-900/95 backdrop-blur-sm text-center">Price</h4>
                                        <div className="px-2 pb-2">
                                            <div className="flex flex-col space-y-1">
                                                {priceRangeButtons.map((button, index) => (
                                                    <button 
                                                        key={index}
                                                        onClick={() => {
                                                            handlePriceButtonClick(button);
                                                            setIsMobileFiltersOpen(false);
                                                        }}
                                                        className={`px-2 py-1 text-xs rounded flex justify-between items-center transition-colors duration-200 ${
                                                            isPriceButtonSelected(button) 
                                                            ? 'bg-green-600 text-white' 
                                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        <span>{button.label}</span>
                                                        {isPriceButtonSelected(button) && (
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Language Section */}
                                    <div className="border-b border-green-800">
                                        <h4 className="sticky top-0 z-10 p-2 text-xs font-medium text-green-400 uppercase bg-gray-900/95 backdrop-blur-sm text-center">Language</h4>
                                        <div className="px-2 pb-2 space-y-1">
                                            {languages.map((lang) => (
                                                <label key={lang} className="flex items-center cursor-pointer py-1">
                                                    <input 
                                                        type="checkbox" 
                                                        className="mr-2 h-3 w-3 accent-green-500 border-gray-400"
                                                        checked={selectedLanguages.includes(lang)}
                                                        onChange={() => {
                                                            handleLanguageToggle(lang);
                                                            setIsMobileFiltersOpen(false);
                                                        }}
                                                    />
                                                    <span className="text-xs text-gray-300">{lang}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Desktop Filter Content */}
                        <div className="hidden lg:block w-[225px] bg-gray-900 shadow-lg shadow-green-900/20">
                            <div className="h-full flex flex-col">
                                {/* Scrollable Content Container for Desktop */}
                                <div className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800">
                                    {/* Categories Section */}
                                    <div className="border-b border-green-800">
                                        <h4 className="sticky top-0 z-10 p-2 text-xs font-medium text-green-400 uppercase bg-gray-900/95 backdrop-blur-sm text-center">Categories</h4>
                                        <div className="px-2 pb-2 space-y-1 text-center">
                                            {categories.map((category, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`cursor-pointer hover:text-green-400 py-1 text-xs ${category === "All Books" ? "font-medium" : ""} ${selectedCategory === category ? "text-green-400" : "text-gray-300"}`}
                                                    onClick={() => setSelectedCategory(category)}
                                                >
                                                    {category}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range Section */}
                                    <div className="border-b border-green-800">
                                        <h4 className="sticky top-0 z-10 p-2 text-xs font-medium text-green-400 uppercase bg-gray-900/95 backdrop-blur-sm text-center">Price</h4>
                                        <div className="px-2 pb-2">
                                            <div className="flex flex-col space-y-1">
                                                {priceRangeButtons.map((button, index) => (
                                                    <button 
                                                        key={index}
                                                        onClick={() => handlePriceButtonClick(button)}
                                                        className={`px-2 py-1 text-xs rounded flex justify-between items-center transition-colors duration-200 ${
                                                            isPriceButtonSelected(button) 
                                                            ? 'bg-green-600 text-white' 
                                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        <span>{button.label}</span>
                                                        {isPriceButtonSelected(button) && (
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Language Section */}
                                    <div className="border-b border-green-800">
                                        <h4 className="sticky top-0 z-10 p-2 text-xs font-medium text-green-400 uppercase bg-gray-900/95 backdrop-blur-sm text-center">Language</h4>
                                        <div className="px-2 pb-2 space-y-1">
                                            {languages.map((lang) => (
                                                <label key={lang} className="flex items-center cursor-pointer py-1">
                                                    <input 
                                                        type="checkbox" 
                                                        className="mr-2 h-3 w-3 accent-green-500 border-gray-400"
                                                        checked={selectedLanguages.includes(lang)}
                                                        onChange={() => handleLanguageToggle(lang)}
                                                    />
                                                    <span className="text-xs text-gray-300">{lang}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Books Grid */}
                    <div className="flex-1 lg:min-h-[calc(100vh-0.5rem)]">
                        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 p-2">
                            {sortedBooks.map((book, index) => (
                                <BookCard 
                                    key={book._id || index} 
                                    book={{
                                        ...book,
                                        rating: book.rating || 4.5,
                                        ratingCount: book.ratingCount || '1,234',
                                        originalPrice: book.oldPrice || 0,
                                        discount: book.oldPrice ? Math.round(((book.oldPrice - book.newPrice) / book.oldPrice) * 100) : 0,
                                        assured: index % 3 === 0
                                    }} 
                                />
                            ))}
                        </div>

                        {sortedBooks.length === 0 && (
                            <div className="bg-gray-900 p-4 text-center shadow-sm">
                                <p className="text-gray-300 text-xs">No books found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllItems; 
