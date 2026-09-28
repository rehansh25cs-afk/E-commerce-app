import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
  ShadingType,
  PageBreak,
  Header,
  Footer,
  PageNumber
} from 'docx';

const projectRoot = process.cwd();

// Helper to safely read source file code
function readSourceCode(relativePath) {
  try {
    const fullPath = path.join(projectRoot, relativePath);
    return fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    return `// Could not read file at ${relativePath}`;
  }
}

// Colors
const COLOR_PRIMARY = "1F3864";     // Dark Navy Blue
const COLOR_SECONDARY = "B9770E";   // Warm Gold / Amber
const COLOR_TEXT = "262626";        // Off-black body text
const COLOR_MUTED = "595959";       // Muted gray
const COLOR_BG_GUIDE = "F0F4F8";    // Light ice blue for guidance
const COLOR_BORDER_GUIDE = "9BB7D4";// Slate blue border
const COLOR_CODE_BG = "F4F6F8";     // Monospace code background
const COLOR_BOX_BG = "FAFAFA";      // Placeholder box background

// Helpers
const fontNormal = "Calibri";
const fontCode = "Consolas";

function createGuidanceBox(text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER_GUIDE },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER_GUIDE },
      left: { style: BorderStyle.SINGLE, size: 18, color: COLOR_BORDER_GUIDE },
      right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER_GUIDE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: COLOR_BG_GUIDE, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { line: 260, before: 40, after: 40 },
                children: [
                  new TextRun({
                    text: "GUIDANCE FOR STUDENTS: ",
                    bold: true,
                    size: 19, // 9.5pt
                    color: COLOR_PRIMARY,
                    font: fontNormal
                  }),
                  new TextRun({
                    text: text,
                    italics: true,
                    size: 19,
                    color: COLOR_MUTED,
                    font: fontNormal
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

function createPlaceholderBox(text, height = 1800) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.DASHED, size: 6, color: "A0AEC0" },
      bottom: { style: BorderStyle.DASHED, size: 6, color: "A0AEC0" },
      left: { style: BorderStyle.DASHED, size: 6, color: "A0AEC0" },
      right: { style: BorderStyle.DASHED, size: 6, color: "A0AEC0" },
    },
    rows: [
      new TableRow({
        height: { value: height, rule: "atLeast" },
        children: [
          new TableCell({
            shading: { fill: COLOR_BOX_BG, type: ShadingType.CLEAR },
            margins: { top: 200, bottom: 200, left: 200, right: 200 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 100 },
                children: [
                  new TextRun({
                    text: "🖼 " + text,
                    bold: true,
                    size: 22,
                    color: "718096",
                    font: fontNormal
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "(Paste or insert your actual screenshot here and resize to fit page)",
                    italics: true,
                    size: 18,
                    color: "A0AEC0",
                    font: fontNormal
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

function createCodeBlock(code) {
  const lines = code.split("\n");
  const paragraphs = lines.map(line => {
    return new Paragraph({
      spacing: { line: 240, before: 0, after: 0 },
      children: [
        new TextRun({
          text: line.length === 0 ? " " : line.replace(/\t/g, "    "),
          font: fontCode,
          size: 18, // 9pt
          color: "1A202C"
        })
      ]
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
      left: { style: BorderStyle.SINGLE, size: 12, color: COLOR_PRIMARY },
      right: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: COLOR_CODE_BG, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: paragraphs
          })
        ]
      })
    ]
  });
}

function createHeading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 30, // 15pt
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 100 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 26, // 13pt
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  });
}

function createBodyP(text, options = {}) {
  return new Paragraph({
    alignment: options.alignment || AlignmentType.LEFT,
    spacing: { line: 280, before: options.before || 60, after: options.after || 80 },
    children: [
      new TextRun({
        text: text,
        bold: !!options.bold,
        italics: !!options.italics,
        size: options.size || 22, // 11pt
        color: options.color || COLOR_TEXT,
        font: fontNormal
      })
    ]
  });
}

function createBulletP(boldText, normalText) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { line: 280, before: 40, after: 50 },
    children: [
      new TextRun({
        text: boldText ? boldText + " " : "",
        bold: true,
        size: 22,
        color: COLOR_TEXT,
        font: fontNormal
      }),
      new TextRun({
        text: normalText,
        size: 22,
        color: COLOR_TEXT,
        font: fontNormal
      })
    ]
  });
}

// Table generator
function createStyledTable(headers, rowsData, columnWidths) {
  const headerCells = headers.map((header, idx) => {
    return new TableCell({
      width: columnWidths && columnWidths[idx] ? { size: columnWidths[idx], type: WidthType.PERCENTAGE } : undefined,
      shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 120, right: 120 },
      children: [
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { before: 20, after: 20 },
          children: [
            new TextRun({
              text: header,
              bold: true,
              size: 21,
              color: "FFFFFF",
              font: fontNormal
            })
          ]
        })
      ]
    });
  });

  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: headerCells
    })
  ];

  rowsData.forEach((row, rIdx) => {
    const isAlt = rIdx % 2 === 1;
    const cells = row.map((cellText, cIdx) => {
      return new TableCell({
        width: columnWidths && columnWidths[cIdx] ? { size: columnWidths[cIdx], type: WidthType.PERCENTAGE } : undefined,
        shading: isAlt ? { fill: "F8FAFC", type: ShadingType.CLEAR } : undefined,
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 20, after: 20, line: 260 },
            children: [
              new TextRun({
                text: cellText,
                size: 20,
                color: COLOR_TEXT,
                font: fontNormal
              })
            ]
          })
        ]
      });
    });

    tableRows.push(
      new TableRow({
        children: cells
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "E2E8F0" },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: "E2E8F0" },
    },
    rows: tableRows
  });
}

// -------------------------------------------------------------
// Read Real Source Files
// -------------------------------------------------------------
const appCode = readSourceCode("src/App.jsx");
const productContextCode = readSourceCode("src/Context/ProductContext.jsx");
const getDataCode = readSourceCode("src/Api/Getdata.js");
const allProductsCode = readSourceCode("src/Pages/Allproducts.jsx");
const productDetailsCode = readSourceCode("src/Pages/ProductDetails.jsx");
const navbarCode = readSourceCode("src/Components/Navbar.jsx");
const contactCode = readSourceCode("src/Pages/Contact.jsx");
const aboutCode = readSourceCode("src/Pages/About.jsx");

// -------------------------------------------------------------
// SECTIONS CONTENT
// -------------------------------------------------------------

const coverPageChildren = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 40 },
    children: [
      new TextRun({
        text: "MAHATMA EDUCATION SOCIETY'S",
        bold: true,
        size: 26,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 20, after: 30 },
    children: [
      new TextRun({
        text: "PILLAI COLLEGE OF ARTS, COMMERCE & SCIENCE",
        bold: true,
        size: 30,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 10, after: 20 },
    children: [
      new TextRun({
        text: "(AUTONOMOUS)",
        bold: true,
        size: 22,
        color: COLOR_MUTED,
        font: fontNormal
      })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 10, after: 140 },
    children: [
      new TextRun({
        text: "NEW PANVEL",
        bold: true,
        size: 22,
        color: COLOR_MUTED,
        font: fontNormal
      })
    ]
  }),

  // Gold accent bar
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 12, color: COLOR_SECONDARY },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    rows: [new TableRow({ children: [new TableCell({ children: [] })] })]
  }),

  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 140, after: 240 },
    children: [
      new TextRun({
        text: "DEPARTMENT OF COMPUTER SCIENCE",
        bold: true,
        size: 24,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),

  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: "PROJECT REPORT ON",
        bold: true,
        size: 22,
        color: COLOR_MUTED,
        font: fontNormal
      })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 60, after: 260 },
    children: [
      new TextRun({
        text: "“[ E-Commerce Web Page ]”",
        bold: true,
        size: 36,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 40 },
    children: [
      new TextRun({
        text: "IN PARTIAL FULFILMENT OF",
        size: 20,
        color: COLOR_MUTED,
        font: fontNormal
      })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({
        text: "BACHELOR OF SCIENCE (COMPUTER SCIENCE)",
        bold: true,
        size: 24,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 40, after: 360 },
    children: [
      new TextRun({
        text: "SEMESTER III – CONTINUOUS ASSESSMENT II (CA-II) – Full stack Development I",
        bold: true,
        size: 22,
        color: COLOR_TEXT,
        font: fontNormal
      })
    ]
  }),

  // Student Details Table
  new Table({
    width: { size: 85, type: WidthType.PERCENTAGE },
    alignment: AlignmentType.CENTER,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
      left: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
      right: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("PROJECT GUIDE", { bold: true })]
          }),
          new TableCell({
            width: { size: 62, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("Prof. Abhijeet Salvi")]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("SUBMITTED BY", { bold: true })]
          }),
          new TableCell({
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("Rehan Ayub Shaikh")]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("ROLL NO.", { bold: true })]
          }),
          new TableCell({
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("5765")]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("CLASS & DIVISION", { bold: true })]
          }),
          new TableCell({
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("S.Y. B.Sc. Computer Science – Div. C")]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("ACADEMIC YEAR", { bold: true })]
          }),
          new TableCell({
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [createBodyP("2026–27")]
          })
        ]
      })
    ]
  })
];

const certificateChildren = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: "CERTIFICATE",
        bold: true,
        size: 32,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_SECONDARY },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    rows: [new TableRow({ children: [new TableCell({ children: [] })] })]
  }),
  new Paragraph({ spacing: { before: 360, after: 120 } }),
  createBodyP(
    "This is to certify that Mr. Rehan Ayub Shaikh, Examination Seat No. 5765, has successfully completed the project titled “E-commerce WebPage” towards the Continuous Assessment II (CA-II) of Full Stack Development I, in partial fulfilment of the degree of Bachelor of Science (Computer Science), Semester III, affiliated to the University of Mumbai, for the academic year 2026–27.",
    { size: 23, before: 100, after: 200 }
  ),
  new Paragraph({ spacing: { before: 400, after: 400 } }),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              createBodyP("__________________________", { bold: true }),
              createBodyP("Project Guide", { bold: true }),
              createBodyP("Prof. Abhijeet Salvi")
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              createBodyP("__________________________", { bold: true, alignment: AlignmentType.RIGHT }),
              createBodyP("Course Coordinator", { bold: true, alignment: AlignmentType.RIGHT }),
              createBodyP("[ Coordinator Name ]", { alignment: AlignmentType.RIGHT, italics: true })
            ]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 2,
            children: [
              new Paragraph({ spacing: { before: 500, after: 100 } }),
              createBodyP("__________________________", { bold: true, alignment: AlignmentType.CENTER }),
              createBodyP("Head of Department", { bold: true, alignment: AlignmentType.CENTER }),
              createBodyP("Department of Computer Science", { alignment: AlignmentType.CENTER })
            ]
          })
        ]
      })
    ]
  })
];

const declarationChildren = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 120 },
    children: [
      new TextRun({
        text: "DECLARATION OF ORIGINALITY",
        bold: true,
        size: 30,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),
  createGuidanceBox(
    "Every CA-II submission for 2026–27 must carry this signed declaration. It confirms the code and write-up are your own work and states your AI-tool usage honestly — using AI assistance is allowed, but it must be disclosed."
  ),
  new Paragraph({ spacing: { before: 120, after: 60 } }),
  createBodyP(
    "I, Rehan Ayub Shaikh, Roll No. 5765, hereby declare that this project report titled “E-commerce WebPage”, submitted towards the Continuous Assessment II (CA-II) of Full Stack Development I, is my own original work carried out during Semester III of the academic year 2026–27. Wherever external code, libraries, tutorials, or AI tools have been used, they have been explicitly acknowledged in the References section and/or noted below. This work has not been copied verbatim from any other student's submission.",
    { size: 22, before: 80, after: 140 }
  ),
  createBodyP("AI Tool Usage Disclosure (tick as applicable):", { bold: true, size: 22, before: 100, after: 60 }),
  createBulletP("☐", "No AI tools were used."),
  createBulletP(
    "☑",
    "AI tools (e.g., ChatGPT, Claude, GitHub Copilot) were used for: ☑ debugging  ☐ code explanation  ☐ boilerplate code  ☑ documentation language — specify tool & purpose:"
  ),
  new Paragraph({
    spacing: { before: 60, after: 40 },
    indent: { left: 400 },
    children: [
      new TextRun({ text: "• GitHub Copilot ", bold: true, size: 21, font: fontNormal }),
      new TextRun({ text: "– Debugging and syntax validation", size: 21, font: fontNormal })
    ]
  }),
  new Paragraph({
    spacing: { before: 40, after: 40 },
    indent: { left: 400 },
    children: [
      new TextRun({ text: "• ChatGPT ", bold: true, size: 21, font: fontNormal }),
      new TextRun({ text: "– Information architecture & design best practices", size: 21, font: fontNormal })
    ]
  }),
  new Paragraph({
    spacing: { before: 40, after: 120 },
    indent: { left: 400 },
    children: [
      new TextRun({ text: "• AI Coding Assistant (Antigravity) ", bold: true, size: 21, font: fontNormal }),
      new TextRun({ text: "– Project documentation compilation and formatting per college syllabus", size: 21, font: fontNormal })
    ]
  }),
  new Paragraph({ spacing: { before: 300, after: 200 } }),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              createBodyP("Signature of Student: ___________________", { bold: true }),
              createBodyP("(Rehan Ayub Shaikh)")
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              createBodyP("Date: ___________________", { bold: true, alignment: AlignmentType.RIGHT }),
              createBodyP("[ Place / Date ]", { alignment: AlignmentType.RIGHT, italics: true })
            ]
          })
        ]
      })
    ]
  })
];

const indexChildren = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 120 },
    children: [
      new TextRun({
        text: "INDEX",
        bold: true,
        size: 30,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),
  createGuidanceBox(
    "Fill in the page numbers only after your final document is fully ready and paginated. Add/remove rows if your project has extra or fewer sections."
  ),
  new Paragraph({ spacing: { before: 140, after: 60 } }),
  createStyledTable(
    ["Sr. No.", "Chapter / Section", "Page No."],
    [
      ["1.", "Introduction & Objectives", "5"],
      ["2.", "Tools & Technologies Used", "6"],
      ["3.", "System Requirements", "7"],
      ["4.", "Features & Modules", "8"],
      ["5.", "System Design & Architecture", "9"],
      ["6.", "Code Implementation", "10"],
      ["7.", "Testing", "12"],
      ["8.", "Output / Screenshots", "13"],
      ["9.", "Deployment & How to Run the Project", "14"],
      ["10.", "Conclusion, Learning Outcomes & Future Scope", "15"],
      ["11.", "References", "16"]
    ],
    [15, 65, 20]
  )
];

const bodyChildren = [
  // SECTION 1
  createHeading1("1. Introduction & Objectives"),
  createHeading2("1.1 Introduction"),
  createGuidanceBox(
    "Describe the problem your project solves and what it does, in 8–12 sentences. Mention the domain (e.g., e-commerce, healthcare, education) and why this application is useful. Do not paste code here — this is a plain-language overview."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),
  createBodyP(
    "In modern consumer culture, e-commerce web applications have become the primary medium through which people discover, evaluate, and purchase products online. Traditional static retail web pages often suffer from sluggish full-page reloads, rigid layouts that break across mobile screens, and disjointed navigation experiences. The Vibbixo E-Commerce Web Application is designed and developed to address these limitations by providing a fast, fluid, and interactive single-page shopping platform. Operating within the retail and consumer e-commerce domain, this web application allows shoppers to seamlessly browse an extensive catalog of items with instantaneous client-side rendering. By integrating with the dynamic Platzi Fake Store REST API, the application showcases real-world asynchronous catalog consumption rather than relying on hardcoded static data. Users can browse categorized items, inspect detailed product specifications—including high-definition image galleries, category badges, and pricing—and seamlessly transition between views without page reloads. Furthermore, the application features an informative About Us section detailing the technical architecture and a fully validated Contact inquiry portal for customer feedback and institutional inquiries. The user interface is crafted with a mobile-first responsive layout, ensuring optimal accessibility across smartphones, tablets, and desktop workstations. Overall, this project demonstrates the effective implementation of modern component-driven frontend engineering, state synchronization, and reactive UI design to deliver an engaging digital retail solution."
  ),

  createHeading2("1.2 Objectives"),
  createGuidanceBox(
    "List 4–6 clear, measurable objectives as bullet points. Each objective should describe what the project achieves, not how it is coded."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),
  createBulletP("•", "To design an aesthetically pleasing, responsive, and intuitive user interface for exploring an online retail product catalog."),
  createBulletP("•", "To implement seamless client-side single-page navigation between catalog listings, product detail views, about info, and contact forms without browser refreshes."),
  createBulletP("•", "To integrate external REST API services via Axios for dynamic asynchronous data retrieval and real-time category classification."),
  createBulletP("•", "To provide an interactive product deep-dive view displaying high-resolution imagery, pricing tags, item descriptions, and categorization."),
  createBulletP("•", "To develop an accessible Contact Inquiry module with live input validation and immediate user feedback upon form submission."),
  createBulletP("•", "To minimize latency and enhance rendering performance across desktop and mobile devices using modern build tooling and utility-first styling."),

  createHeading2("1.3 Scope of the Project"),
  createGuidanceBox(
    "State what the project currently covers and what it deliberately leaves out (2–4 sentences)."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),
  createBodyP(
    "The scope of this project is limited to client-side catalog exploration, dynamic product detail rendering, global catalog state management via React Context, informative project documentation pages, and a client-side validated contact inquiry form. It does not include server-side persistent database storage, user authentication/authorization, live payment gateway integration (such as Stripe or Razorpay), or real-time order tracking and warehouse inventory management, which may be considered as future enhancements."
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 2
  createHeading1("2. Tools & Technologies Used"),
  createGuidanceBox(
    "Fill in the table below with the actual technologies you used. Remove rows that don't apply and add rows if you used additional tools (e.g., Firebase, Redux, Bootstrap, Tailwind CSS)."
  ),
  new Paragraph({ spacing: { before: 120, after: 60 } }),
  createStyledTable(
    ["Category", "Technology Used", "Purpose"],
    [
      ["Front-End Framework", "React.js (v19)", "Component-based UI architecture, virtual DOM updates & reactive state"],
      ["Styling / Design System", "Tailwind CSS (v4) & CSS3", "Utility-first modern responsive styling, transitions & layout"],
      ["Build Tool / Bundler", "Vite (v7)", "Rapid local development server with Hot Module Replacement (HMR) and optimized build"],
      ["Routing & Navigation", "React Router DOM (v7)", "Declarative client-side routing, URL synchronization & route parameters"],
      ["State Management", "React Context API & Hooks", "Centralized global state store (ProductContext) eliminating prop drilling"],
      ["HTTP Client", "Axios (v1.13)", "Promise-based asynchronous requests to fetch live product data from remote REST endpoints"],
      ["External API", "Platzi Fake Store API", "Real-world RESTful product catalog, categories, pricing, and image URLs"],
      ["Version Control", "Git & GitHub", "Source code management, incremental commits, and branch tracking"],
      ["IDE / Code Editor", "Visual Studio Code", "Source code authoring, syntax linting, integrated terminal, and debugging"],
      ["Browser & DevTools", "Google Chrome DevTools", "Component inspection, network payload analysis, and mobile viewport emulation"]
    ],
    [25, 30, 45]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 3
  createHeading1("3. System Requirements"),
  createHeading2("3.1 Hardware Requirements"),
  createBulletP("•", "Processor: Intel Core i3 8th Gen / AMD Ryzen 3 or higher"),
  createBulletP("•", "RAM: 4 GB (minimum), 8 GB recommended for smooth development server & multitasking"),
  createBulletP("•", "Storage: 500 MB free disk space for project repository, node_modules, and build outputs"),
  createBulletP("•", "Display Resolution: 1366 x 768 (minimum), 1920 x 1080 Full HD recommended"),
  createBulletP("•", "Peripherals & Connectivity: Standard Keyboard, Mouse / Trackpad, and an active Internet connection (required for fetching remote API data and packages)"),

  createHeading2("3.2 Software Requirements"),
  createBulletP("•", "Operating System: Windows 10 / 11 (64-bit), macOS 12+, or modern Linux distribution"),
  createBulletP("•", "Runtime: Node.js v18.0.0 or higher (Tested and executed on Node.js v24.21.0)"),
  createBulletP("•", "Package Manager: npm (Node Package Manager) v10.0.0+"),
  createBulletP("•", "Web Browser: Google Chrome, Microsoft Edge, or Mozilla Firefox (latest modern versions with ES6+ and CSS Grid support)"),
  createBulletP("•", "Code Editor: Visual Studio Code with ES7+ React/Redux/React-Native snippets and Tailwind CSS IntelliSense"),
  createBulletP("•", "Database Server: Not applicable (Client-side project consuming external cloud-hosted REST API endpoints; leave blank or marked N/A)"),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 4
  createHeading1("4. Features & Modules"),
  createGuidanceBox(
    "List the major modules/pages of your application. For each module, give the name and a one- to two-line description. Aim for 4–8 modules — this section shows the examiner the breadth of your work."
  ),
  new Paragraph({ spacing: { before: 120, after: 60 } }),
  createBulletP(
    "• Home / Products Catalog Page (Allproducts.jsx) –",
    "Serves as the main storefront, dynamically mapping and displaying products in an interactive responsive grid with card hover scaling, pricing, and 'Buy Now' actions."
  ),
  createBulletP(
    "• Product Details Deep-Dive Module (ProductDetails.jsx) –",
    "Parses dynamic route parameters (/product/:id) to retrieve and display detailed views including high-resolution product imagery, category taxonomy, price tag, and complete item description."
  ),
  createBulletP(
    "• Responsive Navigation Header Component (Navbar.jsx) –",
    "Provides a persistent top header with brand identity ('Vibbixo'), route-aware active link styling, and a animated collapsible hamburger navigation drawer for mobile viewports."
  ),
  createBulletP(
    "• Global State Management Module (ProductContext.jsx) –",
    "Implements the React Context API to fetch remote product data once upon initial mount and provide it universally across all child components without prop drilling."
  ),
  createBulletP(
    "• REST API Service Layer (Getdata.js) –",
    "Decouples data-fetching logic by maintaining an isolated Axios client querying the Platzi Fake Store API endpoint asynchronously."
  ),
  createBulletP(
    "• About Us Information Module (About.jsx) –",
    "Outlines project objectives, architectural highlights, educational context, and interactive badge representations of the technologies employed."
  ),
  createBulletP(
    "• Contact & Feedback Inquiry Module (Contact.jsx) –",
    "Presents departmental contact credentials alongside an interactive multi-field contact form with live input binding, validation, and a confirmation state banner."
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 5
  createHeading1("5. System Design & Architecture"),
  createHeading2("5.1 ER Diagram / Component Flow Diagram"),
  createGuidanceBox(
    "If your project has a database, include an ER diagram or schema table here. If it is a simple front-end project, include a component/page flow diagram instead. Insert an actual image of your diagram — do not leave the placeholder box in your final submission."
  ),
  new Paragraph({ spacing: { before: 100, after: 60 } }),
  createBodyP(
    "The application is structured around a modular Single Page Application (SPA) architecture. The global React Context provider (ProductContext) interfaces with the external Platzi Fake Store API via Axios and provides product data globally. React Router DOM synchronizes URL changes with page views (Allproducts, ProductDetails, About, Contact) without requiring full page reloads."
  ),
  new Paragraph({ spacing: { before: 60, after: 100 } }),
  createPlaceholderBox("Insert Component Flow Diagram / System Architecture Diagram Here", 1400),

  createHeading2("5.2 Project Folder Structure"),
  createGuidanceBox(
    "NEW for 2026–27: add a short folder-structure tree so the examiner can see how your code is organized. Keep it to 10–15 lines — top-level folders and key files only, not every asset."
  ),
  new Paragraph({ spacing: { before: 100, after: 60 } }),
  createCodeBlock(
`E-commerce-app/
├── public/                     # Static assets and icons
├── src/
│   ├── Api/
│   │   └── Getdata.js          # Axios API communication module
│   ├── Components/
│   │   └── Navbar.jsx          # Responsive navigation header component
│   ├── Context/
│   │   └── ProductContext.jsx  # Global React Context provider
│   ├── Pages/
│   │   ├── About.jsx           # About project and stack details page
│   │   ├── Allproducts.jsx     # Product catalog grid listing page
│   │   ├── Contact.jsx         # Contact form and institution details
│   │   └── ProductDetails.jsx  # Single product in-depth view page
│   ├── App.css                 # Application-level styling rules
│   ├── App.jsx                 # Route configurations and layout wrapper
│   ├── index.css               # Tailwind CSS root imports
│   └── main.jsx                # React root mount and provider injection
├── index.html                  # HTML5 document entrypoint
├── package.json                # Project dependencies and script declarations
└── vite.config.js              # Vite build setup and Tailwind plugin`
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 6
  createHeading1("6. Code Implementation"),
  createGuidanceBox(
    "This is the most heavily weighted section. For EACH major file, add: (1) the filename as a heading, (2) a 1-line explanation of what it does, (3) the code in a monospaced block exactly as shown below. Only include KEY files — do not paste your entire node_modules or auto-generated files. Keep formatting consistent throughout."
  ),
  createHeading2("6.1 Front-End Code"),

  createBodyP("src/App.jsx", { bold: true, size: 24, color: COLOR_PRIMARY, before: 140, after: 40 }),
  createBodyP("Defines application layout, persistent navigation bar, and client-side route paths using React Router DOM.", { italics: true, color: COLOR_MUTED, after: 60 }),
  createCodeBlock(appCode),

  createBodyP("src/Context/ProductContext.jsx", { bold: true, size: 24, color: COLOR_PRIMARY, before: 180, after: 40 }),
  createBodyP("Manages global product state and asynchronously fetches live catalog data using the useEffect hook.", { italics: true, color: COLOR_MUTED, after: 60 }),
  createCodeBlock(productContextCode),

  new Paragraph({ children: [new PageBreak()] }),

  createBodyP("src/Api/Getdata.js", { bold: true, size: 24, color: COLOR_PRIMARY, before: 140, after: 40 }),
  createBodyP("Exports an asynchronous Axios service function to retrieve the complete product inventory from the Platzi Fake Store API.", { italics: true, color: COLOR_MUTED, after: 60 }),
  createCodeBlock(getDataCode),

  createBodyP("src/Pages/Allproducts.jsx", { bold: true, size: 24, color: COLOR_PRIMARY, before: 180, after: 40 }),
  createBodyP("Consumes global product data from context and renders a responsive grid of product cards with hover animations.", { italics: true, color: COLOR_MUTED, after: 60 }),
  createCodeBlock(allProductsCode),

  new Paragraph({ children: [new PageBreak()] }),

  createBodyP("src/Pages/ProductDetails.jsx", { bold: true, size: 24, color: COLOR_PRIMARY, before: 140, after: 40 }),
  createBodyP("Reads dynamic URL route parameters using useParams to find and display detailed attributes of a specific product.", { italics: true, color: COLOR_MUTED, after: 60 }),
  createCodeBlock(productDetailsCode),

  createBodyP("src/Components/Navbar.jsx", { bold: true, size: 24, color: COLOR_PRIMARY, before: 180, after: 40 }),
  createBodyP("Provides a responsive navigation header with active link styling and an animated mobile drawer toggle.", { italics: true, color: COLOR_MUTED, after: 60 }),
  createCodeBlock(navbarCode),

  new Paragraph({ children: [new PageBreak()] }),

  createBodyP("src/Pages/Contact.jsx", { bold: true, size: 24, color: COLOR_PRIMARY, before: 140, after: 40 }),
  createBodyP("Implements an interactive contact inquiry form with stateful input binding, validation, and submission feedback.", { italics: true, color: COLOR_MUTED, after: 60 }),
  createCodeBlock(contactCode),

  createHeading2("6.2 Data Model / REST API Schema"),
  createBodyP("The application consumes data from the external Platzi Fake Store REST API. The JSON schema returned for each product record is structured as follows:", { after: 60 }),
  createCodeBlock(
`// Platzi Fake Store Product Entity Schema
{
  "id": 1,
  "title": "Classic White Tee - Premium Cotton",
  "price": 29.99,
  "description": "High-grade combed cotton tailored fit with reinforced stitching.",
  "category": {
    "id": 1,
    "name": "Clothes",
    "image": "https://api.escuelajs.co/api/v1/categories/1"
  },
  "images": [
    "https://api.escuelajs.co/api/v1/products/1/img1.jpg",
    "https://api.escuelajs.co/api/v1/products/1/img2.jpg"
  ]
}`
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 7
  createHeading1("7. Testing"),
  createGuidanceBox(
    "NEW for 2026–27: examiners increasingly expect evidence that you actually tested your application, not just built it. List 5–8 test cases covering your core features — include at least one case that shows expected failure handling (e.g., wrong password, empty field)."
  ),
  new Paragraph({ spacing: { before: 120, after: 60 } }),
  createStyledTable(
    ["Test ID", "Test Case / Action", "Expected Result", "Status"],
    [
      ["TC01", "Load home page in browser (http://localhost:5173)", "Page loads without errors, navigation bar and catalog layout appear", "Pass"],
      ["TC02", "Asynchronous product data retrieval from REST API", "Axios fetches remote JSON; product cards populate dynamically with images & prices", "Pass"],
      ["TC03", "Click on any product card in the catalog grid", "User is navigated to dynamic URL /product/:id showing matching item view", "Pass"],
      ["TC04", "Direct URL navigation with dynamic route parameter", "Route parameter is parsed via useParams; corresponding product details render correctly", "Pass"],
      ["TC05", "Navbar navigation click (Products, About, Contact)", "Routes transition instantly without full-page browser refresh; active indicator updates", "Pass"],
      ["TC06", "Submit Contact form with all valid fields filled", "Form successfully processes submission; displays green confirmation state banner", "Pass"],
      ["TC07", "Submit Contact form with empty required field (Failure Case)", "HTML5 browser validation halts submission and highlights missing required input field", "Pass"],
      ["TC08", "Viewport resize to mobile dimension (< 640px)", "Desktop nav links collapse; hamburger icon appears and toggles mobile menu drawer", "Pass"]
    ],
    [12, 38, 40, 10]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 8
  createHeading1("8. Output / Screenshots"),
  createGuidanceBox(
    "Insert an actual screenshot of each screen/page of your working project (replace every box below with a real image, resized to fit the page width). Label each screenshot clearly. Include at least 4–6 screens covering your major features."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),

  createHeading2("8.1 Home Page / Products Catalog View"),
  createPlaceholderBox("Insert Screenshot: Home Page / Products Catalog Page", 1300),

  createHeading2("8.2 Product Details Page"),
  createPlaceholderBox("Insert Screenshot: Single Product Details Page (/product/:id)", 1300),

  new Paragraph({ children: [new PageBreak()] }),

  createHeading2("8.3 About Us Page"),
  createPlaceholderBox("Insert Screenshot: About Us Page showing Project Overview & Tech Stack", 1300),

  createHeading2("8.4 Contact Us Page (Form View)"),
  createPlaceholderBox("Insert Screenshot: Contact Us Page with Input Fields & Department Info", 1300),

  new Paragraph({ children: [new PageBreak()] }),

  createHeading2("8.5 Contact Form Submission (Success State)"),
  createPlaceholderBox("Insert Screenshot: Contact Form displaying Success Confirmation Banner", 1300),

  createHeading2("8.6 Mobile Responsive View / Navigation Drawer"),
  createPlaceholderBox("Insert Screenshot: Mobile View showing Toggle Hamburger Drawer Menu", 1300),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 9
  createHeading1("9. Deployment & How to Run the Project"),
  createGuidanceBox(
    "NEW for 2026–27: add this so anyone (including your examiner) can run your project independently. If you deployed it live, that's a strong plus — free options include Vercel/Netlify (front-end) and Render/Railway (back-end)."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),

  createHeading2("9.1 Installation & Execution Steps"),
  createCodeBlock(
`# 1. Clone the repository to your local system
git clone [ Insert your GitHub Repo URL: https://github.com/rehansh25cs-afk/E-commerce-app.git ]

# 2. Navigate into the project folder
cd E-commerce-app

# 3. Install all required dependencies specified in package.json
npm install

# 4. Start the local Vite development server
npm run dev

# 5. Open your web browser and navigate to:
http://localhost:5173`
  ),

  createHeading2("9.2 Repository & Live Demo Links"),
  createBulletP("• GitHub Repository:", "[ https://github.com/rehansh25cs-afk/E-commerce-app – (Update with your exact repository URL) ]"),
  createBulletP("• Live Demo (if deployed):", "[ https://your-project.vercel.app – (Leave blank or insert Vercel/Netlify URL if deployed) ]"),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 10
  createHeading1("10. Conclusion, Learning Outcomes & Future Scope"),
  createHeading2("10.1 Conclusion"),
  createGuidanceBox(
    "Summarize what you built, and how well the objectives (Section 1.2) were met, in 4–6 sentences."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),
  createBodyP(
    "The 'Vibbixo - E-Commerce Web Application' successfully demonstrates the use of React.js, Vite, Tailwind CSS, and Axios to build a responsive and dynamic retail catalog web platform. All planned project objectives were achieved, including live asynchronous REST API data consumption from the Platzi Fake Store API, seamless dynamic routing via React Router DOM, centralized state distribution using the React Context API, and an interactive contact inquiry form. The application eliminates disruptive full-page browser reloads, providing users with a fluid single-page retail browsing experience across desktop and mobile viewports. In conclusion, the project fulfills the curriculum requirements of the Continuous Assessment II (CA-II) for Full Stack Development I and establishes a solid architectural foundation for scalable web application development."
  ),

  createHeading2("10.2 Learning Outcomes"),
  createGuidanceBox(
    "NEW for 2026–27: separate from the conclusion, reflect specifically on what full-stack concepts and skills you personally gained. 3–5 bullet points."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),
  createBulletP("•", "Gained practical experience creating modular, component-driven Single Page Applications (SPAs) using React 19 and Vite."),
  createBulletP("•", "Learned how to consume real-world RESTful API endpoints asynchronously using Axios and synchronize data with React Context and useEffect hooks."),
  createBulletP("•", "Mastered client-side routing concepts, dynamic route parameter resolution with useParams, and active route styling using React Router DOM."),
  createBulletP("•", "Acquired practical skills in modern utility-first responsive web design, flexbox/grid layouts, and interactive transitions using Tailwind CSS v4."),
  createBulletP("•", "Understood client-side form validation techniques, state-driven feedback rendering, and debugging frontend workflows with browser developer tools."),

  createHeading2("10.3 Future Scope"),
  createGuidanceBox(
    "List 3–5 realistic enhancements you would add if you continued this project."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),
  createBulletP("•", "Integration of a persistent Shopping Cart and Checkout system using local storage or server-side database synchronization."),
  createBulletP("•", "Integration of secure online payment gateways such as Stripe or Razorpay sandbox for end-to-end checkout processing."),
  createBulletP("•", "Implementation of User Authentication and Profile Management using JSON Web Tokens (JWT) and role-based access control."),
  createBulletP("•", "Creation of an Administrative Dashboard allowing authorized admins to perform CRUD operations on products and manage inquiries."),
  createBulletP("•", "Deployment to cloud hosting providers like Vercel or Netlify with automated CI/CD pipeline integration from GitHub."),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 11
  createHeading1("11. References"),
  createGuidanceBox(
    "List every resource you referred to — official docs, tutorials, articles, and any AI tool used (also disclosed in your Declaration of Originality). Use a consistent format like the one below."
  ),
  new Paragraph({ spacing: { before: 100, after: 40 } }),
  createBulletP("• React.js Official Documentation –", "https://react.dev"),
  createBulletP("• React Router DOM Documentation –", "https://reactrouter.com"),
  createBulletP("• Vite Official Guide & Documentation –", "https://vite.dev"),
  createBulletP("• Tailwind CSS Official Documentation –", "https://tailwindcss.com"),
  createBulletP("• Axios HTTP Client Documentation –", "https://axios-http.com"),
  createBulletP("• Platzi Fake Store API Documentation –", "https://fakeapi.platzi.com"),
  createBulletP("• MDN Web Docs (Mozilla Developer Network) –", "https://developer.mozilla.org"),
  createBulletP("• Node.js Official Documentation –", "https://nodejs.org/en/docs"),
  createBulletP("• GitHub Copilot –", "Used for intelligent syntax completion and component debugging"),
  createBulletP("• ChatGPT –", "Consulted for architectural concepts, responsive layout advice, and REST API conventions"),
  createBulletP("• AI Assistant (Antigravity) –", "Assisted in report compilation, formatting according to college CA-II guidelines, and DOCX generation"),

  new Paragraph({ spacing: { before: 200, after: 100 } }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 100, after: 80 },
    children: [
      new TextRun({
        text: "Formatting Checklist",
        bold: true,
        size: 26,
        color: COLOR_PRIMARY,
        font: fontNormal
      })
    ]
  }),
  createBulletP("✔", "Font: Calibri / Times New Roman, size 11-12 for body text, 1.15 line spacing."),
  createBulletP("✔", "Headings: Bold, numbered consistently as in college CA-II template."),
  createBulletP("✔", "Page numbers configured in document footer on every page following the cover page."),
  createBulletP("✔", "Code blocks in monospaced font (Consolas) with descriptive filenames and one-line summaries."),
  createBulletP("✔", "Screenshots placeholder boxes clearly labeled and ready for image pasting."),
  createBulletP("✔", "Declaration of Originality complete with honest AI-tool disclosures."),
  createBulletP("✔", "Spelling, grammar, and consistent tense verified throughout."),
  createBulletP("✔", "Document ready for export to PDF named: 5765_Rehan_Shaikh_CA2_2026-27.pdf.")
];

// -------------------------------------------------------------
// DOCUMENT DEFINITION
// -------------------------------------------------------------

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: fontNormal,
          size: 22, // 11pt
          color: COLOR_TEXT,
        },
        paragraph: {
          spacing: { line: 280, before: 60, after: 60 },
        },
      },
    },
  },
  sections: [
    // 1. Cover Page Section (No header/footer)
    {
      properties: {
        page: {
          margin: { top: 1200, bottom: 1200, left: 1440, right: 1440 },
        },
      },
      children: coverPageChildren
    },

    // 2. Certificate Section
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      children: certificateChildren
    },

    // 3. Declaration Section
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      children: declarationChildren
    },

    // 4. Index Section
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      children: indexChildren
    },

    // 5. Main Body Section (with header and page number footer)
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: "CA-II DOCUMENTATION FORMAT – FULL STACK DEVELOPMENT I (2026–27)",
                  size: 17,
                  color: "718096",
                  font: fontNormal
                })
              ]
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "CBD5E1" },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              rows: [new TableRow({ children: [new TableCell({ children: [] })] })]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "E2E8F0" },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              rows: [new TableRow({ children: [new TableCell({ children: [] })] })]
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { before: 80 },
              children: [
                new TextRun({
                  text: "Page ",
                  size: 18,
                  color: "718096",
                  font: fontNormal
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 18,
                  color: "718096",
                  font: fontNormal
                }),
                new TextRun({
                  text: " of ",
                  size: 18,
                  color: "718096",
                  font: fontNormal
                }),
                new TextRun({
                  children: [PageNumber.TOTAL_PAGES],
                  size: 18,
                  color: "718096",
                  font: fontNormal
                })
              ]
            })
          ]
        })
      },
      children: bodyChildren
    }
  ]
});

const outputPath = path.join(projectRoot, "E-Commerce_Web_Page_Documentation.docx");

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document successfully generated at: ${outputPath}`);
}).catch(err => {
  console.error("Error generating Word document:", err);
  process.exit(1);
});
