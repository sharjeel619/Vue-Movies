export interface MovieDataInterface {
  Title: string,
  Year: string,
  imdbID: string,
  isBookmarked?: boolean
}
export interface MovieDataResponseInterface {
  data: MovieDataInterface[]
  page: string
  per_page: number
  total: number
  total_pages: number
}