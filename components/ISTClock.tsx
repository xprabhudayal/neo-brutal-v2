'use client';

import { useState, useEffect } from 'react';
import { Matrix, digits } from '@/components/ui/matrix';

// Colon pattern for clock separator (7 rows x 3 cols) - wider spacing
const colonPattern = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
];

// Blinking colon animation
const colonBlink = [
    colonPattern,
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
];

export default function ISTClock() {
    const [time, setTime] = useState<{ hours: string; minutes: string } | null>(null);
    const [colonFrame, setColonFrame] = useState(0);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Convert to IST (UTC+5:30)
            const istOffset = 5.5 * 60 * 60 * 1000;
            const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
            const istTime = new Date(utc + istOffset);

            const hours = istTime.getHours().toString().padStart(2, '0');
            const minutes = istTime.getMinutes().toString().padStart(2, '0');

            setTime({ hours, minutes });
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // Blink colon every second
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setColonFrame((prev) => (prev === 0 ? 1 : 0));
        }, 500);
        return () => clearInterval(blinkInterval);
    }, []);

    if (!time) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-pulse text-primary font-mono text-2xl">--:--</div>
            </div>
        );
    }

    const h1 = parseInt(time.hours[0]);
    const h2 = parseInt(time.hours[1]);
    const m1 = parseInt(time.minutes[0]);
    const m2 = parseInt(time.minutes[1]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {/* Large Matrix Time Display with proper spacing */}
            <div className="flex items-center gap-1 relative">
                {/* Subtle glow effect behind */}
                <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full scale-125" />

                <div className="relative flex items-center gap-1">
                    {/* Hours */}
                    <Matrix
                        rows={7}
                        cols={5}
                        pattern={digits[h1]}
                        size={12}
                        gap={2}
                        palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.06)' }}
                        ariaLabel={`Hour tens: ${h1}`}
                    />
                    <div className="w-1" /> {/* Spacer */}
                    <Matrix
                        rows={7}
                        cols={5}
                        pattern={digits[h2]}
                        size={12}
                        gap={2}
                        palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.06)' }}
                        ariaLabel={`Hour ones: ${h2}`}
                    />

                    {/* Colon with extra spacing */}
                    <div className="w-2" /> {/* Spacer before colon */}
                    <Matrix
                        rows={7}
                        cols={3}
                        pattern={colonBlink[colonFrame]}
                        size={12}
                        gap={2}
                        palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.06)' }}
                        ariaLabel="Separator"
                    />
                    <div className="w-2" /> {/* Spacer after colon */}

                    {/* Minutes */}
                    <Matrix
                        rows={7}
                        cols={5}
                        pattern={digits[m1]}
                        size={12}
                        gap={2}
                        palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.06)' }}
                        ariaLabel={`Minute tens: ${m1}`}
                    />
                    <div className="w-1" /> {/* Spacer */}
                    <Matrix
                        rows={7}
                        cols={5}
                        pattern={digits[m2]}
                        size={12}
                        gap={2}
                        palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.06)' }}
                        ariaLabel={`Minute ones: ${m2}`}
                    />
                </div>
            </div>
        </div>
    );
}
