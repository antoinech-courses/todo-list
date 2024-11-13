import fp from 'fastify-plugin'
import swagger, { FastifySwaggerOptions } from '@fastify/swagger'

import JsonSchemas from '../schemas/all.json'

export default fp<FastifySwaggerOptions>(async (fastify) => {
  fastify.addSchema({
    $id: 'ITodoList',
    ...JsonSchemas.definitions.ITodoList
  })
  fastify.addSchema({
    $id: 'ITodoItem',
    ...JsonSchemas.definitions.ITodoItem
  })
  fastify.addSchema({
    $id: 'PENDING',
    ...JsonSchemas.definitions.PENDING
  })
  fastify.addSchema({
    $id: 'DONE',
    ...JsonSchemas.definitions.DONE
  })
  fastify.addSchema({
    $id: 'IN_PROGRESS',
    ...JsonSchemas.definitions.IN_PROGRESS
  })
  fastify.register(swagger, {
    openapi: {
      info: { title: 'Todo List API', version: '1.0.0' },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
    }
  })
})