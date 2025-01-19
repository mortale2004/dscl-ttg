import React from 'react';
import { getPreviewStyle } from 'advanced-cropper';
import { AdjustableImage } from './AdjustableImage';

interface AdjustablePreviewBackgroundProps {
  className?: string;
  cropper: {
    getState: () => any; // Replace `any` with the exact type of state if available
    getTransitions: () => any; // Replace `any` with the exact type of transitions if available
    getImage: () => { src: string } | null;
  };
  crossOrigin?: string | boolean;
  brightness?: number;
  saturation?: number;
  hue?: number;
  contrast?: number;
  size?: { width: number; height: number };
}

export const AdjustablePreviewBackground: React.FC<AdjustablePreviewBackgroundProps> = ({
  className,
  cropper,
  crossOrigin,
  brightness = 0,
  saturation = 0,
  hue = 0,
  contrast = 0,
  size,
}) => {
  const state = cropper.getState();
  const transitions = cropper.getTransitions();
  const image = cropper.getImage();

  const style =
    image && state && size
      ? getPreviewStyle(image as any, state, size, transitions)
      : {};

  return (
    <AdjustableImage
      src={image?.src || ''}
      crossOrigin={crossOrigin}
      brightness={brightness}
      saturation={saturation}
      hue={hue}
      contrast={contrast}
      className={className}
      style={style}
    />
  );
};
