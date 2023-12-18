import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../Context/userContext";

export default function Login() {
  let { setUserToken } = useContext(UserContext);

  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function sub(values) {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });

    if (data.message === "success") {
      setLoading(false);
      localStorage.setItem("token", data.token);
      setUserToken(data.token);
      navigate("/Home");
    }
    console.log(data);
  }

  let valid = Yup.object({
    email: Yup.string().email("email is notvalid").required("email is requried"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "password is invalid")
      .required("password is requried"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sub,
    validationSchema: valid,
  });

  return (
    <>
      <div className={style.conatiner + ' spac'}>
        <form className={style.conatiner} onSubmit={formik.handleSubmit}>
          <div className="form-group my-4">
            <label className="h2"> Login Now :</label>
          </div>
          {error ? (
            <div className="alert alert-danger mt-2 p-3">{error}</div>
          ) : (
            ""
          )}
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input value={formik.values.email} onChange={formik.handleChange} type="email" className="form-control"
              id="email" name="email"/>
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger mt-2 p-3">
                {formik.errors.email}
              </div>) : ("")}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password :</label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger mt-2 p-3">
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-md-6">
              {loading ? (
                <div className="d-flex justify-content-center">
                  {" "}
                  <button className="btn m-auto" type="button">
                    <ThreeDots
                      height="50"
                      width="80"
                      radius="9"
                      color="#4fa94d"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </button>{" "}
                </div>
              ) : (
                <button
                  disabled={!formik.isValid && formik.dirty}
                  type="submit"
                  className="btn btn-primary my-4 w-100"
                >
                  Submit
                </button>
              )}
            </div>
            <div className="col-md-6">
              <Link to={"/ForgorPassword"} className="btn btn-link dic my-4 ">
                Forgot password
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
