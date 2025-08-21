import { Breed } from "./breed";

export type Character = {
  id: string;
  name: string;
  sex: string;
  level: number;
  alignment: string;
  stuff: string;
  breed: Breed;
  default_character: boolean;
};
