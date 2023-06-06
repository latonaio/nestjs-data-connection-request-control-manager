import { ProductImage } from '@shared/interfaces';

interface OperationsImage extends ProductImage {}

type OperationsItem = {
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

class OperationsList {
  operationsList: OperationsItem[];
}

export {
  OperationsList,
}
