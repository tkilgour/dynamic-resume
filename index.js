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


// LINKS
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


function parseContent(content) {
  return content.map(block => {
    if (typeof block === 'string') {
      return block;
    }

    if (block.type === "ul") {
      return {
        ul: block.value,
        style: 'ul'
      }
    }
  })
}

// ROLES / EXPERIENCE
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
    ...parseContent(currentRole.content)
  ];
}, []);

// PROJECTS

const projects = resumeData.projects.reduce((acc, currentProject) => {
  return [
    ...acc,
    {
      text: currentProject.title,
      style: "h4",
    },
    {
      text: currentProject.url,
      link: currentProject.url,
      color: "#3182ce",
      margin: [0, 0, 0, 8],
    },
    ...parseContent(currentProject.content)
  ]
}, []);

// EDUCATION

const education = resumeData.education.reduce((acc, currentEducation) => {
  return [
    ...acc,
    {
      text: currentEducation.title,
      style: "h4",
    },
    {
      columns: [
        {
          text: currentEducation.location,
          style: "h5",
        },
        {
          text: `${currentEducation.start}${currentEducation.end ? ` - ${currentEducation.end}` : ''}`,
          width: "auto",
        },
      ],
    },
    ...parseContent(currentEducation.content)
  ];
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
    {
      columns: [
        {
          stack: [
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
          ],
        },
        {
          stack: [
            {
              text: "Key Skills",
              style: "h3",
            },
            {
              columns: [
                {
                  ul: resumeData.skills.splice(0, resumeData.skills.length / 2),
                  style: "ul",
                },
                {
                  ul: resumeData.skills,
                  style: "ul",
                },
              ],
              columnGap: 5,
            },
          ],
          width: "45%",
        },
      ],
      columnGap: 20,
    },
    {
      text: "Experience",
      style: "h3",
    },
    ...roles,
    {
      text: "Projects",
      style: "h3",
      pageBreak: "before",
    },
    ...projects,
    {
      text: "Education",
      style: "h3",
    },
    ...education,
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
fs.mkdirSync("pdfs", { recursive: true });
pdfDoc.pipe(fs.createWriteStream("pdfs/Thomas Kilgour resume.pdf"));
pdfDoc.end();
