import { useCallback, useState } from "react"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { PaginatedTransactionsResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<
    Transaction[]
  > | null>(null)

  const fetchAll = useCallback(
    async (viewMore = false) => {
      let prev_data: Transaction[] = []
      if (viewMore) {
        prev_data = paginatedTransactions?.data || []
      }

      const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
        "paginatedTransactions",
        {
          page: paginatedTransactions === null ? 0 : paginatedTransactions.nextPage,
        }
      )

      setPaginatedTransactions((previousResponse) => {
        if (response === null || previousResponse === null) {
          return response
        }

        if (viewMore) {
          if (response?.data) response.data = [...prev_data, ...response?.data]
          else response.data = [...prev_data]
        }

        return { data: response.data, nextPage: response.nextPage }
      })
    },
    [fetchWithCache, paginatedTransactions]
  )

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null)
  }, [])

  return { data: paginatedTransactions, loading, fetchAll, invalidateData }
}
