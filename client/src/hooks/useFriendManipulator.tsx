import { useMemo, useState } from 'react'
import { customAxios } from '@/api/customAxios'
import { subscribe } from '@/api/user/subscribe'
import { unsubscribe } from '@/api/user/unsubscribe'
import { addFriend } from '@/api/user/addFriend'
import { recallFriend } from '@/api/user/recallFriend'

export const useFriendManipulator = (url: string, i: string, limit: number) => {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, setState] = useState<string>('')

  useMemo(() => {
    setPage(1)
    setData([])
  }, [i])

  const search = (): void => {
    if (i) {
      setIsLoading(true)
      setState('')

      setPage((prev) => prev + 1)
      ;(async function () {
        const res = await customAxios<User[]>(url, {
          params: { _search: i, _limit: limit, _page: page },
        })

        setIsLoading(false)

        if (!res.status) return setState('Error')

        if ([...res.data].length > 0) return setData((prev: User[]) => [...prev, ...res.data])
        return setState(`There are no more users left`)
      })()
    }
  }

  const QSubscribe = async (userId: string, meId: string) => {
    await subscribe(userId, meId)

    setData((prev: User[]) => {
      const updatedUsers: User[] = [...prev]
      const index: number = updatedUsers.findIndex((user) => user._id === userId)

      updatedUsers[index].infos.subs.push(meId)
      return updatedUsers
    })
  }

  const QUnsubscribe = async (userId: string, meId: string) => {
    await unsubscribe(userId, meId)

    setData((prev: User[]) => {
      const updatedUsers: User[] = [...prev]
      const index: number = updatedUsers.findIndex((user) => user._id === userId)

      const meUser = updatedUsers[index].infos.subs.findIndex((user) => user === meId)
      updatedUsers[index].infos.subs.splice(meUser, 1)

      return updatedUsers
    })
  }

  const QFriendReq = async (userId: string, meId: string) => {
    await addFriend(userId, meId)

    setData((prev: User[]) => {
      const updatedUsers: User[] = [...prev]
      const index: number = updatedUsers.findIndex((user) => user._id === userId)

      updatedUsers[index].infos.friendsReq.push(meId)
      return updatedUsers
    })
  }

  const QRecallFriend = async (userId: string, meId: string) => {
    await recallFriend(userId, meId)

    setData((prev: User[]) => {
      const updatedUsers: User[] = [...prev]
      const index: number = updatedUsers.findIndex((user) => user._id === userId)

      const meUser = updatedUsers[index].infos.friendsReq.findIndex((user) => user === meId)
      updatedUsers[index].infos.friendsReq.splice(meUser, 1)

      return updatedUsers
    })
  }

  return {
    data,
    isLoading,
    state,
    search,
    QSubscribe,
    QUnsubscribe,
    QFriendReq,
    QRecallFriend,
  }
}
