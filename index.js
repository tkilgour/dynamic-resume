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

const PdfPrinter = require("pdfmake");
const printer = new PdfPrinter(fonts);
const fs = require("fs");

const rawData = fs.readFileSync("resume_data.json");
const resumeData = JSON.parse(rawData);

const links = resumeData.links.reduce((acc, currentLink, currentIndex) => {
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

  if (currentIndex < resumeData.links.length - 1) {
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

const roles = resumeData.roles.reduce((acc, currentRole) => {
  return [
    ...acc,
    {
      text: currentRole.title,
      style: "h4",
    },
    {
      columns: [
        {
          text: currentRole.company,
          style: "h5",
        },
        {
          text: `${currentRole.start} - ${currentRole.end}`,
          width: "auto",
        },
      ],
    },
    ...currentRole.content.map(block => {
      if (typeof block === 'string') {
        return block;
      }

      if (block.type === "ul") {
        return {
          ul: block.value,
          margin: [0, 8, 0, 0],
        }
      }
    })
  ];
}, []);

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
              text: resumeData.title,
              style: "h2",
            },
          ],
        },
        {
          stack: [
            {
              text: resumeData.email,
              link: `mailto:${resumeData.email}}`,
              style: "link",
              margin: [0, 0, 0, 2],
            },
            {
              text: resumeData.phone,
              link: `tel:${resumeData.phone}}`,
              style: "link",
              margin: [0, 0, 0, 2],
            },
            {
              text: resumeData.location,
            },
          ],
          width: "auto",
          alignment: "right",
        },
      ],
      columnGap: 15,
    },
    resumeData.summary.length
      ? {
          text: "Summary",
          style: "h3",
        }
      : null,
    resumeData.summary.map((paragraph) => {
      return {
        text: paragraph,
        margin: [0, 8, 0, 0],
      };
    }),
    {
      text: "Experience",
      style: "h3",
    },
    ...roles,
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
      // bold: true,
    },
    h3: {
      fontSize: 14,
      margin: [0, 18, 0, 0],
      bold: true,
      color: "#aaa",
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
  },
  defaultStyle: {
    font: "Helvetica",
    fontSize: 10,
    columnGap: 10,
    lineHeight: 1.5,
  },
};

const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("pdfs/Thomas Kilgour resume.pdf"));
pdfDoc.end();
