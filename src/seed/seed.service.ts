/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdaptar } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdaptar,
  ) {}

  async executeSeed() {
    // 1. Limpiar la BD antes de insertar
    await this.pokemonModel.deleteMany({});

    // 2. Obtener datos de la API
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // 3. Preparar datos para inserción masiva
    const pokemonToInsert = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return { name, no }; // ← Importante: retornar el objeto
    });

    // 4. Insertar todos de una vez (más eficiente)
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed successfully';
  }
}
