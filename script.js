"use strict"

let data = []

const getData = () => {
  const storedData = localStorage.getItem("inputItems")
  return storedData ? JSON.parse(storedData) : []
}

const saveData = (data) =>
  localStorage.setItem("inputItems", JSON.stringify(data))

const createItem = (task, status, index) => {
  const item = document.createElement("div")
  item.classList.add("input-item")
  item.innerHTML = `
        <input type="checkbox" id="task" class="checkbox" ${status} data-index=${index} />
        <label for="task" class="label-text">${task}</label>
        <button class="action-button">
          <img
            src="./assets/delete.svg"
            alt="imagem de uma lixeira para deletar o item da lista"
            data-index=${index} />
        </button>
  `
  document.getElementById("inputItems").appendChild(item)
}

const clearItems = () => {
  const items = document.getElementById("inputItems")
  while (items.firstChild) {
    items.removeChild(items.lastChild)
  }
}

const updateScreen = () => {
  clearItems()
  const data = getData()
  data.forEach((item, index) => createItem(item.task, item.status, index))
}

const addNewItem = (event) => {
  const key = event.key
  const text = event.target.value.trim() // Remove espaços extras
  if (key === "Enter" && text) {
    const data = getData()
    data.push({ task: text, status: "" })
    saveData(data)
    updateScreen()
    event.target.value = "" // Limpa o campo de entrada
  }
}

const btnAddItem = (event) => {
  const text = document.getElementById("inputItem").value.trim()
  if ((event.type === "click" && text) || event.key === "Enter") {
    const data = getData()
    data.push({ task: text, status: "" })
    saveData(data)
    updateScreen()
    document.getElementById("inputItem").value = ""
  }
}

const removeItem = (index) => {
  const data = getData()
  data.splice(index, 1)
  saveData(data)
  updateScreen()
}

const updateItem = (index) => {
  const data = getData()
  data[index].status = data[index].status === "" ? "checked" : ""
  saveData(data)
  updateScreen()
}

const popUpRemoved = () => {
  const itemRemoved = document.getElementById("itemRemoved")
  itemRemoved.classList.remove("hidden")
  setTimeout(() => {
    itemRemoved.classList.add("hidden")
  }, 2000)
}

const clickItem = (event) => {
  const element = event.target
  if (element.tagName === "IMG") {
    const index = element.dataset.index
    popUpRemoved()
    removeItem(index)
  } else if (element.type === "checkbox") {
    const index = element.dataset.index
    updateItem(index)
  }
}

document.getElementById("inputItem").addEventListener("keypress", addNewItem)
document.getElementById("inputItems").addEventListener("click", clickItem)
document.getElementById("addItem").addEventListener("click", btnAddItem)

updateScreen()
