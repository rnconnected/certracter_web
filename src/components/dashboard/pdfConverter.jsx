import { PDFDocument } from "pdf-lib";

async function convertImageToPDF(imageData, outputFileName) {
  const image = await fetch(imageData);
  const imageBlob = await image.blob();
  const imageBytes = await imageBlob.arrayBuffer();

  const pdfDoc = await PDFDocument.create();
  const pageWidth = 500;
  const pageHeight = 500;

  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  const jpgImage = await pdfDoc.embedJpg(imageBytes);
  const { width, height } = jpgImage.scale(0.5);

  const x = (pageWidth - width) / 2;
  const y = (pageHeight - height) / 2;

  page.drawImage(jpgImage, { x, y, width, height });

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return pdfUrl;
}

export default convertImageToPDF;
