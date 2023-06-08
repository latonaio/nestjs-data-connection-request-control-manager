interface SupplyChainRelationshipListItem {
  InvoiceDocument: number;
  BillToParty: string;
  BillFromParty: string;
  InvoiceDocumentDate: string;
  PaymentDueDate: string;
  HeaderBillingIsConfirmed: boolean;
}

class SupplyChainRelationshipList {
  supplyChainRelationship: SupplyChainRelationshipListItem[];
}

export {
  SupplyChainRelationshipList,
}
