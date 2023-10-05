'use client'
import 'react-multi-carousel/lib/styles.css'
import { Avatar, Box, Typography } from "@mui/material"
import Carousel from 'react-multi-carousel'
import Image from 'next/image'
import { format } from 'date-fns'
import { HeroProps } from './hero.interface'
import { calculateEstimetedTimeToRead } from '@/helpers/time.format'
import { useRouter } from 'next/router'

const Hero = ({blogs}: HeroProps) => {
  const router = useRouter()

  return (
    <Box width={'100%'} height={'65vh'}>
      <Carousel responsive={{
        mobile: {
          breakpoint: {max: 4000, min: 0},
          items: 1,
        },
      }}>
        {blogs.map(item => (
          <Box key={item.id} sx={{cursor: 'pointer'}} onClick={() => router.push(`/blog/${item.slug}`)}>
            <Box sx={{position: 'relative', width: '100%', height: '65vh'}}>
              <Image src={item.image?.url} alt={item.title} fill style={{objectFit: 'cover'}}/>
              <Box sx={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .5)'}} />
              <Box width={{xs: '100%', md: '70%'}} position='relative' color='white' sx={{top: '50%', transform: 'translateY(-50%)', paddingLeft: {xs: '10px', md: '50px'}}} zIndex={99}>
                <Typography sx={{fontSize: {xs: '30px', md: '50px'}}}>{item.title}</Typography>
                <Typography color='gray' sx={{fontSize: {xs: '20px', md: '25px'}}}>{item.excerpt}</Typography>
                <Box sx={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                  <Avatar src={item.author.avatar?.url} alt={item.author.name} />
                  <Box>
                    <Typography>{item.author.name}</Typography>
                    <Box>{format(new Date(item.createdAt), 'dd MMM, yyyy')} • {calculateEstimetedTimeToRead(item.description.text)}min read</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}

export default Hero