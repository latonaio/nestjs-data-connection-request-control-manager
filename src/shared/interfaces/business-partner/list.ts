interface BusinessPartnerListItem {
  BusinessPartner: number;
  BusinessPartnerFullName: string;
  BusinessPartnerName: string;
  IsMarkedForDeletion: boolean;
}

class BusinessPartnerList {
  BusinessPartners: BusinessPartnerListItem[];
}

export {
  BusinessPartnerList,
}
