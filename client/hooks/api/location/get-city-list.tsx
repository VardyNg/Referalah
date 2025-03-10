import { getCityList } from "@/utils/common/api"
import { useQuery } from "@tanstack/react-query"

import { QueryKeyString } from "@/types/common/query-key-string"

const useGetCityList = () => {
  return useQuery({
    queryKey: [QueryKeyString.CITY_LIST],
    queryFn: getCityList,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export default useGetCityList
