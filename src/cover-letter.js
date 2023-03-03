import * as fs from "fs";
const rawData = fs.readFileSync("./data/cover-letter.json");
const data = JSON.parse(rawData);

const coverLetter = [
  {
    text: data.splice(0, 1),
    margin: [0, 72, 0, 8],
  },
  ...data.map((paragraph) => {
    return {
      text: paragraph,
      margin: [0, 0, 0, 8],
    };
  }),
  {
    text: "Regards,",
    margin: [0, 16, 0, 8],
  },
  {
    image: "signature.png",
    width: 200,
    margin: [0, 0, 0, 8],
  },
  {
    text: "Thomas Kilgour",
  },
];

export default coverLetter;