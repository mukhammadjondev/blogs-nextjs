import { BlogsType } from '@/interfaces/blogs.interface'
import {request, gql} from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string

export const BlogsService = {
  async getAllBlogs() {
    const query = gql`
      query GetBlogs {
        blogs {
          excerpt
          id
          slug
          title
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          category {
            label
            slug
          }
        }
      }
    `
    const result = await request<{blogs: BlogsType[]}>(graphqlAPI, query)
    return result.blogs
  }
}