'use client'
import { Content, Hero, Sidebar } from "@/components";
import { BlogsType } from "@/interfaces/blogs.interface";
import { BlogsService } from "@/services/blog.service";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";

export default function Home(props: HomePageProps) {
  console.log(props)

  return (
    <>
      <Hero />
      <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: '20px', padding: '20px'}}>
        <Sidebar />
        <Content />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async() => {
  return {
    props: {
      message: 'Message form SSR'
    }
  }
}

interface HomePageProps {
  message: string
}