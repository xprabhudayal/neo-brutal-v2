'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleSpeed?: number;
    scrambleChars?: string;
    autoStart?: boolean;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
    text,
    className = '',
    scrambleSpeed = 50,
    scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~',
    autoStart = false,
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startScramble = () => {
        let iteration = 0;
        clearInterval(intervalRef.current as NodeJS.Timeout);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
            }

            iteration += 1 / 3;
        }, scrambleSpeed);
    };

    useEffect(() => {
        if (autoStart) startScramble();
        return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }, []);

    const handleMouseEnter = () => {
        setIsHovering(true);
        startScramble();
    };

    return (
        <span
            className={`inline-block cursor-default ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovering(false)}
        >
            {displayText}
        </span>
    );
};

export default ScrambleText;
