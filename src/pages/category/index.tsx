import { CategoryType } from "@/interfaces/categories.interface"
import Layout from "@/layout/layout"
import SEO from "@/layout/seo/seo"
import { BlogsService } from "@/services/blog.service"
import { Box, Button, ButtonGroup, Typography } from "@mui/material"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

const CategoryPage = ({categories}: CategoryPageProps) => {
  const router = useRouter()

  return (
    <SEO metaTitle="All categories">
      <Layout>
        <Box width={{xs: '100%', md: '80%'}} marginX='auto' marginTop='10vh' borderRadius='8px' height={{xs: '30vh', md: '50vh'}} sx={{backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', rowGap: '15px'}}>
          <Typography variant='h3' fontFamily={'cursive'}>All  Categories</Typography>
          <ButtonGroup variant='contained' aria-label='outlined primary button group'>
            {categories.map(item => (
              <Button onClick={() => router.push(`/category/${item.slug}`)} key={item.slug}>
                # {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Layout>
    </SEO>
  )
}

export default CategoryPage

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async() => {
  const categories = await BlogsService.getCategories()

  return {
    props: {categories}
  }
}

interface CategoryPageProps {
  categories: CategoryType[]
}