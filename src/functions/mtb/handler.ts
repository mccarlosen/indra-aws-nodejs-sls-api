import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { useResponseJson } from '../../libs/use-response-json.lib'
import { useHeaderValidate } from "../../libs/use-headers.lib";
import { useValidate } from "../../libs/use-validator.lib";
import { BicycleModel } from "../../models/bicycle.model";
import { DBService } from "../../services/db.service";
import { BicycleRepository } from "../../repositories/bicycle.repository";
import { Bicycle } from "../../entities/bicycle";

export const saveBicycle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { body, headers } = event
  const data = JSON.parse(body ?? '')
  const contentType = useHeaderValidate(headers, 'Content-Type')
  if (contentType === null || contentType === undefined) {
    return useResponseJson({ error: 'Bad Request.', message: 'Falta la cabecera Content-Type.' }, 400)
  }
  if (contentType !== 'application/json') {
    return useResponseJson({ error: 'Bad Request.', message: 'La cabecera Content-Type debe ser de tipo application/json.' }, 400)
  }
  if (typeof data !== 'object') {
    return useResponseJson({ error: 'Bad Request.', message: 'El cuerpo de la solicitud está vacío.' }, 400)
  }
  try {
    const rules = {
      marca: 'required|string|max:100',
      modelo: 'required|string|max:100',
      color: 'required|string|max:100',
      precio: 'required|numeric',
      material: 'required|string|max:100',
      tamanio: 'required|numeric'
    }
    useValidate(data, rules)
    const { marca, modelo, color, precio, material, tamanio } = data
    const bicycleEntity = new Bicycle()
    bicycleEntity.marca = marca
    bicycleEntity.modelo = modelo
    bicycleEntity.color = color
    bicycleEntity.precio = parseFloat(precio)
    bicycleEntity.material = material
    bicycleEntity.tamanio = parseFloat(tamanio)
    const bicycleModel = new BicycleModel(new DBService())
    const bicycleRepository = new BicycleRepository(bicycleModel)
    await bicycleRepository.save(bicycleEntity)
    return useResponseJson({ status: true, message: 'El item se ha guardado con éxito.' }, 200)
  } catch (e) {
    return useResponseJson({ error: 'Unprocessable Content', message: e.message }, 422)
  }
}

export const getBicycle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const {pathParameters, headers} = event
  const data = pathParameters ?? ''
  const contentType = useHeaderValidate(headers, 'Content-Type')

  if (contentType !== 'application/json') {
    return useResponseJson({ error: 'Bad Request.', message: 'La cabecera Content-Type debe ser de tipo application/json.' }, 400)
  }
  
  if (typeof data !== 'object') {
    return useResponseJson({ error: 'Bad Request.', message: 'El cuerpo de la solicitud está vacío.' }, 400)
  }

  if (!data.hasOwnProperty('id') || data.id == '') {
    return useResponseJson({ error: 'Bad Request.', message: 'Falta el parámetro ID en la solicitud.' }, 400)
  }

  const resourceId = data.id ?? ''

  const bicycleModel = new BicycleModel(new DBService())
  const bicycleRepository = new BicycleRepository(bicycleModel)
  const bicycleEntity = await bicycleRepository.find(resourceId)
  
  return useResponseJson({data: bicycleEntity}, 200)
}
