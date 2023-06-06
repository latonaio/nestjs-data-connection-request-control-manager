type DeliverToPartyItem = {
  DeliveryDocument: number;
  DeliverToParty: number;
  DeliverToPlantName: string;
  DeliverFromParty: string;
  DeliverFromPlantName: string;
  HeaderDeliveryStatus: string;
  HeaderBillingStatus: string;
  PlannedGoodsReceiptDate: string;
}

type DeliverFromPartyItem = {
  DeliveryDocument: number;
  DeliverToParty: number;
  DeliverToPlantName: string;
  DeliverFromParty: string;
  DeliverFromPlantName: string;
  HeaderDeliveryStatus: string;
  HeaderBillingStatus: string;
  PlannedGoodsReceiptDate: string;
}

type PullDownItem = {
  Plant: string;
  PlantName: string;
  BusinessPartner: number;
  DefaultRelation: boolean;
}

interface DeliveryDocumentListEdit {
  pullDown: {
    Deliver: {
      [key: string]: {
        DeliverToParty: PullDownItem[];
        DeliverFromParty: PullDownItem[];
      };
    }
  };
}

class DeliveryDocumentList {
  deliveryDocumentListEdit: DeliveryDocumentListEdit;
  deliveryDocuments: DeliverToPartyItem[] | DeliverFromPartyItem[];
}

export {
  DeliveryDocumentList,
}
