import { RateDto } from './exchange-table-dto';

export class RateWithFlag {
  rate: RateDto;
  flagUrl: string;
  isAddedToFavorite: boolean;

  constructor(rate: RateDto, flagUrl: string, isAddedToFavorite: boolean) {
    this.rate = rate;
    this.flagUrl = flagUrl;
    this.isAddedToFavorite = isAddedToFavorite
  }
}
