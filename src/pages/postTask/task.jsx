import React, { useState } from "react";
import { Editor } from "primereact/editor";

import parse from "html-react-parser";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { AutoComplete } from "primereact/autocomplete";
// import { parse } from 'node-html-parser';
// import parse from 'html-dom-parser';
export default function BasicDemo() {
//   {/* this below will be use to render html text on the task page, that text which will be fetched from the database */}
//   <div
//   className="ql-editor"
//   dangerouslySetInnerHTML={{ __html: text }}
// ></div>
  const [text, setText] = useState("");
  const formik = useFormik({
    initialValues: {
      title: "",
      link: "",
      description: text,
      conditions: "",
      category: "",
      amount: "",
      repeat: "",
      maxTimespan: "",
      verifyPeriod: "",
      distributionInterval: "",
      uniqueIP: false,
      advertise: false,
      rating: false,
      selectedImplementers: "",
      geotargeting: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleEditorChange = (e) => {
    const htmlValue = e.htmlValue;
    setText(htmlValue);
    formik.setFieldValue("description", htmlValue);
  };
  return (
    <>
      <div className="card mx-5">
        <div className="max-w-lg mx-auto">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded px-5 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <span className="p-float-label">
                <AutoComplete
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                <label htmlFor="ac">Title</label>
              </span>
            </div>

            <div className="mb-4">
              <span className="p-float-label">
                <AutoComplete
                  type="text"
                  id="link"
                  name="link"
                  value={formik.values.link}
                  onChange={formik.handleChange}
                />
                <label htmlFor="ac">Link (URL)</label>
              </span>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <Editor
                type="text"
                id="description"
                name="description"
                value={text}
                onTextChange={handleEditorChange}
                style={{ height: "320px" }}
              />
            </div>
            

            {/* Repeat for other form fields */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
