import imageLOGO from '../img/LOGO.png'

import './Navbar.css'
function Navbar() {
  return (
    <nav id="navbar">
      <div id="logo-display">
        <img
          src={imageLOGO}
          style={{ display: 'inline', maxHeight: '4rem', cursor: 'pointer' }}
          onClick={() => {
            window.location.href = '#'
          }}
        />
        <h4
          style={{ display: 'inline', cursor: 'pointer' }}
          onClick={() => {
            window.location.href = '#'
          }}
        >
          WEBSITE{' '}
          <span style={{ fontweight: 'small', fontsize: '10px' }}>
            BÌNH CHỌN
          </span>{' '}
        </h4>
      </div>

      <div id="menu-nav ">
        <ul
          className="d-flex align-items-center h-100"
          style={{ color: 'white' }}
        >
          <li>
            {' '}
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#Gallery">Gallery</a>
          </li>
          <li>
            {' '}
            <a href="#voting">Voting</a>
          </li>
          <li>
            {' '}
            <a href="#contactus">Contact us</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar
