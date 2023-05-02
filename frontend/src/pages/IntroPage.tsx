import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import Intro1 from "@components/Landing/Intro1";
import Intro2 from "@components/Landing/Intro2";
import Intro3 from "@components/Landing/Intro3";
import Intro4 from "@components/Landing/Intro4";
import Steps from "@components/Landing/Steps";

export default function IntroPage() {
  const [scrollIndex, setScrollIndex] = useState<number>(1); // 현재 내 위치
  const introScrollRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>; // 전체 페이지, 스크롤바를 조작

  // Header type 설정
  const [type, setType] = useState<string>("standard");
  useEffect(() => {
    if (scrollIndex === 1 || scrollIndex === 2 || scrollIndex === 3) {
      setType("intro");
    } else {
      setType("standard");
    }
  }, [scrollIndex]);

  const wheelHandler = useCallback(
    (e: WheelEvent): void => {
      e.preventDefault();

      const deltaY: number = e.deltaY;
      const scrollTop: number = introScrollRef.current.scrollTop; // 스크롤 위쪽 끝부분 위치
      const pageHeight: number =
        introScrollRef.current.getBoundingClientRect().height; // 화면 세로길이
      const scrollToTop: number = Math.ceil(pageHeight); // 맨 위로 스크롤

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          introScrollRef.current.scrollTo({
            top: scrollToTop,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          console.log(scrollIndex);
          introScrollRef.current.scrollTo({
            top: scrollToTop * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          console.log("현재 3페이지, down");
          console.log(scrollIndex);
          introScrollRef.current.scrollTo({
            top: scrollToTop * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(4);
        }
      } else if (deltaY < 0) {
        // 스크롤 올릴 때
        if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          introScrollRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          introScrollRef.current.scrollTo({
            top: scrollToTop,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
          // 현재 4페이지
          console.log("현재 4페이지, up");
          introScrollRef.current.scrollTo({
            top: scrollToTop * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        }
      }
    },
    [scrollIndex]
  );

  // 마우스 휠 이벤트
  useEffect(() => {
    const introScrollRefCurrent = introScrollRef.current;
    introScrollRefCurrent.addEventListener("wheel", wheelHandler);
    return () =>
      introScrollRefCurrent.removeEventListener("wheel", wheelHandler);
  }, [wheelHandler]);

  return (
    <>
      <Header type={type} />
      <Container ref={introScrollRef}>
        <Steps scrollIndex={scrollIndex} />
        <Intro1 />
        <Intro2 />
        <Intro3 />
        <Intro4 />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 93vh;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
