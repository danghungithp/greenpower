export type SuggestSolarSystemOutput = {
  systemSuggestion: string;
  estimatedSavings: string;
  environmentalImpact: string;
};

export type BuildSolarSystemOutput = {
  diagramSvg: string;
  specifications: {
    component: string;
    details: string;
  }[];
  billOfMaterials: {
    item: string;
    quantity: string;
    price: string;
    total: string;
  }[];
};
