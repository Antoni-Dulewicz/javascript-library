var books = [
    { title: "python", author: "OREILLY", faculty: "IEiT",field: "Cyberbezpieczenstwo" ,subject: "Programowanie skryptowe",imgSrc: "python.jpg",copies: 1, borrowedBy: []},
    {title: "geologia", author: "Ewa Stupnicka",faculty: "GGiOŚ",field: "Geoinformatyka",subject: "Geologia",imgSrc: "geologia.jpg",copies: 10, borrowedBy: []},
    {title: "abc", author: "Aleksandra Tomaszewska-Adamarek",faculty: "Wydzial Humanistyczny",field: "Informatyka Społeczna",subject: "Grafika komputerowa",imgSrc: "abc.jpg",copies: 10, borrowedBy: []}
];
//var people = []

export function openDB(){
    return new Promise((resolve,reject) => {

        var openDBReq = indexedDB.open("LibraryDatabase",18)

        openDBReq.onerror = function(event){
            reject("Error while opening db" + event.target.error);
        };
        
        openDBReq.onsuccess = function(event){
            var db = event.target.result;

            /* function updateBooksTitle(){
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
            
            function deleteBook(bookName){
                var transaction = db.transaction("books","readwrite");
                var bookStore = transaction.objectStore("books");
            
                var request = bookStore.delete(bookName);
            
                request.onsuccess = (event) =>{
                    console.log("Delated ",bookName);
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
            
            } */

            console.log("succes",db)
            resolve(db);
        };
        
        openDBReq.onupgradeneeded = function(event){
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
    });
}



export function fetchBooksFromDB(db,setBooks){

    var transaction = db.transaction("books","readonly");
    var bookStore = transaction.objectStore("books");
    var fetchedBooks = []
    var cursorRequest = bookStore.openCursor();

    cursorRequest.onsuccess = (event) =>{
        var cursor = event.target.result;
        if(cursor){
            var book = cursor.value;
            fetchedBooks.push(book);
            cursor.continue();
        }else{
            console.log("Books fetched from db", fetchedBooks);
            setBooks(fetchedBooks);
        }
    };

    cursorRequest.onerror = (event) =>{
        console.error("Error fetching books from db", event.target.error);
    };

}

export function executeBorrow(bookName,personName,db){

    if(!personName){
        console.group("Errors");
        console.error("Person not specified");
        window.alert("Person not specified");
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
            window.alert("Book not found in library");
            console.groupEnd();
            return;
        }

        if(bookRecord.copies <= 0){
            console.group("Errors");
            console.error("There isn't any available copies of this book");
            window.alert("Book not found in library");
            console.groupEnd();
            return;
        }
        bookRecord.copies--;

        if(!personRecord){
            var newPerson = {name: personName.toLowerCase(), borrowedBooks: [bookName.toLowerCase()]}
            var transactionAddPerson = db.transaction("people","readwrite");
            var peopleStoreAddPerson = transactionAddPerson.objectStore("people");

            var addPersonRequest = peopleStoreAddPerson.add(newPerson);

            addPersonRequest.onsuccess = function(event){

                console.log(personName,"added to db");
                bookRecord.borrowedBy.push(personName.toLowerCase());

                var transactionUpdateBook = db.transaction("books","readwrite");
                var bookStoreUpdateBook = transactionUpdateBook.objectStore("books");

                var updateBookRequest = bookStoreUpdateBook.put(bookRecord);


                updateBookRequest.onsuccess = function(event){
                    console.group("Operations");
                    console.log(personName,"has succesfully borrowed a book:", bookName);
                    window.alert(personName + " has succesfully borrowed a book: " + bookName);
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

                var transactionUpdateBorrowed = db.transaction("books","readwrite");
                var bookStoreUpdateBorrowed = transactionUpdateBorrowed.objectStore("books");

                var updateBookRequest = bookStoreUpdateBorrowed.put(bookRecord);

                updateBookRequest.onsuccess = function(event){
                    console.group("Operations");
                    console.log(personName,"has succesfully borrowed a book:", bookName);
                    window.alert(personName + " has succesfully borrowed a book: " + bookName);
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
                window.alert(personName + " has already borrowed: " + bookName);
                console.groupEnd();
            }

            if(!personRecord.borrowedBooks.includes(bookName.toLowerCase())){
                personRecord.borrowedBooks.push(bookName.toLowerCase());

                var transactionUpdateBorrowed2 = db.transaction("people","readwrite");
                var peopleStoreUpdateBorrowed2 = transactionUpdateBorrowed2.objectStore("people");
                
                var updateBorrowRequest = peopleStoreUpdateBorrowed2.put(personRecord)

                updateBorrowRequest.onsuccess = function(event){
                    // console.group("Operations");
                    //console.log(personName,"has succesfully borrowed a book:", bookName);
                    //console.groupEnd();
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


export function executeReturn(bookName,personName,db){
    if(!personName){
        console.group("Errors");
        console.error("Person not specified");
        window.alert("Person not specified");
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
            window.alert("Book: " + bookName + " not found in library");
            console.groupEnd();
            return;
        }
        if(!personRecord){
            console.group("Errors");
            console.error("Person",personName,"not registered in library");
            window.alert("Person: " + personName + " not registered in library");
            console.groupEnd();
            return;
        }

        if(personRecord.borrowedBooks.includes(bookName.toLowerCase()) && bookRecord.borrowedBy.includes(personName.toLowerCase())){
            bookRecord.copies++;
            var bookIndex = personRecord.borrowedBooks.indexOf(bookName.toLowerCase())
            personRecord.borrowedBooks.splice(bookIndex,1);

            var personIndex = bookRecord.borrowedBy.indexOf(personName,1);
            bookRecord.borrowedBy.splice(personIndex,1);


            var transactionUpdateReturn = db.transaction(["books","people"],"readwrite");
            var peopleStoreUpdateReturn = transactionUpdateReturn.objectStore("people");
            var bookStoreUpdateReturn = transactionUpdateReturn.objectStore("books");

            var updatePersonRequest = peopleStoreUpdateReturn.put(personRecord);
            var updateBookRequest = bookStoreUpdateReturn.put(bookRecord);

            updatePersonRequest.onsuccess = (event) =>{
                console.group("Operations");
                window.alert(personName + " has succesfully returned a book: " + bookName);
                console.log(personName," has succesfully returned a book: ", bookName);
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
            console.error("This person hasn't borrowed this book ");
            window.alert("This person hasn't borrowed this book ");
            console.groupEnd();
        }

    };

}


/* export function command_comunicate(){
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
 */