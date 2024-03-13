import { BicycleInterface } from "../interfaces/bicycle.interface";
import { BicycleModelInterface } from "../interfaces/bicycle.model.interface";
import { DBService } from "../services/db.service";

export class BicycleModel implements BicycleModelInterface {
  constructor (private readonly dbService: DBService) {}
  async save (bicycle: BicycleInterface): Promise<any> {
    const result = await this.dbService.executeQuery(
      `INSERT INTO bicycles (marca, modelo, color, precio, material, tamanio) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        bicycle.marca,
        bicycle.modelo,
        bicycle.color,
        bicycle.precio,
        bicycle.material,
        bicycle.tamanio
      ]
    )
    return result
  }

  async find (id: number | string): Promise<BicycleInterface | null> {
    const result = await this.dbService.executeQuery('SELECT * FROM bicycles WHERE id = ?', [id])
    const bicycle: BicycleInterface = {
      marca: result[0]?.marca,
      modelo: result[0]?.modelo,
      color: result[0]?.color,
      precio: result[0]?.precio,
      material: result[0]?.material,
      tamanio: result[0]?.tamanio
    }
    return bicycle
  }
}