import { jsPDF } from 'jspdf';
import { loadImage } from '../../images';

let logoCache: string | null = null;

export async function addCompanyHeader(pdf: jsPDF) {
  // Left column
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text('Kefan Building, Woodavenue Road', 20, 20);
  pdf.text('(254) 728 309 380', 20, 25);

  // Center - Logo
  try {
    if (!logoCache) {
      logoCache = await loadImage('/Logo.png');
    }
    pdf.addImage(logoCache, 'PNG', 85, 10, 40, 40);
  } catch (error) {
    console.warn('Could not add logo to PDF:', error);
  }

  // Right column
  pdf.text('info@ladinatravelsafaris.com', pdf.internal.pageSize.width - 20, 20, { align: 'right' });
  pdf.text('ladinatravelsafaris.com', pdf.internal.pageSize.width - 20, 25, { align: 'right' });
}