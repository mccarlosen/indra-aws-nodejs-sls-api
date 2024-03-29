import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { useResponseJson } from '../../libs/use-response-json.lib'
import axios from 'axios'
import { useHeaderValidate } from "../../libs/use-headers.lib"
import objectMapper from 'object-mapper'
import bicycleMap from '../../mappers/bicycle.map'
const querystring = require('querystring')
require('dotenv').config()

export const getPeopleFromSwapi = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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

  const response = await axios.get(`${process.env.SWAPI_URL}/people/${data.id}/`)
  const dataMap = objectMapper(response.data, bicycleMap)
  return useResponseJson(dataMap, 200)
}
