import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { toast } from "@dscl-ttg/frontend-utils";
import React, { memo, MutableRefObject } from "react";
import { FaCamera } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Webcam from "react-webcam";

type PhotoCaptureProps = {
  screenshotFormat?: "image/jpeg" | "image/png" | "image/webp";
  webcamRef?: MutableRefObject<Webcam | null>;
  styles?: React.CSSProperties;
  onCaptureClose?: () => void;
  onCapture?: () => void;
  width?: string | number;
  height?: string | number;
};

const PhotoCapture: React.FC<PhotoCaptureProps> = memo(
  ({
    screenshotFormat = "image/jpeg",
    webcamRef,
    styles = {},
    onCaptureClose = () => {},
    onCapture = () => {},
    width = "100%",
    height = "100%",
  }) => {
    return (
      <Box
        sx={{
          background: "white",
          position: "absolute",
          "& video": {
            height: "100%",
            width: "100%",
          },
          "& .close": {
            position: "absolute",
            top: "20px",
            right: "10px",
            zIndex: 50,
            backgroundColor: "white",
            color: "black",
          },
          "& .capture": {
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            color: "black",
            zIndex: 50,
          },
          ...styles,
        }}
      >
        <IconButton className="close" onClick={onCaptureClose}>
          <IoClose />
        </IconButton>
        <IconButton className="capture" onClick={onCapture}>
          <FaCamera />
        </IconButton>
        <Webcam
          style={{
            position: "relative",
          }}
          audio={false}
          screenshotFormat={screenshotFormat}
          screenshotQuality={1}
          disablePictureInPicture={false}
          imageSmoothing={true}
          ref={webcamRef}
          mirrored={true}
          onUserMediaError={(error) => {
            console.log(error)
            toast("Unable to access camera", "error");
          }}
        />
        {/* Overlay the circular box */}
        <Box
          sx={{
            width: width,
            height: height,
            border: "5px solid white",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
          }}
        />
      </Box>
    );
  }
);

export default PhotoCapture;
