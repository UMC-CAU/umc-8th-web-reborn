export default function LoadingSpinner() : React.ReactElement {
    return (
        <div className="flex justify-center items-center">
            <div className="w-12 h-12 animate-spin rounded-full border-4 border-t-transparent
            border-b-transparent border-r-transparent border-l-transparent
            border-r-red-600">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
