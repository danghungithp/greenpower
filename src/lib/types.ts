export type SuggestSolarSystemOutput = {
  systemType: string;
  panel: {
    type: string;
    quantity: number;
    totalPower: string;
    referenceUrl?: string;
  };
  inverter: {
    type: string;
    referenceUrl?: string;
  };
  storage: {
    needed: boolean;
    capacity?: string;
    referenceUrl?: string;
  };
  estimatedCost: string;
  estimatedSavings: string;
  environmentalImpact: string;
  notes: string;
};

export type BuildSolarSystemOutput = {
  specifications: {
    component: string;
    details: string;
    referenceUrl?: string;
  }[];
  billOfMaterials: {
    item: string;
    quantity: string;
    price: string;
    total: string;
    referenceUrl?: string;
  }[];
};
