"use client"
import { useNewsLetterMutation } from '@/redux/api/membershipApi'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useState } from 'react'

const Newsletter = () => {

  const [newsLetter, { isLoading }] = useNewsLetterMutation()

  const [details, setDetails] = useState({
    email: "",
  })

  const handleSubmit = async () => {
    try {
      await newsLetter(details).unwrap()
      toast.success("Registration successful!")
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed. Please try again.")
    }
  }

  return (
    <section className='w-full relative bg-black py-20 px-4 md:px-4 lg:px-16'>
      {/* <Image src="/assets/rectangle.png" alt='image' fill className='absolute inset-0 rounded-2xl' /> */}

      <div className='max-w-7xl relative mx-auto flex md:flex-row flex-col justify-between items-center'>
        <div className='space-y-4 text-white justify-start flex flex-col items-start'>
          <h2 className='font-sans text-3xl md:text-4xl lg:text-5xl font-semibold'>Newsletter</h2>
          <p className='text-xs text-gray-300'>Stay informed, subscribe to our newsletter.</p>
        </div>

        <form className='flex md:items-center gap-2 md:flex-row flex-col max-sm:mt-6 max-sm:gap-4'>
          <input value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} type="text" placeholder='Enter your email' className='bg-white py-4 px-6 md:w-125' />
          <Button onClick={handleSubmit} className='bg-black text-white border-white py-7 px-6 rounded-none hover:bg-[#F47321] hover:border-[#F47321]'>Subscribe Now</Button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
