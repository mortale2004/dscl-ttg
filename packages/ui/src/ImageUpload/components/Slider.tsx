import React, { useState } from 'react';
import MuiSlider from '@mui/material/Slider';
import cn from 'classnames';
import './Slider.scss';

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({ value = 0, onChange, className }) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (onChange) {
      onChange(newValue as number);
    }
  };

  return (
    <div className={cn('image-editor-slider', className)}>
      <MuiSlider
        value={value}
        onChange={handleSliderChange}
        min={-1}
        max={1}
        step={0.01}
        size="small"
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${Math.round(100 * value)}%`}
        sx={{
          '& .MuiSlider-thumb': {
            backgroundColor: 'white',
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'lightgray',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#61dafb',
            border: "1px solid #61dafb",
          },
        }}
      />
    </div>
  );
};
