import { Content, Sidebar } from "@/components"
import { BlogsType } from "@/interfaces/blogs.interface"
import { CategoryType } from "@/interfaces/categories.interface"
import Layout from "@/layout/layout"
import SEO from "@/layout/seo/seo"
import { BlogsService } from "@/services/blog.service"
import { Box } from "@mui/material"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

const CatergoryDetailedPage = ({blogs, latestBlogs, categories}: DetailedCategoriesPageProps) => {
	const router = useRouter()

  return (
		<SEO metaTitle={`${router.query.slug}-category`}>
			<Layout>
				<Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' }, padding: '20px' }}>
					<Sidebar latestBlogs={latestBlogs} categories={categories} />
					<Content blogs={blogs} />
				</Box>
			</Layout>
		</SEO>
  )
}

export default CatergoryDetailedPage

export const getServerSideProps: GetServerSideProps<DetailedCategoriesPageProps> = async ({ query }) => {
	const blogs = await BlogsService.getDetailedCategoriesBlog(query.slug as string);
	const latestBlogs = await BlogsService.getLatestBlogs();
	const categories = await BlogsService.getCategories();

	return {
		props: {
			blogs,
			latestBlogs,
			categories,
		},
	};
};

interface DetailedCategoriesPageProps {
	blogs: BlogsType[];
	latestBlogs: BlogsType[];
	categories: CategoryType[];
}