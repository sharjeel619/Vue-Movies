/* eslint-disable */
import { MovieDataResponseInterface } from "@/interfaces/global"
export const getMoviesList = (page: number) => {
  return fetch(`https://jsonmock.hackerrank.com/api/movies?page=${page}`)
    .then((res) => res.json())
    .then((res: MovieDataResponseInterface) => res)
}
export const getSearchResults = (searchQuery: string, page: number) => {
  return fetch(`https://jsonmock.hackerrank.com/api/movies/search?Title=${searchQuery.toLowerCase()}&page=${page}`)
    .then((res) => res.json())
    .then((result: MovieDataResponseInterface) => result)
}