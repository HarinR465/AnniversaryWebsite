// ============================================================
//  Everything you'll want to personalise lives in this file.
//  Edit the text and image paths below, then refresh the page.
// ============================================================

window.CONTENT = {
  herName: "Diya",

  // When you got together (your local time). Month is 1-12.
  anniversary: { year: 2025, month: 10, day: 26, hour: 17, minute: 0 },

  quiz: {
    intro: "First I have to ask you some questions to make sure it's you..",
    // Shown for the 1st wrong answer, then the 2nd (and every one after).
    // The count resets for each question.
    wrongMessages: [
      "Looks like I know you better than you do...",
      "Do I even know you?!",
    ],
    correctMessages: ["Correct!", "That's my girl!", "Yep, it's you!"],
    // Answers ignore capitals, spaces and punctuation.
    questions: [
      {
        question: "What is your favourite dessert?",
        answers: ["frozen yoghurt", "frozen yogurt", "froyo"],
      },
      {
        question: "What is your favourite hobby?",
        answers: ["shopping"],
      },
      {
        question: "What is your favourite fast food restaurant?",
        answers: ["kfc", "kentucky fried chicken"],
      },
    ],
  },

  // Background slideshow. Put your photos in images/ and list them here,
  // e.g. "images/us-at-the-beach.jpg".
  slideshow: {
    secondsPerSlide: 5,
    images: [
      "images/placeholders/slide-1.svg",
      "images/placeholders/slide-2.svg",
      "images/placeholders/slide-3.svg",
      "images/placeholders/slide-4.svg",
      "images/placeholders/slide-5.svg",
    ],
  },

  hero: {
    eyebrow: "Harin & Diya",
    title: "Happy Anniversary, my love",
  },

  // TEMPLATE: replace with your own words.
  letter: {
    greeting: "My dearest Diya,",
    paragraphs: [
      "Happy anniversary! I can't believe it's already been a whole year since the day everything changed for the better.",
      "Thank you for every laugh, every late-night conversation, every shopping trip I pretended to be tired on, and every frozen yoghurt we've shared. You make the ordinary days feel special and the special days feel unforgettable.",
      "I'm so proud of us, and so excited for everything still to come. Here's to many, many more years together.",
    ],
    signOff: "All my love, forever,",
    signature: "Harin",
  },

  // Milestones shown on the timeline. Swap the images for real photos.
  timeline: [
    {
      date: "Add the date",
      title: "Our first date",
      text: "Write a little memory about your first date here.",
      image: "images/placeholders/first-date.svg",
    },
    {
      date: "Add the date",
      title: "Our first trip together",
      text: "Where did you go? What was the best part?",
      image: "images/placeholders/first-trip.svg",
    },
    {
      date: "Add the date",
      title: "Our first solo trip together",
      text: "Just the two of you. Write about it here.",
      image: "images/placeholders/first-solo-trip.svg",
    },
    {
      date: "Add the date",
      title: "Our first festival together",
      text: "Which festival, and what was the highlight?",
      image: "images/placeholders/first-festival.svg",
    },
  ],

  // TEMPLATE: one reason per card. Add or remove as many as you like.
  reasons: [
    "Your laugh can fix even my worst day.",
    "You always know how to make me smile.",
    "You're my favourite shopping buddy (even when I'm carrying all the bags).",
    "You share your frozen yoghurt with me... sometimes.",
    "You make a KFC run feel like a date.",
    "You're beautiful, inside and out.",
    "You believe in me, even when I don't.",
    "Every adventure is better with you.",
    "You're my best friend.",
    "You're you, and that's my favourite thing of all.",
  ],

  finalQuestion: {
    question: "Will you spend the rest of your life with me?",
    yes: "Yes!",
    no: "No",
    // Shown each time she tries to press "No" (the last one repeats).
    noMessages: [
      "What do you mean???",
      "Why did you do it again??",
      "Did I waste my time making this website??",
      "Just say yes... 😞",
    ],
    afterYes: "Best answer ever! Happy anniversary, Diya. I love you so much.",
  },
};
