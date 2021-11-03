if (document.querySelector(".container3")) {
  const trigger = ".trigger";
  const container2 = ".container2";
  const container3 = ".container3";
  const container4 = ".container4";
  const text = ".container4__text";

  let timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      // markers: true,
      ease: "none",
      pin: true, // pin the trigger element while active
      start: "top 95%", // when the top of the trigger hits the top of the viewport
      end: "top -130%", // end after scrolling 500px beyond the start
      scrub: 0 // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    }
  });

  timeLine
    .to(text, 1, { scale: 1, autoAlpha: 1, ease: "none" })
    .to(text, 0.25, { scale: 1, autoAlpha: 1, ease: "none" })
    .to(container4, 1, { autoAlpha: 0, ease: "none" })
    .to(container4, 0.25, { autoAlpha: 0, ease: "none" })
    .to(container2, 1, { autoAlpha: 0, ease: "none" })
    .to(container2, 0.25, { autoAlpha: 0, ease: "none" })
    .to(container3, 1, {
      maskSize: "auto +=160%",
      maskPosition: "52% 50%",
      ease: "none"
    })
    .to(container3, 1, { autoAlpha: 0, ease: "none" }, "-=0.7");
}

$("body").mousemove(function(event) {
  x = event.offsetX;
  y = event.offsetY;
  console.log(x);
  $(".loupe-container-2").css("mask-position", `${x}px ${y}px`);
  $("img.loupe")
    .css("top", `${y}px`)
    .css("left", `${x}px`);
});
