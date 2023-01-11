import { useState } from "react";
import Support from "../pages/SupportEngine";
import Loading from "./Loading";

import { MDBBadge } from "mdb-react-ui-kit";
import {
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// hooks
import useDebounce from "../hooks/useDebounce";

import { useQueryClient } from "@tanstack/react-query";
import { useCartLength, useSearch } from "../api";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";

// Logo
import Logo from "../assets/logo.png";
import profileLogo from "../assets/profile.png";
import shoppingCartLogo from "../assets/shopping-cart.png";

export default function Header() {
  // Hooks
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const length = useCartLength();

  // Initialize
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("");
  const debounce = useDebounce(filter, 500);
  const { data: search, isFetched: fetchedSearch } = useSearch(debounce);
  const { data: user } = queryClient.getQueryData(["me"]);

  const [show, setShow] = useState(false);
  const showDropdown = () => setShow(true);
  const hideDropdown = () => setShow(false);

  const select = (name) => {
    navigate(`/products/${name}`);
    setHistory((prev) => {
      const p = prev.filter((data) => data !== name);
      return [name, ...p];
    });
  };

  const openSearch = () => {
    if (!debounce || debounce === "") return setOpen(false);
    setOpen(true);
  };

  useDidUpdateEffect(openSearch, [debounce]);

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/", { replace: true })}
          style={{ cursor: "pointer" }}
        >
          <img
            alt="logo"
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top mx-2"
          />
          SparkGrow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="w-100"
        >
          <Form className="w-100 mx-md-5">
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
                  <Loading style={{ height: "5rem" }} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
                <Navbar.Text className="ms-4 d-inline d-md-none">
                  Cart
                </Navbar.Text>
              </Nav.Link>
              <NavDropdown
                title={
                  <img
                    alt=""
                    src={user.image ?? profileLogo}
                    width="30"
                    height="30"
                    className="cover round"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = profileLogo;
                    }}
                  />
                }
                onClick={() => navigate("/profile")}
                className="mx-2"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <NavDropdown.Item
                  onClick={() => navigate("/profile")}
                  // className="ms-4 d-inline d-md-none"
                >
                  My Account
                </NavDropdown.Item>
              <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Logout
                    </NavDropdown.Item>
              </NavDropdown>
              {/* <Navbar.Text className="mx-2">Signed in as: {name}</Navbar.Text> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Support.Window />
      </Container>
    </Navbar>
  );
}
