import React from "react";
import styled from "styled-components";
import Onboarding1 from "./Onboarding1";
import imges from "./images/1.svg"
import imges2 from "./images/2.svg"
import imges3 from "./images/3.svg"

const OnboardingHome = () => {
  return (
    <Container>
      <Onboarding1
        headDis
        title="PMS is a mangement webApp for companies and teams to work and
            collaborate"
        text="Note that the development build is not optimized. To create a
            production build, use npm run build. Note that the development build
            is not optimized. To create a production build, use npm run build.
            Note that the development build is not optimized. To create a
            production build, use npm run build. Note that the development build"
        ButtonText="Continue"
        image={imges}
        opacity1
      />
    
      <Onboarding1
        title="PMS is a mangement webApp for companies and teams to work and
            collaborate"
        text="Note that the development build is not optimized. To create a
            production build, use npm run build. Note that the development build
            is not optimized. To create a production build, use npm run build.
            Note that the development build is not optimized. To create a
            production build, use npm run build. Note that the development build"
        ButtonText="Continue"
        image={imges2}
        opacity2
      />
      <Onboarding1
        title="PMS is a mangement webApp for companies and teams to work and
            collaborate"
        text="Note that the development build is not optimized. To create a
            production build, use npm run build. Note that the development build
            is not optimized. To create a production build, use npm run build.
            Note that the development build is not optimized. To create a
            production build, use npm run build. Note that the development build"
        ButtonText="Get started"
        image={imges3}
        bt
        opacity3
      />
    </Container>
  );
};

export default OnboardingHome;

const Container = styled.div``;
