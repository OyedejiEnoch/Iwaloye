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
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from './ui/button'
import { useCreatePaymentMutation } from '@/redux/api/detailsApi'
import { toast } from "sonner"
import NewButton from './NewButton';

type PaymentStatus = "idle" | "success" | "failed";

interface DonateProps {
    trigger?: React.ReactNode;
}

const Donate = ({ trigger }: DonateProps) => {
    const [createPayment, { isLoading }] = useCreatePaymentMutation()
    const [verifying, setVerifying] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
    const [open, setOpen] = useState(false)
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

    const verifyPayment = async (reference: string) => {
        setVerifying(true)
        try {
            const res = await fetch(`/api/payment/verify/${reference}`, {
                headers: { "Accept": "application/json" },
            })
            const data = await res.json()

            // Based on your verify response screenshot:
            // data.status === true && data.data.status === "success"
            if (data.status === true && data.data?.status === "success") {
                setPaymentStatus("success")
                toast.success("Donation received! Thank you for supporting Iwaloye 2026.")
            } else {
                setPaymentStatus("failed")
                toast.error(data.message || "Payment verification failed.")
            }
        } catch (error) {
            setPaymentStatus("failed")
            toast.error("Verification failed. Please contact support.")
        } finally {
            setVerifying(false)
        }
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

            const accessCode = response?.data?.access_code;
            const reference = response?.data?.reference;

            if (!accessCode) {
                toast.error("Could not initialize payment. Please try again.");
                return;
            }

            // ✅ Close the dialog FIRST before opening Paystack
            setOpen(false);

            // Small delay to let dialog fully unmount before popup opens
            setTimeout(async () => {
                const PaystackPop = (await import("@paystack/inline-js")).default;
                const popup = new PaystackPop();

                popup.resumeTransaction(accessCode, {
                    onSuccess: async (transaction: { reference: string }) => {
                        await verifyPayment(transaction?.reference || reference);
                        // Re-open dialog to show result
                        setOpen(true);
                    },
                    onCancel: () => {
                        toast.info("Payment was cancelled.");
                    },
                });
            }, 300);

        } catch (error: any) {
            console.error("Payment Error:", error);
            toast.error(error?.data?.message || "Failed to initialize payment. Please try again.");
        }
    }

    const handleOpenChange = (val: boolean) => {
        setOpen(val)
        // Reset everything when dialog closes
        if (!val) {
            setPaymentStatus("idle")
            setDetails({ email: "", amount: "" })
            setVerifying(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || (
                    <NewButton
                        text='Donate Now'
                        className='bg-white text-black w-[225px] h-[62px]'
                        icon='/assets/heartIcon.svg'
                        iconClassName="group-hover:brightness-0 group-hover:invert"
                    />
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl px-7 py-6 rounded-none">
                <DialogHeader>
                    <DialogTitle className='font-semibold text-xl'>
                        {paymentStatus === "idle" && "Enter Payment Details"}
                        {paymentStatus === "success" && "Donation Successful!"}
                        {paymentStatus === "failed" && "Payment Failed"}
                    </DialogTitle>
                    <DialogDescription>
                        {paymentStatus === "idle" && "Complete the form below to initiate your donation."}
                        {paymentStatus === "success" && "Thank you for supporting Iwaloye 2026."}
                        {paymentStatus === "failed" && "Something went wrong with your payment."}
                    </DialogDescription>
                </DialogHeader>

                <hr className='mt-4' />

                {/* ── Success State ── */}
                {paymentStatus === "success" && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                        <h3 className="text-xl font-bold text-gray-800">Thank You!</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Your donation has been received and will go towards building a better Osun State.
                        </p>
                        <Button
                            onClick={() => handleOpenChange(false)}
                            className="bg-[#F47321] rounded-none hover:bg-[#e36214] py-6 px-10 text-white font-semibold mt-4"
                        >
                            Close
                        </Button>
                    </div>
                )}

                {/* ── Failed State ── */}
                {paymentStatus === "failed" && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                        <XCircle className="w-16 h-16 text-red-500" />
                        <h3 className="text-xl font-bold text-gray-800">Payment Failed</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Your payment could not be completed. Please try again.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <Button
                                onClick={() => setPaymentStatus("idle")}
                                className="bg-[#F47321] rounded-none hover:bg-[#e36214] py-6 px-8 text-white font-semibold"
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={() => handleOpenChange(false)}
                                variant="outline"
                                className="rounded-none py-6 px-8 font-semibold"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Verifying State ── */}
                {verifying && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                        <Loader2 className="w-12 h-12 text-[#F47321] animate-spin" />
                        <p className="text-gray-600 font-medium">Verifying your payment...</p>
                        <p className="text-gray-400 text-sm">Please don't close this window</p>
                    </div>
                )}

                {/* ── Form (idle, not verifying) ── */}
                {paymentStatus === "idle" && !verifying && (
                    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        <div className='space-y-2'>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={details.email}
                                onChange={handleChange}
                                placeholder="gbailey@example.net"
                                className="mt-1 p-2 w-full border border-gray-300 focus:ring-1 focus:ring-[#F47321] focus:border-transparent outline-none py-4 px-4"
                                required
                            />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Amount (₦)
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={details.amount}
                                onChange={handleChange}
                                placeholder="Enter amount in Naira"
                                min="1"
                                max="4999999"
                                className="mt-1 p-2 w-full border border-gray-300 focus:ring-1 focus:ring-[#F47321] focus:border-transparent outline-none py-4 px-4"
                                required
                            />
                        </div>

                        <hr className='mt-6' />

                        <div className='flex justify-end'>
                            <Button
                                type='submit'
                                className='bg-[#F47321] rounded-none hover:bg-[#e36214] py-6 px-8 text-white font-semibold transition-colors'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Initializing...
                                    </>
                                ) : (
                                    "Donate"
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default Donate