/*!
 * 2020.05.06
 * navonajs 2.0.0 (http://philipi.bovo.me/navonajs)
 * By Philipi Bovo
 */

let navonaLandscapeIcon = "";
let resizeNavona;
let speedNavona;

document.addEventListener("DOMContentLoaded", function () {
  verifyIDs().then((result) => {
    // configure options
    const galleries = document.getElementsByClassName("navona");

    for (let i = 0; i < galleries.length; i++) {
      // Set hover or click
      const items = galleries[i].children;

      if (galleries[i].getAttribute("data-navona-click")) {
        for (let i2 = 0; i2 < items.length; i2++) {
          items[i2].addEventListener("click", function (event) {
            const gallery = galleries[i].children;
            for (let i3 = 0; i3 < gallery.length; i3++) {
              gallery[i3].classList.remove("active");
            }

            if (
              event.target.tagName.toLowerCase() === "img" ||
              event.target.tagName.toLowerCase() === "p"
            ) {
              event.target.parentElement.classList.add("active");

              navonaSetSizes(
                event.target.parentElement.parentElement.getAttribute("id")
              );
            }

            if (event.target.tagName.toLowerCase() === "div") {
              event.target.classList.add("active");

              navonaSetSizes(event.target.parentElement.getAttribute("id"));
            }
          });
        }
      } else {
        for (let i2 = 0; i2 < items.length; i2++) {
          items[i2].addEventListener("mouseover", function (event) {
            const gallery = galleries[i].children;
            for (let i3 = 0; i3 < gallery.length; i3++) {
              gallery[i3].classList.remove("active");
            }

            if (
              event.target.tagName.toLowerCase() === "img" ||
              event.target.tagName.toLowerCase() === "p"
            ) {
              event.target.parentElement.classList.add("active");

              navonaSetSizes(
                event.target.parentElement.parentElement.getAttribute("id")
              );
            }

            if (event.target.tagName.toLowerCase() === "div") {
              event.target.classList.add("active");

              navonaSetSizes(event.target.parentElement.getAttribute("id"));
            }
          });
        }
      }
      // end else -> if (galleries[i].getAttribute("data-navona-click"))

      // Set theme color
      if (galleries[i].getAttribute("data-navona-theme")) {
        if (galleries[i].getAttribute("data-navona-theme").length === 7) {
          const bg = `background: ${galleries[i].getAttribute(
            "data-navona-theme"
          )}b3`;
          // set color theme
          galleries[i].style.cssText = bg;
        } else {
          // set color default, black
          galleries[i].style.cssText = "background: #000000b3";

          console.error(
            `The "${galleries[i].getAttribute(
              "data-navona-theme"
            )}" value is not valid for "data-navona-speed". Only  hexadecimal colors accepted, example: "#FFFFFF. Set default value, #000000`
          );
        }
      } else {
        // set color default, black
        galleries[i].style.cssText = "background: #000000b3";
      }
      // end else -> if (galleries[i].getAttribute("data-navona-theme"))

      if (galleries[i].getAttribute("data-navona-speed")) {
        if (!isNaN(galleries[i].getAttribute("data-navona-speed"))) {
          speedNavona = parseInt(
            galleries[i].getAttribute("data-navona-speed")
          );
        } else {
          // set speed default, 700
          speedNavona = 700;

          console.error(
            `navonajs error: The "${galleries[i].getAttribute(
              "data-navona-speed"
            )}" value is not valid for "data-navona-speed". Only whole numbers accepted. Set default value, 700ms`
          );
        }
      } else {
        // set speed default, 700
        speedNavona = 700;
      }
    }
    // end for (let i = 0; i < galleries.length; i++)
    // end configure options

    // autostart
    const autoStart = document.querySelectorAll(".navona-auto-start");
    // Verify if auto start
    if (autoStart.length) {
      if (autoStart.length > 1) {
        console.error(
          'navonajs error: You have the class "navona-auto-start" in one more element. Place the class "navona-auto-start" only in the <body> tag'
        );

        return;
      }
      // end if (autoStart.length > 1)

      if (!autoStart[0].getAttribute("data-navona-start")) {
        const galleries = document.querySelectorAll(".navona");

        if (galleries.length > 1) {
          console.error(
            'navonajs error: When using the "navona-auto-start" class in your <body> tag, you need to place the "data-navona-start" attribute with the target gallery ID, example: data-navona-start="id-my-gallery"'
          );

          return;
        } else {
          document
            .querySelector("body")
            .setAttribute("data-navona-start", "navona-auto-id-0");

          navonaSetSizes("navona-auto-id-0");
        }
        // end else -> if (galleries.length > 1)
      } else {
        if (
          !document.getElementById(
            autoStart[0].getAttribute("data-navona-start")
          )
        ) {
          console.error(
            `navonajs error: The gallery with ID "document.getElementById(autoStart[0].getAttribute("data-navona-start")" was not found`
          );

          return;
        } else {
          navonaSetSizes(
            document.querySelector("body").getAttribute("data-navona-start")
          );
        }
        // end else -> if (!document.getElementById(autoStart[0].getAttribute("data-navona-start")))
      }
      // end else -> if (!autoStart[0].getAttribute("data-navona-start"))
    }
    // end if (autoStart.length)
    // end autostart
  });
  // end verifyIDs().then()

  // Set click navona-go
  const navonaGO = document.getElementsByClassName("navona-go");

  if (navonaGO.length) {
    for (let i = 0; i < navonaGO.length; i++) {
      navonaGO[i].addEventListener("click", function (event) {
        navonaSetSizes(event.target.getAttribute("for"));
      });
    }
    // end for (let i = 0; i < navonaGO.length; i++)
  }
  // end if (navonaGO.length)
});
// end document.addEventListener("DOMContentLoaded", function () {...})

document.onkeydown = function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    if (document.querySelector(".navona.show")) {
      closeNavonaGallery(
        document.querySelector(".navona.show").getAttribute("id")
      );
    }
  }
};
// end document.onkeydown = function (event)

window.addEventListener("resize", function () {
  clearTimeout(resizeNavona);
  resizeNavona = setTimeout(() => {
    navonaSetSizes(document.querySelector(".navona.show").getAttribute("id"));
  }, 100);
});
// end window.addEventListener("resize", function () {...})

verifyIDs = () => {
  const galleries = document.querySelectorAll(".navona");

  for (let i = 0; i < galleries.length; i++) {
    if (!galleries[i].getAttribute("id")) {
      galleries[i].setAttribute("id", `navona-auto-id-${i}`);
    }
  }

  return Promise.resolve(true);
};
// end async function verifyIDs()

navonaCalculateItemsSize = (id) => {
  const children = document.getElementById(id).children;
  let childrenNvl2;
  let multiplierBig;
  let minusChildrenCalc;

  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains("message-portrait")) {
      children[i].classList.add("hide");
    } else {
      children[i].classList.remove("hide");

      if (document.getElementsByClassName("message-portrait").length) {
        minusChildrenCalc = 2;
      } else {
        minusChildrenCalc = 1;
      }

      switch (children.length) {
        case 1:
          multiplierBig = 1;
          multiplierSmall = 1;
          break;
        case 2:
          multiplierBig = 0.9;
          multiplierSmall = 0.1;
          break;
        case 3:
          multiplierBig = 0.8;
          multiplierSmall = 0.2;
          break;
        default:
          multiplierBig = 0.7;
          multiplierSmall = 0.3;
          break;
      }

      const openedSize = parseInt((window.innerWidth - 60) * multiplierBig);
      const closedSize = parseInt(
        ((window.innerWidth - 60) * multiplierSmall) /
          (children.length - minusChildrenCalc)
      );

      if (children[i].classList.contains("active")) {
        children[i].style.width = openedSize + "px";
        children[i].style.textAlign = "center";
      } else {
        children[i].style.width = closedSize + "px";
        children[i].style.textAlign = "left";
      }

      if (children[i].hasChildNodes("p")) {
        childrenNvl2 = children[i].children;

        for (let i2 = 0; i2 < childrenNvl2.length; i2++) {
          if (childrenNvl2[i2].tagName.toLowerCase() === "img") {
            childrenNvl2[i2].style.height = "100%";
            childrenNvl2[i2].style.widht = "100%";
          }

          if (childrenNvl2[i2].tagName.toLowerCase() == "p") {
            if (children[i].classList.contains("active")) {
              childrenNvl2[i2].style.width = openedSize + "px";
            } else {
              childrenNvl2[i2].style.width = closedSize + "px";
            }
          }
          // end if (childrenNvl2[i2].tagName.toLowerCase() == "p")
        }
        // end for (let i2 = 0; i2 < childrenNvl2.length; i2++)
      }
      // end if (children[i].hasChildNodes("p"))
    }
    // end else -> if (items[i].classList.contains("message-portrait"))
  }
  // end for (let i = 0; i < children.length; i++)
};

navonaCreatePortraitMessage = (id) => {
  const items = document.getElementById(id).children;
  let existPortraitMessage = false;

  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains("message-portrait")) {
      items[i].classList.remove("hide");
      existPortraitMessage = true;
    } else {
      items[i].classList.add("hide");
    }
  }

  if (!existPortraitMessage) {
    let element = document.createElement("DIV");
    element.classList.add("message-portrait");

    let divImg = document.createElement("DIV");

    let imgElement = document.createElement("IMG");

    if (navonaLandscapeIcon) {
      imgElement.setAttribute("src", navonaLandscapeIcon);
    } else {
      imgElement.setAttribute("src", "img/landscape.png");
    }

    divImg.appendChild(imgElement);
    element.appendChild(divImg);
    document.getElementById(id).appendChild(element);
  }
};

navonaSetSizes = (id) => {
  const gallery = document.getElementById(id);
  let notActiveItem = true;

  for (let i = 0; i < gallery.children.length; i++) {
    if (gallery.children[i].classList.contains("active")) {
      notActiveItem = false;
    }
  }

  if (notActiveItem) {
    gallery.children[0].classList.add("active");
  }

  if (window.innerHeight > window.innerWidth) {
    if (gallery.getAttribute("data-navona-portrait") === "true") {
      navonaCalculateItemsSize(id);
    } else {
      navonaCreatePortraitMessage(id);
    }
    // end else -> if (gallery.getAttribute("data-navona-portrait"))
  } else {
    navonaCalculateItemsSize(id);
  }
  // end else -> if (window.innerHeight > window.innerWidth)

  if (!document.getElementById(id).classList.contains("show")) {
    // Close button
    let closeButton = document.createElement("DIV");
    closeButton.classList.add("navona-close-button");
    closeButton.setAttribute("onclick", `closeNavonaGallery("${id}")`);
    closeButton.innerHTML = "x";
    document.getElementById(id).parentElement.appendChild(closeButton);
    // end Close buttomn

    document.getElementById(id).classList.add("show");

    document.querySelector("body").classList.add("navona-hidden-scroll");

    FX.fadeIn(document.getElementById(id), {
      duration: speedNavona,
      complete: function () {},
    });
  }
  // end if (!document.getElementById(id).classList.contains("show"))
};
// end navonaSetSizes = (id)

closeNavonaGallery = (id) => {
  const closeButton = document.getElementsByClassName("navona-close-button");

  FX.fadeOut(closeButton[0], {
    duration: speedNavona,
    complete: function () {
      closeButton[0].parentNode.removeChild(closeButton[0]);
    },
  });

  FX.fadeOut(document.getElementById(id), {
    duration: speedNavona,
    complete: function () {
      document.querySelector("body").classList.remove("navona-hidden-scroll");
      document.getElementById(id).classList.remove("show");
    },
  });
};
// end closeNavonaGallery = (id)

(function () {
  let FX = {
    easing: {
      linear: function (progress) {
        return progress;
      },
      quadratic: function (progress) {
        return Math.pow(progress, 2);
      },
      swing: function (progress) {
        return 0.5 - Math.cos(progress * Math.PI) / 2;
      },
      circ: function (progress) {
        return 1 - Math.sin(Math.acos(progress));
      },
      back: function (progress, x) {
        return Math.pow(progress, 2) * ((x + 1) * progress - x);
      },
      bounce: function (progress) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
          if (progress >= (7 - 4 * a) / 11) {
            return (
              -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
            );
          }
        }
      },
      elastic: function (progress, x) {
        return (
          Math.pow(2, 10 * (progress - 1)) *
          Math.cos(((20 * Math.PI * x) / 3) * progress)
        );
      },
    },
    animate: function (options) {
      let start = new Date();
      let id = setInterval(function () {
        let timePassed = new Date() - start;
        let progress = timePassed / options.duration;
        if (progress > 1) {
          progress = 1;
        }
        options.progress = progress;
        let delta = options.delta(progress);
        options.step(delta);
        if (progress == 1) {
          clearInterval(id);
          options.complete();
        }
      }, options.delay || 10);
    },
    fadeOut: function (element, options) {
      let to = 1;
      this.animate({
        duration: options.duration,
        delta: function (progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function (delta) {
          element.style.opacity = to - delta;
        },
      });
    },
    fadeIn: function (element, options) {
      let to = 0;
      this.animate({
        duration: options.duration,
        delta: function (progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function (delta) {
          element.style.opacity = to + delta;
        },
      });
    },
  };
  window.FX = FX;
})();
