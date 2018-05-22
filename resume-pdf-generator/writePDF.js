import resume from "../common/resume.json";
import pdfPrinter from "pdfmake/src/printer";
import fs from  "fs";
import  moment from "moment";
import orderByDate from "../common/bin/orderDates.js";
import styles from './styles';

writePDF();

function writePDF() {
  let fonts = {
    Roboto: {
      normal: "./fonts/Roboto-Regular.ttf",
      bold: "./fonts/Roboto-Bold.ttf",
      bolditalics: "./fonts/Roboto-BoldItalic.ttf",
      italics: "./fonts/Roboto-Italic.ttf"
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
        stack: [resume.contact.email, resume.contact.github]
      }
    ]
  };

  let experienceHeader = { text: "Experience", style: "experienceHeader" };
  let experienceDescriptions = orderByDate(resume.experience).map(currExp => {
    return {
        style: "description",
      stack: [
      {style: "descriptionHeader",
       text: currExp.name},
      {style: "descriptionDates",
       text: `${currExp.dates.start} - ${currExp.dates.end ? currExp.dates.end : "present"}`},
      {style: "experienceDescription",
          ul: currExp.data.description.map(desc => {
              return {style: "experienceListItem",
              text: desc};
          })}
      ]
    };
  });

  let experienceSection = {
    style: "experienceSection",
    stack: [experienceHeader, experienceDescriptions]
  };

  let spacerColumn = {
      width: "10%",
      text: ""
  };

  let educationHeader = { text: "Education", style: "educationHeader" };
  let eduDescriptions = orderByDate(resume.education).map(function(currEdu) {
    return {
        style: "description",
      stack: [
      {style: "descriptionHeader",
          text: currEdu.name},
      {style: "descriptionDates",
          text: currEdu.dates.end},
      {text: currEdu.data.degree || currEdu.data.program}]
    };
  });

  let educationSection = {
    style: "educationSection",
    stack: [educationHeader, eduDescriptions]
  };

  let projectHeader = {
      text: "Projects",
      style: "projectHeader"
  };

 let projectDescriptions = orderByDate(resume.projects).map((project) => {
     return {
         style: "description",
         stack: [{style: "descriptionHeader",
        text: project.name},
         {style: "descriptionDates",
             text: project.dates.end},
         {stack: project.description}]
     };
 });

  let projectSection = {
      style: "projectSection",
      stack: [projectHeader, projectDescriptions]
  };

  docDefinition.content.push({
      columns: [{width: "25%", stack: [educationSection, projectSection]}, spacerColumn, experienceSection]
  });


  docDefinition.styles = styles;
  let printer = new pdfPrinter(fonts);
  let pdf = printer.createPdfKitDocument(docDefinition);

  pdf.pipe(fs.createWriteStream(`${resume.name.replace(' ', '')}-resume.pdf`));
  pdf.end();
}
