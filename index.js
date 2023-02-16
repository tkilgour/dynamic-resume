var fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
  Wotfard: {
    normal: "fonts/Wotfard-Regular.otf",
  },
  "Gill Sans": {
    normal: "fonts/Gill Sans.otf",
    bold: "fonts/Gill Sans Bold.otf",
  }
};

var PdfPrinter = require("pdfmake");
var printer = new PdfPrinter(fonts);
var fs = require("fs");

var docDefinition = {
  content: [
    {
      text: "Thomas Kilgour",
      style: "h1",
    },
    {
      text: "Web Developer",
      style: "h2",
    },
    {
      columns: [
        {
          text: "Guelph, ON",
          width: "auto",
        },
        {
          text: "|",
          color: "#ccc",
          width: "auto",
        },
        {
          text: "647-550-6537",
          link: "tel:647-550-6537",
          style: "link",
          width: "auto",
        },
        {
          text: "|",
          color: "#ccc",
          width: "auto",
        },
        {
          text: "thomas@kilgour.co",
          link: "mailto:thomas@kilgour.co",
          style: "link",
          width: "auto",
        },
      ],
      margin: [0, 0, 0, 6],
    },
    {
      columns: [
        {
          stack: [
            {
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#3182ce" d="M16.36 14c.08-.66.14-1.32.14-2c0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2c0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2c0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2c0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/></svg>',
              width: 14,
            },
          ],
          width: "auto",
        },
        {
          text: "kilgour.co",
          link: "https://kilgour.co",
          style: "link",
          margin: [0, 3, 0, 0],
          width: "auto",
        },
        {
          text: " ",
          width: "auto",
        },
        {
          text: " ",
          width: "auto",
        },
        {
          stack: [
            {
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#3182ce" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>',
              width: 14,
            },
          ],
          width: "auto",
        },
        {
          text: "github.com/tkilgour",
          link: "https://www.github.com/tkilgour",
          style: "link",
          margin: [0, 3, 0, 0],
          width: "auto",
        },
        {
          text: " ",
          width: "auto",
        },
        {
          text: " ",
          width: "auto",
        },
        {
          stack: [
            {
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#3182ce" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>',
              width: 14,
            },
          ],
          width: "auto",
        },
        {
          text: "linkedin.com/in/tkilgour",
          link: "https://linkedin.com/in/tkilgour",
          style: "link",
          margin: [0, 3, 0, 0],
          width: "auto",
        },
      ],
      columnGap: 4,
    },
    {
      text: "Summary",
      style: "h3",
    },
    {
      text: "I am a web developer who has focused primarily on front-end technologies. I am driven to create elegant user interfaces that are simple to navigate and interact with, no matter the  screen size or the user's accessibility needs.",
      margin: [0, 0, 0, 8],
    },
    "I have extensive customer service experience and can strike up a conversation with anyone. When not in front of the computer, you’ll find me outside – riding my bike, hiking in the woods, or camping with my family.",
    {
      text: "Experience",
      style: "h3",
    },
    {
      columns: [
        {
          text: "Web Developer",
          style: "h4",
        },
        {
          text: "Nov 2018 - Present",
          width: "auto",
        },
      ],
    },
    {
      text: "KPDI Digital",
      style: "h5",
    },
    "Working as a contract frontend web developer to help build a complex B2B application for clients.",
    {
      ul: [
        "Rapidly prototyping and developing features that meet client's needs",
        "Working with and managing small teams of developers and designers to deliver high quality web applications",
        "Producing high quality, accessible, and performant code",
      ],
      margin: [0, 8, 0, 0],
    },
  ],

  styles: {
    h1: {
      fontSize: 28,
      margin: [0, 0, 0, 0],
      lineHeight: 1.4,
    },
    h2: {
      fontSize: 12,
      margin: [0, 0, 0, 12],
      bold: true,
    },
    h3: {
      fontSize: 14,
      margin: [0, 18, 0, 8],
      bold: true,
      color: "#aaa",
    },
    h4: {
      fontSize: 14,
    },
    h5: {
      fontSize: 10,
      margin: [0, 0, 0, 12],
    },
    link: {
      color: "#3182ce",
    },
  },
  defaultStyle: {
    font: "Helvetica",
    fontSize: 10,
    columnGap: 10,
    lineHeight: 1.5,
  },
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("pdfs/basics.pdf"));
pdfDoc.end();
