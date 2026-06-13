import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary pt-xxl pb-xl px-lg border-t border-on-primary-fixed-variant">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-lg mb-xxl">
          <div className="max-w-md">
            <span className="font-headline-sm text-headline-sm text-secondary-fixed font-bold block mb-md">Heutrix Labs</span>
            <p className="font-body-sm text-body-sm text-on-primary-fixed-variant mb-md">
              Operational excellence for the modern small business. We bridge the gap between chaotic spreadsheets and industrial-grade automation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-xl">
            <div>
              <p className="font-label-md text-label-md text-white mb-md">Company</p>
              <ul className="space-y-sm font-body-sm text-on-primary-fixed-variant">
                <li><a className="hover:text-white transition-colors" href="#about">About</a></li>
                <li><a className="hover:text-white transition-colors" href="#services">Services</a></li>
                <li><a className="hover:text-white transition-colors" href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-label-md text-label-md text-white mb-md">Legal</p>
              <ul className="space-y-sm font-body-sm text-on-primary-fixed-variant">
                <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Legal Disclaimer</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="font-label-md text-label-md text-white mb-md">Social</p>
              <div className="flex gap-md">
                <a className="w-10 h-10 rounded-full bg-on-primary-fixed-variant/20 flex items-center justify-center hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all" href="#">
                  <span className="material-symbols-outlined text-[20px]" data-icon="share">share</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-on-primary-fixed-variant pt-lg flex flex-col gap-lg">
          <div className="p-lg bg-on-primary-fixed-variant/10 rounded-xl">
            <p className="font-label-sm text-label-sm font-bold text-secondary-fixed mb-xs uppercase tracking-widest">Brand Separation Statement</p>
            <p className="font-body-sm text-body-sm text-on-primary-fixed-variant">
              Heutrix Labs and Heutrix Assurance are distinct business units. Heutrix Labs focuses solely on operational workflow and technical automation. We do not provide assurance, auditing, or compliance verification services. No partnership or engagement with Heutrix Labs constitutes an audit-ready status.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-md">
            <p className="font-body-sm text-body-sm text-on-primary-fixed-variant">© 2024 Heutrix Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
