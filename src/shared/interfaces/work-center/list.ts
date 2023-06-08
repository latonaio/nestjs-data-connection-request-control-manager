interface WorkCenterListItem {
  WorkCenter: number;
  PlantName: string;
  WorkCenterName: string;
  WorkCenterLocation: string;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
}

class WorkCenterList {
  workCenterList: WorkCenterListItem[];
}

export {
  WorkCenterList,
}
