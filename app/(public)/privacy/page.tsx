import React from 'react'

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-[80px] font-sans text-center text-gray-900 mb-20 tracking-wide uppercase">
                    PRIVACY Notice
                </h1>

                {/* Content */}
                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Privacy Policy section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-[7px] h-[7px] bg-[#ff8a00] flex-shrink-0"></span>
                            <h2 className="text-2xl md:text-2xl font-bold font-sans text-gray-900">
                                Privacy Notice
                            </h2>
                        </div>
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light">
                            <p>
                                Ìwàlóyè has created this privacy notice to explain how we collect, use, and protect information you may provide while visiting our website, reflecting our strong commitment to your online privacy. Ìwàlóyè may update or modify this policy from time to time, and we encourage you to review this page whenever you return to our website to stay informed about any changes.
                            </p>
                        </div>
                    </section>

                    {/* How we use your information section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-[7px] h-[7px] bg-[#ff8a00] flex-shrink-0"></span>
                            <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-900">
                                How we use your information
                            </h2>
                        </div>
                        <div className="space-y-6 text-gray-600 text-sm leading-relaxed font-light">
                            <p>
                                When you sign up to volunteer, contribute, or take any other action on this site, we may ask you to provide contact information, including your first and last name, e-mail address, physical address, and phone number. We may also obtain information about you from other sources and combine it with the information collected through this site. We use this information to operate the site, send you updates and news about Ìwàlóyè&apos;s campaign, invite you to participate in events and programs, and confirm your RSVP to campaign activities. Your e-mail address may be used to send updates, and your phone number may be used to contact you regarding these purposes.
                            </p>
                            <p>
                                We will never share your personal information or e-mail address with any other person or organization for any purpose. If you make an online contribution, we may ask for your credit card number and expiration date. This information is used solely for processing your contribution, is not stored by our organization, and is never disclosed to anyone for any purpose other than processing your contribution.
                            </p>
                            <p>
                                Ìwàlóyè&apos;s campaign does not share or sell collected information without your consent, except when required by law.
                            </p>
                        </div>
                    </section>

                    {/* To Unsubscribe section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-[7px] h-[7px] bg-[#ff8a00] flex-shrink-0"></span>
                            <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-900">
                                To Unsubscribe
                            </h2>
                        </div>
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light">
                            <p>
                                People who subscribe via this website will receive periodic updates from Ìwàlóyè by email or text. You may opt out of receiving future communications at any time by following the unsubscribe instructions provided in each message.
                            </p>
                        </div>
                    </section>

                    {/* How to contact us section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-[7px] h-[7px] bg-[#ff8a00] flex-shrink-0"></span>
                            <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-900">
                                How to contact us
                            </h2>
                        </div>
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light">
                            <p>
                                Questions regarding this privacy policy should be emailed to <a href="mailto:info@guru.com" className="underline hover:text-gray-900 transition-colors">info@guru.com</a>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPage