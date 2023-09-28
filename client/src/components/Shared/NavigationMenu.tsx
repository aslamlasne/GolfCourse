import React from 'react';

function NavigationMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <a className="navbar-brand" href="/">Home</a>
      <a className="navbar-brand" href="/about">About</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
          <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Users
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><a className="dropdown-item" href="/signup">Sign-up</a></li>
                <li><a className="dropdown-item" href="/users">List</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Courses
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
              <li><a className="dropdown-item" href="/newcourse">Set-up</a></li>
              <li><a className="dropdown-item" href="/courses">List</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Score Cards
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
              <li><a className="dropdown-item" href="/add-score-card">Add</a></li>
              <li><a className="dropdown-item" href="/score-card-list">List</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;