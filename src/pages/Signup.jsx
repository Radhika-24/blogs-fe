import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../config";
import {
  Container,
  Form,
  FormGroup,
  FormLabel,
  Button,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import { PLANS } from "../constants";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchApi("signup", false, "POST", {
        username: email,
        password,
        name,
        plan,
      });
      if (res?.token) {
        localStorage.setItem("TOKEN", res.token);
        navigate("/");
      }
    } catch (err) {}
    setErrorMessage("Invalid Credentials");
  };
  return (
    <Container className="p-5 w-75 d-flex flex-column">
      {errorMessage && <h6 className="text-danger">{errorMessage}</h6>}
      <Row>
        <Col>
          <Form>
            <FormGroup className="mb-2">
              <FormLabel>Name</FormLabel>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
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
            <FormGroup className="mb-2">
              <FormLabel className="mb-2">Plan</FormLabel>
              <Form.Select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option>Select</option>
                <option value={PLANS.FREE}>Free</option>
                <option value={PLANS.STARTER}>Starter</option>
                <option value={PLANS.PROFESSIONAL}>Proffesional</option>
              </Form.Select>
            </FormGroup>
            <Button type="primary" onClick={handleLogin}>
              Signup
            </Button>
          </Form>
        </Col>
        <Col>
          <Row>
            <hi>Plans</hi>
            <Card className="m-2">
              <Card.Body>
                <Card.Title>Free</Card.Title>
                <Card.Subtitle className="text-secondary">Free</Card.Subtitle>
                <Card.Text>Cannot create or read blogs</Card.Text>
              </Card.Body>
            </Card>
            <Card className="m-2">
              <Card.Body>
                <Card.Title>Starter</Card.Title>
                <Card.Subtitle className="text-secondary">
                  Rs500 per month
                </Card.Subtitle>
                <Card.Text>Create Blogs and read upto 10 blogs daily</Card.Text>
              </Card.Body>
            </Card>
            <Card className="m-2">
              <Card.Body>
                <Card.Title>Proffesional</Card.Title>
                <Card.Subtitle className="text-secondary">
                  Rs1000 per month
                </Card.Subtitle>
                <Card.Text>
                  Create Blogs and read unlimited blogs daily
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
