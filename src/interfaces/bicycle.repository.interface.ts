import { BicycleInterface } from "./bicycle.interface";

export interface BicycleRepositoryInterface {
  save: (bicycle: BicycleInterface) => Promise<BicycleInterface>
  find: (id: number | string) => Promise<BicycleInterface | null>
}