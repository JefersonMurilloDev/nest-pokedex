/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {

    @Prop({
    unique: true,
    index: true,
    set: (value: string) => value.toLocaleLowerCase(),
    })
    name: string;

    @Prop({
    unique: true,
    index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
