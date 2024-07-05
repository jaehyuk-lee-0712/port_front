import React from "react";

const Default = () => {
  return (
    <>
      {/* first div strat */}
      <div className="hide__overlay"></div>
      {/* first div end */}

      {/* second div start */}
      <div className="btn__revisit__wrapper">
        <button className="config__btn">
          <img
            src="https://sedeblockchain.com/wp-content/plugins/cookie-law-info/lite/frontend/images/revisit.svg"
            alt="config"
          />
        </button>
      </div>
      {/* second div end */}

      {/* cookie agree box start */}
      <div className="accept__container cursor-none">
        <div className="accept__inner cursor-none">
          <div className="accept__area cursor-none">
            <p className="notice__header cursor-none">NOTICE OF COOKIES</p>
            <div className="notice__body__wrap cursor-none">
              <div className="notice__texts cursor-none">
                <p className="cursor-none">
                  WE USE OUR OWN AND THIRD PARTY COOKIES TO OBTAIN STATISTICAL
                  DATA OF THE NAVIGATION OF OUR USERS AND IMPROVE OUR SERVICES.
                  IF YOU CLICK "ACCEPT" OR CONTINUE BROWSING WE CONSIDER THAT
                  YOU ACCEPT ITS USE. SEE&nbsp;
                  <a href="/" className="cursor-none">
                    COOKIES POLICY
                  </a>
                </p>
              </div>
              <div className="accept__btns cursor-none">
                <button className="accept__config__btn">CONFIGURE</button>
                <button className="accept__btn">ACCEPT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* cookie agree box end */}

      {/* hidden__wrapper start */}
      <div className="page__fader"></div>
      {/* hidden__wrapp__end */}
    </>
  );
};

export default Default;
