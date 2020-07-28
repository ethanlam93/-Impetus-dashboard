let tl = gsap.timeline({ duration: 5, ease: "power1.inOut", pause: true });
tl.from("#dateDisplay", { opacity: 0, y: -50 })
  .from("#headerName", { opacity: 0, y: -50 })
  .from(".quote", { opacity: 0, y: -50 })
  .from(".cityName", { opacity: 0, y: -50 })
  .from(".sun", { opacity: 0, y: -50 })
  .from(".mon", { opacity: 0, y: -50 })
  .from(".tues", { opacity: 0, y: -50 })
  .from(".wed", { opacity: 0, y: -50 })
  .from(".thurs", { opacity: 0, y: -50 })
  .from(".fri", { opacity: 0, y: -50 })
  .from(".sat", { opacity: 0, y: -50 })
  .from(".apiRow", { opacity: 0, y: -50 });
