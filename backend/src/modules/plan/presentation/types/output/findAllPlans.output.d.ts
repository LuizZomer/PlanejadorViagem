interface IFindAllPlansOutput {
  externalId: string;
  destination: string;
  country: string;
  description: string;
  startDate: Date;
  endDate: Date;
  spendingLevel: string;
  hosting?: string; // opcional
}
