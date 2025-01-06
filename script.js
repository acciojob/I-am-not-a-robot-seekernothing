//your code here
document.addEventListener("DOMContentLoaded", () => {
  const imagesContainer = document.querySelector("main");

  // Generate 5 unique images + 1 duplicate
  const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
  const duplicateIndex = Math.floor(Math.random() * imageClasses.length);
  const duplicateImage = imageClasses[duplicateIndex];
  const allImages = [...imageClasses, duplicateImage].sort(() => Math.random() - 0.5);

  // Create HTML for images
  let clickedImages = [];

  imagesContainer.innerHTML = `
    <h3 id="h">Please click on the identical tiles to verify that you are not a robot.</h3>
    <div class="flex">
      ${allImages
        .map(
          (imgClass, index) => `<img src="#" class="${imgClass}" data-index="${index}" />`
        )
        .join("")}
    </div>
    <button id="reset" style="display: none">Reset</button>
    <button id="verify" style="display: none">Verify</button>
    <p id="para"></p>
  `;

  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");
  const images = document.querySelectorAll("img");

  // Event Listeners
  images.forEach((image) => {
    image.addEventListener("click", () => {
      if (clickedImages.length < 2 && !clickedImages.includes(image)) {
        image.classList.add("selected");
        clickedImages.push(image);
        resetButton.style.display = "block";

        if (clickedImages.length === 2) {
          verifyButton.style.display = "block";
        }
      }
    });
  });

  resetButton.addEventListener("click", () => {
    clickedImages.forEach((img) => img.classList.remove("selected"));
    clickedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.innerText = "";
  });

  verifyButton.addEventListener("click", () => {
    if (
      clickedImages.length === 2 &&
      clickedImages[0].className === clickedImages[1].className
    ) {
      para.innerText = "You are a human. Congratulations!";
    } else {
      para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = "none";
  });
});
