import { ChangeEvent, useCallback, useState } from "react"
import apiService from "@/utils/common/api"
import { postSortingOptions } from "@/utils/common/sorting/post"
import { UseInfiniteQueryResult, useInfiniteQuery } from "@tanstack/react-query"

import { ISearchPostsRequest } from "@/types/api/request/post/search"
import { ISearchPostResponse } from "@/types/api/response/referer-post"
import { QueryKeyString } from "@/types/common/query-key-string"
import { ReferralType } from "@/types/common/referral-type"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

interface IFilterMeta {
  companyName: string
  jobTitle: string
  cityUuid: string | undefined
  countryUuid: string | undefined
  industryUuid: string | undefined
  provinceUuid: string | undefined
  sorting: string
  yoeMin: string // string number
  yoeMax: string // string number
}
const searchPost = ({ pageParam = 0, queryKey }: any) => {
  pageParam satisfies number
  queryKey satisfies [
    string,
    { type: ReferralType; filterMeta: IFilterMeta; sorting: string },
  ]

  const NUMBER_OF_DATE_PER_FETCH = 5

  const queryKeyItem = queryKey[1]

  const { type, filterMeta, sorting } = queryKeyItem

  const countryUuid = filterMeta.countryUuid
  const provinceUuid = filterMeta.provinceUuid
  const cityUuid = filterMeta.cityUuid
  const industryUuid = filterMeta.industryUuid
  const companyName = filterMeta.companyName
  const jobTitle = filterMeta.jobTitle
  const sortingType = sorting
  const yoeMax = filterMeta.yoeMax
  const yoeMin = filterMeta.yoeMin

  const param: ISearchPostsRequest = {
    companyName: companyName,
    numberOfDataPerPage: NUMBER_OF_DATE_PER_FETCH,
    cityUuid,
    countryUuid,
    industryUuid,
    jobTitle,
    provinceUuid,
    page: pageParam,
    type,
    sortingType,
    maxYearOfExperience: parseInt(yoeMax),
    minYearOfExperience: parseInt(yoeMin),
  }

  return apiService.searchPost(param)
}
const useSearchPost = (type: ReferralType) => {
  const keyString =
    type === ReferralType.REFEREE
      ? QueryKeyString.SEARCH_REFEREE_POST
      : QueryKeyString.SEARCH_REFERRER_POST

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [companyName, setCompanyName] = useState(searchParams.get("company")?.toString() || "")
  const [jobTitle, setJobTitle] = useState(searchParams.get("jobTitle")?.toString() || "")
  const [provinceUuid, setProvinceUuid] = useState<undefined | string>(searchParams.get("province")?.toString())
  const [countryUuid, setCountryUuid] = useState<undefined | string>(searchParams.get("country")?.toString())
  const [cityUuid, setCityUuid] = useState<undefined | string>(searchParams.get("city")?.toString())
  const [industryUuid, setIndustryUuid] = useState<undefined | string>(searchParams.get("industry")?.toString())
  const [yoeMin, setYoeMin] = useState<undefined | string>(searchParams.get("yoeMin")?.toString() || "0")
  const [yoeMax, setYoeMax] = useState<undefined | string>(searchParams.get("yoeMax")?.toString() || "100")
  const [sorting, setSorting] = useState(searchParams.get("sorting")?.toString() || postSortingOptions[0].value)
  const [params] = useState(new URLSearchParams(searchParams.toString()))

  const createQueryString = useCallback(
    (name: string, value: string) => {
      params.set(name, value)
 
      return params.toString()
    },
    [params]
  )

  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value)
    createQueryString("company", e.target.value)
  }

  const handleJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value)
    createQueryString("jobTitle", e.target.value)
  }

  const handleCountryChange = (value: string) => {
    setCountryUuid(value)
    createQueryString("country", value)
  }
  const handleProvinceChange = (value: string) => {
    setProvinceUuid(value)
    createQueryString("province", value)
  }
  const handleCityChange = (value: string) => {
    setCityUuid(value)
    createQueryString("city", value)
  }

  const handleIndustryChange = (value: string) => {
    setIndustryUuid(value)
    createQueryString("industry", value)
  }

  const handleSortingChange = (value: string) => {
    setSorting(value)
    createQueryString("sorting", value)
  }

  const handleYoeMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value

    // Parse the input value to an integer
    const integerValue = parseInt(rawValue)

    // Check if the parsed value is a valid integer
    if (!isNaN(integerValue) && integerValue >= 0) {
      // If it's a non-negative integer, set the value as is
      setYoeMin(integerValue.toString())
      createQueryString("yoeMin", integerValue.toString())
    } else {
      // If it's negative or not a valid integer, set it to '0'
      setYoeMin("0")
      createQueryString("yoeMin", "0")
    }
  }

  const handleYoeMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value

    // Parse the input value to an integer
    const integerValue = parseInt(rawValue)

    // Check if the parsed value is a valid integer
    if (!isNaN(integerValue) && integerValue >= 0) {
      // If it's a non-negative integer, set the value as is
      setYoeMax(integerValue.toString())
      createQueryString("yoeMax", integerValue.toString())
    } else {
      // If it's negative or not a valid integer, set it to '0'
      setYoeMax("0")
      createQueryString("yoeMax", "0")
    }
  }

  const handleReset = () => {
    setCompanyName("")
    setJobTitle("")
    setCountryUuid(undefined)
    setProvinceUuid(undefined)
    setCityUuid(undefined)
    setIndustryUuid(undefined)
    setYoeMax("100")
    setYoeMin("0")
    setSorting(postSortingOptions[0].value)
    router.push(pathname)
  }

  const handleSubmitChange = () => {
    router.push(pathname + "?" + params.toString())
  }

  const handleKeyPressSubmitChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitChange()
    }
  }

  const filterMeta = {
    companyName: searchParams.get("company")?.toString() || "",
    jobTitle: searchParams.get("jobTitle")?.toString() || "",
    cityUuid: searchParams.get("city")?.toString() || undefined,
    countryUuid: searchParams.get("country")?.toString() || undefined,
    industryUuid: searchParams.get("industry")?.toString() || undefined,
    provinceUuid: searchParams.get("province")?.toString() || undefined,
    sorting: searchParams.get("sorting")?.toString() || postSortingOptions[0].value,
    yoeMin: searchParams.get("yoeMin")?.toString() || "0",
    yoeMax: searchParams.get("yoeMax")?.toString() || "100",
  }

  const result: UseInfiniteQueryResult<ISearchPostResponse[]> =
    useInfiniteQuery({
      queryKey: [keyString, { sorting: filterMeta.sorting, filterMeta, type }],
      queryFn: searchPost,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      getNextPageParam: (lastPage, allPages: any[]) => {
        if (lastPage && lastPage.length > 0) {
          return allPages.length
        } else {
          return null
        }
      },
    })
  return {
    result,
    handleCompanyChange,
    handleCountryChange,
    handleProvinceChange,
    handleCityChange,
    handleSortingChange,
    handleIndustryChange,
    handleYoeMinChange,
    handleYoeMaxChange,
    handleJobTitleChange,
    handleReset,
    handleSubmitChange,
    handleKeyPressSubmitChange,
    jobTitle,
    companyName,
    provinceUuid,
    cityUuid,
    countryUuid,
    industryUuid,
    yoeMax,
    yoeMin,
    sorting,
  }
}

export default useSearchPost
