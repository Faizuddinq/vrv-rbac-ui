import React from 'react'

// Pagination Component - Handles page navigation
const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  
    // Generate page numbers based on the current page
    const generatePageNumbers = () => {
      const pageNumbers = [];
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
  
      // Adjust the start page if we're near the beginning
      if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
      }
      // Adjust the end page if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 4, 1);
      }
  
      // Generate page numbers from startPage to endPage
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
  
      return pageNumbers;
    };
  
    return (
      <div className='flex justify-center items-center mt-4'>
        <div className='flex gap-6 pb-12 md:w-1/3 justify-between items-center mt-4'>
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-blue-800 text-white rounded disabled:opacity-50'
          >
            {"< "}
          </button>
          <div className='flex space-x-2'>
            {/* Display page number buttons */}
            {generatePageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                {page}
              </button>
            ))}
          </div>
          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-blue-800 text-white rounded disabled:opacity-50'
          >
            {" >"}
          </button>
        </div>
      </div>
    );
  };

export default Pagination