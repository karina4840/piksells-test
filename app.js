/**
 * Links for fetching data
 */
const url = "https://lab.pikcells.com/code-exercise/data.json";
const img_url = "https://lab.pikcells.com/code-exercise/images/";

/**
 * Create a function to take a photo of what's been rendered
 * code from: https://stackoverflow.com/a/56537796/18202861
 */
function Capture() {
  const captureElement = document.querySelector("#capture");

  html2canvas(captureElement, { allowTaint: true, useCORS: true })
    // Getting a screenshot
    .then((canvas) => {
      canvas.style.display = "none";
      document.body.appendChild(canvas);
      return canvas;
    })
    // Automatically download the screenshot
    .then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.setAttribute("download", "my_kitchen_design.png");
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
}

/**
 * Getting a download button element
 * and calling Capture() on click
 */
const btn = document.querySelector("#download");
btn.addEventListener("click", Capture);

/**
 * Creating a reusable function for
 * adding a click event listener to menus
 * that are responsible for image change
 * @param {*} menu - menue with names (kitchen, floor, wall)
 * @param {*} itemName - p element, that stores all names
 * @param {*} divItem - div element, that stores all images
 */
function changeOnClick(menu, itemName, divItem) {
  /**
   * Keeping track of previous menu items and images.
   * Initial values are set according to default_config
   */
  let prevItem = itemName;
  let prevDiv = divItem;

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "P") {
      // Get the 'value' attribute of the clicked item
      const value = event.target.getAttribute("value");
      const corrDiv = document.getElementById(value);

      // Remove the 'chosen' class from prev menu item
      if (prevItem) {
        prevItem.classList.remove("chosen");
      }
      // Hide prev image
      if (prevDiv) {
        prevDiv.style.display = "none";
      }
      // Add the 'chosen' class to the clicked menu item
      event.target.classList.add("chosen");

      // Show the corresponding image based on the 'value' attribute
      if (corrDiv) {
        corrDiv.style.display = "block";
        // Update the prevDiv and prevItem references
        prevDiv = corrDiv;
        prevItem = event.target;
      }
    }
  });
}

const getData = async () => {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    // Sorting data and changing the order of items
    const sorted_data = {
      layers: data.layers
        .sort(({ order: a }, { order: b }) => a - b)
        .map((collection) => {
          collection.items.sort(({ order: a }, { order: b }) => a - b);
          return collection;
        }),
      default_configuration: data.default_configuration,
    };
    // Creating a variable for storing layers
    let jsonData = [];
    for (let i = 0; i < sorted_data["layers"].length; i++) {
      jsonData = [
        { name: "kitchen", data: sorted_data["layers"][0]["items"] },
        { name: "floor", data: sorted_data["layers"][1]["items"] },
        { name: "wall", data: sorted_data["layers"][2]["items"] },
      ];
    }

    // Creating variables for menus
    const layerMenu = document.getElementById("layerMenu");
    const kitchenMenu = document.getElementById("kitchenMenu");
    const floorMenu = document.getElementById("floorMenu");
    const wallMenu = document.getElementById("wallMenu");

    // Creating menu items from JSON data
    jsonData.forEach((layer) => {
      layer.data.forEach((item) => {
        const divItem = document.createElement("canvas");
        const itemName = document.createElement("p");

        divItem.style.backgroundImage = `url(${img_url + item.imgSrc})`;
        divItem.setAttribute("id", layer.name + item.order);
        itemName.innerText = item.name;
        itemName.setAttribute("value", layer.name + item.order);

        divItem.classList.add(`${layer.name}Bg`);
        itemName.classList.add(`${layer.name}Name`);

        // Assigning each new element a class according to a layer
        switch (layer.name) {
          case "kitchen":
            kitchenMenu.appendChild(itemName);
            // Setting a default image and name
            if (item.order == sorted_data.default_configuration[0]) {
              divItem.style.display = "block";
              itemName.classList.add("chosen");
            }
            changeOnClick(kitchenMenu, itemName, divItem);
            break;
          case "floor":
            floorMenu.appendChild(itemName);
            if (item.order == sorted_data.default_configuration[1]) {
              itemName.classList.add("chosen");
              divItem.style.display = "block";
            }
            changeOnClick(floorMenu, itemName, divItem);
            break;
          case "wall":
            wallMenu.appendChild(itemName);
            if (item.order == sorted_data.default_configuration[2]) {
              itemName.classList.add("chosen");
              divItem.style.display = "block";
            }
            changeOnClick(wallMenu, itemName, divItem);
            break;
        }
        layerMenu.appendChild(divItem);
      });
    });
  }
};
getData();
