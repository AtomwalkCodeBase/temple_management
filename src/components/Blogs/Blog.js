import BlogListingPage from "../BlogListingPage"
import BlogList from "./BlogList"
import BlogPosts from "../BlogPosts"

const Blog = () => {
  return (
    <div>
       
      <BlogListingPage />
      {/* <BlogList/> */}
      <BlogPosts></BlogPosts>

    </div>
  )
}

export default Blog