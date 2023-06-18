import { useState, useContext, useEffect } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import BackgroundContext from "../contexts/background";

const useWalkThrough = () => {
  const sliderCtx = useContext(BackgroundContext);
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([]);

  const handleStart = () => {
    console.log("handleStart");
    sliderCtx.setElements("sidebar");
    setRun(true);
    setSteps([
      {
        placement: "center",
        target: "body",
        content: <h2>Let&apos;s begin our journey!</h2>,
      },
      {
        content: "This is main editor window, here you can view your widget",
        placement: "left",
        spotlightPadding: 0,
        target: "#two",
        title: "Editor",
      },
      {
        content: "Here you can change your widget settings",
        placement: "right",
        spotlightPadding: 0,
        target: "#three",
        title: "Sidebar",
      },
      {
        placement: "center",
        target: "body",
        content: "Now we will look at the themes section",
      },
      {
        content: "You can edit primary color and font color here",
        placement: "right",
        spotlightPadding: 0,
        target: "#five",
        title: "Theme",
      },
      {
        content: "You can choose from a variety of pre build themes from here",
        placement: "right",
        spotlightPadding: 0,
        target: "#six",
        title: "Theme",
      },
      {
        placement: "center",
        target: "body",
        content:
          "Now we will look how to create a new theme, go to background section",
      },
      {
        content: "List of colors present in your theme",
        placement: "right",
        spotlightPadding: 0,
        target: "#eight",
        title: "Background",
      },
      {
        content: "You can add colors by clicking on this slider",
        placement: "top",
        spotlightPadding: 0,
        target: "#nine",
        title: "Background",
      },
      {
        content:
          "Here you can edit the color of selected stop, and angle of gradient",
        placement: "right",
        spotlightPadding: 0,
        target: "#ten",
        title: "Background",
      },
      {
        content:
          "Click 'close' to exit editor without saving, Or click 'save' to save your widget",
        placement: "bottom",
        spotlightPadding: 0,
        target: "#eleven",
        title: "Background",
      },
      {
        content: "Click 'copy' to copy the widget code",
        placement: "bottom",
        spotlightPadding: 0,
        target: "#twelve",
        title: "Background",
      },
      {
        placement: "center",
        target: "body",
        content:
          "This is the end of our walkthrough, you can always restart it. Happy editing!",
      },
    ]);
  };

  const handleJoyrideCallback = (data) => {
    const { action, index, status } = data;

    if (status === STATUS.FINISHED) {
      // Walkthrough is finished, you can perform any additional actions here
      setRun(false);
      setSteps([]);
    }

    if (action === ACTIONS.CLOSE || status === STATUS.SKIPPED) {
      // Walkthrough is closed or skipped, you can perform any cleanup here
      setRun(false);
    }
    if (index === 3) {
      sliderCtx.setElements("theme");
    }
    if (index === 6) {
      sliderCtx.setElements("background");
    }
    if (index === 10) {
      sliderCtx.setElements("sidebar");
    }
  };

  return {
    run,
    steps,
    handleStart,
    handleJoyrideCallback,
  };
};

export default useWalkThrough;
