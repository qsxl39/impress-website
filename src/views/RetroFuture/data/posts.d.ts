export interface Post {
  id: number
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  image: string
  tags: string[]
}

export declare const posts: Post[]
