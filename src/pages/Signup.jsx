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
  const [card, setCard] = useState({
    number: "",
    year: null,
    month: null,
    cvv: "",
  });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        setErrorMessage("Please enter name");
        return;
      }
      if (!password) {
        setErrorMessage("Please enter password");
        return;
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setErrorMessage("Invalid Email");
        return;
      }
      if (plan !== PLANS.FREE) {
        if (card.number.length !== 16) {
          setErrorMessage("Card number should be 16 digits");
          return;
        }
        if (card.cvv.length !== 3) {
          setErrorMessage("CVV should be 3 digits");
          return;
        }
        if (card.month < 1 || card.month > 12) {
          setErrorMessage("Expiry month should be between 1-12");
          return;
        }
        if (card.year < 2023) {
          setErrorMessage("Expired card");
          return;
        }
        if (card.year.length !== 4) {
          setErrorMessage("Please enter correct year");
          return;
        }
      }

      const res = await fetchApi("signup", false, "POST", {
        username: email,
        password,
        name,
        plan,
        card,
      });
      if (res?.token) {
        localStorage.setItem("TOKEN", res.token);
        navigate("/");
      } else {
        setErrorMessage(res.errorMessage);
      }
    } catch (err) {
      setErrorMessage(err);
    }
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
            <FormGroup className="mb-2">
              <FormLabel>Card Number</FormLabel>
              <Form.Control
                type="number"
                value={card.number}
                onChange={(e) =>
                  setCard((prevcard) => ({
                    ...prevcard,
                    number: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <Row>
                <Col>
                  <FormLabel>Month</FormLabel>
                  <Form.Control
                    type="number"
                    value={card.month}
                    onChange={(e) =>
                      setCard((prevcard) => ({
                        ...prevcard,
                        month: e.target.value,
                      }))
                    }
                  />
                </Col>
                <Col>
                  <FormLabel>Year</FormLabel>
                  <Form.Control
                    type="number"
                    value={card.year}
                    onChange={(e) =>
                      setCard((prevcard) => ({
                        ...prevcard,
                        year: e.target.value,
                      }))
                    }
                  />
                </Col>
                <Col>
                  <FormLabel>CVV</FormLabel>
                  <Form.Control
                    type="number"
                    value={card.cvv}
                    onChange={(e) =>
                      setCard((prevcard) => ({
                        ...prevcard,
                        cvv: e.target.value,
                      }))
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <Button type="primary" className="mt-3" onClick={handleSignUp}>
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
