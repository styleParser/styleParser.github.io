window.addEventListener("load", inputFunction);
window.clientClassList = [];

function inputFunction() {
  const textarea = document.querySelector("body > label > textarea");
  const virtualDiv = document.createElement("html");
  virtualDiv.className = "firstFragment";
  const button = document.querySelector(".button_transform");
  button.addEventListener("click", () => {
    virtualDiv.innerHTML = textarea.value;
    clientClassList = [];
    createClassList(virtualDiv);
    console.log(clientClassList);
  });
  document.querySelector(".button_copy").addEventListener("click", () => {
    navigator.clipboard.writeText(document.querySelector(".styles").innerText);
  });
}

function createClassList(element) {
  if (element.className === "firstFragment") {
    Array.from(element.children).forEach(child => {
      createClassList(child);
    });
  } else {
    const elementClassList = Array.from(element.classList);
    if (elementClassList.length !== 0) {
      elementClassList.forEach(singleClass => {
        window.clientClassList.push(`.${singleClass}`);
      });
    } else {
      const parents = [];
      let parent = element.parentNode;
      parents.push(parent);
      if (Array.from(parent.classList).length === 0) {
        while (Array.from(parent.classList).length === 0) {
          parent = parent.parentNode;
          parents.push(parent);
        }
      }
      parents.reverse();
      let parentClass = "";
      Array.from(parents[0].classList).forEach(singleClass => {
        parentClass += `.${singleClass} > `;
      });
      let elementClass = `${parentClass}`;
      for (let i = 1; i < parents.length; i += 1) {
        elementClass += `${parents[i].tagName.toLowerCase()} > `;
      }
      elementClass += `${element.tagName.toLowerCase()}`;
      window.clientClassList.push(`${elementClass}`);
    }
    const childrenList = Array.from(element.children);
    if (childrenList.length !== 0) {
      childrenList.forEach(children => {
        createClassList(children);
      });
    }
  }
  let styles = "";
  const stylesArray = [];
  for (let i = 0; i < window.clientClassList.length; i += 1) {
    if (
      !stylesArray.some(singleStyle => {
        return singleStyle === window.clientClassList[i];
      })
    ) {
      stylesArray.push(window.clientClassList[i]);
      styles += `${window.clientClassList[i]}{
      
      }
      `;
    }
  }
  document.querySelector(".styles").innerText = styles;
}
