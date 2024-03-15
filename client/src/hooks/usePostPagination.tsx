import { customAxios } from '@/api/customAxios'
import { dislike } from '@/api/post/dislike'
import { like } from '@/api/post/like'
import { lose } from '@/api/post/lose'
import { save } from '@/api/post/save'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const usePostPagination = (url: string, limit: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [status, setStatus] = useState<boolean>(false)
  const [data, setData] = useState<Post[]>([])
  const [page, setPage] = useState<number>(1)
  const { inView, ref } = useInView({ threshold: 0 })

  useEffect(() => {
    if (url && !!inView) {
      ;(async function () {
        const res = await customAxios<Post[]>(url, {
          params: {
            _limit: limit,
            _page: page,
          },
        }).finally(() => {
          setPage((prev) => prev + 1)
          setIsLoading(false)
        })

        if (res.data.length === 0) return setStatus(true)
        setData((prev: Post[]) => [...prev, ...res.data])
      })()
    }
  }, [inView, url])

  const likePost = async (meId: string, postId: string) => {
    setData((prev: Post[]) => {
      const updatedPost: Post[] = [...prev]
      const index: number = updatedPost.findIndex((post: Post) => post._id === postId)

      if (updatedPost[index].usersLiked.includes(meId)) return prev

      updatedPost[index].usersLiked.push(meId)
      return updatedPost
    })

    await like(meId, postId)
  }

  const dislikePost = async (meId: string, postId: string) => {
    setData((prev) => {
      return prev.map((post) => {
        if (post._id === postId) {
          post.usersLiked = post.usersLiked.filter((userId) => userId !== meId)
        }
        return post
      })
    })

    await dislike(meId, postId)
  }

  const savePost = async (meId: string, postId: string) => {
    setData((prev: Post[]) => {
      const updatedPost: Post[] = [...prev]
      const index: number = updatedPost.findIndex((post: Post) => post._id === postId)

      if (updatedPost[index].usersSaved.includes(meId)) return prev

      updatedPost[index].usersSaved.push(meId)
      return updatedPost
    })

    await save(meId, postId)
  }

  const losePost = async (meId: string, postId: string) => {
    setData((prev: Post[]) => {
      const updatedPost: Post[] = [...prev]
      const index: number = updatedPost.findIndex((post: Post) => post._id === postId)
      const meUser = updatedPost[index].usersSaved.findIndex((user) => user === meId)

      updatedPost[index].usersSaved.splice(meUser, 1)
      return updatedPost
    })

    await lose(meId, postId)
  }

  return { data, isLoading, status, ref, likePost, dislikePost, savePost, losePost }
}
