import React, { useEffect, useRef } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger); // GSAP에 ScrollTrigger 플러그인을 등록

const Home = () => {
  const contextDesc = useRef(null); // contextDesc 요소에 대한 참조 생성
  const moveBoxTop = useRef(null); // moveBoxTop 요소에 대한 참조 생성
  const moveBoxBottom = useRef(null); // moveBoxBottom 요소에 대한 참조 생성
  const moveBoxBottomWrap = useRef(null);
  const homeSection = useRef(null);

  useEffect(() => {
    // Lenis 초기화
    const lenis = new Lenis({
      duration: 1.5, // 스크롤 애니메이션 지속 시간
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 스크롤을 위한 이징 함수
      smoothWheel: true,
      smoothTouch: false,
    });

    // requestAnimationFrame을 사용하여 Lenis의 애니메이션 프레임을 갱신
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ScrollTrigger에 Lenis를 프록시로 사용하여 스크롤 제어
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.targetScroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", ScrollTrigger.update); // Lenis 스크롤 이벤트 발생 시 ScrollTrigger 업데이트

    ScrollTrigger.defaults({
      scroller: document.body, // ScrollTrigger의 기본 스크롤러를 body로 설정
    });

    // contextDesc 요소에 대한 애니메이션 타임라인 생성
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contextDesc.current,
        start: "top 10%", // 스크롤이 화면 상단에서 10% 내려왔을 때 애니메이션 시작
        end: "top 50%", // 스크롤이 화면 상단에서 50% 내려왔을 때 애니메이션 종료
        scrub: true, // 스크롤과 애니메이션의 싱크를 맞춤
        // markers: true,
        onUpdate: (self) => {
          // ScrollTrigger 업데이트 시 호출되는 함수
          if (self.progress > 0.5) {
            gsap.to(contextDesc.current, { opacity: 0 }); // 스크롤 진행률이 50%를 넘으면 투명도 0으로 설정
          } else {
            gsap.to(contextDesc.current, { opacity: 1 }); // 스크롤 진행률이 50% 미만이면 투명도 1로 설정
          }
        },
      },
    });

    tl.fromTo(
      contextDesc.current,
      { opacity: 1 },
      {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      }
    );

    // // // moveBoxTop 요소에 대한 애니메이션 설정
    // gsap.fromTo(
    //   moveBoxTop.current,
    //   { x: "-1000%" },
    //   {
    //     ease: "sine.inOut",
    //     scrollTrigger: {
    //       trigger: moveBoxTop.current,
    //       start: "top center", // 요소가 화면 중앙에 도달할 때 애니메이션 시작
    //       end: "bottom+=2000px", // 스크롤이 요소의 끝 부분에 2000px를 더할 때 애니메이션 종료
    //       scrub: true,
    //       // markers: true,
    //       onUpdate: (self) => {
    //         // 스크롤 진행 상황에 따라 x 위치 업데이트
    //         const newX = -1000 + 1000 * self.progress;
    //         console.log(self.progress);
    //         gsap.to(moveBoxTop.current, {
    //           x: newX + "px",
    //           duration: 1.7,
    //           overwrite: "auto",
    //         });
    //       },
    //     },
    //   }
    // );

    // // moveBoxBottom 요소에 대한 애니메이션 설정
    // gsap.fromTo(
    //   moveBoxBottom.current,
    //   { x: "2000px" },
    //   {
    //     scrollTrigger: {
    //       trigger: moveBoxBottom.current,
    //       // duration: 5,
    //       start: "top center", // 요소가 화면 중앙에 도달할 때 애니메이션 시작
    //       end: "bottom+=2000px",
    //       scrub: true,
    //       // markers: true,
    //       onUpdate: (self) => {
    //         const newX = 1000 - 1000 * self.progress;
    //         gsap.to(moveBoxBottom.current, {
    //           x: newX + "px",
    //           duration: 1.7,
    //           overwrite: "auto",
    //         });
    //       },
    //     },
    //   }
    // );

    // gsap.timeline을 사용하여 애니메이션 설정
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: moveBoxTop.current,
        start: "top center", // 요소가 화면 중앙에 도달할 때 애니메이션 시작
        end: "bottom+=2000px", // 스크롤이 요소의 끝 부분에 2000px를 더할 때 애니메이션 종료
        scrub: true,
        // markers: true,
        onUpdate: (self) => {
          // 스크롤 진행 상황에 따라 x 위치 업데이트
          const progress = self.progress;
          const newXTop = -1000 + 1000 * progress;
          const newXBottom = 1000 - 1000 * progress;

          tl.clear(); // 이전 타임라인 애니메이션을 지우기
          tl.to(
            moveBoxTop.current,
            {
              x: newXTop + "px",
              duration: 0.1, // 더 짧은 duration을 사용하여 매끄러운 업데이트
              ease: "none",
              overwrite: "auto",
            },
            0
          ); // 동시에 실행되도록 시작 시간 설정
          tl.to(
            moveBoxBottom.current,
            {
              x: newXBottom + "px",
              duration: 0.1, // 더 짧은 duration을 사용하여 매끄러운 업데이트
              ease: "none",
              overwrite: "auto",
            },
            0
          ); // 동시에 실행되도록 시작 시간 설정
        },
      },
    });

  // moveBoxTop 애니메이션
// moveBoxTop 요소에 대한 애니메이션 설정
gsap.fromTo(
  moveBoxTop.current,
  { x: "-1000%" },
  {
    ease: "sine.inOut",
    scrollTrigger: {
      trigger: moveBoxTop.current,
      start: "top center", // 요소가 화면 중앙에 도달할 때 애니메이션 시작
      end: "bottom+=2000px", // 스크롤이 요소의 끝 부분에 2000px를 더할 때 애니메이션 종료
      scrub: true,
      // markers: true,
      onUpdate: (self) => {
        // 스크롤 진행 상황에 따라 x 위치 업데이트
        const newX = -1000 + 1000 * self.progress;
        console.log(self.progress);
        gsap.to(moveBoxTop.current, {
          x: newX + "px",
          duration: 0.1, // 더 짧은 duration을 사용하여 매끄러운 업데이트
          overwrite: "auto",
        });
      },
    },
  }
);

// moveBoxBottom 요소에 대한 애니메이션 설정
gsap.fromTo(
  moveBoxBottom.current,
  { x: "2000px" },
  {
    scrollTrigger: {
      trigger: moveBoxBottom.current,
      start: "top center", // 요소가 화면 중앙에 도달할 때 애니메이션 시작
      end: "bottom+=2000px", // 스크롤이 요소의 끝 부분에 2000px를 더할 때 애니메이션 종료
      scrub: true,
      // markers: true,
      onUpdate: (self) => {
        const newX = 1000 - 1000 * self.progress;
        gsap.to(moveBoxBottom.current, {
          x: newX + "px",
          duration: 0.1, // 더 짧은 duration을 사용하여 매끄러운 업데이트
          overwrite: "auto",
        });
      },
    },
  }
);
// homeSection 스크롤 트리거 애니메이션
gsap.to(homeSection.current, {
  scrollTrigger: {
    trigger: homeSection.current,
    start: "top+=5000px", // 스크롤 트리거 시작 위치
    end: "bottom+=6000px", // 스크롤 트리거 종료 위치
    scrub: true, // 스크롤과 애니메이션 동기화
    markers: true, // 디버깅용 마커 표시
    onUpdate: (self) => {
      // 스크롤 진행 상황에 따라 scale 값을 업데이트
      const newScale = 1 - 0.3 * self.progress;
      gsap.to(homeSection.current, {
        scale: newScale,
        duration: 2, // 짧은 duration을 사용하여 매끄러운 업데이트
        overwrite: "auto", // 이전 애니메이션을 덮어쓰기
      });

      const newMarginTop = 31.5 * (1 - self.progress);
      gsap.to(moveBoxBottomWrap.current, {
        marginTop: newMarginTop + "px",
        duration: 0.2,
      });
    },
  },
});


    // 컴포넌트 언마운트 시 Lenis 인스턴스 파괴
    return () => {
      // lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="smooth__wrapper cursor-none">
        <div className="smooth__content cursor-none">
          <main className="cursor-none">
            <div className="main__div">
              <div className="base__containner">
                <div className="base__content">
                  <div className="bgc__line">
                    <svg
                      className="line__svg"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1920 911"
                      preserveAspectRatio="none"
                      stroke="white"
                      fill="white"
                      strokeWidth={2}
                    >
                      <g>
                        <line
                          className="diagonal-1"
                          x1="0"
                          y1="0"
                          x2="1920"
                          y2="911"
                        ></line>
                        <line
                          className="diagonal-2"
                          x1="1920"
                          y1="0"
                          x2="0"
                          y2="911"
                        ></line>
                      </g>
                    </svg>
                  </div>
                  <section
                    className="home__section cursor-none"
                    ref={homeSection}
                    id="homeSection1"
                  >
                    <div className="border__inner"></div>
                    <div className="home__section__content">
                      <div className="content__home">
                        <div className="content__logo">
                          <div className="logo__wrap">
                            <svg
                              className="sbc-logo-svg"
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              viewBox="0 0 179.785 133.517"
                              fill="white"
                            >
                              <path
                                d="M84.113,106.165c-.131,2.455-1.052,9.076-10.391,9.076-7.19,0-11.749-3.946-11.749-10.611v-.614H66.05c.482,4.912,3.025,7.06,7.233,7.06,3.026,0,6.666-.789,6.666-4.647,0-8.594-16.836-3.245-16.836-14.293,0-5.174,3.9-8.2,9.732-8.2,6.008,0,9.953,3.2,10.261,9.163H79.028c-.657-3.683-2.719-5.042-6.051-5.042s-5.7,1.315-5.7,3.946c0,6.664,17.189,2.5,16.837,14.162"
                                transform="translate(-61.908 -83.936)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M108.012,97.289h11.662V115H100.253v-4.121h15.3v-9.47h-15.3V98.255l13.328-9.821H100.253V84.311h19.773v4.122Z"
                                transform="translate(-59.883 -83.916)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M159.536,94.788v9.777A10.129,10.129,0,0,1,149.5,115H137.22V84.353h11.838a10.441,10.441,0,0,1,10.478,10.435m-10.259-6.357h-7.936v22.448h7.717c3.989,0,6.357-2.455,6.357-6.313V94.788c0-3.815-2.236-6.357-6.138-6.357"
                                transform="translate(-57.927 -83.914)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M175.333,84.311h20.694v4.122H179.454v8.856h12.408v4.165H179.454v9.382h16.573V115H175.333Z"
                                transform="translate(-55.911 -83.916)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M84.137,154.977a8.581,8.581,0,0,1-8.681,8.505H62.785v-30.69H73.132a8.543,8.543,0,0,1,8.637,8.637c0,3.726-2.192,6.269-5.875,6.269H75.85v.352h.043c4.034,0,8.243,2.061,8.243,6.927m-6.445-13.46a4.566,4.566,0,0,0-4.56-4.6H66.95v9.207h6.182a4.538,4.538,0,0,0,4.56-4.6m2.543,13.241a4.548,4.548,0,0,0-4.6-4.6H66.95v9.163h8.769a4.548,4.548,0,0,0,4.516-4.56"
                                transform="translate(-61.865 -81.351)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M120.546,159.4v4.121H101.168V132.832h4.121V159.4Z"
                                transform="translate(-59.834 -81.349)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M157.417,163.523H138.345V132.832h19.072Zm-4.123-26.569H142.465v22.491h10.829Z"
                                transform="translate(-57.868 -81.349)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M196.567,143.1h-4.121c-.351-4.078-2.587-6.314-7.146-6.314-4.341,0-6.226,2.368-6.8,5.35v.043c-.219,1.36-.394,10.743.088,12.716.657,2.981,2.455,4.779,6.8,4.779,5.086,0,6.84-2.368,7.059-6.928h4.121a11.16,11.16,0,1,1-22.316-.306v-8.418c0-7.236,4.648-11.4,11.181-11.4,6.269,0,10.785,3.814,11.135,10.478"
                                transform="translate(-55.968 -81.36)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M222.113,145.9h10.7v17.626h-4.165v-13.5H216.588v13.5h-4.121V132.833h4.121v13.021h.176l11.575-13.021H233.6l-11.487,12.89Z"
                                transform="translate(-53.946 -81.349)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M84.227,191.575H80.106c-.351-4.077-2.587-6.313-7.147-6.313-4.34,0-6.226,2.368-6.8,5.349v.044c-.219,1.359-.395,10.742.087,12.715.658,2.981,2.455,4.779,6.8,4.779,5.086,0,6.84-2.368,7.059-6.928h4.121a11.16,11.16,0,1,1-22.316-.306V192.5c0-7.235,4.647-11.4,11.18-11.4,6.27,0,10.786,3.815,11.137,10.478"
                                transform="translate(-61.911 -78.796)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M120.96,181.346v30.647h-4.121V198.446H104.124v13.548H100V181.346h4.121v12.978h12.715V181.346Z"
                                transform="translate(-59.896 -78.783)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M160.5,211.994h-4.3l-2.368-8.856H142.218l-2.367,8.856h-4.3l8.2-30.647h8.55Zm-11.4-26.526h-2.148l-3.64,13.548H152.7Z"
                                transform="translate(-58.015 -78.783)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M194.471,207.875V212H176.144v-4.121h7.1V187.882h-.132c-1.753,2.455-6.445,2.367-6.971,2.367v-4.121c2.85,0,5.261-.482,6.446-4.822h4.778v26.569Z"
                                transform="translate(-55.868 -78.785)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M233.762,181.305V212h-8.155l-8.55-26.526H216V212h-4.121v-30.69h8.155l8.55,26.612h1.052V181.305Z"
                                transform="translate(-53.977 -78.785)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M222.669,92.077c-4.357,0-7.225,2.869-7.225,7.17s2.868,7.169,7.225,7.169a7.17,7.17,0,1,0,0-14.339m0,13.518a6.349,6.349,0,1,1,6.291-6.348,5.953,5.953,0,0,1-6.291,6.348"
                                transform="translate(-53.789 -83.505)"
                                fill="var(--color-font)"
                              ></path>
                              <path
                                d="M223.745,99.67a1.9,1.9,0,0,0,1.43-1.945c0-1.29-.868-2.038-2.389-2.038h-2.532v6.8h.868v-2.7h1.734l1.523,2.7h.983Zm-.983-.609h-1.64V96.413h1.64c1.077,0,1.57.421,1.57,1.312,0,.868-.493,1.336-1.57,1.336"
                                transform="translate(-53.534 -83.314)"
                                fill="var(--color-font)"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="content__desc" ref={contextDesc}>
                          <h5>Welcome</h5>
                          <p>
                            As ambassadors of Blockchain technology, we are at
                            the heart of the solutions it offers, being
                            different, secure and agile, adapting to your needs,
                            whatever they may be.
                          </p>
                        </div>
                        <div className="content__title">
                          <h1 className="content__title__wrap">
                            <div className="move__box__top">
                              <div className="move__box__line">
                                <span ref={moveBoxTop} id="moveBoxTop">
                                  In the c3nter Of the
                                </span>
                              </div>
                              <span className="move__box__door"></span>
                            </div>
                            <div
                              className="move__box__bottom"
                              ref={moveBoxBottomWrap}
                            >
                              <div className="move__box__line">
                                <span ref={moveBoxBottom} id="moveBoxBottom">
                                  Blockcha1n solutions
                                </span>
                              </div>
                              <span className="move__box__door"></span>
                            </div>
                          </h1>
                        </div>
                        <div className="content__btn__wrap">
                          <div className="content__btn__inner cursor-none">
                            <button className="content__btn">
                              <span className="btn__left__arrow">
                                <IoIosArrowRoundDown />
                              </span>
                              <span className="btn__text">scroll down</span>
                              <span className="btn__right__arrow">
                                <IoIosArrowRoundDown />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="home__section" id="homeSection2">
                      <div className="border__outer"></div>
                      <div className="border__inner"></div>
                      <div className="home__section__content">
                        <div className="content__home">
                            <div className="content__card__wrap">
                                <ul className="content__card__list">
                                  <li className="content__card">
                                    <a href="/" className="content__card__inner">
                                      <p className="text-sm">
                                      BLOCKCHAIN CONSULTING AND ADVISORY 
                                      <br />                                            
                                      A GAME CHANGER
                                      </p>
                                      <div className="card__icon__wrap">
                                        <div className="content__card__icon cursor-none">
                                            <svg version="1.1" id="Modo_de_aislamiento" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xmlSpace="preserve">
                                              <path fill="#191919" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" d="M42.3,142.1c0.1,1.1,0.3,2.2,0.5,3.3v0
                                                c5.8,41.3,51,69,90.7,55.1h0c12.4-4.8,21.8,9.5,33.2,11.1c28.4,2.4,62.9-59.4,31.5-74.8c-2.8-1.6-6-3.5-8.8-5.1
                                                c-3.9-2.5-7.5-5.7-8.6-10l0.1,0.4c-7.7-48.7-65.7-74.5-107.1-46.8l0.2-0.1c-19.6,12.4-32,34.8-32,58v0
                                                C41.7,135.4,42.2,142.2,42.3,142.1L42.3,142.1z M135.9,199.6c-0.3,0.1-0.7,0.2-1,0.4C135.2,199.9,135.6,199.8,135.9,199.6
                                                L135.9,199.6z M182.3,125.2c0,0-0.1-0.1-0.1-0.1C182.3,125.1,182.3,125.2,182.3,125.2z" strokeWidth={0.881057}></path>
                                              <ellipse transform="matrix(0.5024 -0.8646 0.8646 0.5024 -60.6977 244.6887)" fill="#191919" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" cx="182.2" cy="175.1" rx="40.9" ry="23.7"></ellipse>
                                              <path fill="#191919" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" d="M250.9,174.1l-43.9-25.5
                                                c-0.3-0.2-0.6-0.3-0.9-0.5c-2.1-1-4.4-1.3-6.8-1.1c-8,0.8-14.8,6-20.1,11.7c-8.6,9.7-14.8,22.5-14.5,35.7c0.2,3.6,1,7.4,2.9,10.4
                                                c1.1,1.7,2.5,3.1,4.3,4.2l43.9,25.5L250.9,174.1L250.9,174.1z" strokeWidth={0.881057}></path>
                                              <path fill="#191919" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" d="M258,208l0.1-17.5l0,0c0.3-8.4-3.6-17.8-13.2-18
                                                c-6.6-0.1-12.6,3.4-17.4,7.6c-10.9,9.6-19,24.8-18.8,39.5c0.1,1.4,0.2,2.8,0.4,4.1c1.4,8.2,7.4,13.8,15.9,12.3
                                                c3-0.5,5.8-1.7,8.5-3.2c5.1-2.9,10.2-5.9,15.3-8.8L258,208L258,208z" strokeWidth={0.881057}></path>
                                              <path fill="#191919" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" d="M215.2,161.9c12.3-6.9,22.6-3.5,26.2,7.2
                                                c-1.4-0.8-6.4-3.9-7.9-4.4c-1.8-0.7-3.8-0.9-5.8-0.8c-21.1,1.9-42.6,39-31.6,57.8c1.1,1.7,2.5,3.1,4.3,4.2l6.4,3.7
                                                c-11.7,2.7-20.1-5-19.9-19.8C187.1,192,199.8,170.6,215.2,161.9L215.2,161.9z" strokeWidth={0.881057}></path>
                                              <path fill="#191919" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" d="M178.1,206.8c-0.3-7.2,1.5-14.4,4.2-21.1
                                                c5.7-13.9,20.2-32.4,36.5-32.5c2,0,4.1,0.5,5.9,1.3c0.1,0,9.4,5.3,9.8,5.6c-5.6-3.2-12.5-1.9-17.9,0.9c-9.3,4.7-16.5,12.9-21.7,21.8
                                                c-5,8.7-8.4,18.6-8.1,28.7c0.2,6.3,2.4,13.3,8.1,16.7c-2.1-1.3-9.8-5.3-11.4-7.1C179.8,217.6,178.3,212,178.1,206.8L178.1,206.8z" strokeWidth={0.881057}></path>
                                              <ellipse transform="matrix(0.5024 -0.8646 0.8646 0.5024 -60.5547 321.1053)" fill="#191919" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" cx="248.7" cy="213.2" rx="13.2" ry="7.6"></ellipse>
                                            </svg>
                                        </div>
                                      </div>
                                      <h3 className="content__card__title">BLOCKCHAIN CONSULTANCY</h3>
                                      <div className="card__arrow__btn">
                                        <div className="card__arrow__wrapper">
                                          <svg class="sbc-svg-icon sbc-icon-arrow-right" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 34 12"  xmlSpace="preserve"
                                            strokeWidth={0.8}
                                            fill="#fff"
                                            stroke="#ffffff"
                                          >
                                            <g transform="translate(31.941) rotate(90)">
                                              <line class="sbc-svg-icon__path" x1="5.1" y1="4.6" x2="5.1" y2="30" fill="#ffffff"></line>
                                              <path class="sbc-svg-icon__path" d="M1.1,4.9l4-6l4,6H1.1z" fill="#ffff"></path>
                                            </g>
                                          </svg>
                                        </div>
                                      </div>
                                    </a>
                                  </li>
                                  
                                </ul>
                            </div>
                        </div>
                      </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
