import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function BasicExample(props) {
  const Borrower = [
    {
      name: 'Home',
      ref: '/'
    },
    {
      name: 'Lenders',
      ref: '/'
    },
    {
      name: 'Profile',
      ref: '/'
    }
  ];

  const Lender = [
  {
    name: 'Home',
    ref: '/'
  },
  {
    name: 'Profile',
    ref: '/'
  }
];

const renderLinks = {props,role}.map((link) => 
<Nav.Link link={link.ref}>{link.name}</Nav.Link>
);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse  className="justify-content-end">
          <Nav>
           {renderLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;