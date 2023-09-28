import { Content, Hero, Sidebar } from "@/components";
import { Box } from "@mui/material";

export default function Home() {
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
