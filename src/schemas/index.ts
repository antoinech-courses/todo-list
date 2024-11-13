export const listListsSchema = {
    tags: ['lists'],
    summary: 'List all the lists',
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            items: {
              $ref: 'ITodoList#'
            }
        }
    }
}

export const addListSchema = {
    tags: ['lists'],
    summary: 'Add a new list',
    body: {
        $ref: 'ITodoList#'
    },
    response: {
        200: {
            description: 'Successful response',
            $ref: 'ITodoList#'
        }
    }
}

export const updateListSchema = {
    tags: ['lists'],
    summary: 'Update a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        }
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            description: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            $ref: 'ITodoList#'
        }
    }
}

export const addItemSchema = {
    tags: ['lists'],
    summary: 'Add an item to a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        }
    },
    body: {
        $ref: 'ITodoItem#'
    },
    response: {
        200: {
            description: 'Successful response',
            $ref: 'ITodoList#'
        }
    }
}

export const deleteItemSchema = {
    tags: ['lists'],
    summary: 'Delete an item from a list',
    params: {
        type: 'object',
        properties: {
            listId: { type: 'string' },
            itemId: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            $ref: 'ITodoList#'
        }
    }
}

export const updateItemSchema = {
    tags: ['lists'],
    summary: 'Update an item in a list',
    params: {
        type: 'object',
        properties: {
            listId: { type: 'string' },
            itemId: { type: 'string' }
        }
    },
    body: {
        $ref: 'ITodoItem#'
    },
    response: {
        200: {
            description: 'Successful response',
            $ref: 'ITodoList#'
        }
    }
}

