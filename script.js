const moodSelector = document.getElementById("moodSelector");
const generateBtn = document.getElementById("generateBtn");
const colorPalette = document.getElementById("colorPalette");
const imageGallery = document.getElementById("imageGallery");

const moodColors = {
  calm: ["#A8DADC", "#457B9D", "#1D3557"],
  energetic: ["#F94144", "#F3722C", "#F9C74F"],
  dark: ["#22223B", "#4A4E69", "#9A8C98"],
  minimal: ["#F8F9FA", "#CED4DA", "#ADB5BD"]
};

const UNSPLASH_ACCESS_KEY = 'YOUR_ACCESS_KEY'; // Replace with your Unsplash Access Key

async function fetchImages(mood) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${mood}&per_page=6&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  const data = await response.json();
  return data.results.map(img => img.urls.small);
}

generateBtn.addEventListener("click", async () => {
  const mood = moodSelector.value;

  // Set Color Palette
  colorPalette.innerHTML = '';
  moodColors[mood].forEach(color => {
    const div = document.createElement("div");
    div.className = "color-block";
    div.style.backgroundColor = color;
    colorPalette.appendChild(div);
  });

  // Set Image Gallery
  imageGallery.innerHTML = 'Loading...';
  const imageUrls = await fetchImages(mood);
  imageGallery.innerHTML = '';
  imageUrls.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    imageGallery.appendChild(img);
  });
});
