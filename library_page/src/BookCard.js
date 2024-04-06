import React, { useState } from "react";
import { openDB,executeBorrow,executeReturn } from './command.js';


function BookCard({title, faculty, field, subject, imgSrc, copies}) {

  const handleGetButton = () => {
    console.log("Get button clicked");
    var name = window.prompt("State your name: ");
    console.log(name);

    openDB()
      .then((db) => {
        executeBorrow(title,name,db);
        window.location.reload();
      })
      .catch((error) =>{
        console.error(error);
      })    
  }

  const handleReturnButton = () => {
    console.log("Return button clicked");
    var name = window.prompt("State your name: ");

    openDB()
      .then((db) => {
        executeReturn(title,name,db);
        window.location.reload();
      })
      .catch((error) =>{
        console.error(error);
      })
    
  }

  


  return (
      <div className="col-lg-4 col-md-6">
        <div className="card ms-2 me-2 mb-2 mt-2">
          <div className="card-header p-0 ps-2 pt-2 pb-2">{faculty}</div>
          <div className="card-body-top p-0 pb-1">{field}</div>
          <div className="card-img">
            <img
              src={imgSrc}
              className={copies <= 0 ? "card-img-top grayscale" : "card-img-top"}
              alt="..."
            />
          </div>
          <div className="row card-body-bot p-0 pe-4 ps-4 pb-3">
            <span className="make-fat">Przedmiot: {subject}</span>
            <button className="btn btn-primary btn-sm mt-3" onClick={handleGetButton} disabled={copies <= 0}>Wypożycz</button>
            <button className="btn btn-primary btn-sm mt-3" onClick={handleReturnButton}>Zwróć</button>
          </div>
          <div className="card-footer ps-2 mb-2 mt-1 rounded-1">
            Ilość egzemplarzy: {copies}
          </div>

        </div>
      </div>
  );
}

export default BookCard