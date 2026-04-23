"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

const Cta = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setIsLoading(true);

        const formData = new FormData(form);
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Feedback submitted successfully!");
                form.reset();
            } else {
                toast.error("Failed to send message: " + data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit feedback. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='relative w-full bg-white py-20 px-4 md:px-8 lg:px-16 min-h-[60vh]'>
            <Image src={"/assets/ctaImg.png"} alt='image' fill className='inset-0 absolute object-cover' />
            {/* overlay */}
            <div className='absolute inset-0 bg-black opacity-50 ' />
            {/* this should be in the middle and on top */}

            <div className='max-w-7xl mx-auto  z-20 relative flex justify-between md:flex-row flex-col '>
                <div className=''>
                    <span className='text-2xl md:text-3xl lg:text-[30px] max-w-xl mx-auto flex flex-col font-semibold text-white font-sans'>
                        <span className='block bg-black w-fit p-[0.5px]'>Have Your Say</span>
                        <span className='block bg-black w-fit p-[0.5px]'>Build a future that reflects</span>
                        <span className='block bg-black w-fit p-[0.5px]'>your voice</span>
                    </span>

                    <p className='text-xs italic text-white mt-10 max-w-sm tracking-wider'>No one understands a community better than the people who live in it. Your experiences, your struggles, and your hopes matter deeply.</p>
                </div>

                <form className='flex flex-col max-sm:mt-4' onSubmit={handleSubmit}>
                    <div className='flex gap-3 md:gap-10 md:flex-row flex-col justify-start'>
                        <div className='space-y-2 flex flex-col'>
                            <label htmlFor='name' className='text-white text-xs md:text-sm'>Name</label>
                            <input type="text" id='name' name='name' required className='bg-white px-2 w-[350px] h-[40px] text-gray-900 border-none outline-none' />
                        </div>
                        <div className='space-y-2 flex flex-col'>
                            <label htmlFor='email' className='text-white text-xs md:text-sm'>Email Address</label>
                            <input type="email" id='email' name='email' required className='bg-white px-2 w-[350px] h-[40px] text-gray-900 border-none outline-none' />
                        </div>
                    </div>

                    <div className='flex space-y-2 flex-col mt-2 md:mt-6'>
                        <label htmlFor='message' className='text-white text-xs md:text-sm'>Your Message</label>
                        <textarea name="message" id="message" required cols={30} rows={5} className='bg-white p-2 text-gray-900 border-none outline-none resize-none' />
                    </div>

                    <button type="submit" disabled={isLoading} className='bg-[#12A650] hover:bg-[#0f8b43] transition-colors py-3 px-2 w-full max-sm:text-sm mt-4 md:mt-6 text-white font-medium disabled:opacity-50 flex items-center justify-center gap-2'>
                        {isLoading ? (
                            <>Sending...</>
                        ) : (
                            <>Submit Feedback</>
                        )}
                    </button>
                </form>
            </div>

        </section>
    )
}

export default Cta
