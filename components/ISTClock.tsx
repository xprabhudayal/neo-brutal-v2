'use client';

import { useState, useEffect } from 'react';
import { Matrix, digits } from '@/components/ui/matrix';

// Colon pattern for clock separator (7 rows x 2 cols)
const colonPattern = [
    [0, 0],
    [0, 1],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 1],
    [0, 0],
];

// Blinking colon animation
const colonBlink = [
    colonPattern,
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
];

export default function ISTClock() {
    const [time, setTime] = useState<{ hours: string; minutes: string; seconds: string } | null>(null);
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
            const seconds = istTime.getSeconds().toString().padStart(2, '0');

            setTime({ hours, minutes, seconds });
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
                <div className="animate-pulse text-primary font-mono">Loading...</div>
            </div>
        );
    }

    const h1 = parseInt(time.hours[0]);
    const h2 = parseInt(time.hours[1]);
    const m1 = parseInt(time.minutes[0]);
    const m2 = parseInt(time.minutes[1]);

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            {/* Time Display */}
            <div className="flex items-center gap-1">
                {/* Hours */}
                <Matrix
                    rows={7}
                    cols={5}
                    pattern={digits[h1]}
                    size={6}
                    gap={1}
                    palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.1)' }}
                    ariaLabel={`Hour tens: ${h1}`}
                />
                <Matrix
                    rows={7}
                    cols={5}
                    pattern={digits[h2]}
                    size={6}
                    gap={1}
                    palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.1)' }}
                    ariaLabel={`Hour ones: ${h2}`}
                />

                {/* Colon */}
                <Matrix
                    rows={7}
                    cols={2}
                    pattern={colonBlink[colonFrame]}
                    size={6}
                    gap={1}
                    palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.1)' }}
                    ariaLabel="Separator"
                />

                {/* Minutes */}
                <Matrix
                    rows={7}
                    cols={5}
                    pattern={digits[m1]}
                    size={6}
                    gap={1}
                    palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.1)' }}
                    ariaLabel={`Minute tens: ${m1}`}
                />
                <Matrix
                    rows={7}
                    cols={5}
                    pattern={digits[m2]}
                    size={6}
                    gap={1}
                    palette={{ on: '#39FF14', off: 'rgba(57, 255, 20, 0.1)' }}
                    ariaLabel={`Minute ones: ${m2}`}
                />
            </div>

            {/* Time Info */}
            <div className="text-center">
                <p className="font-mono text-xs text-primary font-bold tracking-wider">
                    {time.hours}:{time.minutes}:{time.seconds}
                </p>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                    IST • GMT+5:30
                </p>
            </div>
        </div>
    );
}
