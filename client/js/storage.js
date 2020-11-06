const updateAge = (e) => {
  console.log(e.target);
  let newAge = e.target.value;
  console.log(newAge);
  let id = e.target.parentNode.id;
  console.log(id);

  var updatedPerson = {
    "age":newAge
  }
  updatedPersonProperties(id, updatedPerson);
}

const updateName = (e) => {
  console.log(e.target);
  let newName = e.target.value;
  console.log(newName);
  let id = e.target.parentNode.id;
  console.log(id);

  var updatedName = {
    "name":newName
  }
  updatedPersonProperties(id, updatedName);
}

const updateHometown = (e) => {
  console.log(e.target);
  let newHometown = e.target.value;
  console.log(newHometown);
  let id = e.target.parentNode.id;
  console.log(id);

  var updatedHometown = {
    "hometown":newHometown
  }
  updatedPersonProperties(id, updatedHometown);
}

const updatedPersonProperties = (id, updatedPerson) => {
  fetch(`/api/people/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedPerson),
    headers: { "Content-Type": "application/json" }
  })
    .then((response) => response.json())
    .then((person) => {
      console.log(`person updated`);
      loadPeopleData();
    });
};

const addNewPerson = () => {
  console.log("Start new person");

  var newPerson = {
    name: prompt("Enter name:"),
    lastname: prompt("Enter lastname:"),
    age: +prompt("Enter age:"),
    hometown: prompt("Enter hometown:"),
    //street: prompt("Enter street:"),
    gender: prompt("Enter gender:")
  };


  fetch(`/api/people/`, {
    method: "POST",
    body: JSON.stringify(newPerson),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((person) => {
      console.log(`person added`);
      loadPeopleData();
    });
};

const loadPeopleData = () => {
  console.log("Loading people data...");

  fetch("/api/people")
    .then((response) => response.json())
    .then((people) => {
      // let's get the people into the page
      const viewElement = document.getElementById("content");
      let viewContent = "";
      //const viewElement= document.getElementById("addPerson");
         viewContent += '<button onclick="addNewPerson()" class="btnAdd">Add person</button>'; 
         for (person of people) {
            // ugly way of creating DOM content (do better!)
            viewContent += `<article class="person" id="${person._id}">`;
            viewContent += `<input class="name" type="text" value="${person.name || ""} ${person.lastname || ""}" />`;   //prompt("Update name:", "Klaas")
            viewContent += `<div class="operations"><button class="btn-crud fa fa-check submit"></button></div>`;
            viewContent += `<div class="operations"><button class="btn-crud fa fa-trash delete"></button></div>`;
            //viewContent += `<div class="age">${person.age}</div>`;
            viewContent += `<input class="age" type="number" value="${person.age}" />`;
            viewContent += `<input class="hometown" type="text" value="${person.hometown || ""}" />`;
            //viewContent += `<div class="street">${person.street || "street not filled"}</div>`;
            viewContent += `<div class="gender">${person.gender || ""}</div>`;
            viewContent += `<div class="movies">`;

      //      list movies this person likes
      //   for (movie of person.movies) {
      //     viewContent += `</article class="movie" id="${movie._id}">`;
      //     viewContent += `<span class="movie">${movie.title || "movietitle not filled"} (${movie.year || "movieyear not filled"})</span>`;
      //     viewContent += `</div>`;
      //   }
        
      // }
      // viewElement.innerHTML = viewContent;

        // list movies this person likes
        for (movie of person.movies) {
          viewContent += `<span class="movie">${movie.title} (${movie.year})</span>`;
        }
        viewContent += `</div>`;
        viewContent += "</article>";
      }
      viewElement.innerHTML = viewContent;

      // Handle CRUD buttons
      function buttonCRUDHandler(e) {
        console.log(e, this);

        const targetArticle = e.path.filter(
          (el) => el.tagName === "ARTICLE"
        )[0];

        console.log(targetArticle.id);

        fetch(`/api/people/${targetArticle.id}`, { method: "DELETE" })
          .then((response) => response.json())
          .then((person) => {
            alert("Person deleted")
            console.log(`${person.name} just got eliminated`);
            //loadPeopleData() of
            targetArticle.parentNode.removeChild(targetArticle);
          });
      }


      
      // Handle CRUD buttons
      function buttonCRUDHandler(e) {
        console.log(e, this);

        const targetArticle = e.path.filter(
          (el) => el.tagName === "ARTICLE"
        )[0];

        console.log(targetArticle.id);

        fetch(`/api/people/${targetArticle.id}`, { method: "PUT" })
          .then((response) => response.json())
          .then((person) => {
            alert("Person updated")
            console.log(`${person.name} just got updated`);
            //loadPeopleData() of
            targetArticle.parentNode.removeChild(targetArticle);
          });
      }

      const buttonCRUDCollection = document.getElementsByClassName("btn-crud");

      // iterate over the buttons
      for (button of buttonCRUDCollection) {
        console.log(button);
        button.addEventListener("click", buttonCRUDHandler);
      }

      const ageElementCollection = document.getElementsByClassName("age");

      for (ageElement of ageElementCollection) {
        console.log(ageElement);
        ageElement.addEventListener("change", updateAge);
      }

      const nameElementCollection = document.getElementsByClassName("name");

      for (nameElement of nameElementCollection) {
        console.log(nameElement);
        nameElement.addEventListener("change", updateName);
      }

      const hometownElementCollection = document.getElementsByClassName("hometown");

      for (hometownElement of hometownElementCollection) {
        console.log(hometownElement);
        hometownElement.addEventListener("change", updateHometown);
      }
    });
};
