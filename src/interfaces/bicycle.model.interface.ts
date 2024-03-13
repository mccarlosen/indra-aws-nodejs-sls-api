import { BicycleInterface } from "./bicycle.interface";

export interface BicycleModelInterface {
  save: (bicycle: BicycleInterface) => Promise<BicycleInterface>
  find: (id: number | string) => Promise<BicycleInterface | null>
}