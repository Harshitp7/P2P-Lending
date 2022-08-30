import { Link } from 'react-router-dom';
import { useEth } from '../contexts';
import LogoutIcon from '@mui/icons-material/Logout';
import '../App.css';

function NavbarCommon(props) {
  let { role } = props;
  const { state: { contracts, accounts }, dispatch } = useEth();
  
  const BorrowerLayout = [
   {
      id: 0,
      name: 'Lenders',
      ref: '/borrower/lenders'
    },
    {
      id: 1,
      name: 'Profile',
      ref: `/borrower/profile/${accounts[0]}`
    },
    {
      id: 2,
      name: <LogoutIcon />,
      ref: '/'
    }
  ];

  const LenderLayout = [
    {
      id: 0,
      name: 'Profile',
      ref: `/lender/profile/${accounts[0]}`
    },
    {
      id: 1,
      name: <LogoutIcon />,
      ref: '/'
    }
  ];

  

  let navArray = [];
  if (role === 'BorrowerLayout') navArray = BorrowerLayout;
  else if (role === 'LenderLayout') navArray = LenderLayout;
  else navArray = [];
console.log(navArray);
  
  const renderLinks = navArray.map((element) =>
  <li>
    <Link key={element.id} to={element.ref} style={{color: 'black', textDecoration: 'none', display: 'flex', padding: '8px', fontSize: 'large', fontWeight: '500' }}>{element.name}</Link>
    </li>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: '#FFC107' }}>
      <div className="container-fluid">
        <img src="https://cdn.vectorstock.com/i/1000x1000/05/91/blockchain-cube-colorful-line-icon-or-logo-vector-22330591.webp" alt="" style={{ width: '4%', height: '4%', marginRight: '1%' }} />
        <Link className="navbar-brand ms-5" to="/" style={{ fontSize: 'large', color: 'black', fontWeight: 'bold'}}>LendDefi</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav mx-5" style={{textAlign: 'center'}}>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
            </li>
            
            {renderLinks}
           
            {(navArray.length===0) && (<><li className="nav-item">
              <Link className="nav-link" to="/Signin">Signin</Link>
            </li>

            <li className="nav-item">

              <div className="btn-group">
                <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'purple', fontSize: 'large', padding: '' }}>
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