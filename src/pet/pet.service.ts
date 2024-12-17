import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pet.entity';
import { PetMapper } from '../mapper/pet-mapper';
import { ListPetDto } from './dto/list-pet.dto';

@Injectable({ scope: Scope.REQUEST })
export class PetService implements OnModuleInit {
  private pets: Pet[] = [];

  onModuleInit() {
    console.log('Module initiated');
  }

  private *idGenerator(): Generator<number> {
    let id = 1;
    while (true) {
      yield id++;
    }
  }

  private idIterator = this.idGenerator();

  private getNextId(): number {
    return this.idIterator.next().value;
  }

  create(createPetDto: CreatePetDto): ListPetDto {
    const pet: Pet = PetMapper.toPet(createPetDto);
    pet.setId(this.getNextId());

    this.pets.push(pet);

    return PetMapper.toDto(pet);
  }

  findAll(): ListPetDto[] {
    return this.pets.map((pet) => PetMapper.toDto(pet));
  }

  findOne(id: number): ListPetDto {
    const pet: Pet = this.pets.find((pet) => pet.getId() == id);
    if (!pet) {
      throw new NotFoundException("Couldn't find pet with id " + id);
    }

    return PetMapper.toDto(pet);
  }

  remove(id: number) {
    const index = this.pets.findIndex((pet) => pet.getId() === id);
    if (index === -1) {
      throw new NotFoundException("Couldn't find pet with id " + id);
    }
    this.pets.splice(index, 1);
  }
}
