import React,{useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import BookCard from './BookCard';
//import { command_comunicate } from './command.js';
import { fetchBooksFromDB,openDB } from './command.js';


function App() {

  const [fetchedBooks,setBooks] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(25, 7);
    ctx.lineTo(0, 50);
    ctx.lineTo(25, 93);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(75, 7);
    ctx.lineTo(100, 50);
    ctx.lineTo(75, 93);
    ctx.closePath();
    ctx.fillStyle = 'grey';
    ctx.fill();

    ctx.fillStyle = 'grey';
    ctx.fillRect(25, 7, 50, 43);

    ctx.fillStyle = 'white';
    ctx.fillRect(25, 50, 50, 43);

  }, []);

  
  useEffect(() => {
    openDB()
      .then((db) => {
        fetchBooksFromDB(db,setBooks);
      })
      .catch((error) =>{
        console.error(error);
      });
  },[])
  
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><canvas id="canvas" width="100" height="100"></canvas></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Ksiazki</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Do wypożyczenia</a></li>
                  <li><a className="dropdown-item" href="#">Do kupienia</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-lg-none d-flex">
              <input className="form-control" type="text" placeholder="Szukaj" />
              <button className="btn btn-light btn-outline-secondary ms-2" type="button">Szukaj</button>
            </form>
          </div>
          <form className="d-none d-lg-flex">
            <input className="form-control" type="text" placeholder="Szukaj" />
            <button className="btn btn-light btn-outline-secondary ms-2" type="button">Szukaj</button>
          </form>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col ms-2">
            <h1>Akademia Górniczo-Hutnicza</h1>
            <h2>Dostępne książki</h2>
          </div>
        </div>
        <div className="row justify-content-lg-flex-start justify-content-md-around">
          {fetchedBooks.map((book,index) => (
            <BookCard
              key={index}
              title={book.title}
              faculty={book.faculty}
              field={book.field}
              subject={book.subject}
              imgSrc={book.imgSrc}
              copies={book.copies}
            />

          ))}
          {/* <BookCard
              faculty="Wydzial IET"
              field= "Cyberbezpieczenstwo"
              subject="Programowanie skryptowe"
              imgSrc= "python.jpg"
              copies={1}
            />
          <BookCard
              faculty="Wydzial GGiOŚ"
              field= "Geoinformatyka"
              subject="Programowanie skryptowe"
              imgSrc= "geologia.jpg"
              copies={10}
            />
          <BookCard
              faculty="Wydzial Humanistyczny"
              field= "Informatyka Społeczna"
              subject="Programowanie skryptowe"
              imgSrc= "abc.jpg"
              copies={6}
            /> */}
        </div>
      </div>

      <footer className="container-fluid d-flex justify-content-center align-content-center mt-5 mb-3 p-0">
        <div className="container m-0 bg-light justify-content-center">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-4 d-flex flex-column align-items-center justify-content-center">
              <p className="mb-0">Bibliotek Główna Akademii Górniczo-Hutniczej</p>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 d-flex flex-row align-items-center justify-content-center">
              <i className="bi bi-envelope-fill me-1"></i>
              <a className="mb-2" href="https://www.bg.agh.edu.pl/">bgagh@bg.agh.edu.pl</a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 d-flex flex-row align-items-center justify-content-center">
              <i className="bi bi-telephone-fill me-1"></i>
              <a className="mb-2" href="https://www.bg.agh.edu.pl/">+48 12 617 32 08</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
