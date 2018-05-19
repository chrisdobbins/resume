const resume = require("./resume.json");

const pdfPrinter = require("pdfmake/src/printer");
const fs = require("fs");
const moment = require("moment");

main();

function main() {
  writePDF();
}

function orderByDate(data) {
  // sorting most recent -> least recent
  const formatString = "MMMM YYYY";
  return data.sort((a, b) => {
    if (a.dates.start && b.dates.start) {
      return (
        moment(b.dates.start, formatString) -
        moment(a.dates.start, formatString)
      );
    }
    return moment(b.dates.end, formatString) - moment(a.dates.End);
  });
}

function writePDF() {
  let fonts = {
    Roboto: {
      normal: "./node_modules/pdfmake/examples/fonts/Roboto-Regular.ttf",
      bold: "./node_modules/pdfmake/examples/fonts/Roboto-Bold.ttf",
      bolditalics: "./node_modules/pdfmake/examples/fonts/Roboto-BoldItalic.ttf"
    }
  };

  let docDefinition = {
    content: [
      {
        style: "header",
        text: resume.name
      },
      {
        style: "subheader",
        text: [resume.contact.email + "\n", resume.contact.github]
      },
      {
        style: "tagline",
        text: ""
      }
    ]
  };

  let experienceHeader = { text: "Experience", style: "experienceHeader" };
  let experienceDescriptions = orderByDate(resume.experience).map(currExp => {
    return {
      stack: [
        currExp.name,
        `${currExp.dates.start} - ${
          currExp.dates.end ? currExp.dates.end : "present"
        }`,
        currExp.data.description
      ]
    };
  });

  let experienceSection = {
    style: "experienceSection",
    width: "65%",
    stack: [experienceHeader, experienceDescriptions]
  };

  let educationHeader = { text: "Education", style: "educationHeader" };
  let eduDescriptions = orderByDate(resume.education).map(function(currEdu) {
    return {
      stack: [
        currEdu.name,
        currEdu.dates.end,
        currEdu.data.degree || currEdu.data.program
      ]
    };
  });

  let educationSection = {
    style: "educationSection",
    width: "20%",
    stack: [educationHeader, eduDescriptions]
  };

  docDefinition.content.push({
    columns: [educationSection, experienceSection]
  });

  // styles

  let styles = {
    experienceSection: {
      margin: [25, 0, 0, 0]
    },
    header: {
      bold: true,
      fontSize: 20,
      alignment: "center"
    },
    tagline: {
      bold: true,
      fontSize: 14,
      alignment: "center",
      italics: true,
      margin: [0, 8, 0, 0]
    },
    subheader: {
      bold: true,
      fontSize: 12,
      italics: true,
      alignment: "center"
    },
    educationHeader: {
      bold: true,
      fontSize: 14,
      alignment: "center"
      //margin: [0, 15, 0, 8],
    },
    experienceHeader: {
      bold: true,
      fontSize: 14,
      alignment: "center"
    },
    description: {},
    educationDescriptionName: {
      bold: true,
      fontSize: 12
    }
  };

  docDefinition.styles = styles;
  let printer = new pdfPrinter(fonts);
  let pdf = printer.createPdfKitDocument(docDefinition);

  pdf.pipe(fs.createWriteStream("test2.pdf"));
  pdf.end();
}
