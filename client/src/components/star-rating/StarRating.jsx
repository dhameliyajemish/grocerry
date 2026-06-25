import React, { useState, useEffect } from 'react';

const StarRating = ({ initialRating = 0, readonly = false, onChange, size = '24px' }) => {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(initialRating);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleClick = (index) => {
        if (!readonly) {
            setRating(index);
            if (onChange) onChange(index);
        }
    };

    const handleMouseEnter = (index) => {
        if (!readonly) setHover(index);
    };

    const handleMouseLeave = () => {
        if (!readonly) setHover(0);
    };

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((index) => {
                const value = hover || rating;
                
                // Determine which star to show
                let isFilled = false;
                let isHalf = false;

                if (value >= index) {
                    isFilled = true;
                } else if (value >= index - 0.5) {
                    isHalf = true;
                }

                return (
                    <span
                        key={index}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className="material-symbols-outlined"
                        style={{
                            cursor: readonly ? 'default' : 'pointer',
                            fontSize: size,
                            color: isFilled || isHalf ? '#f39c12' : '#ccc',
                            fontVariationSettings: isFilled || isHalf ? "'FILL' 1" : "'FILL' 0",
                            transition: 'color 0.2s ease'
                        }}
                    >
                        {isHalf ? 'star_half' : 'star'}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
