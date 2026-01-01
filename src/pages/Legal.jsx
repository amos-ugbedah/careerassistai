import React from "react";

export default function Legal() {
  return (
    <div className="bg-[#f8f5ee] min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-gray-100">
        
        {/* Affiliate Disclosure Section */}
        <section className="mb-20">
          <h1 className="text-3xl font-black text-[#1a1a1a] mb-6 tracking-tight">
            Affiliate <span className="text-[#c7ae6a]">Disclosure</span>
          </h1>
          <div className="space-y-4 text-sm leading-relaxed prose text-gray-600 prose-gray md:text-base">
            <p>
              In compliance with the FTC guidelines, please assume the following about links and posts on this website:
            </p>
            <p>
              CareerAssistAI participates in various affiliate marketing programs, which means we may get paid commissions on editorially chosen products purchased through our links to retailer sites. 
            </p>
            <p>
              <strong>What this means for you:</strong> When you click on a link to an AI tool or resource mentioned on our site and make a purchase, we may receive a small percentage of that sale at <strong>no extra cost to you.</strong>
            </p>
            <p>
              We only recommend tools we have vetted and believe will genuinely add value to your career search. These commissions help support the research and free templates we provide to the community.
            </p>
          </div>
        </section>

        <hr className="mb-20 border-gray-100" />

        {/* Privacy Policy Section */}
        <section>
          <h2 className="text-3xl font-black text-[#1a1a1a] mb-6 tracking-tight">
            Privacy <span className="text-[#c7ae6a]">Policy</span>
          </h2>
          <div className="space-y-4 text-sm leading-relaxed prose text-gray-600 prose-gray md:text-base">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <p>
              At CareerAssistAI, we respect your privacy. This policy outlines how we handle information:
            </p>
            <ul className="pl-5 space-y-2 list-disc">
              <li><strong>Personal Data:</strong> We only collect names and email addresses when voluntarily submitted via our contact form or newsletter signup.</li>
              <li><strong>Cookies:</strong> We use standard cookies to analyze site traffic and improve your browsing experience.</li>
              <li><strong>Data Sharing:</strong> We never sell your personal information to third parties.</li>
              <li><strong>Third-Party Links:</strong> Our site contains links to other websites. We are not responsible for the privacy practices of those external sites.</li>
            </ul>
            <p className="pt-4 font-bold">Contact us at hello@careerassistai.com if you have any questions regarding your data.</p>
          </div>
        </section>
        
      </div>
    </div>
  );
}