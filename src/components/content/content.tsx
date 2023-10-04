'use client'
import { Avatar, Box, Divider, Typography } from "@mui/material"
import Image from "next/image"
import { format } from 'date-fns'
import { ContentProps } from "./contentProps"
import { calculateEstimetedTimeToRead } from "@/helpers/time.format"
import { useRouter } from "next/router"

const Content = ({blogs}: ContentProps) => {
  const router = useRouter()

  return (
    <Box width={{xs: '100%', md: '70%'}}>
      {blogs.map(item => (
        <Box key={item.id} sx={{backgroundColor: 'rgba(0, 0, 0, .5)', padding: '20px', marginTop: '20px', borderRadius: '8px', boxShadow: '0 8px 16px rgba(255, 255, 255, .1)', cursor: 'pointer'}} onClick={() => router.push(`/blog/${item.slug}`)}>
          <Box position='relative' width='100%' height={{xs: '30vh', md: '50vh'}}>
            <Image src={item.image?.url} alt={item.title} fill style={{objectFit: 'cover', borderRadius: '10px'}} />
          </Box>
          <Typography variant='h4' marginTop='30px'>{item.title}</Typography>
          <Typography variant='body1' color='gray'>{item.excerpt}</Typography>
          <Divider sx={{marginTop: '30px'}} />
          <Box sx={{display: 'flex', gap: '10px', marginTop: '20px'}}>
            <Avatar src={item.author.avatar?.url} alt={item.author.name} />
            <Box>
              <Typography>{item.author.name}</Typography>
              <Box color='gray'>{format(new Date(item.createdAt), 'dd MMM, yyyy')} • {calculateEstimetedTimeToRead(item.description.text)}min read</Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Content