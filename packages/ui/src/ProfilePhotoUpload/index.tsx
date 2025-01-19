import React, { Fragment, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IconButton, Box, Typography } from "@mui/material";
import ImageUpload from "@ui/ImageUpload";
// @ts-ignore
import {Profile } from "@dscl-ttg/assets";
const ProfilePhotoUpload = ({
  onImageUpload,
  dataUrl
}: {
    onImageUpload: (dataUrl: string) => void;
    dataUrl: string;
}) => {
  const profileRef = useRef<any>(null);
  const [image, setImage] = useState<string | null>(dataUrl); // State to hold the uploaded image

  const handleImageUpload = (dataUrl: string) => {
    setImage(dataUrl);
    onImageUpload(dataUrl);
    profileRef.current?.onClose();
  };

  const onUploadButtonClick = () => {
    profileRef.current?.onOpen(); // Open the ImageUpload component when the camera icon is clicked
  };

  return (
    <Fragment>
      <Box
        sx={{
          width: 130,
          height: 150,
          backgroundImage: image ? `url(${image})` : `url(${Profile})`,
          backgroundSize: "contain",
          overflow:"hidden",
          backgroundRepeat:"no-repeat",
          backgroundPosition: "center",
          border: "2px solid #ddd",
          position: "relative",
          margin: "0 auto",
        }}
      >
        {/* Camera icon for uploading */}
        <IconButton
          onClick={onUploadButtonClick}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            ":hover":{
                backgroundColor: "#fff",
            }
          }}
        >
          <FaCamera size={20} color="#007bff" />
        </IconButton>
      </Box>

      {/* ImageUpload component for handling file upload */}
      <ImageUpload
        ref={profileRef}
        width={250}
        height={300}
        onChange={handleImageUpload} // Pass the handleImageUpload function to ImageUpload's onChange prop
      />

      {/* Optional text below the profile photo */}
      <Typography variant="body2" color="textSecondary" align="center">
        Click the camera icon to upload a new profile photo
      </Typography>
    </Fragment>
  );
};

export default ProfilePhotoUpload;
