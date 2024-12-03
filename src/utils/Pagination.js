import React, { useState, useEffect } from 'react';

function Pagination({ totalRecords, currentPage, recordsLimits, setCurrentPage }) {

    const totalPages = Math.ceil(totalRecords / recordsLimits);

    // State for triggering the smooth transition
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Calculate the range of pages to show (3 pages at a time)
    const getPageRange = () => {
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(start + 2, totalPages);

        if (currentPage === 1) {
            start = 1;
            end = Math.min(3, totalPages);
        } else if (currentPage === totalPages) {
            start = Math.max(totalPages - 2, 1);
            end = totalPages;
        }

        let pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    // "Prev" button click handler
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(Math.max(1, currentPage - 1));
        }
    };

    // "Next" button click handler
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(Math.min(totalPages, currentPage + 1));
        }
    };

    return (
        <div className='flex justify-center col-span-12 text-center items-center gap-3'>
            {/* Prev Button */}
            <button
                onClick={handlePrev}
                className='py-2 px-3 rounded-md bg-product hover:bg-main duration-300'
                disabled={currentPage <= 1}
            >
                Prev
            </button>

            {/* Page buttons */}
            <div
                className={`flex gap-3`}
            >
                {getPageRange().map((page) => (
                    <button
                        key={page}
                        className={`py-2 px-3 rounded-md ${page === currentPage ? 'bg-main' : 'bg-product'} hover:bg-main duration-300`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                className='py-2 px-3 rounded-md bg-product hover:bg-main duration-300'
                disabled={currentPage >= totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
