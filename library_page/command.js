var openDB = indexedDB.open("LibraryDatabase",12)

var books = [
    { title: "python", author: "OREILLY", department: "IEiT",field: "Cyberbezpieczenstwo" , borrowedBy: []},
    {title: "geologia", author: "Ewa Stupnicka",department: "GGiOŚ",field: "Geoinformatyka", borrowedBy: []},
    {title: "abc", author: "Aleksandra Tomaszewska-Adamarek",department: "Humanistyczny",field: "Informatyka Społeczna", borrowedBy: []}
];
var people = []

function updateBooksTitle(){
    var transaction = db.transaction("books","readwrite");
    var bookStore = transaction.objectStore("books");

    var bookToFind = {title: "Geologia", author: "Ewa Stupnicka",department: "GGiOŚ",field: "Geoinformatyka", borrowedBy: []}

    var request = bookStore.get(bookToFind.title);

    request.onsuccess = (event) =>{
        var book = event.target.result;
        if(book){
            var oldTitle = book.title;
            book.title = "geologia";
            var updateRequest = bookStore.put(book);
            updateRequest.onsuccess = (event) => {
                console.log("Book title changed from:",oldTitle,"to:",book.title);
            }
            updateRequest.onerror = (event) => {
                console.error("Error while changing book title", event.target.error)
            }
        }else{
            console.error("Couldn't find book with this title");
        }

    };
    request.onerror = (event) =>{
        console.error("Eror while getting book",event.target.error);
    };

}

function deleteOldBooks(){
    var transaction = db.transaction("books","readwrite");
    var bookStore = transaction.objectStore("books");

    var request = bookStore.delete("python");

    request.onsuccess = (event) =>{
        console.log("Delated");
    };
    request.onerror = (event) =>{
        console.error("Error while deleting",event.target.error);
    };

}



function addBooksToDB(){
    var transaction = db.transaction("books","readwrite");
    var bookStore = transaction.objectStore("books");
    
    console.group("Adding books to db");

    for(let i = 0; i < books.length; i++){
        var request = bookStore.add(books[i]);

        request.onsuccess = (event) => {
            console.log(books[i].title,"added");
        }

        request.onerror = (event) => {
            console.error("error adding to db", event.target.error);
        }

    }

}



openDB.onerror = function(event){
    console.error("DB error" + event.target.errorCode)
};

openDB.onsuccess = function(event){
    db = event.target.result;
    //dodawnie do biblioteki na poczatku
    /* if(!booksAddedToDB){
        addBooksToDB();
        booksAddedToDB = true;
    } */
    //updateBooksTitle();
    //deleteOldBooks();
    //addBooksToDB();

    console.log("succes",db)
};

openDB.onupgradeneeded = function(event){
    var db = event.target.result

    let oldVersion = event.oldVersion
    let newVersion = event.newVersion || db.version

    console.log("DB  updated from version:",oldVersion,"to",newVersion)
    console.log("upgrade",db)

    if(!db.objectStoreNames.contains('books')){
        var bookStore = db.createObjectStore("books",{
            keyPath: "title"
        });
    }

    if(!db.objectStoreNames.contains('people')){
        var peopleStore = db.createObjectStore("people",{keyPath: "name"});
    }
    
}


function command_comunicate(){
    var commandInput = document.getElementById("command").value; 

    var parts = commandInput.split(" ");

    var operation = parts[0].toLowerCase();

    switch(operation){
        case "borrow":
            executeBorrow(commandInput);
            break;

        case "return":
            executeReturn(commandInput);
            break;

        case "show":
            displayBooks(commandInput);
            break;

        default:
            console.error("Unknown command!");
            break
    }

    return false;
}

function executeBorrow(commandInput){


    
    var parts = commandInput.split(" ");
    var bookName = parts[1];
    var personName = parts[2];

    if(!bookName){
        console.group("Errors");
        console.error("Book and person not specified");
        console.groupEnd();
        
        return;
    }

    if(!personName){
        console.group("Errors");
        console.error("Person not specified");
        console.groupEnd();
        return;
    }


    var transaction = db.transaction(["books","people"],"readwrite");

    var bookStore = transaction.objectStore("books");
    var peopleStore = transaction.objectStore("people");

    var bookRequest = bookStore.get(bookName.toLowerCase());
    var personRequest = peopleStore.get(personName.toLowerCase());

    transaction.oncomplete = function(event){
        var bookRecord = bookRequest.result;
        var personRecord = personRequest.result;

        if(!bookRecord){
            console.group("Errors");
            console.error("Book not found in library");
            console.groupEnd();
            return;
        }

        if(!personRecord){
            var newPerson = {name: personName.toLowerCase(), borrowedBooks: [bookName.toLowerCase()]}
            transactionAddPerson = db.transaction("people","readwrite");
            var peopleStoreAddPerson = transactionAddPerson.objectStore("people");

            var addPersonRequest = peopleStoreAddPerson.add(newPerson);

            addPersonRequest.onsuccess = function(event){

                console.log(personName,"added to db");
                bookRecord.borrowedBy.push(personName.toLowerCase());

                transactionUpdateBook = db.transaction("books","readwrite");
                var bookStoreUpdateBook = transactionUpdateBook.objectStore("books");

                var updateBookRequest = bookStoreUpdateBook.put(bookRecord);


                updateBookRequest.onsuccess = function(event){
                    console.group("Operations");
                    console.log(personName,"has succesfully borrowed a book:", bookName);
                    console.groupEnd();
                };
                updateBookRequest.onerror = function(event) {
                    console.group("Errors");
                    console.error("Error updating book:", event.target.error);
                    console.groupEnd();
                };
            };
            addPersonRequest.onerror = function(event){
                console.group("Errors");
                console.error("Error adding person",event.target.error)
                console.groupEnd();
            };

        }else{
            if(!bookRecord.borrowedBy.includes(personName.toLowerCase())){

                bookRecord.borrowedBy.push(personName.toLowerCase());

                transactionUpdateBorrowed = db.transaction("books","readwrite");
                var bookStoreUpdateBorrowed = transactionUpdateBorrowed.objectStore("books");

                var updateBookRequest = bookStoreUpdateBorrowed.put(bookRecord);

                updateBookRequest.onsuccess = function(event){
                    console.group("Operations");
                    console.log(personName,"has succesfully borrowed a book:", bookName);
                    console.groupEnd();
                };
                updateBookRequest.onerror = function(event){
                    console.group("Errors");
                    console.error("Error updating book:", event.target.error);
                    console.groupEnd();
                };
            }else{
                console.group("Errors");
                console.error(personName,"has already borrowed:",bookName);
                console.groupEnd();
            }

            if(!personRecord.borrowedBooks.includes(bookName.toLowerCase())){
                personRecord.borrowedBooks.push(bookName.toLowerCase());

                transactionUpdateBorrowed2 = db.transaction("people","readwrite");
                var peopleStoreUpdateBorrowed2 = transactionUpdateBorrowed2.objectStore("people");
                
                var updateBorrowRequest = peopleStoreUpdateBorrowed2.put(personRecord)

                updateBorrowRequest.onsuccess = function(event){
                    /* console.group("Operations");
                    console.log(personName,"has succesfully borrowed a book:", bookName);
                    console.groupEnd(); */
                };
                updateBorrowRequest.onerror = function(event){
                    console.group("Errors");
                    console.error("Error updating book:", event.target.error);
                    console.groupEnd();
                }
                
            }

        }

    };

    transaction.onerror = function(event){
        console.error("Transaction error:",transaction.error);
    }

}

function executeReturn(commandInput){

    var parts = commandInput.split(" ");
    var bookName = parts[1];
    var personName = parts[2];

    if(!bookName){
        console.group("Errors");
        console.error("Book and person not specified");
        console.groupEnd();
        
        return;
    }

    if(!personName){
        console.group("Errors");
        console.error("Person not specified");
        console.groupEnd();
        return;
    }

    var transaction = db.transaction(["books","people"],"readwrite");

    var bookStore = transaction.objectStore("books");
    var peopleStore = transaction.objectStore("people");

    var bookRequest = bookStore.get(bookName.toLowerCase());
    var personRequest = peopleStore.get(personName.toLowerCase());

    transaction.oncomplete = (event) => {
        var bookRecord = bookRequest.result;
        var personRecord = personRequest.result;
        if(!bookRecord){
            console.group("Errors");
            console.error("Book",bookName,"not found in library");
            console.groupEnd();
            return;
        }
        if(!personRecord){
            console.group("Errors");
            console.error("Person",personName,"not registered in library");
            console.groupEnd();
            return;
        }

        if(personRecord.borrowedBooks.includes(bookName.toLowerCase()) && bookRecord.borrowedBy.includes(personName.toLowerCase())){
            var bookIndex = personRecord.borrowedBooks.indexOf(bookName.toLowerCase())
            personRecord.borrowedBooks.splice(bookIndex,1);

            var personIndex = bookRecord.borrowedBy.indexOf(personName,1);
            bookRecord.borrowedBy.splice(personIndex,1);


            transactionUpdateReturn = db.transaction(["books","people"],"readwrite");
            var peopleStoreUpdateReturn = transactionUpdateReturn.objectStore("people");
            var bookStoreUpdateReturn = transactionUpdateReturn.objectStore("books");

            var updatePersonRequest = peopleStoreUpdateReturn.put(personRecord);
            var updateBookRequest = bookStoreUpdateReturn.put(bookRecord);

            updatePersonRequest.onsuccess = (event) =>{
                console.group("Operations");
                console.log(personName,"has succesfully returned a book:", bookName);
                console.groupEnd();
            };
            updatePersonRequest.onerror = (event) =>{
                console.group("Errors");
                console.error("Error returning book:", event.target.error);
                console.groupEnd();
            };
            

            updateBookRequest.onsuccess = (event) =>{

            };

            updateBookRequest.onerror = (event) =>{
                console.group("Errors");
                console.error("Error returning book:", event.target.error);
                console.groupEnd();
            };
        }else {
            console.group("Errors");
            console.error("The person hasn't borrowed the book or the book isn't borrowed by the person");
            console.groupEnd();
        }

    };

}

function displayBooks(commandInput){

    var parts = commandInput.split(" ");
    var personName = parts[1];

    if(!personName){ 
        var transaction = db.transaction("books","readonly");
        var bookStore = transaction.objectStore("books");
        var cursorRequest = bookStore.openCursor();

        console.group("Operations")

        cursorRequest.onsuccess = (event) =>{
            var cursor = event.target.result;

            if(cursor){
                var book = cursor.value;
                console.log("Title:", book.title);
                console.log("Author:", book.author);
                console.log("Department:", book.department);
                console.log("Field:", book.field);
                console.log("Borrowed By:", book.borrowedBy);
                console.log("------------------------------");
                cursor.continue();
            }else{
                console.groupEnd();
            }
        }

        cursorRequest.onerror = (event) => {
            console.error("Error retrieving books:", event.target.error);
        };
    }else{
        var transaction = db.transaction("people","readonly");
        var peopleStore = transaction.objectStore("people");
        var getRequest = peopleStore.get(personName.toLowerCase());
        getRequest.onsuccess = (event) =>{
            var person = event.target.result;

            if(person){
                console.log(personName,"books:",person.borrowedBooks);
            }else{
                console.log(personName,"hasn't borrow any books");
            }

        };
        getRequest.onerror = (event) => {
            console.error("Error retriving",personName,"'s books");
        };


    }

}
