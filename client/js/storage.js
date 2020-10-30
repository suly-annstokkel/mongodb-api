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
    street: prompt("Enter street:"),
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
      viewContent += '<button onclick="addNewPerson()">Add person</button>';
      for (person of people) {
        // ugly way of creating DOM content (do better!)
        viewContent += `<article class="person" id="${person._id}">`;
        viewContent += `<div class="name">${person.name || "name not filled"} ${person.lastname || "lastname not filled"}</div>`;   //prompt("Update name:", "Klaas")
        viewContent += `<div class="operations"><button class="btn-crud fa fa-trash delete"></button></div>`;
        //viewContent += `<div class="age">${person.age}</div>`;
        viewContent += `<input class="age" type="number" value="${person.age}" />`;
        viewContent += `<div class="hometown">${person.hometown || "hometown not filled"} </div>`;
        viewContent += `<div class="street">${person.street || "street not filled"}</div>`;
        viewContent += `<div class="gender">${person.gender || "gender not filled"}</div>`;
        viewContent += `<div class="movies">`;

      //   // list movies this person likes
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
    });
};
