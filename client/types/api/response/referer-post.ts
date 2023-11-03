import { Post } from "@/types/common/post"

export interface ISearchPostResponse
  extends Omit<
    Post,
    "city_uuid" | "province_uuid" | "country_uuid" | "status" | "industry_uuid"
  > {
  user: {
    username: string | null
    avatar_url: string | null
  } | null

  country: {
    cantonese_name: string | null
  } | null
  province: {
    cantonese_name: string | null
  } | null
  city: {
    cantonese_name: string | null
  } | null

  industry: {
    cantonese_name: string | null
  } | null
}

export interface IGetPostResponse
  extends Omit<
    Post,
    "id" | "city_uuid" | "province_uuid" | "country_uuid" | "industry_uuid"
  > {}

export interface IListPostResponse extends Post {
  country: {
    cantonese_name: string | null
  } | null
  province: {
    cantonese_name: string | null
  } | null
  city: {
    cantonese_name: string | null
  } | null

  industry: {
    cantonese_name: string | null
  } | null
  user: {
    username: string | null
    avatar_url: string | null
  } | null
}
