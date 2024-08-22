"use client"; // Add this line at the top

import React, { useState } from 'react';

const ToggleButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div
                onClick={toggleMenu}
                className="relative w-12 h-12 flex items-center justify-center cursor-pointer"
            >
                <span
                    className={`block w-8 h-0.5 bg-black absolute transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-45 translate-y-0' : 'top-3'
                    }`}
                ></span>
                <span
                    className={`block w-8 h-0.5 bg-black absolute transition-transform duration-300 ease-in-out ${
                        isOpen ? 'opacity-0' : 'top-5'
                    }`}
                ></span>
                <span
                    className={`block w-8 h-0.5 bg-black absolute transition-transform duration-300 ease-in-out ${
                        isOpen ? '-rotate-45 -translate-y-0' : 'top-7'
                    }`}
                ></span>
            </div>
        </div>
    );
};

export default ToggleButton;
