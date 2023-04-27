import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import Intro1 from "@components/Landing/Intro1";
import Intro2 from "@components/Landing/Intro2";
import Intro3 from "@components/Landing/Intro3";
import Intro4 from "@components/Landing/Intro4";

export default function IntroPage() {
  const [scrollIdx, setScrollIdx] = useState<number>(1);
  const mainWrapperRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

  const wheelHandler = useCallback((e:any):any => {
    e.preventDefault();

    const deltaY: number = e.deltaY;
    const scrollTop: number = mainWrapperRef.current.scrollTop;
    const pageHeight: number = mainWrapperRef.current.getBoundingClientRect().height;
    const scrollToTop: number = Math.ceil(pageHeight);

    if (deltaY > 0) {
      if (0 <= scrollTop + 0.1 && scrollTop + 0.1 < pageHeight) {
        mainWrapperRef.current.scrollTo({
          top: scrollToTop,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(2);
      }
      else if (pageHeight <= scrollTop + 0.1  && scrollTop + 0.1 < pageHeight * 2) {
        console.log(scrollIdx);
        mainWrapperRef.current.scrollTo({
          top: scrollToTop * 2,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(3);
      }
      else if (pageHeight * 2 <= scrollTop + 0.1 && scrollTop + 0.1 < pageHeight * 3) {
        console.log(scrollIdx);
        mainWrapperRef.current.scrollTo({
          top: scrollToTop * 3,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(4);
      }
    }
    else if (deltaY < 0) {
      if ( pageHeight <= scrollTop + 0.1 && scrollTop + 0.1 < pageHeight * 2) {
        mainWrapperRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(1);
      }
      else if (pageHeight * 2 <= scrollTop + 0.1 && scrollTop + 0.1 < pageHeight * 3) {
        mainWrapperRef.current.scrollTo({
          top: scrollToTop,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(2);
      } 
      else if (pageHeight * 3 <= scrollTop + 0.1  && scrollTop + 0.1 < pageHeight * 4) {
        mainWrapperRef.current.scrollTo({
          top: scrollToTop * 2,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(3);
      }
      else if (pageHeight * 4 <= scrollTop + 0.1  && scrollTop + 0.1 < pageHeight * 5) {
        mainWrapperRef.current.scrollTo({
          top: scrollToTop * 3,
          left: 0,
          behavior: "smooth",
        });
        setScrollIdx(4);
      }
    }
  }, [scrollIdx]);

  useEffect(() => {
    const wrapperRefCurrent = mainWrapperRef.current;
    wrapperRefCurrent.addEventListener("wheel", wheelHandler);
    return () => wrapperRefCurrent.removeEventListener("wheel", wheelHandler);
  }, [wheelHandler]);

  return (
    <>
    <Header/>
    <Container ref={mainWrapperRef}>
      <Intro1/>
      <Intro2/>
      <Intro3/>
      <Intro4/>
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
