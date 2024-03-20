async function compressFile(file) {
  const maxSize = 1 * 1024 * 1024; // 1MB
  if (file.size > maxSize) {
    const compressedFile = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            },
            "image/jpeg",
            0.5
          ); // Adjust compression quality here (0.7 is just an example)
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
    return compressedFile;
  } else {
    return file;
  }
}

export default compressFile;
