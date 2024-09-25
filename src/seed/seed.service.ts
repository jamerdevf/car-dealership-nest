import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BrandsService } from 'src/brands/brands.service';
import { BRANDS_SEED } from './data/brand.seed';


@Injectable()
export class SeedService {

  // inyectamos el servicio de CarService
  constructor(
    private readonly carService: CarsService,
    private readonly brandService: BrandsService

  ) {}
 

  populateDb() {

    this.carService.fillCarsWithSeedData( CARS_SEED );
    this.brandService.fillCarsWithSeedData( BRANDS_SEED );

    return 'SEED executed';
  }
}
