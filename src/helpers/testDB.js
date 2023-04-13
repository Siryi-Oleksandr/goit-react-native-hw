export const testDB = [
  {
    img: require("../images/nature-1.jpg"),
    title: "Forest in mounting",
    commentsNumber: 18,
    likes: 203,
    location: "Ukraine",
    comments: [
      {
        author: "user",
        avatar: require("../images/avatar.jpg"),
        date: "9 june 2023 18:56",
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
      },
      {
        author: "own",
        avatar: require("../images/avatar.jpg"),
        date: "1 january 2023 11:15",
        text: "Really love your most recent photo!",
      },
    ],
  },
  {
    img: require("../images/nature-2.jpg"),
    title: "Sunset near sea",
    commentsNumber: 9,
    likes: 155,
    location: "Egypt",
  },
  {
    img: require("../images/nature-3.jpg"),
    title: "Italy nice house",
    commentsNumber: 12,
    likes: 633,
    location: "Italy",
  },
];
