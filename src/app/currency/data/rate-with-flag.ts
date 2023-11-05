import { RateDto } from './exchange-table-dto';

export class RateWithFlag {
  rate: RateDto;
  flagUrl: string;
  isAddedToFavourite: boolean;

  constructor(rate: RateDto, flagUrl: string, isAddedToFavourite: boolean) {
    this.rate = rate;
    this.flagUrl = flagUrl;
    this.isAddedToFavourite = isAddedToFavourite
  }
}
