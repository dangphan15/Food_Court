import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, IconButton, ImageListItemBar, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";
import { useState } from "react";

export const InputImageList = ({
  images = "",
  title = "",
  max = 4,
  setValue = () => {},
  setListImages = () => {},
}) => {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);


  return (
    <Box display={"flex"} flexDirection={"column"}>
      {title && (
        <Box display={"flex"}>
          <Typography variant="h5">{title}</Typography>
          <IconButton
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <AttachFileIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      )}
      <Box>
        <ImageList
          sx={{ maxWidth: 1200, maxHeight: 220 }}
          gap={8}
          cols={6}
          rows={1}
          rowHeight={200}
        >
          {images?.map((item) => (
            <ImageListItem key={item.imgPath}>
              <img
                style={{ borderRadius: "4px", maxHeight: "100%" }}
                src={`${item.imgPath}?w=160&h=220&fit=crop&auto=format`}
                srcSet={`${item.imgPath}?w=160&h=220&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() => {
                      setListImages(
                        images.filter((image) => image.imgPath != item.imgPath)
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              ></ImageListItemBar>
            </ImageListItem>
          ))}
        </ImageList>
        <input type="file" hidden ref={inputRef} onChange="" />
      </Box>
    </Box>
  );
};
