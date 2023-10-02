import { BlogsType } from '@/interfaces/blogs.interface'
import { CategoryType } from '@/interfaces/categories.interface'
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
          createdAt
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
          description {
            text
          }
        }
      }
    `
    const result = await request<{blogs: BlogsType[]}>(graphqlAPI, query)
    return result.blogs
  },

  async getLatestBlogs() {
    const query = gql`
      query GetLatestBlogs {
        blogs(last: 2) {
          id
          slug
          title
          createdAt
          description {
            text
          }
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
        }
      }
    `
    const result = await request<{blogs: BlogsType[]}>(graphqlAPI, query)
    return result.blogs
  },

  async getCategories() {
    const query = gql`
      query GetCategories {
        categories {
          label
          slug
        }
      }
    `
    const result = await request<{categories: CategoryType[]}>(graphqlAPI, query)
    return result.categories
  }
}