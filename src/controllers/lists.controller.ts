import { FastifyReply, FastifyRequest } from "fastify"
import { ITodoItem, ITodoList } from "../interfaces"

const staticLists: ITodoList[] = [
  {
	id: 'l-1',
	description: 'Dev tasks',
    name: 'Development',
    items: [
      { id: 'i-1', description: 'Create a new project', status: 'PENDING' },
      { id: 'i-2', description: 'Write a blog post', status: 'IN-PROGRESS' },
      { id: 'i-3', description: 'Update the README', status: 'DONE' }
    ]
  }
]

export async function listLists(this: any, 
    request: FastifyRequest, 
    reply: FastifyReply
  ) {
    console.log('DB status', this.level.db.status)
    const listsIter = this.level.db.iterator()
  
    const result: ITodoList[] = []
    for await (const [, value] of listsIter) {
      result.push(JSON.parse(value))
    }
    reply.send({ data: result })
  }  


export async function addList (this: any, request: FastifyRequest, reply: FastifyReply){
    try {
        const { id, name, description } = request.body as Pick<ITodoList, 'id' | 'name' | 'description'>
        // Assuming there's a service to handle the database interaction
        const newList: ITodoList = { id, name, description, items: [] }
        await this.level.db.put(
            newList.id.toString(), JSON.stringify(newList)
          )
         
        reply.code(201).send(newList)
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while creating the list' })
    }
}

export async function updateList (this: any, request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as Pick<ITodoList, 'id'>
        const { name, description } = request.body as Partial<Pick<ITodoList, 'description' | 'name'>>
        
        const list = JSON.parse(await this.level.db.get(id.toString()))
        if (!list) {
            reply.code(404).send({ error: 'List not found' })
            return
        }

        if (name !== undefined) {
            list.name = name
        }
        list.description ??= description

        await this.level.db.put(id.toString(), JSON.stringify(list))
        reply.code(201).send(list)
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while updating the list' + error })
    }
}

export async function addItem(this: any, request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const item = request.body as ITodoItem

    // Assuming you have a function to get the list by id and add an item to it
    try {
        const list = JSON.parse(await this.level.db.get(id.toString()))
        if (!list) {
            return reply.status(404).send({ message: 'List not found' })
        }

        list.items.push(item)
        await this.level.db.put(list.id.toString(), JSON.stringify(list))
        reply.code(201).send(list)
    } catch (error) {
        return reply.status(500).send({ error: 'An error occurred while adding an item: ' + error })
    }
}

export async function deleteItem(this: any, request: FastifyRequest, reply: FastifyReply) {
    const { listId, itemId } = request.params as { listId: string, itemId: string }

    // Assuming you have a function to get the list by id and add an item to it
    try {
        const list = JSON.parse(await this.level.db.get(listId.toString()))
        if (!list) {
            return reply.status(404).send({ message: 'List not found' })
        }

        list.items = list.items.filter((i) => i.id !== itemId)
        await this.level.db.put(
            list.id.toString(), JSON.stringify(list)
          )
        reply.code(201).send(list)
    } catch (error) {
        return reply.status(500).send({ error: 'An error occurred while deleting an item : ' + error })
    }
}

export async function updateItem(this: any, request: FastifyRequest, reply: FastifyReply) {
    const { listId, itemId } = request.params as { listId: string, itemId: string }
    const item = request.body as Partial<Omit<ITodoItem, "id">>

    // Assuming you have a function to get the list by id and add an item to it
    try {
        const list = JSON.parse(await this.level.db.get(listId.toString()))
        if (!list) {
            return reply.status(404).send({ message: 'List not found' })
        }

        const oldItem = list.items.find((i) => i.id == itemId)
        if (!oldItem) {
            return reply.status(404).send({ message: 'Item not found' })
        }
        const newItem = { ...oldItem, ...item }

        list.items = list.items.map((i) => i.id === itemId ? newItem : i)
        await this.level.db.put(
            list.id.toString(), JSON.stringify(list)
          )
        reply.code(201).send(list)
    } catch (error) {
        return reply.status(500).send({ error: 'An error occurred while deleting an item : ' + error })
    }
}