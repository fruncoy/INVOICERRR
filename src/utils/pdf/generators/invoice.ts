import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { addCompanyHeader } from '../components/header';
import { addDocumentBox } from '../components/documentBox';
import { addItemsTable } from '../components/itemsTable';
import { addPaymentDetails } from '../components/paymentDetails';
import { addDocumentFooter } from '../components/footer';
import type { PDFGeneratorOptions } from '../types';

export async function generateInvoicePDF({ document, items }: PDFGeneratorOptions) {
  const pdf = new jsPDF();
  let yPos = 20;

  // Add company header
  await addCompanyHeader(pdf);
  yPos += 50;

  // Add document box
  addDocumentBox(pdf, document);
  yPos += 50;

  // Add items table
  const tableEndY = addItemsTable(pdf, document, items);
  yPos = tableEndY + 20;

  // Add payment details for invoice
  yPos = addPaymentDetails(pdf, yPos);

  // Add footer
  addDocumentFooter(pdf, document, yPos + 20);

  return pdf;
}