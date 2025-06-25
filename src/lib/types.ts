export type SuggestSolarSystemOutput = {
  systemType: string;
  panel: {
    type: string;
    quantity: number;
    totalPower: string;
  };
  inverter: {
    type: string;
  };
  storage: {
    needed: boolean;
    capacity?: string;
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
