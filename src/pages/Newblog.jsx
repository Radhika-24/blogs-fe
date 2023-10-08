import { useState } from "react";
import { Button, Container, Form, FormGroup, FormLabel } from "react-bootstrap";
import { fetchApi } from "../config";
import { useNavigate } from "react-router-dom";

export const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = async (e) => {
    e.preventDefault();
    await fetchApi("blogs", true, "POST", { title, content });
    setTitle("");
    setContent("");
    navigate("/");
  };
  return (
    <Container className="p-5">
      <Form>
        <FormGroup className="mb-2">
          <FormLabel>Title</FormLabel>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <FormLabel className="mb-2">Content</FormLabel>
          <Form.Control
            as="textarea"
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <Button type="primary" onClick={handlePublish}>
          Publish
        </Button>
      </Form>
    </Container>
  );
};
