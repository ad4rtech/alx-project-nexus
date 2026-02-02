import React from 'react';

export default function GlobalStyles() {
    return (
        <style jsx global>{`
            html {
                scroll-behavior: smooth;
            }
        `}</style>
    );
}
