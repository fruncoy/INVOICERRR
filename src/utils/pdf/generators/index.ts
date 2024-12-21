import type { Document, VehicleItem } from '../../../types';
import { generateInvoicePDF } from './invoice';
import { generateQuotationPDF } from './quotation';
import { generateReceiptPDF } from './receipt';

export async function generatePDF({ document, items }: { 
  document: Document; 
  items: VehicleItem[]; 
}) {
  // Generate filename based on client name and document type
  const sanitizedClientName = document.client_name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${document.type}_${sanitizedClientName}_${timestamp}`;

  const pdf = await (() => {
    switch (document.type) {
      case 'invoice':
        return generateInvoicePDF({ document, items });
      case 'quotation':
        return generateQuotationPDF({ document, items });
      case 'receipt':
        return generateReceiptPDF({ document, items });
      default:
        throw new Error(`Unsupported document type: ${document.type}`);
    }
  })();

  return {
    pdf,
    filename: `${filename}.pdf`
  };
}