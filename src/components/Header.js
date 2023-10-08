import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { fetchApi } from "../config";
import { PLANS } from "../constants";
import { useEffect, useState } from "react";

export const Header = () => {
  const isAuthenticated = localStorage.getItem("TOKEN");
  const handleLogout = async () => {
    await fetchApi("logout", true, "GET");
    localStorage.removeItem("TOKEN");
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      fetchApi("", true, "GET").then((res) => {
        setUser(res);
      });
    }
  }, [isAuthenticated]);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">TMC Blogs</Navbar.Brand>
        <Navbar.Toggle />
        {isAuthenticated && (
          <>
            <Nav.Link href="/">Home</Nav.Link>&nbsp; &nbsp;
            {user?.plan !== PLANS.FREE && (
              <Nav.Link href="/create">Create your blog</Nav.Link>
            )}
            <Navbar.Collapse className="justify-content-end">
              {user?.username && (
                <>
                  <Navbar.Text>
                    Signed in as:&nbsp;
                    <span className="text-link">{user?.name}</span>
                  </Navbar.Text>
                  <Button variant="link" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};
