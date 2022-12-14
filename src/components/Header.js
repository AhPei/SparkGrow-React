import { useState } from "react";
import Support from "../pages/SupportEngine";
import Loading from "./Loading";

import { MDBBadge } from "mdb-react-ui-kit";
import {
  Container, Dropdown, Form,
  Nav, Navbar, Offcanvas
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// hooks
import useDebounce from "../hooks/useDebounce";

import { useQueryClient } from "@tanstack/react-query";
import { useCartLength, useSearch } from "../api";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";

// Logo
import Logo from "../assets/logo.png";
import shoppingCartLogo from "../assets/shopping-cart.png";

export default function Header({ children }) {
  const queryClient = useQueryClient();
  const { data: user } = queryClient.getQueryData(["me"]);
  const { username, image } = user;

  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const debounce = useDebounce(filter, 500);

  const { data: search, isFetched: fetchedSearch } = useSearch(debounce);
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);

  const select = (name) => {
    navigate(`/products/${name}`);
    setHistory((prev) => {
      const p = prev.filter((data) => data !== name);
      return [name, ...p];
    });
    // setFilter("");
  };

  const { length } = useCartLength();

  const openSearch = () => {
    if (!debounce || debounce === "") return setOpen(false);
    setOpen(true);
  };

  useDidUpdateEffect(openSearch, [debounce]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/", { replace: true })}
            style={{ cursor: "pointer" }}
          >
            <img
              alt="LOGO"
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top mx-2"
            />
            E-commerce
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className="flex-grow-1 mx-md-5">
                <Dropdown
                  className="mt-1"
                  onSelect={(e) => select(e)}
                  show={open}
                  onToggle={(nextShow) => setOpen(nextShow)}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    onClick={openSearch}
                  />
                  <Dropdown.Menu
                    style={{
                      minHeight: "30px",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                    className="w-100"
                  >
                    {fetchedSearch ? (
                      debounce && search && search.length > 0 ? (
                        // Search?
                        search.map(({ name }, idx) => (
                          <Dropdown.Item key={idx} eventKey={name}>
                            {name}
                          </Dropdown.Item>
                        ))
                      ) : // History?
                      history.length > 0 ? (
                        history.map((name, idx) => (
                          <Dropdown.Item key={idx} eventKey={name}>
                            {name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        // No Results
                        <p className="text-center">No search results</p>
                      )
                    ) : (
                      <Loading style={{height: "5rem"}} />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Form>
              <Nav>
                <Nav.Link onClick={() => navigate("/cart")} className="mx-2">
                  <img
                    alt="shopping-cart"
                    src={shoppingCartLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />
                  <MDBBadge color="danger" notification pill>
                    {length > 999 ? "999+" : length > 0 ? length : ""}
                  </MDBBadge>
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/profile")} className="mx-2">
                  <img
                    alt="profile"
                    src={image}
                    width="30"
                    height="30"
                    className="cover round"
                  />
                </Nav.Link>

                {/* <Navbar.Text className="mx-2">Signed in as: {name}</Navbar.Text> */}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Support.Window
            username={username}
            token={localStorage.getItem("access")}
          />
        </Container>
      </Navbar>
      {children}
      {/* {fetchingSearch ? (
        <Loading />
      ) : search && search.length > 0 ? (
        <ProductCard data={search} />
      ) : (
        children
      )} */}
    </>
  );
}
