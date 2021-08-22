import { jsPDF } from "jspdf";

// import {logoHorizontal} from '../../../public/assets/logo/logo-horizontal.png'
// import { html2canvas } from "html2canvas";


  const doc = new jsPDF("l", "pt", "a4");
export function createReport(source){
      console.log(source);
      doc.text('teste', 10, 10);
      doc.html(source,  {
        callback: function (pdf) {
          pdf.save("document.pdf");
        },
        x: 15,
        y: 15
      });

}