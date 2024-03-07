import { Pagination } from '@shared/dtos/pagination.dto';

interface OperationsDetailListItem {
  OperationsItem: number;
  OperationsText: string;
  ProductionPlantName: string;
  StandardLotSizeQuantity: string;
  OperationsUnit:string,
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
  OwnerProductionPlantBusinessPartner: number;
  OwnerProductionPlant: number;
}

interface OperationsDetailHeader {
  Operations: number;
  Product: string;
  OwnerBusinessPartner: number;
  OwnerPlant: string;
  OperationsText: string;
  OperationsStatus: string;
  ResponsiblePlannerGroup: string;
  ValidityStartDate: string;
  ValidityEndDate: string;
  CreationDate: string;
  LastChangeDate: string;
  PlainLongText: string;
  IsMarkedForDeletion: boolean;
}

class OperationsDetailList extends Pagination {
  operationsDetailList: OperationsDetailListItem[];
  operationsDetailListHeader: OperationsDetailHeader;
}

export {
  OperationsDetailList,
  OperationsDetailHeader,
}
