export type CommonResponse<T>= {
  status: boolean
  statusCode: number
  message: string
  data: T
}

export type CursorBasedResponse<T> = CommonResponse<{
  data: T
  nextCursor: number|null        
  hasNext: boolean
}>

export enum PaginationOrder {
  asc = "asc",
  desc = "desc",
}

export type PaginationDto = {
  cursor?:number
  limit?:number
  search?:string
  order?:PaginationOrder
}