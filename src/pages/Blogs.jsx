import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../config";
import { Card, Container } from "react-bootstrap";

export const Blogs = () => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchApi(`blogs/${id}`, true, "GET").then((res) => setBlog(res));
    }
  }, [id]);
  const [blog, setBlog] = useState(null);
  return (
    <Container className="p-2">
      {blog ? <BlogPresentational blog={blog} /> : <h1>Not found</h1>}
    </Container>
  );
};

const BlogPresentational = ({ blog }) => {
  return (
    <Card className="p-5">
      <Card.Body>
        <Card.Title>
          <h1>{blog.title}</h1>
        </Card.Title>

        {blog?.publishedBy && (
          <Card.Subtitle className="mb-5 justify-content-end">
            <h6>
              <span className="text-secondary">Published By:</span>
              {blog.publishedBy}
            </h6>
          </Card.Subtitle>
        )}
        <Card.Text>{blog.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};
