import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import React, { useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
const Hero = () => {

    const videoRef = useRef();

    const isMobile = useMediaQuery({maxWidth: 767})

    useGSAP(async () => {
        await document.fonts.ready;

        const paragraphSplit = new SplitText(".subtitle", {
            type: "lines",
        });
        const heroSplit = SplitText.create(".titles", {
            type: "words",
        });

        heroSplit.words.forEach((char) => {
            char.classList.add("text-gradient");
        });
        gsap.from(heroSplit.words, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: {
                amount: 0.08,
                from: "random",
            },
        });
        gsap.from(paragraphSplit.lines, {
            yPercent: 100,
            opacity: 0,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
            .to(".right-leaf", { y: 200 }, 0)
            .to(".left-leaf", { y: -200 }, 0);

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue =  isMobile ? "120% top" : "bottom top";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger : 'video',
                start : startValue,
                end : endValue,
                scrub : true,
                pin : true,
            }
        })

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime : videoRef.current.duration
            })
        }

    }, []);

    return (
        <>
            <section id="hero" className="noisy">
                <div className="titles flex justify-center ">
                    <h1 className=" title" id="mojito">
                        M
                    </h1>
                    <h1 className=" title" id="mojito">
                        O
                    </h1>
                    <h1 className=" title" id="mojito">
                        J
                    </h1>
                    <h1 className=" title" id="mojito">
                        T
                    </h1>
                    <h1 className=" title" id="mojito">
                        O
                    </h1>
                </div>
                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">
                                Sip THe Spirit <br /> of Summer
                            </p>
                        </div>
                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on out menu is a blend of premium
                                ingredients, creative flair, and timelesss
                                recipes - designed to delight your senses
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                ></video>
            </div>
        </>
    );
};

export default Hero;
