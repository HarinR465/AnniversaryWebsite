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
      "images/background-1.jpg",
      "images/background-2.jpg",
      "images/background-3.jpg",
    ],
  },

  hero: {
    eyebrow: "Harin & Diya",
    title: "Happy Anniversary, my love",
  },

  letter: {
    greeting: "Happy Anniversary my love",
    paragraphs: [
      "Thank you for everything you do for me my baby, I’ve never had someone care for me the way you do and I truly appreciate it. I couldn’t imagine my life without you because you bring so much happiness to my life. You bring joy to any room you’re in and you never fail to brighten my day. There are so many moments when I look at you and it’s still hard to believe that you’re my girlfriend.",
      "You have no idea how much you mean to me and I’m so grateful to have you by my side when life gets tough.",
      "This past year with you has been filled with so many great memories and I can’t wait to create a lifetime of memories with you.",
      "I’m so proud of us, and so excited for everything still to come. Here’s to many, many more years together. I love you more than anything my baby, and I can’t wait to spend the rest of my life with you ❤️",
    ],
    signOff: "Love you forever,",
    signature: "Harin",
  },

  // Milestones shown on the timeline. Swap the images for real photos.
  timeline: [
    {
      date: "Add the date",
      title: "My first picture of you",
      text: "When my mom wanted to see you 🙂",
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

  // One reason per card. Add or remove as many as you like.
  reasons: [
    "Your laugh can fix even my worst day.",
    "You always know how to make me smile.",
    "You believe in me, even when I don’t.",
    "Every adventure is better with you.",
    "You always know how to make me laugh.",
    "You’re the most beautiful girl in the world.",
    "Your smile can brighten up my whole day.",
    "You take care of me through the tough times.",
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
