export default function LoadingSpinner() : React.ReactElement {
    return (
        <div className="size-12 animate-spin rounded-full border-4 border-t-transparent
        border-b-transparent border-r-transparent border-l-transparent
        border-r-primary-500 flex justify-center items-center h-screen">
            <span className="sr-only">Loading...</span>
        </div>
    );
}
