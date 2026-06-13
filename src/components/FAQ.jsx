import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'How long does a typical automation sprint take?', a: 'Our standard Workflow Automation Sprints are designed for a 2-week turnaround. This includes discovery, build, and a 3-day testing period. Larger custom builds are quoted based on complexity.' },
    { q: 'Is our data safe with your AI solutions?', a: 'Yes. We do not use public ChatGPT for business operations. We implement private API pipelines where your data is NOT used for training the base models, ensuring full data sovereignty.' },
    { q: 'Do you help with NDIS audits?', a: 'No. Our NDIS Operational Pack is strictly for automating service delivery, scheduling, and invoicing workflows. For compliance and audit readiness, we recommend speaking with Heutrix Assurance (a separate entity).' }
  ];

  return (
    <section className="py-xxl px-lg bg-surface" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-xxl">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Operational Clarity</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Common questions about working with Heutrix Labs.</p>
        </motion.div>
        
        <div className="space-y-md">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: index * 0.1 }} 
              viewport={{ once: true }}
              key={index} 
              className={`border border-slate-200 rounded-xl overflow-hidden bg-white transition-all ${openIndex === index ? 'shadow-md border-secondary/30' : 'shadow-sm'}`}
            >
              <button 
                className="w-full flex items-center justify-between p-lg text-left hover:bg-slate-50 transition-colors" 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-headline-sm text-headline-sm text-primary">{faq.q}</span>
                <motion.span 
                  animate={{ rotate: openIndex === index ? 180 : 0 }} 
                  className="material-symbols-outlined" 
                  data-icon="expand_more"
                >
                  expand_more
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.3 }}
                    className="px-lg pb-lg text-on-surface-variant font-body-md overflow-hidden"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
