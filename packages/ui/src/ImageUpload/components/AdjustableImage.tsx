import cn from 'classnames';
import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import { mergeRefs } from 'react-advanced-cropper';
import './AdjustableImage.scss';

interface AdjustableImageProps {
  src: string;
  className?: string;
  crossOrigin?: string | boolean;
  brightness?: number;
  saturation?: number;
  hue?: number;
  contrast?: number;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLCanvasElement>;
}

export const AdjustableImage = forwardRef<HTMLCanvasElement, AdjustableImageProps>(
  (
    {
      src,
      className,
      crossOrigin,
      brightness = 0,
      saturation = 0,
      hue = 0,
      contrast = 0,
      style,
    },
    ref
  ) => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const drawImage = () => {
      const image = imageRef.current;
      const canvas = canvasRef.current;

      if (canvas && image && image.complete) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;

          ctx.filter = [
            `brightness(${100 + brightness * 100}%)`,
            `contrast(${100 + contrast * 100}%)`,
            `saturate(${100 + saturation * 100}%)`,
            `hue-rotate(${hue * 360}deg)`,
          ].join(' ');

          ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
        }
      }
    };

    useLayoutEffect(() => {
      drawImage();
    }, [src, brightness, saturation, hue, contrast]);

    return (
      <>
        <canvas
          key={`${src}-canvas`}
          ref={mergeRefs([ref, canvasRef])}
          className={cn('adjustable-image-element', className)}
          style={style}
        />
        {src ? (
          <img
            alt="capture"
            key={`${src}-img`}
            ref={imageRef}
            className="adjustable-image-source"
            src={src}
            crossOrigin={crossOrigin ? 'anonymous' : undefined}
            onLoad={drawImage}
          />
        ) : null}
      </>
    );
  }
);

AdjustableImage.displayName = 'AdjustableImage';
