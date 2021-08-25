import { jsPDF } from "jspdf";


export function createReport(source, name){
      const doc = new jsPDF("l", "pt", "a4");
      let now = new Date;
      doc.html(source,  {
        callback: function (pdf) {
          pdf.save(name + '-' + now.getTime() + ".pdf");
        },
        x: 5,
        y: 10
      });
      

}