import Footer from "@/components/Footer"
import Header from "@/components/Header"
import BlogList from "@/components/blog/BlogList"
import { BLOG_FOOTER_LINKS } from "@/lib/site"

export default function BlogPage() {
  return (
    <>
      <Header />
      <BlogList />
      <Footer navLinks={BLOG_FOOTER_LINKS} />
    </>
  )
}
