export interface ITodoList {
    id: string
    name: string
    description?: string
    items: ITodoItem[]
  }

export interface ITodoItem {
    id: string
    description: string
    status: PENDING | IN_PROGRESS | DONE
}

export type PENDING = 'PENDING'
export type IN_PROGRESS = 'IN-PROGRESS'
export type DONE = 'DONE'