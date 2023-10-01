'use client'
import { Content, Hero, Sidebar } from "@/components";
import { BlogsType } from "@/interfaces/blogs.interface";
import { CategoryType } from "@/interfaces/categories.interface";
import { BlogsService } from "@/services/blog.service";
import { Box } from "@mui/material";
import { useEffect, useState } from 'react'

export default function Home() {
  const [blogs, setBlogs] = useState<BlogsType[]>()
  const [latestBlogs, setLatestBlogs] = useState<BlogsType[]>()
  const [categories, setCategories] = useState<CategoryType[]>()

  useEffect(() => {
    BlogsService.getAllBlogs().then(data => setBlogs(data))
    BlogsService.getLatestBlogs().then(data => setLatestBlogs(data))
    BlogsService.getCategories().then(data => setCategories(data))
  }, [])

  return blogs && latestBlogs && categories && (
    <>
      <Hero blogs={blogs} />
      <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: '20px', padding: '20px'}}>
        <Sidebar latestBlogs={latestBlogs} categories={categories} />
        <Content blogs={blogs} />
      </Box>
    </>
  )
}