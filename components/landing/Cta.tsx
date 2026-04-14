import Image from 'next/image'
import React from 'react'

const Cta = () => {
  return (
    <section className='relative w-full bg-white py-20 px-4 md:px-8 lg:px-16 min-h-[60vh]'>
      <Image src={"/assets/ctaImg.png"} alt='image'  fill className='inset-0 absolute object-cover' />
        {/* overlay */}
        <div className='absolute inset-0 bg-black opacity-50 ' />
        {/* this should be in the middle and on top */}

        <div className='max-w-7xl mx-auto  z-20 relative flex justify-between md:flex-row flex-col '>
            <div className=''>
                <span className='text-3xl md:text-4xl lg:text-4xl max-w-xl mx-auto inline-flex font-semibold text-white bg-black'>Have Your Say
                    <br />
                    Build a future that reflects
                    <br />
                     your voice
                </span>

                <p className='text-xs italic text-white mt-10 max-w-md tracking-wider'>No one understands a community better than the people who live in it. Your experiences, your struggles, and your hopes matter deeply.</p>
            </div>

            <form className='flex flex-col max-sm:mt-4'>
                <div className='flex gap-10 md:flex-row flex-col justify-start'>
                    <div className='space-y-2 flex flex-col'>
                        <label htmlFor='name' className='text-white text-sm'>Name</label>
                        <input type="text" id='name' className='bg-white py-4 px-2 w-60' />
                    </div>
                    <div className='space-y-2 flex flex-col'>
                        <label htmlFor='email' className='text-white text-sm'>Email Address</label>
                        <input type="email" id='name' className='bg-white py-4 px-2 w-60' />
                    </div>
                </div>

                <div className='flex flex-col mt-6'>
                    <label htmlFor='message' className='text-white text-sm'>Your Message</label>
                    <textarea name="message" id="message" cols={30} rows={5} className='bg-white' />
                </div>
            </form>
        </div>
    
    </section>
  )
}

export default Cta
