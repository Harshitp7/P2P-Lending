import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavbarCommon(props) {
  let { role } = props;
  const Borrower = [
    {
      id: 0,
      name: 'Home',
      ref: '/Home'
    },
    {
      id: 1,
      name: 'Lenders',
      ref: '/SignUp'
    },
    {
      id: 2,
      name: 'Profile',
      ref: '/'
    }
  ];

  const Lender = [
    {
      id: 0,
      name: 'Home',
      ref: '/Home'
    },
    {
      id: 1,
      name: 'Profile',
      ref: '/'
    }
  ];

  const signIn = [
    {
      id: 0,
      name: 'Home',
      ref: '/Home'
    }
  ];

  let navArray = [];
  if (role === 'Borrower') navArray = Borrower;
  else if(role==='Lender') navArray = Lender;
  else navArray = signIn;

  const renderLinks = navArray.map((element) =>
    <Nav.Link link={element.ref} key={element.id}>{element.name}</Nav.Link>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
      <div className="container-fluid">
        <img src="https://cdn.vectorstock.com/i/1000x1000/05/91/blockchain-cube-colorful-line-icon-or-logo-vector-22330591.webp" alt="" style={{ width: '4%', height: '4%', marginRight: '1%' }} />
        <Link className="navbar-brand" to="/" style={{ fontSize: 'large', color: 'black', fontWeight: 'bold' }}>LendDefi</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav mx-5 px-5">
            {renderLinks}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarCommon;