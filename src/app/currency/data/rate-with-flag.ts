import { RateDto } from './exchange-table-dto';

export class RateWithFlag {
  rate: RateDto;
  flagUrl: string;

  constructor(rate: RateDto, flagUrl: string) {
    this.rate = rate;
    this.flagUrl = flagUrl;
  }
}