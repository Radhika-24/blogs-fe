import { useEffect, useState } from "react";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchApi } from "../config";

export const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetchApi("blogs", true, "GET").then((res) => setBlogs(res));
  }, []);
  return (
    <Container>
      {blogs &&
        blogs.map((blog) => (
          <CardGroup>
            <Card className="m-1">
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.content.slice(0, 10)}...</Card.Text>
                <Button variant="outline-primary">
                  <Link to={`/${blog._id}`}> Read More...</Link>
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
        ))}
    </Container>
  );
};
