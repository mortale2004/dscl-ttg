import React, { forwardRef } from 'react';
import { getBackgroundStyle } from 'advanced-cropper';
import { AdjustableImage } from './AdjustableImage';

interface AdjustableCropperBackgroundProps {
  className?: string;
  cropper: {
    getState: () => any;
    getTransitions: () => any;
    getImage: () => { src: string } | null;
  };
  crossOrigin?: string;
  brightness?: number;
  saturation?: number;
  hue?: number;
  contrast?: number;
}

const AdjustableCropperBackground = forwardRef<HTMLDivElement, AdjustableCropperBackgroundProps>(
  (
    {
      className = '',
      cropper,
      crossOrigin = 'anonymous',
      brightness = 0,
      saturation = 0,
      hue = 0,
      contrast = 0,
    },
    ref
  ) => {
    if (!cropper) {
      console.error('Cropper instance is required.');
      return null;
    }

    const state = cropper.getState?.();
    const transitions = cropper.getTransitions?.();
    const image  = cropper.getImage?.();

    if (!image || !state) {
      console.warn('Image or state not available in cropper.');
      return null;
    }

    const style = getBackgroundStyle(image as any, state, transitions);

    return (
      <AdjustableImage
        src={image.src}
        crossOrigin={crossOrigin}
        brightness={brightness}
        saturation={saturation}
        hue={hue}
        contrast={contrast}
        ref={ref as any}
        className={className}
        style={style}
      />
    );
  }
);

export default AdjustableCropperBackground;
