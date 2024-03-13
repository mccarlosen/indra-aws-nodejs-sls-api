import { BicycleInterface } from "../interfaces/bicycle.interface";
import { BicycleModelInterface } from "../interfaces/bicycle.model.interface";
import { BicycleRepositoryInterface } from "../interfaces/bicycle.repository.interface";

export class BicycleRepository implements BicycleRepositoryInterface {
  constructor (private readonly bicycleModel: BicycleModelInterface) {}

  async save (bicycle: BicycleInterface): Promise<BicycleInterface> {
    const bicycleEntity = await this.bicycleModel.save(bicycle)
    return bicycleEntity
  }

  async find (id: number): Promise<BicycleInterface | null> {
    const bicycleEntity = await this.bicycleModel.find(id)
    return bicycleEntity
  }
}