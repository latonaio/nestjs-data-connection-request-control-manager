import { ProductImage } from '@shared/interfaces';

interface EquipmentImage extends ProductImage {}

type EquipmentItem = {
  Equipment: string;
  EquipmentName: string;
  EquipmentTypeName: string;
  PlantName: string;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
  Images: {
    Equipment: EquipmentImage;
  };
}

class EquipmentList {
  equipmentList: EquipmentItem[];
}

export {
  EquipmentList,
}
