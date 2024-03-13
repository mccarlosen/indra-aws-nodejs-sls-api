import { BicycleInterface } from "./bicycle.interface";

export interface BicycleModelInterface {
  save: (bicycle: BicycleInterface) => Promise<BicycleInterface>
  find: (id: number) => Promise<BicycleInterface | null>
}