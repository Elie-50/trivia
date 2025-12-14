import { ArrowRightCircle } from "lucide-react"
import { Link } from "react-router-dom"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from "gsap/all"
import { useRef } from "react"

gsap.registerPlugin(SplitText, useGSAP);

function Homepage() {
  const ulRef = useRef<HTMLUListElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });
    const welcomeSplit = new SplitText('.welcome', { type: 'chars' });

    tl.from(welcomeSplit.chars, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.03,
    }, 0);

    tl.from('.sub-header', {
      opacity: 0,
      yPercent: 200,
      duration: 1.5
    }, 0.5);

    tl.from('.features-card', {
      border: 0,
    }, 0.75);

    if (ulRef.current) {
      tl.from(ulRef.current?.children, {
        opacity: 0,
        x: -50,
        stagger: 0.2,
      }, 0.75)
    }

    tl.from('.cta-tag', {
      yPercent: -100,
      opacity: 0,
      fontSize: 0,
    }, 0.75);

    tl.fromTo('.cta-button',
    {
      yPercent: 100,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      ease: 'power3.out',
    }, 1)
    
  }, []);

  return (
    <div className="flex flex-col items-center px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="welcome text-4xl font-bold tracking-tight">
          Welcome to Trivia
        </h1>
        <p className="sub-header text-muted-foreground text-lg">
          Your favorite place to
        </p>
      </div>

      {/* Features */}
      <div className="features-card w-full max-w-md rounded-xl border bg-background shadow-sm p-6">
        <ul ref={ulRef} className="features flex flex-col items-center gap-3 text-lg">
          <li className="font-medium">🧠 Learn something new</li>
          <li className="font-medium">⏳ Waste boring times</li>
          <li className="font-medium">🏆 Compete with friends</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6">
        <h2 className="cta-tag text-2xl font-semibold">
          What are you waiting for?
        </h2>
        <div className="flex items-center justify-center">
          <Link
            className="cta-button group w-fit rounded-full bg-chart-1 px-8 py-3 text-lg font-semibold text-foreground shadow-lg transition-all hover:bg-chart-1/80 hover:scale-105 hover:cursor-pointer"
            to='/getting-started'
          >
            <span className="flex items-center gap-2">
              <span className="group-hover:underline">Start now</span>
              <ArrowRightCircle
                size={24}
                className="mt-1"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
