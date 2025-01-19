import React, { ChangeEvent, useRef } from 'react';
import cn from 'classnames';
import { BrightnessIcon } from '../icons/BrightnessIcon';
import { CameraIcon } from '../icons/CameraIcon';
import { CropIcon } from '../icons/CropIcon';
import { SaveIcon } from '../icons/SaveIcon';
import { UploadIcon } from '../icons/UploadIcon';
import { Button } from './Button';
import './Navigation.scss';

interface NavigationProps {
  className?: string;
  onChange?: (mode: 'crop' | 'brightness') => void;
  onUpload?: (imageUrl: string) => void;
  onDownload?: () => void;
  mode?: 'crop' | 'brightness';
  handleImageCaptureOpen?: () => void;
  maxInKB?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  className,
  onChange,
  onUpload,
  onDownload,
  mode,
  handleImageCaptureOpen,
  maxInKB = 1024, // Default max size in KB
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefMobile = useRef<HTMLInputElement>(null);

  const setMode = (mode: 'crop' | 'brightness') => () => {
    onChange?.(mode);
  };

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const onUploadButtonClickMobile = () => {
    inputRefMobile.current?.click();
  };

  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files[0]) {
      // Check file size if maxInKB is provided
      if (files[0].size > maxInKB * 1024) {
        alert(`Please upload an image smaller than ${maxInKB} KB.`);
        return;
      }

      if (onUpload) {
        onUpload(URL.createObjectURL(files[0]));
      }
    }

    // Clear the input value to allow re-uploading the same file
    event.target.value = '';
  };

  return (
    <div className={cn('image-editor-navigation', className)}>
      <Button
        className="image-editor-navigation__button"
        onClick={onUploadButtonClick}
      >
        <UploadIcon />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="image-editor-navigation__upload-input"
        />
      </Button>

      {window.innerWidth <= 600 ? (
        <Button
          className="image-editor-navigation__button"
          onClick={onUploadButtonClickMobile}
        >
          <CameraIcon />
          <input
            ref={inputRefMobile}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={onLoadImage}
            className="image-editor-navigation__upload-input"
          />
        </Button>
      ) : (
        <Button
          className="image-editor-navigation__button"
          onClick={handleImageCaptureOpen}
        >
          <CameraIcon />
        </Button>
      )}

      <Button
        className="image-editor-navigation__button"
        active={mode === 'crop'}
        onClick={setMode('crop')}
      >
        <CropIcon />
      </Button>

      <Button
        className="image-editor-navigation__button"
        active={mode === 'brightness'}
        onClick={setMode('brightness')}
      >
        <BrightnessIcon />
      </Button>

      <Button
        className="image-editor-navigation__button"
        onClick={onDownload}
      >
        <SaveIcon />
      </Button>
    </div>
  );
};
