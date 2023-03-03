import * as fs from "fs";
const rawData = fs.readFileSync("./data/resume.json");
const resumeData = JSON.parse(rawData);

function parseContent(content) {
  return content.map((block) => {
    if (typeof block === "string") {
      return block;
    }

    if (block.type === "ul") {
      return {
        ul: block.value,
        style: "ul",
      };
    }
  });
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
    ...parseContent(currentRole.content),
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
    ...parseContent(currentProject.content),
  ];
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
          text: `${currentEducation.start}${
            currentEducation.end ? ` - ${currentEducation.end}` : ""
          }`,
          width: "auto",
        },
      ],
    },
    ...parseContent(currentEducation.content),
  ];
}, []);

const resume = [
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
    columns: [
      {
        stack: [
          {
            text: "Education",
            style: "h3",
          },
          ...education,
        ],
        width: "65%"
      },
      {
        stack: [
          {
            text: "Hobbies & Interests",
            style: "h3",
          },
          {
            ul: resumeData.hobbies,
            style: "ul",
          }
        ]
      },
    ],
    columnGap: 20
  }
];

export default resume;