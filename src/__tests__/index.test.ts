import { useApiGatewayMock } from '../__mocks__/apigateway-mock'
import { getPeopleFromSwapi } from '../functions/swapi/handler'
import { getBicycle, saveBicycle } from '../functions/mtb/handler'

describe('Prueba de SWAPI', () => {
  test('Debería mostrar el error Bad Request si no se envía ningún parámetro', async () => {
    const event = useApiGatewayMock(
      JSON.stringify(''),
      {
        'content-type': 'application/json'
      }
    )
    const result = await getPeopleFromSwapi(event)
    expect(result).toBeDefined()
    expect(result).toEqual({ statusCode: 400, body: '{"error":"Bad Request.","message":"Falta el parámetro ID en la solicitud."}' })
  })

  test('Debería mostrar el error Bad Request si no se envía el ID', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({}),
      {
        'content-type': 'application/json'
      }
    )
    const result = await getPeopleFromSwapi(event)
    expect(result).toBeDefined()
    expect(result).toEqual({ statusCode: 400, body: '{"error":"Bad Request.","message":"Falta el parámetro ID en la solicitud."}' })
  })

  test('La respuesta debería contener el nombre de Luke Skywalker si se envía el ID: 1', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({}),
      {
        'content-type': 'application/json'
      },
      {
        id: 1
      }
    )
    const result = await getPeopleFromSwapi(event)
    expect(result).toBeDefined()
    const namePeople = JSON.parse(result.body).nombre
    expect(namePeople).toEqual('Luke Skywalker')
  })
})

describe('Prueba de endpoints para guardar y consultar entidad de producto', () => {
  test('Debería mostrar status true en la respuesta al insertar un elemento en la BD', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({
        marca: 'Indra',
        modelo: 'Indra 29',
        color: 'Blanco/Turquesa',
        precio: 999.00,
        material: 'Aluminio',
        tamanio: 29.00
      }),
      {
        'content-type': 'application/json'
      }
    )

    const result = await saveBicycle(event)
    expect(result).toBeDefined()
    const data = JSON.parse(result.body)
    expect(data.status).toEqual(true)
  })

  test('La respuesta debería contener la marca de bicicleta Giant si ID: 1', async () => {
    const event = useApiGatewayMock(
      JSON.stringify({}),
      {
        'content-type': 'application/json'
      },
      {
        id: 1
      }
    )
    const result = await getBicycle(event)
    expect(result).toBeDefined()
    const bicycle = JSON.parse(result.body).data
    expect(bicycle.marca).toEqual('Giant')
  })
})