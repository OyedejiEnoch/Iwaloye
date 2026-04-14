"use client";

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Link2, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { useCreatePaymentMutation } from '@/redux/api/detailsApi'
import { toast } from "sonner"

const Donate = () => {
    const [createPayment, { isLoading }] = useCreatePaymentMutation()
    const [details, setDetails] = useState({
        email: "",
        amount: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!details.email || !details.amount) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const payload = {
                email: details.email,
                amount: Number(details.amount)
            };
            
            const response = await createPayment(payload).unwrap();
            
            toast.success("Payment initialized successfully");
            
            // Check if backend returns a redirect URL (common for Paystack/Flutterwave)
            if (response?.data?.authorization_url || response?.authorization_url) {
                window.location.href = response?.data?.authorization_url || response?.authorization_url;
            } else {
                toast.info("Payment reference created. Please check your email if redirected didn't happen.");
            }
        } catch (error: any) {
            console.error("Payment Error:", error);
            toast.error(error?.data?.message || "Failed to initialize payment. Please try again.");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='bg-white cursor-pointer text-black text-xs md:text-sm font-medium px-6 py-4 border border-black hover:bg-gray-50 transition-colors tracking-wide flex items-center gap-2'>
                    Donate Now
                    <Link2 className='w-4 h-4' />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl px-7 py-6">
                <DialogHeader>
                    <DialogTitle className='font-semibold text-xl'>Enter Payment Details</DialogTitle>
                    <DialogDescription>
                        Complete the form below to initiate your donation.
                    </DialogDescription>
                </DialogHeader>
                <hr className='mt-4' />

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className='space-y-2'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={details.email}
                            onChange={handleChange}
                            placeholder="gbailey@example.net"
                            className="mt-1 p-2 w-full border border-gray-300 focus:ring-2 focus:ring-[#F47321] focus:border-transparent outline-none rounded-md py-4 px-4" 
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                        <input 
                            type="number" 
                            id="amount" 
                            name="amount"
                            value={details.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            className="mt-1 p-2 w-full border border-gray-300 focus:ring-2 focus:ring-[#F47321] focus:border-transparent outline-none rounded-md py-4 px-4" 
                            required
                        />
                    </div>

                    <hr className='mt-6' />

                    <div className='flex justify-end'>
                        <Button 
                            type='submit' 
                            className='bg-[#F47321] hover:bg-[#e36214] py-6 px-8 text-white font-semibold transition-colors'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Donate"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Donate
