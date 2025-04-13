import React from 'react';

export default function Footer() : React.ReactElement {
    return (
        <div className="flex flex-col items-center justify-center">
            <footer className="w-full h-16 bg-red-600 text-white">
                <div className="flex justify-center items-center">
                    <p>Footer</p>
                </div>
            </footer>
        </div>
    );
}
