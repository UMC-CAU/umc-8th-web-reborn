interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    maxPage?: number;
}

export default function Pagination({ currentPage, onPageChange, maxPage = 100 } : PaginationProps) : React.ReactElement {
    return (
        <div className="flex justify-center items-center gap-4 mt-8 mb-8">
            <button 
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                이전
            </button>
            <span className="text-lg">{currentPage}</span>
            <button 
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === maxPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                다음
            </button>
        </div>
    );
} 