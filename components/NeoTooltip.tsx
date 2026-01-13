'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface NeoTooltipProps {
    children: React.ReactNode;
    content: string;
}

export default function NeoTooltip({ children, content }: NeoTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute bottom-full mb-2 z-50 whitespace-nowrap"
                    >
                        <div className="bg-black text-white px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide border-2 border-primary">
                            {content}
                        </div>
                        {/* Arrow/Pointer */}
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black absolute left-1/2 -translate-x-1/2 -bottom-[6px]"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
