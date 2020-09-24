import React, {useState} from 'react';
import './App.css';
import {Document, Page} from "react-pdf";
import samplePDF from './sample.pdf';
import { pdfjs } from 'react-pdf';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [visible, setVisible] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    console.log(pageNumber);
    if(pageNumber == 2){
      setVisible(true);
    }
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="App">
      <Modal
        title="Register"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        width={1000}
        footer={[
          <Button key="back" onClick={() => {
            console.log("Registering");
          }}>
            Register
          </Button>,
        ]}
      >
        <h1>Please Register First</h1>
      </Modal>
      <Document
        file={samplePDF}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
