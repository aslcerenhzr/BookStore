import React from "react";

function Navbar() {
    const user = localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser'))
        : null;

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black' }}>
                <a className="navbar-brand" href="#" style={{ color: 'white' }} >Book</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon">
                        <i className="fa fa-bars" style={{ color: 'white' }}></i>
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-5">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" style={{ color: 'white' }}>
                                Home <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{ color: 'white' }}>Contact Us</a>
                        </li>
                        {user ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-user"></i> {user.name}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#" style={{ color: 'white' }}>Bookings</a>
                                    <a className="dropdown-item" href="#" onClick={logout} style={{ color: 'white' }}>Logout</a>
                                </div>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login" style={{ color: 'white' }} >Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
