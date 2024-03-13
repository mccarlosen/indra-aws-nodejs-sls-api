import { BicycleInterface } from "../interfaces/bicycle.interface"

export class Bicycle implements BicycleInterface {
  marca: string
  modelo: string
  color: string
  precio: number
  material: string
  tamanio: number
}