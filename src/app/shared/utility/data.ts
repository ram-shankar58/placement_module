export const STEPS_BUTTONS = {
    back: {
      classes: "back-button",
      secondary: true,
      text: "Back",
      type: "back"
    },
    cancel: {
      classes: "cancel-button",
      secondary: true,
      text: "Exit",
      type: "cancel"
    },
    next: {
      classes: "next-button",
      text: "Next",
      type: "next"
    }
  };
  
  export const defaultStepOptions = {
    classes: "shepherd-theme-arrows custom-default-class",
    scrollTo: true,
    cancelIcon: {
      enabled: true
    }
  };
  
  export const steps = [
    {
      attachTo: {
        element: "h1",
        on: "bottom"
      },
      buttons: [STEPS_BUTTONS.cancel, STEPS_BUTTONS.next],
      classes: "custom-class-name-1 custom-class-name-2",
      id: "intro",
      title: "Step in h1",
      text: `Content in h1 at bottom. This content can be html code as string like:
      <a href="https://www.google.com" rel="_blank">Google Link</a>
      `
    },
    {
      attachTo: {
        element: "p",
        on: "top"
      },
      buttons: [
        STEPS_BUTTONS.cancel,
        {
          ...STEPS_BUTTONS.back,
          text: "Custom back button for this step",
          classes: "green-button",
          secondary: false
        },
        STEPS_BUTTONS.next
      ],
      classes: "custom-class-name-1 custom-class-name-2",
      id: "installation",
      title: "Step in paragraph",
      text: "Content in paragraph at top"
    },
    {
      attachTo: {
        element: "div",
        on: "left"
      },
      buttons: [STEPS_BUTTONS.next],
      classes: "custom-class-name-1 custom-class-name-2",
      id: "usage",
      title: "Step in div",
      text: "Content in div at left only with  next button",
      cancelIcon: {
        enabled: false
      }
    },
    {
      attachTo: {
        element: "a",
        on: "right"
      },
      buttons: [STEPS_BUTTONS.cancel, STEPS_BUTTONS.back, STEPS_BUTTONS.next],
      classes: "custom-class-name-1 custom-class-name-2",
      id: "modal",
      text: `Step with no title and no exit (x button) at right`,
      cancelIcon: {
        enabled: false
      }
    }
  ];
  
