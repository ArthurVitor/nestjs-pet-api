import { Pet } from '../pet/entities/pet.entity';
import { CreatePetDto } from '../pet/dto/create-pet.dto';
import { ListPetDto } from 'src/pet/dto/list-pet.dto';

export class PetMapper {
  static toPet(createPetDto: CreatePetDto): Pet {
    const pet = new Pet();
    pet.setName(createPetDto.name);
    return pet;
  }

  static toDto(pet: Pet): ListPetDto {
    return {
      id: pet.getId(),
      name: pet.getName(),
    };
  }
}
