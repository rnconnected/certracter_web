import { PDFDocument } from "pdf-lib";

async function convertImageToPDF(imageData) {
  try {
    const image = await fetch(imageData);
    const imageBlob = await image.blob();
    const imageBytes = await imageBlob.arrayBuffer();

    const pdfDoc = await PDFDocument.create();
    const pageWidth = 600;
    const pageHeight = 600;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const jpgImage = await pdfDoc.embedJpg(imageBytes);
    const { width, height } = jpgImage.scale(0.5);

    const x = (pageWidth - width) / 2;
    const y = (pageHeight - height) / 2;

    page.drawImage(jpgImage, { x, y, width, height });
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  } catch (error) {
    console.error("Error converting image to PDF:", error);
    throw error;
  }
}

export default convertImageToPDF;
