'use strict';
const http = require('https');
const Storage = require('@google-cloud/storage');
const moment = require("moment");
const pdfPrinter = require("pdfmake");


let styles = {
    experienceSection: {
        margin: [0, 0, 20, 0]
    },
    experienceListItem: {
        margin: [0, 5, 0, 5]
    },
    experienceDescription: {
        margin: [0, 3, 0, 5]
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
    descriptionHeader: {
        bold: true,
        fontSize: 12
    },
    subheader: {
        bold: true,
        fontSize: 11,
        alignment: "center",
        margin: [0, 0, 0, 10]
    },
    projectHeader: {
        bold: true,
        fontSize: 14,
        margin: [0, 10, 0, 3]
    },
    projectSection: {
        margin: [0, 3, 0, 0]
    },
    educationHeader: {
        bold: true,
        fontSize: 14,
        margin: [0, 20, 0, 3]
    },
    educationDescription: {
        fontSize: 10,
        margin: [0, 0, 0, 5]
    },
    experienceHeader: {
        bold: true,
        fontSize: 14,
        alignment: "center",
        margin: [0, 5, 200, 5]
    },
    description: {
        fontSize: 10,
        margin: [0, 3, 0, 10]
    },
    descriptionDates: {
        fontSize: 10,
        italics: true,
        margin: [0, 1, 0, 0]
    },
    educationDescriptionName: {
        bold: true,
        fontSize: 12
    }
};

function writePDF(resume) {
    let fonts = {
        Roboto: {
            normal: "./fonts/Roboto-Regular.ttf",
            bold: "./fonts/Roboto-Bold.ttf",
            italics: "./fonts/Roboto-Italic.ttf"
        }
    };
    let docDefinition = {
        content: [{
            style: "header",
            text: resume.name
        }, {
            style: "subheader",
            stack: [resume.contact.email, resume.contact.github]
        }]
    };
    let experienceHeader = {
        text: "Experience",
        style: "experienceHeader"
    };
    let experienceDescriptions = orderByDateDesc(resume.experience).map(currExp => {
        return {
            style: "description",
            stack: [{
                style: "descriptionHeader",
                text: currExp.name
            }, {
                style: "descriptionDates",
                text: `${currExp.dates.start} - ${currExp.dates.end ? currExp.dates.end : "present"}`
            }, {
                style: "experienceDescription",
                ul: currExp.data.description.map(desc => {
                    return {
                        style: "experienceListItem",
                        text: desc
                    };
                })
            }]
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
    let educationHeader = {
        text: "Education",
        style: "educationHeader"
    };
    let eduDescriptions = orderByDateDesc(resume.education).map(function (currEdu) {
        return {
            style: "description",
            stack: [{
                style: "descriptionHeader",
                text: currEdu.name
            }, {
                style: "descriptionDates",
                text: currEdu.dates.end
            }, {
                text: currEdu.data.degree || currEdu.data.program
            }]
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
    let projectDescriptions = orderByDateDesc(resume.projects).map((project) => {
        return {
            style: "description",
            stack: [{
                style: "descriptionHeader",
                text: project.name
            }, {
                style: "descriptionDates",
                text: project.dates.end
            }, {
                stack: project.description
            }]
        };
    });
    let projectSection = {
        style: "projectSection",
        stack: [projectHeader, projectDescriptions]
    };
    docDefinition.content.push({
        columns: [{
            width: "25%",
            stack: [educationSection, projectSection]
        }, spacerColumn, experienceSection]
    });
    docDefinition.styles = styles;
    let printer = new pdfPrinter(fonts);
    let pdf = printer.createPdfKitDocument(docDefinition);
    pdf.pipe(fs.createWriteStream(`${resume.name.replace(' ', '')}-resume.pdf`));
    pdf.end();
}
let resumeStreamResp = '';
const storage = new Storage({
    projectId: 'sixth-decoder-117712'
});

function orderByDateDesc(data) {
    const formatString = "MMMM YYYY";
    return data.sort((a, b) => {
        if (a.dates.start && b.dates.start) {
            return (moment(b.dates.start, formatString) - moment(a.dates.start, formatString));
        }
        return moment(b.dates.end, formatString) - moment(a.dates.End);
    });
}
exports.updater = (req, res1) => {
    const options = {
        hostname: "raw.githubusercontent.com",
        path: "/chrisdobbins/resume/main/common/resume.json",
        method: "GET"
    };
    const ghReq = http.request(options, (res2) => {
        res2.setEncoding('utf8');
        res2.on('data', (chunk) => {
            resumeStreamResp += chunk;
        }).on('end', () => {
            console.log('resumeStreamResp');
            console.log(resumeStreamResp);
            res1.status(200).send(resumeStreamResp);
            let bucket = storage.bucket('react-resume-cjd');
            console.log("bucket: ", bucket);
            let file = bucket.file('resume.txt');
            file.save(writePDF(JSON.parse(resumeStreamResp))).then((x) => {
                console.log("x: ", x)
            });
        }).on('error', (e) => {
            console.error(e);
            res1.status(500).send("oops: " + e);
        });
    });
    ghReq.end()
}
