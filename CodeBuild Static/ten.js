ul = document.querySelector(".insert");
button = document.querySelector("#submit");
inp = document.querySelector("#inp");

delAll = document.createElement("button");
delAll.innerHTML = "Delete Selected";
delAll.classList.add("delAll");

button.addEventListener("click", () => {
  let li = document.createElement("li");
  li.classList.add("ko");

  if (inp.value !== "") {
    li.innerHTML = `${inp.value}`;

    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("select");

    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("delete");

    li.appendChild(checkbox);
    li.appendChild(deleteButton);

    ul.append(li);

    inp.value = "";
  }

  ul.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete")) {
      e.target.parentElement.remove();
      toggleDelAllButton();
    }
  });

  document.querySelector(".container2").appendChild(delAll);
  toggleDelAllButton();
});

delAll.addEventListener("click", () => {
  let selectedItems = document.querySelectorAll(".select:checked");
  selectedItems.forEach((c) => {
    c.parentElement.remove();
  });

  toggleDelAllButton();
});

function toggleDelAllButton() {
  if (ul.childElementCount === 0) {
    delAll.classList.add("hide");
  } else {
    delAll.classList.remove("hide");
  }
}
