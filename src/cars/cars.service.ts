import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ]


    findAll() {
       return this.cars;
    }


    findOneById( id: string ) {

        const car = this.cars.find( car => car.id === id  ); // find the car with the id
        if ( !car) throw new NotFoundException(`Car with id ${ id } not found`); // if car is not found, throw an error

        return car;
    }


    create( createCarDto: CreateCarDto ) {

        // const { brand, model } = createCarDto;
        const Car: Car = {
            id: uuid(),
            ...createCarDto
        }
            this.cars.push( Car )
            
            return Car;

       }

    
    update( id: string, updateCarDto: UpdateCarDto ) {

        let carDB = this.findOneById( id ); // find the car with the id and store it in carDB

        if ( updateCarDto.id && updateCarDto.id !== id ) 
            throw new BadRequestException(`Car id is not valid inside the body`);
        

        this.cars = this.cars.map( car => {

                if ( car.id === id ) {
                    carDB = { ...carDB, ...updateCarDto, id } // con la base de datos solo se lo que permita el updateCarDto
                    return carDB;
                }

                return car;
            })


        return carDB;  // carro actualizado
    }

    delete( id: string)  {

        let carDB = this.findOneById( id ); // find the car with the id and store it in carDB
        this.cars = this.cars.filter( car => car.id !== id ); // filter the car with the id

        // if ( !carDB ) throw new NotFoundException(`Car with id ${ id } not found`); // if car is not found, throw an error
        // return carDB; // carro eliminado

    }


}
