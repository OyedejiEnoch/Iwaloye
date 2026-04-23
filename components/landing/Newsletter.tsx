"use client"
import { useNewsLetterMutation } from '@/redux/api/membershipApi'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useState } from 'react'
import NewButton from '../NewButton'
import { Loader } from 'lucide-react'

const Newsletter = () => {

  const [newsLetter, { isLoading }] = useNewsLetterMutation()
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // const [details, setDetails] = useState({
  //   email: "",
  // })

  const handleSubscribe = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        toast.success("Thank you for subscribing!");
        setEmail(""); // clear input on success
      } else {
        setIsError(true);
        toast.error(data.error || "Subscription failed. Please try again.");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setIsError(true);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // const handleSubmit = async () => {
  //   try {
  //     await newsLetter(details).unwrap()
  //     toast.success("Registration successful!")
  //   } catch (err: any) {
  //     toast.error(err?.data?.message || "Registration failed. Please try again.")
  //   }
  // }

  return (
    <section className='w-full relative bg-black py-20 px-4 md:px-4 lg:px-16'>
      {/* <Image src="/assets/rectangle.png" alt='image' fill className='absolute inset-0 rounded-2xl' /> */}

      <div className='max-w-6xl relative mx-auto flex md:flex-row flex-col justify-between max-sm:items-start'>
        <div className='space-y-1 text-white justify-start flex flex-col items-start'>
          <h2 className='font-sans text-3xl md:text-4xl lg:text-5xl font-semibold'>Newsletter</h2>
          <p className='text-xs text-gray-300'>Stay informed, subscribe to our newsletter.</p>
        </div>


        <form
          onSubmit={handleSubscribe}
          className='flex md:items-center gap-2 w-full md:w-auto md:flex-row flex-col max-sm:mt-6 max-sm:gap-4'
        >
          {/* make then align together */}
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder='Enter your email' className='bg-white py-4 px-6 md:w-125 md:h-[62px]' />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative overflow-hidden bg-black text-white border border-white px-8 py-4 md:w-[225px] h-[52px] md:h-[62px] text-sm font-semibold whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-300"
            >
              {/* Slide from left to right background */}
              <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white group-hover:border-black border-t-transparent group-hover:border-t-transparent rounded-full animate-spin transition-colors duration-300" />
                    Subscribing...
                  </>
                ) : (
                  <>Subscribe Now »</>
                )}
              </span>
            </button>
            {/* <NewButton onClick={handleSubscribe} text={loading ? <Loader className='animate-spin' /> : 'Subscribe Now'} className='bg-black border-white text-white w-full md:w-[225px] h-[52px] md:h-[62px] !mt-0' /> */}
          </div>

        </form>
      </div>
    </section>
  )
}

export default Newsletter



// ... (secrets removed)