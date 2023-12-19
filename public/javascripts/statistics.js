const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");

const optionsList = document.querySelectorAll(".option");

const selected2 = document.querySelector(".selected2");
const optionsContainer2 = document.querySelector(".options-container2");
const searchBox2 = document.querySelector(".search-box2 input");

const optionLists2 = document.querySelectorAll(".option2");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");

  searchBox.value = "";
  filterList("");

  if (optionsContainer.classList.contains("active")) {
    searchBox.focus();
  }
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
	changeRadar(selected.innerHTML,selected2.innerHTML);
  });
});

searchBox.addEventListener("keyup", function(e) {
  filterList(e.target.value);
});

const filterList = searchTerm => {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};


selected2.addEventListener("click", () => {
  optionsContainer2.classList.toggle("active");

  searchBox2.value = "";
  fiterList2("");

  if (optionsContainer2.classList.contains("active")) {
    searchBox2.focus();
  }
});

optionLists2.forEach(o => {
  o.addEventListener("click", () => {
    selected2.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer2.classList.remove("active");
	changeRadar(selected.innerHTML,selected2.innerHTML);
  });
});

searchBox2.addEventListener("keyup", function(e) {
  fiterList2(e.target.value);
});

const fiterList2 = searchTerm => {
  searchTerm = searchTerm.toLowerCase();
  optionLists2.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};

