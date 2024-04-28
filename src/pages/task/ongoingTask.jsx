import React, { useEffect, useState } from "react";
import { Timeline } from "primereact/timeline";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function OnGoingTask() {
  const [taskDetails, setTaskDetails] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [user, setUser] = useState(null);
  const [evaluateDetail, setEvaluateDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const { taskId } = router.query;
      setTaskId(taskId);
      onAuthStateChanged(getAuth(), (userInfo) => {
        if (userInfo) {
          setUser(userInfo);
          getevaluation(userInfo);
          gettaskwithid();
          setLoading(false);
        }
      });
      const getevaluation = async (userInfo) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BE_URI}/api/v1/user/getevaluation`,
            {
              email: userInfo?.email,
              taskId: taskId,
            }
          );
          setEvaluateDetail(response.data[0]);
        } catch (error) {
          toast.error("Something went wrong Check Logs");
          console.log(error);
        }
      };
      const gettaskwithid = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BE_URI}/api/v1/task/gettaskwithid/${taskId}`
          );
          setTaskDetails(response.data);
        } catch (error) {
          toast.error("Something went wrong Check Logs");
          console.log(error);
        }
      };
    }
    evaluateDetail != {} && taskDetails != [] && user != null
      ? setLoading(false)
      : null;
  }, [router.isReady]);
  const events = [
    {
      status: "On Going",
      date: evaluateDetail?.date,
      icon: `pi pi-circle`,
      color: `${evaluateDetail.status?.ongoing ? "green" : "grey"}`,
    },
    {
      status: "Under Evaluation",
      //   date: "15/10/2020 14:00",
      icon: `pi pi-circle`,
      color: `${evaluateDetail.status?.underEvaluation ? "green" : "grey"}`,
    },
    {
      status: "Evaluation Done",
      //   date: "15/10/2020 16:15",
      icon: `pi pi-circle`,
      color: `${evaluateDetail.status?.evaluationDone ? "green" : "grey"}`,
    },
    {
      status: "Payment Initiated",
      //   date: "16/10/2020 10:00",
      icon: `pi pi-circle`,
      color: `${evaluateDetail.status?.paymentInitiated ? "green" : "grey"}`,
    },
  ];
  const customizedMarker = (item) => {
    return (
      <span
        className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle rounded-full p-1 z-1 shadow-1"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };

  const initialValues = {
    answer: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    answer: Yup.string().required("Description is required"),
    // image: Yup.mixed().required("Image is required"),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BE_URI}/api/v1/user/createsubmission`, {
        promoterEmail: taskDetails[0]?.email,
        userEmail: user?.email,
        taskId: evaluateDetail.taskId,
        answer: values.answer,
      })
      .then((response) => {
        toast.success("Submitted Successfully");
        formik.resetForm()
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Something went wrong Check Logs");
        console.log(error);
        setLoading(false);
      });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div>
      {loading ? (
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
      ) : (
        <div>
          <div className="text-xl font-semibold mx-5 underline">
            Task ID: {evaluateDetail.taskId}
          </div>
          <div className="text-xl font-semibold mx-5">
            Task: {evaluateDetail.title}
          </div>
          <div className="text-xl font-semibold mx-5">
            Max Time to Complete the task:{" "}
            <span className="underline">{evaluateDetail.maxTimeSpan}</span>
          </div>
          <Timeline
            className="mx-4"
            align="horizontal"
            value={events}
            content={(item) => item.status}
            // opposite={(item) => item.status}
            // content={(item) => (
            //   <small className="text-color-secondary">{item.date}</small>
            // )}
            marker={customizedMarker}
          />
          {/* TASK DETAILS */}
          <div>
            <div>
              <h1 className="text-xl font-semibold mb-6"></h1>
            </div>
            <div className="my-4 mx-2 bg-yellow-100 p-2 rounded-xl border-2 border-yellow-500">
              <strong>Necessary Conditions:</strong>
              <p>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: taskDetails[0]?.conditions,
                  }}
                ></div>
              </p>
            </div>
          </div>

          {/* TASK SUBMISSION FORM HERE */}
          <div>
            <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-md shadow-md">
              <h1 className="text-3xl font-semibold mb-6 text-center">
                Task Submission
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="answer"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Details to verify
                  </label>
                  <textarea
                    id="answer"
                    name="answer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.answer}
                    className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.touched.answer && formik.errors.answer && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.answer}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.touched.image && formik.errors.image && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.image}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
