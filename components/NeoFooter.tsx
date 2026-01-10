'use client';

import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from './constants';

export default function NeoFooter() {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = new Intl.DateTimeFormat('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(now);
            setCurrentTime(istTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="mt-auto border-t-4 border-black bg-white py-8 text-neo-text">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

                {/* Left: Branding */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black mb-2">©PDV</h1>
                    <p className="font-bold text-lg">
                        Prabhudayal Vaishnav.
                    </p>
                    <span className="text-gray-500 font-medium text-sm uppercase tracking-wide">
                        All Rights Reserved.
                    </span>
                </div>

                {/* Right: Location & Time */}
                <div className="text-left md:text-right">
                    <p className="font-bold text-lg">
                        Designed in India with <span className="text-primary">❤️</span>
                    </p>
                    <span className="text-sm font-mono text-gray-600">
                        {currentTime} IST (UTC+5:30)
                    </span>
                </div>

            </div>
        </footer>
    );
}
