import { ReferralType } from "@/types/common/referral-type"

export interface ISearchPostsRequest {
  numberOfDataPerPage: number
  type: ReferralType
  countryUuid?: string
  provinceUuid?: string
  cityUuid?: string
  industryUuid?: string
  companyName: string
  maxYearOfExperience: number
  minYearOfExperience: number
  jobTitle: string
  sortingType: string
  page: number
}
