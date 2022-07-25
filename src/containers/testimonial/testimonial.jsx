import React, { useState, useEffect, useCallback } from "react";

import { motion, useMotionValue, useTransform } from "framer-motion";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";

import { urlFor, client } from "../../client";

import "./testimonial.scss";

const Testimonial = ({ swipe, setSwipe }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  const background = useTransform(x, xInput, [
    "linear-gradient(180deg,#ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #fff 0%, rgb(255, 255, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);

  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);

  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  const onSwipeChange = useCallback(
    (x) => {
      setSwipe(x);
    },
    [setSwipe]
  );

  useEffect(
    () =>
      x.onChange((latest) => {
        if (latest > 45) {
          onSwipeChange(1);
        } else if (latest < -45) {
          onSwipeChange(-1);
        }
        if (swipe === 1 || swipe === -1) {
          scrollToBottom();
        }
      }),
    [onSwipeChange, swipe, x]
  );

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    client.fetch(query).then((data) => setTestimonials(data));
  }, []);

  const test = testimonials[currentIndex];

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(test.imgurl)} alt="testimonial" />
            <div className="app__testimonial-content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className="bold-text">{test.name}</h4>
                <h5 className="p-text">{test.company}</h5>
              </div>
            </div>
          </div>
          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex - 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
      <div className="app__testimonial-question app__flex">
        <h4 className="head-text">
          Did you like <span>my Profile?</span>
          <br />
          Swipe right <span>if you did</span>
          <br />
          Swipe left...<span>you know the drill</span>
        </h4>
      </div>
      <div className="app__testimonial-swipe app__flex">
        <motion.div className="example-container" style={{ background }}>
          <motion.div
            className="box"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
          >
            <svg className="progress-icon" viewBox="0 0 50 50">
              <motion.path
                fill="none"
                strokeWidth="2"
                stroke={color}
                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                style={{ translateX: 5, translateY: 5 }}
              />
              <motion.path
                fill="none"
                strokeWidth="2"
                stroke={color}
                d="M14,26 L 22,33 L 35,16"
                strokeDasharray="0 1"
                style={{ pathLength: tickPath }}
              />
              <motion.path
                fill="none"
                strokeWidth="2"
                stroke={color}
                d="M17,17 L33,33"
                strokeDasharray="0 1"
                style={{ pathLength: crossPathA }}
              />
              <motion.path
                fill="none"
                strokeWidth="2"
                stroke={color}
                d="M33,17 L17,33"
                strokeDasharray="0 1"
                style={{ pathLength: crossPathB }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap({
  idName: "testimonials",
  classNames: "app__primarybg",
})(MotionWrap({ classNames: "app__testimonial" })(Testimonial));
