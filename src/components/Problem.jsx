import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Problem() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const step1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [0, 1, 1, 0]);
  const step1Y = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [50, 0, 0, -50]);
  const step1Scale = useTransform(scrollYProgress, [0.1, 0.2], [0.9, 1]);

  const step2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const step2Y = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [50, 0, 0, -50]);
  const step2Scale = useTransform(scrollYProgress, [0.4, 0.5], [0.9, 1]);

  const step3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const step3Y = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [50, 0, 0, 0]);
  const step3Scale = useTransform(scrollYProgress, [0.7, 0.8], [0.9, 1]);

  return (
    <section ref={containerRef} className="bg-primary text-on-primary h-[300vh]" id="problem">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-lg overflow-hidden">
        
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute top-[20%] text-center px-lg w-full max-w-4xl">
          <h2 className="font-headline-md text-headline-md mb-md">When work depends on memory, the business is at risk.</h2>
        </motion.div>

        <div className="relative w-full max-w-4xl h-[400px]">
          <motion.div style={{ opacity: step1Opacity, y: step1Y, scale: step1Scale }} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col md:flex-row gap-lg items-start">
            <span className="font-display-lg text-secondary-fixed-dim shrink-0">01</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-sm text-white">Duplicated Entry Fatigue</h3>
              <p className="font-body-lg text-body-lg text-on-primary-fixed-variant">Entering the same client data into three different tools isn't just slow; it's where errors live.</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: step2Opacity, y: step2Y, scale: step2Scale }} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col md:flex-row gap-lg items-start">
            <span className="font-display-lg text-secondary-fixed-dim shrink-0">02</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-sm text-white">The Spreadsheet Ceiling</h3>
              <p className="font-body-lg text-body-lg text-on-primary-fixed-variant">Spreadsheets break down when more than two people need to use them simultaneously for operations.</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col md:flex-row gap-lg items-start">
            <span className="font-display-lg text-secondary-fixed-dim shrink-0">03</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-sm text-white">The AI Wild West</h3>
              <p className="font-body-lg text-body-lg text-on-primary-fixed-variant">Staff are already using AI. Without clear rules and safe pipelines, your intellectual property is leaking.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
