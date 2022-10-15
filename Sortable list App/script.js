const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Jeff Bezos",
  "Bernard Arnault",
  "Gautam Adani",
  "Bill Gates",
  "Warren Buffett",
  "Larry Page",
  "Sergey Brin",
  "Mark Zuckerberg",
  "Larry Elison",
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  //   console.log("Event:", "dragstart");

  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  //   console.log("Event:", "dragOver");
  e.preventDefault();
}

function dragDrop() {
  //   console.log("Event:", "dragDrop");
  const dragEndIndex = this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function dragEnter() {
  //   console.log("Event:", "dragEnter");
  this.classList.add("over");
}

function dragLeave() {
  //   console.log("Event:", "dragLeave");
  this.classList.remove("over");
}

function swapItems(start, end) {
  const itemOne = listItems[start].querySelector(".draggable");
  const itemTwo = listItems[end].querySelector(".draggable");

  listItems[start].appendChild(itemTwo);
  listItems[end].appendChild(itemOne);

  console.log(itemOne, itemTwo);
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
check.addEventListener("click", checkOrder);
