import * as fs from "fs/promises";
import * as oldFS from "fs";
const rawData = await fs.readFile("./data/general.json");
const generalData = JSON.parse(rawData);
import pdfMake from 'pdfMake'

const filePath = process.argv[2]
const content = await import(filePath)
const iterableContent = content.default;

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
  Courier: {
    normal: "Courier",
    bold: "Courier-Bold",
  }
};
const printer = new pdfMake(fonts);

// LINKS
const links = generalData.links.reduce((acc, currentLink, currentIndex) => {
  const nextAcc = [
    ...acc,
    {
      stack: [
        {
          svg: currentLink.svg,
          width: 14,
        },
      ],
      width: "auto",
    },
    {
      text: currentLink.name,
      link: currentLink.url,
      style: "link",
      margin: [0, 3, 0, 0],
      width: "auto",
    },
  ];

  if (currentIndex < generalData.links.length - 1) {
    nextAcc.push(
      {
        text: " ",
        width: "auto",
      },
      {
        text: " ",
        width: "auto",
      }
    );
  }

  return nextAcc;
}, []);

// TEMPLATE
const docDefinition = {
  content: [
    {
      columns: [
        {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="784" height="466" viewBox="0 0 784 466"><path fill="#3182ce" fill-rule="evenodd" d="M236 466h156V74H236Z"/><path fill="#3182ce" fill-rule="evenodd" d="M0 466h156V74H0Z"/><path fill="#3182ce" fill-rule="evenodd" d="M471 466h216L471 250Z"/><path fill="#3182ce" fill-rule="evenodd" d="m551 233 233 233V0Z"/><path fill="#3182ce" fill-rule="evenodd" d="M471 0v216L687 0Z"/></svg>',
          width: 80,
        },
        {
          stack: [
            {
              text: "Thomas Kilgour",
              style: "h1",
            },
            {
              text: generalData.title,
              style: "h2",
            },
          ],
        },
        {
          stack: [
            {
              text: generalData.email,
              link: `mailto:${generalData.email}}`,
              style: "link",
              margin: [0, 0, 0, 2],
            },
            {
              text: generalData.phone,
              link: `tel:${generalData.phone}}`,
              style: "link",
              margin: [0, 0, 0, 2],
            },
            {
              text: generalData.location,
            },
          ],
          width: "auto",
          alignment: "right",
        },
      ],
      columnGap: 15,
    },
    ...iterableContent,
  ],

  footer: {
    columns: links,
    margin: [40, 0],
    columnGap: 4,
  },

  styles: {
    h1: {
      fontSize: 32,
      margin: [0, 0, 0, 0],
      lineHeight: 1.2,
    },
    h2: {
      font: "Courier",
      fontSize: 14,
      margin: [0, 0, 0, 0],
      color: "#777",
    },
    h3: {
      fontSize: 12,
      margin: [0, 18, 0, -6],
      bold: true,
      color: "#999",
    },
    h4: {
      fontSize: 14,
      margin: [0, 16, 0, 0],
    },
    h5: {
      fontSize: 10,
      margin: [0, 0, 0, 6],
      italics: true,
    },
    link: {
      color: "#3182ce",
    },
    ul: {
      margin: [8, 8, 0, 0],
    },
  },

  defaultStyle: {
    font: "Helvetica",
    fontSize: 10,
    columnGap: 10,
    lineHeight: 1.5,
  },
};

const pdfDoc = printer.createPdfKitDocument(docDefinition);
await fs.mkdir("../pdfs", { recursive: true });
console.log(process.argv[3])
pdfDoc.pipe(oldFS.createWriteStream(process.argv[3]));
pdfDoc.end();
