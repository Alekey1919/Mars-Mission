// COUNTDOWN

const countDate = new Date("Nov 23, 2024 00:00:00").getTime();
const now = new Date().getTime();
const gap = countDate - now;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = day * 365;

// Calculating the gap

let textMonthComplete = Math.floor(gap / month);
let textMonth;
let textYear = Math.floor(gap / year);
let textDay = Math.floor(gap / day);

if (textYear >= 1) {
  textMonth = textMonthComplete - 12 * textYear;
}
let textDayReduced = Math.floor(textDay - 30 * textMonthComplete);

document.querySelector(".years-number").innerText = textYear;
document.querySelector(".months-number").innerText = textMonth;
document.querySelector(".days-number").innerText = textDayReduced;

// Intersections

// // Countdown

const countdown = (node, number) => {
  number = parseInt(number);
  let cycles = 0;
  if (node.classList[0] === "years-number") {
    let minus = 3;
    let interval = setInterval(() => {
      if (cycles >= 3) {
        clearInterval(interval);
      }
      node.innerText = number + minus;
      minus--;
      cycles++;
    }, 100);
  } else if (node.classList[0] === "months-number") {
    let minus = 6;
    let interval = setInterval(() => {
      if (cycles >= 6) {
        clearInterval(interval);
      }
      node.innerText = number + minus;
      minus--;
      cycles++;
    }, 100);
  } else {
    let minus = 10;
    let interval = setInterval(() => {
      if (cycles >= 10) {
        clearInterval(interval);
      }
      node.innerText = number + minus;
      minus--;
      cycles++;
    }, 100);
  }
};

const numbers = document.querySelectorAll(".anim");
let numbersSpeed = 0.5;
let yearsIntersected = 0;
let monthsIntersected = 0;
let daysIntersected = 0;

const callbackCountdown = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (
        yearsIntersected === 0 ||
        monthsIntersected === 0 ||
        daysIntersected === 0
      ) {
        entry.target.style.animation = "anim " + numbersSpeed + "s";
        let number = entry.target.firstElementChild.innerText;
        let node = entry.target.firstElementChild;
        if (entry.target.id === "years") {
          yearsIntersected += 1;
        } else if (entry.target.id === "months") {
          monthsIntersected += 1;
        } else {
          daysIntersected += 1;
        }
        countdown(node, number);
        numbersSpeed += 0.4;
      }
    }
  });
};

const observer = new IntersectionObserver(callbackCountdown);
numbers.forEach((element) => observer.observe(element));

// // Points

const points = document.querySelectorAll(".anim0");
let pointSpeed = 0.3;
let pointsIntersected = 0;

const callbackPoints = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (pointsIntersected < 6) {
        entry.target.style.animation = "anim " + pointSpeed + "s";
        pointSpeed += 0.3;
        pointsIntersected++;
      }
    }
  });
};

const observerPoint = new IntersectionObserver(callbackPoints);
points.forEach((element) => observerPoint.observe(element));

// Parallax

const marsParallax = document.querySelector(".mars-planet-container");
const earthParallax = document.querySelector("#earth");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 800) {
    if (window.pageYOffset <= window.innerHeight) {
      var rate = window.pageYOffset * 0.5;
      marsParallax.style.transform = "translate3d(0px, " + rate + "px, 0px)";
    }
  } else {
    if (window.pageYOffset <= window.innerHeight) {
      var rate = window.pageYOffset * 0.5;
      marsParallax.style.transform = "translate3d(0px, " + rate + "px, 0px)";
    }
  }
  if (window.pageYOffset > window.innerHeight) {
    var scrolled =
      document.body.scrollHeight - window.pageYOffset - window.innerHeight;
    if (window.innerWidth <= 1100) {
      scrolled = scrolled * 0.05;
    } else {
      scrolled = scrolled * 0.15;
    }
    earthParallax.style.transform = "translate3d(0px, " + scrolled + "px, 0px)";
  }
});

// Description container moving video

const infoButton = document.querySelector("#icon-button");
const vide = document.querySelector("#starship-video");
let infoButtonActive = false;
infoButton.addEventListener("click", () => {
  if (!infoButtonActive) {
    infoButtonActive = true;
  } else {
    infoButtonActive = false;
  }

  if (infoButtonActive) {
    vide.style.left = -window.innerWidth / 3 + "px";
    infoButton.style.right = "-15px";
    infoButton.style.top = "-15px";
  } else {
    vide.style.left = "0px";
    infoButton.style.right = "0px";
    infoButton.style.top = "0px";
  }
});

window.addEventListener("resize", () => {
  if (infoButtonActive) {
    vide.style.left = -window.innerWidth / 3 + "px";
  }
});

// Carousel

const leftCarousel = document.querySelector("#carousel-left-btn");
const rightCarousel = document.querySelector("#carousel-right-btn");

leftCarousel.addEventListener("click", () => {
  document.querySelector("#first-half").style.display = "flex";
  document.querySelector("#first-half").style.opacity = "1";
  document.querySelector("#first-half").style.animation = "anim 0.7s ease-out";

  document.querySelector("#second-half").style.opacity = "0";
  setTimeout(() => {
    document.querySelector("#second-half").style.display = "none";
  }, 500);
});

rightCarousel.addEventListener("click", () => {
  document.querySelector("#second-half").style.display = "flex";
  document.querySelector("#second-half").style.opacity = "1";
  document.querySelector("#second-half").style.animation = "anim 0.7s ease-out";
  document.querySelector("#first-half").style.opacity = "0";
  setTimeout(() => {
    document.querySelector("#first-half").style.display = "none";
  }, 500);
});
