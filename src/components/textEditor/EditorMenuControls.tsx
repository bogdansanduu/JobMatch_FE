import React from "react";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuSelectFontSize,
  MenuDivider,
  MenuSelectHeading,
  MenuButtonOrderedList,
  MenuButtonBulletedList,
  MenuButtonCodeBlock,
  MenuButtonBlockquote,
  MenuButtonHorizontalRule,
  MenuButtonEditLink,
  MenuButtonImageUpload,
} from "mui-tiptap";

const compressImage = (img: HTMLImageElement, quality: number = 0.7) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context not supported");
  }

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/jpeg", quality);
};

const imageUrlToBase64 = async (url: string, quality: number = 0.3) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const img = new Image();
  img.src = URL.createObjectURL(blob);

  return new Promise<string>((resolve, reject) => {
    img.onload = () => {
      try {
        const base64data = compressImage(img, quality);
        resolve(base64data);
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = reject;
  });
};

const EditorMenuControls = () => {
  return (
    <MenuControlsContainer>
      <MenuSelectHeading />
      <MenuSelectFontSize />

      <MenuDivider />

      <MenuButtonBold />
      <MenuButtonItalic />

      <MenuDivider />

      <MenuButtonOrderedList />
      <MenuButtonBulletedList />

      <MenuDivider />

      <MenuButtonBlockquote />
      <MenuButtonCodeBlock />
      <MenuButtonHorizontalRule />

      <MenuDivider />

      <MenuButtonEditLink />
      <MenuButtonImageUpload
        onUploadFiles={async (files) => {
          return await Promise.all(
            files.map(async (file) => ({
              src: await imageUrlToBase64(URL.createObjectURL(file), 0.3),
              alt: file.name,
            }))
          );
        }}
      />

      {/* Add more controls of your choosing here */}
    </MenuControlsContainer>
  );
};

export default EditorMenuControls;
