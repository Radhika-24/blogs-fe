import { useState } from "react";
import { Button, Container, Form, FormGroup, FormLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchApi } from "../config";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchApi("login", false, "POST", {
        username: email,
        password,
      });
      if (res?.token) {
        localStorage.setItem("TOKEN", res.token);
        navigate("/");
      }
    } catch (err) {}
    setErrorMessage("Invalid Credentials");
  };
  return (
    <Container className="p-5 w-25">
      {errorMessage && <h6 className="text-danger">{errorMessage}</h6>}
      <Form>
        <FormGroup className="mb-2">
          <FormLabel>Email</FormLabel>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <FormLabel className="mb-2">Password</FormLabel>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
      Don't have any account?&nbsp;
      <Link to="/signup">Signup</Link> &nbsp;instead.
    </Container>
  );
};
