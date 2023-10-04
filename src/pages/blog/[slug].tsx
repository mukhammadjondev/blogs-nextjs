import { BlogsType } from "@/interfaces/blogs.interface"
import Layout from "@/layout/layout"
import { BlogsService } from "@/services/blog.service"
import { GetServerSideProps } from "next"
import { Typography, Avatar, Box, Divider } from '@mui/material';
import { Sidebar } from "@/components";
import { CategoryType } from "@/interfaces/categories.interface";
import Image from "next/image";
import { format } from 'date-fns'
import { calculateEstimetedTimeToRead } from "@/helpers/time.format";

const DetailedBlogsPage = ({blog, latestBlogs, categories}: DetailedBlogsPageProps) => {
  return (
    <Layout>
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' }, padding: '20px' }}>
        <Box width={{xs: '100%', md: '70%'}}>
          <Box sx={{backgroundColor: 'black', padding: '20px', borderRadius: '8px', boxShadow: '0 8px 16px rgba(255, 255, 255, .1)', marginBottom: '20px'}} position='relative' width='100%' height={{xs: '30vh', md: '50vh'}}>
            <Image src={blog.image?.url} alt={blog.title} fill style={{objectFit: 'cover', borderRadius: '10px'}} />
          </Box>
          <Box display={'flex'} flexDirection='column' rowGap={'10px'}>
            <Box sx={{display: 'flex', gap: '10px', marginTop: '20px'}}>
              <Avatar src={blog.author.avatar?.url} alt={blog.author.name} />
              <Box>
                <Typography>{blog.author.name}</Typography>
                <Box color='gray'>{format(new Date(blog.createdAt), 'dd MMM, yyyy')} • {calculateEstimetedTimeToRead(blog.description.text)}min read</Box>
              </Box>
            </Box>
            <Typography variant='h3' marginTop='20px'>{blog.title}</Typography>
            <Typography color='gray'>{blog.excerpt}</Typography>
            <Divider />
            <div style={{opacity: '.8'}} dangerouslySetInnerHTML={{__html: blog.description.html}} />
          </Box>
        </Box>
        <Sidebar latestBlogs={latestBlogs} categories={categories} />
      </Box>
    </Layout>
  )
}

export default DetailedBlogsPage

export const getServerSideProps: GetServerSideProps<DetailedBlogsPageProps> = async ({query}) => {
  const blog = await BlogsService.getDetailedBlogs(query.slug as string)
  const latestBlogs = await BlogsService.getLatestBlogs()
	const categories = await BlogsService.getCategories()

  return {
    props: {
      blog,
      latestBlogs,
      categories,
    }
  }
}

interface DetailedBlogsPageProps {
  blog: BlogsType;
	latestBlogs: BlogsType[];
	categories: CategoryType[];
}