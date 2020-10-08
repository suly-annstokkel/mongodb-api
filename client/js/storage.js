const loadPeopleData = () => {
  console.log("Loading people data...");

  fetch("/api/people")
    .then((response) => response.json())
    .then((people) => {
      // let's get the people into the page
      const viewElement = document.getElementById("content");
      let viewContent = "";
      for (person of people) {
        // ugly way of creating DOM content (do better!)
        viewContent += `<article class="person" id="${person._id}">`;
        viewContent += `<div class="name">${person.name}</div>`;
        viewContent += `<div class="operations"><button class="btn-crud fa fa-trash delete"></button></div>`;
        viewContent += `<div class="age">${person.age}</div>`;
        viewContent += `<div class="hometown">${person.hometown}</div>`;
        viewContent += `<div class="movies">`;
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
            console.log(`${person.name} just got eliminated`);
          });
      }

      const buttonCRUDCollection = document.getElementsByClassName(
        "btn-crud"
      );

      // iterate over the buttons
      for (button of buttonCRUDCollection) {
        console.log(button);
        button.addEventListener("click", buttonCRUDHandler);
      }
    });
};
