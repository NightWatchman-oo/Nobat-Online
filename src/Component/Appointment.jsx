import "../Style/Appointment.css";
import { useAllState } from "../Provider";
import { useState, useEffect } from "react";
import CommentsBlock from "simple-react-comments";
import commentsData from "../commentsData";
import MultiStep from "./MultiStep";
import data from "../All-Data/data";
import { DynamicStar } from "react-dynamic-star";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faArrowLeft,
  faArrowLeftLong,
  faLocationDot,
  faMoneyBills,
  faMoneyCheck,
  faMoneyCheckDollar,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Appointment() {
  const { allDoctors } = useAllState(data);
  const { currentAppoin } = useAllState();
  const { selectedTime } = useAllState("");
  const { setSelectedTime } = useAllState();
  const { currentUser } = useAllState();
  const { updateAppoinList } = useAllState();
  console.log(selectedTime);
  const [scroll, setScroll] = useState(false);
  const [pay, setPay] = useState(false);

  useEffect(() => {
    if (scroll) {
      let scrollDiv = document.getElementById("detailOfAppoint").offsetTop;
      window.scrollTo({ top: scrollDiv - 300, behavior: "smooth" });
    }

    if (pay) {
      const H = updateAppoinList.filter(
        (item) => item.username === currentUser.userNameOfUser
      )[0].allApointments.reserved;
      const docId = allDoctors.filter((item) => item.id === currentAppoin)[0]
        .id;
        console.log(docId);
      H.push({ cancel: false, date: selectedTime, id: docId });
      console.log(docId);
    }
  });
  const makeDate = (s) => {
    let n = String(s);
    let arr = [n.slice(0, 4), n.slice(4, 6), n.slice(6, 8)];
    return `${arr[0]}/${arr[1]}/${arr[2]}`;
  };
  console.log(currentAppoin);
  const currentDocTimes = allDoctors
    .filter((item) => item.id === currentAppoin)
    .map((item) => item.date);

  const UpdateTable = () => {
    setScroll(false);
    let values = Object.values(currentDocTimes[0]);
    let keys = Object.keys(currentDocTimes[0]);

    return (
      <>
        <div className="d-flex justify-content-center flex-column align-items-center mb-3">
          <h5 className="text-center py-2 px-3 text-white bg-primary chooseAppoin">
            لطفا از بین ساعت های فعال یکی را انتخاب نمایید
          </h5>
          <FontAwesomeIcon
            className="arrowDown my-3 text-success"
            icon={faArrowCircleDown}
          />
        </div>
        {keys.map((key, index) => {
          return (
            <table dir="rtl">
              <tr>
                <th className="text-center bg-info p-2" key={index}>
                  {makeDate(key)}
                </th>
                {values[index].map((value) => {
                  return (
                    <td>
                      <button
                        disabled={false}
                        className={`table-btn ${
                          selectedTime === key + value ? "bg-warning" : ""
                        }`}
                        value={key + value}
                        id={key + value}
                        onClick={(e) => setSelectedTime(e.target.value)}
                      >
                        {String(value)
                          .match(/[a-zA-Z]+|[0-9]+/g)
                          .join(" ")
                          .replace("AM", "صبح")
                          .replace("PM", "بعدازظهر")}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </table>
          );
        })}
      </>
    );
  };
  const DetailOfAppointment = () => {
    setScroll(true);
    const doctorName = allDoctors
      .filter((item) => item.id === currentAppoin)
      .map((item) => item.fname + " " + item.lname);
    const a = String(selectedTime).slice(0, 8);
    const b = [a.slice(0, 4), a.slice(4, 6), a.slice(6, 8)];
    const date = b[0] + "/" + b[1] + "/" + b[2];
    const time = String(selectedTime)
      .slice(8)
      .match(/[a-zA-Z]+|[0-9]+/g)
      .join(" ")
      .replace("AM", "صبح")
      .replace("PM", "بعدازظهر");
    return (
      <>
        <div className="container p-5 detailOfAppointment" id="detailOfAppoint">
          <div className="row text-center">
            <div>
              نوبت شما برای دکتر{" "}
              <span>
                <b>{doctorName}</b>
              </span>{" "}
              در تاریخ{" "}
              <span>
                <b>{date}</b>
              </span>{" "}
              و ساعت{" "}
              <span>
                <b>{time}</b>
              </span>{" "}
              ثبت خواهد شد
            </div>
          </div>
          <div className="row text-center mt-4">
            <div>
              حداقل{" "}
              <span>
                <b> 15 دقیقه </b>
              </span>{" "}
              قبل از ساعت فوق در مطب حضور داشته باشید{" "}
            </div>
          </div>
        </div>
      </>
    );
  };

  const Checkout = () => {
    setScroll(false);
    const visit = allDoctors
      .filter((item) => item.id === currentAppoin)
      .map((item) => item.visit);
    const credit = updateAppoinList
      .filter((item) => item.username === currentUser.userNameOfUser)
      .map((i) => i.credit);
    const payment = () => {
      setPay(true);
    };
    return (
      <>
        <div className="container checkout">
          <div className="row d-flex align-items-center justify-content-between text-center my-3">
            <FontAwesomeIcon
              className="checkoutIcon1"
              icon={faMoneyBills}
            ></FontAwesomeIcon>

            <h4 className="p-0 pb-2 checkoutTitle">پرداخت ویزیت</h4>
          </div>
          <div className="row d-flex justify-content-end mb-3">
            <div className="checkoutItem ps-4 d-flex align-items-center">
              تومان
              <span>
                <b className="mx-1">{credit}</b>
              </span>{" "}
              : موجودی حساب شما{" "}
              <FontAwesomeIcon
                className="checkoutIcon3 ms-2"
                icon={faMoneyCheckDollar}
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className="row d-flex justify-content-end">
            <div className="checkoutItem ps-4 d-flex align-items-center">
              تومان
              <span>
                <b className="mx-1">{visit}</b>
              </span>{" "}
              : مبلغ ویزیت{" "}
              <FontAwesomeIcon
                className="checkoutIcon2 ms-2"
                icon={faArrowLeftLong}
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className="row justify-content-center">
            <span
              className={`${
                Number(visit) < Number(credit) ? "d-none" : ""
              } text-center text-danger mt-3`}
            >
              <b>!اعتبار حساب شما کافی نیست</b>
            </span>
            <div className="col-4">
              <button
                className={`${
                  Number(visit) >= Number(credit) ? "d-none" : ""
                } btn btn-primary text-white w-100 border-0 rounded py-2 my-4`}
                onClick={payment}
              >
                پرداخت
              </button>
              <button
                className={`${
                  Number(visit) < Number(credit) ? "d-none" : ""
                } bg-primary text-white w-100 border-0 rounded py-2 my-4`}
              >
                افزایش اعتبار
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Result = () => {
    return (
      <>
        <div className="container resultOfCheckout p-4">
          <div className="row">
            <div className={`${pay ? "" : "d-none"} text-center mb-3`}>
              پرداخت شما با موفقیت انجام شد
            </div>
            <div className={`${!pay ? "" : "d-none"} text-center mb-3`}>
              پرداخت ناموفق بود
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div
              className={`${
                pay ? "" : "d-none"
              } bg-success text-white text-center py-2 px-3 mb-4 successPay`}
            >
              نوبت شما با موفقیت رزرو شد
              {/* <FontAwesomeIcon icon={faTicket}></FontAwesomeIcon> */}
            </div>
          </div>
          <div
            className={`${
              pay ? "" : "d-none"
            } row d-flex justify-content-center`}
          >
            <Link
              to={"/userprofile"}
              className="bg-info text-dark py-2 px-3 text-center goToLoginFromPay"
            >
              ورود به حساب کاربری
            </Link>
          </div>
        </div>
      </>
    );
  };

  const steps = [
    { name: "StepOne", component: <UpdateTable /> },
    { name: "StepTwo", component: <DetailOfAppointment /> },
    { name: "StepThree", component: <Checkout /> },
    { name: "StepFour", component: <Result /> },
  ];

  return (
    <>
      <div>
        <div className="m-3 text-center text-md-start backToResult">
          <Link to={"/result"} className="">
            <FontAwesomeIcon className="me-1" icon={faArrowLeft} />
            بازگشت به نتایج جستجو
          </Link>
        </div>
        <div className="appoinContent">
          <div className="container">
            {allDoctors
              .filter((item) => item.id === currentAppoin)
              .map((item) => (
                <div className="shadow-lg bg-white appoinBox">
                  <div className="cover-bg p-3 p-lg-4 pb-lg-3">
                    <div className="row">
                      <div className="col-lg-4 col-md-5 d-flex flex-column align-items-center">
                        <div>
                          {" "}
                          <DynamicStar
                            className="justify-content-center"
                            width={20}
                            height={20}
                            emptyStarColor={"gray"}
                            rating={item.rate}
                          />
                        </div>
                        <div className="docImg hover-effect bg-white shadow-sm p-1">
                          <img
                            src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${item.imgUrl}`}
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-8 col-md-7 text-center text-md-end"
                        id="docInfo"
                      >
                        <h2 className="h1 mt-2 text-white">
                          دکتر {item.fname} {item.lname}
                        </h2>
                        <p className="h4 my-3 text-warning">
                          متخصص {item.expert}
                        </p>
                        <h5 className="text-light">
                          از دانشگاه {item.university}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="row p-4">
                    <div className="col px-4 moreInfoDoc">
                      <div className="text-md-end text-center mb-3 d-flex align-items-center justify-content-center justify-content-md-end">
                        {`تومان`}{" "}
                        <b className="mx-1">
                          <span className="h5"> {item.visit} </span>
                          {" : "}
                          {` ویزیت`}
                        </b>{" "}
                        <FontAwesomeIcon className="ms-1" icon={faMoneyCheck} />
                      </div>
                      <div className="text-md-end text-center mb-3">
                        <b>
                          {` تلفن مطب`}
                          {" : "}
                        </b>{" "}
                        {item.phone}
                        <FontAwesomeIcon className="ms-1" icon={faPhone} />
                      </div>
                      <div className="text-md-end text-center mb-3">
                        <b>
                          {` نشانی`}
                          {" : "}
                        </b>{" "}
                        {item.address2}
                        <FontAwesomeIcon
                          className="ms-1"
                          icon={faLocationDot}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="getAppoin-section d-flex justify-content-center px-3 px-lg-4">
                    <div className="row">
                      <MultiStep
                        activeStep={0}
                        showNavigation={true}
                        steps={steps}
                      />
                    </div>
                  </div>

                  <hr className="mt-5" />
                  <div className="work-experience-section px-3 px-lg-4">
                    <h2 className="h3 mb-4 text-end">نظرات کاربران</h2>
                    {/* <CommentsBlock
                  // comments={commentsData}
                  // signinUrl={"/signin"}
                  isLoggedIn
                  reactRouter // set to true if you are using react-router
                  // onSubmit={(text) => {
                  //   if (text.length > 0) {
                  //     this.setState({
                  //       comments: [
                  //         ...commentsData,
                  //         {
                  //           authorUrl: "#",
                  //           avatarUrl: "#avatarUrl",
                  //           createdAt: new Date(),
                  //           fullName: "Name",
                  //           text,
                  //         },
                  //       ],
                  //     });
                  //     console.log("submit:", text);
                  //   }
                  // }}
                /> */}
                    <div className="comments">
                      {item.comments.map((i) => (
                        <div className="comments-card comments-card-primary card shadow-sm">
                          <div className="comments-body">
                            <div className="h5 mb-2">{i.name}</div>
                            <div className="text-muted text-small mb-2">
                              {i.date}
                            </div>
                            <div>{i.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className="" />
                  <div
                    className="contant-section px-3 px-lg-4 pb-4"
                    id="contact"
                  >
                    <h2 className="h3 text-end mb-3">نظرات</h2>
                    <h6 className="text-end mb-3">
                      لطفا نظر خود را ثبت نمایید
                    </h6>
                    <div className="row">
                      <div className="col-md-7 ">
                        <div className="my-2">
                          <form
                            action="https://formspree.io/your@email.com"
                            method="POST"
                          >
                            <div className="row">
                              <div className="col-6">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="name"
                                  name="name"
                                  placeholder="Your Name"
                                  required
                                />
                              </div>
                              <div className="col-6">
                                <input
                                  className="form-control"
                                  type="email"
                                  id="email"
                                  name="_replyto"
                                  placeholder="Your E-mail"
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group my-2">
                              <textarea
                                className="form-control"
                                style={{ resize: "none" }}
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Your Message"
                                required
                              ></textarea>
                            </div>
                            <button
                              className="btn btn-primary mt-2"
                              type="submit"
                            >
                              Send
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}