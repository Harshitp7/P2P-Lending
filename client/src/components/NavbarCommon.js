import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';


function NavbarCommon(props) {
  let { role } = props;
  
  const BorrowerLayout = [
   {
      id: 0,
      name: 'Lenders',
      ref: '/borrower/lenders'
    },
    {
      id: 1,
      name: 'Profile',
      ref: "/borrower/profile/:borrowerAddress"
    }
  ];

  const LenderLayout = [
    {
      id: 0,
      name: 'Profile',
      ref: '/lender/profile/:lenderAddress'
    }
  ];

  

  let navArray = [];
  if (role === 'BorrowerLayout') navArray = BorrowerLayout;
  else if (role === 'LenderLayout') navArray = LenderLayout;
  else navArray = [];

  
  const renderLinks = navArray.map((element) =>
    <Nav.Link link={element.ref} key={element.id}>{element.name}</Nav.Link>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-warning bg-warning" style={{ position: 'sticky', top: '0', zIndex: '1' }}>
      <div className="container-fluid">
        <img src="https://cdn.vectorstock.com/i/1000x1000/05/91/blockchain-cube-colorful-line-icon-or-logo-vector-22330591.webp" alt="" style={{ width: '4%', height: '4%', marginRight: '1%' }} />
        <Link className="navbar-brand" to="/Home" style={{ fontSize: 'large', color: 'black', fontWeight: 'bold' }}>LendDefi</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav mx-5 px-5">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
            </li>
            {renderLinks}
            {(navArray.length===0) && (<><li className="nav-item">
              <Link className="nav-link" to="/Signin">Signin</Link>
            </li>

            <li className="nav-item">

              <div className="btn-group">
                <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'purple', fontSize: 'large' }}>
                  SignUp
                </button>
                <ul className="dropdown-menu" style={{ backgroundColor: '#FFC107' }}>
                  <li><Link className="dropdown-item" to="/SignUpBorrower">Borrower</Link></li>
                  <li><Link className="dropdown-item" to="/SignUpLender">Lender</Link></li>
                </ul>
              </div>

            </li></>)}


          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarCommon;