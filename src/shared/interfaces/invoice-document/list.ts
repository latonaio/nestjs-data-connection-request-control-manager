interface InvoiceDocumentListItem {
  InvoiceDocument: number;
  BillToParty: string;
  BillFromParty: string;
  InvoiceDocumentDate: string;
  PaymentDueDate: string;
  HeaderBillingIsConfirmed: boolean;
}

class InvoiceDocumentList {
  invoiceDocuments: InvoiceDocumentListItem[];
}

export {
  InvoiceDocumentList,
}
