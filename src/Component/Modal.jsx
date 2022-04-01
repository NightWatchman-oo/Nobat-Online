import React from "react";
import "../Style/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Modal(props) {
  return (
    <>
      <div className="container ">
        <div
          className={`${props.showHideClassName}`}
          onClick={() => props.hideModal()}
        >
          <section
            id="modalSection"
            className="container p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row text-center">
              <h4 className="">
                <FontAwesomeIcon
                  className="mx-2"
                  icon={faArrowAltCircleRight}
                />
                مقررات سایت نوبت آنلاین
                <FontAwesomeIcon className="mx-2" icon={faArrowAltCircleLeft} />
              </h4>
              <span className="text-info">
                {!props.flag ? "مخصوص پزشکان" : "مخصوص بیماران"}
              </span>
            </div>
            <div className="row">
              <ul dir="rtl" className="p-4">
                <li>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.{" "}
                </li>
                <li>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.{" "}
                </li>
                <li>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.{" "}
                </li>
                <li>
                  کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                  جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                  برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                  زبان فارسی ایجاد کرد.
                </li>
                <li>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.{" "}
                </li>
                <li>
                  کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                  جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                  برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                  زبان فارسی ایجاد کرد.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
