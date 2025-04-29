import { Module } from '@nestjs/common';
import { PlaceService } from './domains/place.service';

@Module({
  providers: [PlaceService],
  exports: [PlaceModule],
})
export class PlaceModule {}
