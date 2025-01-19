import { forwardRef, Fragment, memo, useMemo, useRef, useState } from "react";
import {
  Cropper,
  CropperPreview,
  CropperPreviewRef,
  FixedCropper,
  FixedCropperRef,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { FaCamera } from "react-icons/fa";
import Dialog from "@ui/Dialog";
import GridContainer from "@ui/GridContainer";
import GridItem from "@ui/GridItem";
import { AdjustablePreviewBackground } from "./components/AdjustablePreviewBackground";
import { Navigation } from "./components/Navigation";
import PhotoCapture from "@ui/PhotoCapture";
import { Button } from "./components/Button";
import { ResetIcon } from "./icons/ResetIcon";
import { Slider } from "./components/Slider";

import "./styles.scss";
import AdjustableCropperBackground from "./components/AdjustableCropperBackground";

type ImageEditorProps = {
  onChange?: (dataUrl: string) => void;
  width: number;
  height: number;
  fileType?: "image/jpeg" | "image/png";
  quality?: number;
  aspectRatio?: number;
  cropper_type?: "fixed" | "free";
  upload_button_text?: string;
  maxInKB?: number;
  resizable?: boolean;
};

const ImageEditor = forwardRef<HTMLDivElement, ImageEditorProps>(
  (
    {
      onChange = () => {},
      width,
      height,
      fileType = "image/jpeg",
      quality = 0.5,
      aspectRatio,
      cropper_type = "fixed",
      upload_button_text = "Upload Photo",
      maxInKB = 500,
      resizable = true,
    },
    ref
  ) => {
    const cropperRef = useRef<FixedCropperRef | null>(null);
    const previewRef = useRef<CropperPreviewRef | null>(null);
    const webcamRef = useRef<any>(null);

    const [isCaptureOpen, setIsCaptureOpen] = useState(false);
    const [src, setSrc] = useState<string>("");
    const [mode, setMode] = useState<
      "crop" | "brightness" | "hue" | "saturation" | "contrast"
    >("crop");
    const [adjustments, setAdjustments] = useState({
      brightness: 0,
      hue: 0,
      saturation: 0,
      contrast: 0,
    });

    const onChangeValue = (value: number) => {
      setAdjustments((prev) => ({ ...prev, [mode]: value }));
    };

    const onReset = () => {
      setMode("crop");
      setAdjustments({ brightness: 0, hue: 0, saturation: 0, contrast: 0 });
    };

    const onUpload = (blob: string) => {
      onReset();
      setSrc(blob);
    };

    const onCapture = () => {
      const blob = webcamRef.current?.getScreenshot();
      if (blob) {
        onReset();
        setSrc(blob);
        onCaptureClose();
      }
    };

    const onCaptureClose = () => setIsCaptureOpen(false);

    const onDownload = () => {
      const canvas = cropperRef.current?.getCanvas();
      if (canvas) {
        const dataUrl = canvas.toDataURL(fileType, quality);
        onChange(dataUrl);
      }
    };

    const onUpdate = () => previewRef.current?.refresh();

    const handleImageCaptureOpen = () => setIsCaptureOpen(true);

    const cropperEnabled = mode === "crop";
    const changed = Object.values(adjustments).some(
      (val) => Math.floor(val * 100) !== 0
    );

    const TitleComponent = useMemo(
      () => (
        <Fragment>
          <FaCamera /> {upload_button_text}
        </Fragment>
      ),
      [upload_button_text]
    );

    return (
      <Dialog ref={ref} TitleComponent={TitleComponent}>
        <div className="image-editor">
          <GridContainer spacing={0}>
            <GridItem md={6}>
              {getCropper(cropper_type, {
                className: "image-editor__cropper",
                src,
                ref: cropperRef,
                stencilSize: { width, height },
                imageRestriction: ImageRestriction.fitArea,
                stencilProps: {
                  ...(aspectRatio && { aspectRatio }),
                  handlers: cropperEnabled,
                  lines: cropperEnabled,
                  movable: cropperEnabled,
                  resizable: resizable && cropperEnabled,
                },
                backgroundWrapperProps: {
                  scaleImage: cropperEnabled,
                  moveImage: cropperEnabled,
                },
                backgroundComponent: AdjustableCropperBackground,
                backgroundProps: adjustments,
                onUpdate,
              })}
              {changed && (
                <Button
                  active={changed}
                  className="image-editor__reset-button"
                  onClick={onReset}
                >
                  <ResetIcon />
                </Button>
              )}
            </GridItem>

            <GridItem md={6}>
              <CropperPreview
                className="image-editor__preview"
                ref={previewRef}
                cropper={cropperRef.current as any}
                backgroundComponent={AdjustablePreviewBackground as any}
                backgroundProps={adjustments}
              />
            </GridItem>

            <GridItem>
              {mode !== "crop" && (
                <Slider
                  className="image-editor__slider"
                  value={adjustments[mode]}
                  onChange={onChangeValue}
                />
              )}
              <Navigation
                mode={mode as any}
                onChange={setMode}
                onUpload={onUpload}
                onDownload={onDownload}
                handleImageCaptureOpen={handleImageCaptureOpen}
                maxInKB={maxInKB}
              />
            </GridItem>
          </GridContainer>

          {isCaptureOpen && (
            <PhotoCapture
              styles={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              webcamRef={webcamRef}
              onCaptureClose={onCaptureClose}
              onCapture={onCapture}
              width={width}
              height={height}
            />
          )}
        </div>
      </Dialog>
    );
  }
);

export default memo(ImageEditor);

const getCropper = (type: "fixed" | "free", props: any) => {
  switch (type) {
    case "fixed":
      return <FixedCropper {...props} />;
    case "free":
      return <Cropper {...props} />;
    default:
      return null;
  }
};
