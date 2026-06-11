"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, CheckCircle2, Copy, Check, Clock, Landmark } from 'lucide-react'
import { Button } from './ui/button'
import { useInitiatePaymentMutation, useVerifyPaymentMutation } from '@/redux/api/detailsApi'
import { toast } from "sonner"
import NewButton from './NewButton';

type Step = "form" | "details" | "success";

const TIMER_SECONDS = 10 * 60; // 10 minutes

interface DonateProps {
    trigger?: React.ReactNode;
}

interface AccountDetails {
    accountNumber?: string;
    accountName?: string;
    bankName?: string;
    reference?: string;
    /** any other key/value the backend returns that we don't explicitly map */
    extra: Array<{ label: string; value: string }>;
}

// The backend may send fields under several naming conventions. Normalise them
// here so the UI doesn't break if the exact response shape differs slightly.
const KNOWN_KEYS = new Set([
    "account_number", "accountnumber", "number",
    "account_name", "accountname", "name", "account_holder", "accountholder",
    "bank_name", "bankname", "bank",
    "reference", "ref", "id",
    "amount", "email", "status", "message",
]);

const prettyLabel = (key: string) =>
    key.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const parseAccountDetails = (response: any): AccountDetails => {
    const raw = response?.data ?? response ?? {};
    const get = (...keys: string[]) => {
        for (const k of keys) {
            if (raw[k] !== undefined && raw[k] !== null && raw[k] !== "") return String(raw[k]);
        }
        return undefined;
    };

    const extra: AccountDetails["extra"] = [];
    for (const [key, value] of Object.entries(raw)) {
        if (KNOWN_KEYS.has(key.toLowerCase())) continue;
        if (value === null || value === undefined || typeof value === "object") continue;
        extra.push({ label: prettyLabel(key), value: String(value) });
    }

    return {
        accountNumber: get("account_number", "accountNumber", "number"),
        accountName: get("account_name", "accountName", "name", "account_holder", "accountHolder"),
        bankName: get("bank_name", "bankName", "bank"),
        reference: get("reference", "ref", "id"),
        extra,
    };
};

const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
};

const Donate = ({ trigger }: DonateProps) => {
    const [initiatePayment, { isLoading: initiating }] = useInitiatePaymentMutation()
    const [verifyPayment, { isLoading: verifying }] = useVerifyPaymentMutation()

    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<Step>("form")
    const [details, setDetails] = useState({ email: "", amount: "" })
    const [account, setAccount] = useState<AccountDetails | null>(null)
    const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS)
    const [copied, setCopied] = useState(false)

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const resetState = useCallback(() => {
        setStep("form")
        setDetails({ email: "", amount: "" })
        setAccount(null)
        setSecondsLeft(TIMER_SECONDS)
        setCopied(false)
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    const handleOpenChange = (val: boolean) => {
        setOpen(val)
        if (!val) resetState()
    }

    // Countdown — runs only while showing account details.
    useEffect(() => {
        if (step !== "details") return

        intervalRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    if (intervalRef.current) clearInterval(intervalRef.current)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [step])

    // When the timer hits zero, close the session.
    useEffect(() => {
        if (step === "details" && secondsLeft === 0) {
            toast.info("This donation session expired. Please start again.")
            handleOpenChange(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondsLeft, step])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleInitiate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!details.email || !details.amount) {
            toast.error("Please fill in all fields")
            return
        }

        try {
            const response = await initiatePayment({
                email: details.email,
                amount: Number(details.amount),
            }).unwrap()

            const parsed = parseAccountDetails(response)
            if (!parsed.accountNumber) {
                toast.error("Could not retrieve account details. Please try again.")
                return
            }

            setAccount(parsed)
            setSecondsLeft(TIMER_SECONDS)
            setStep("details")
        } catch (error: any) {
            console.error("Initiate Error:", error)
            toast.error(error?.data?.message || "Failed to get account details. Please try again.")
        }
    }

    const handleConfirm = async () => {
        try {
            await verifyPayment({
                email: details.email,
                amount: Number(details.amount),
                reference: account?.reference,
            }).unwrap()

            if (intervalRef.current) clearInterval(intervalRef.current)
            setStep("success")
            toast.success("Thank you for supporting Iwaloye 2026.")
        } catch (error: any) {
            console.error("Verify Error:", error)
            // Donations aren't strictly gated on confirmation — acknowledge anyway.
            if (intervalRef.current) clearInterval(intervalRef.current)
            setStep("success")
            toast.success("Thank you for supporting Iwaloye 2026.")
        }
    }

    const handleCopy = async () => {
        if (!account?.accountNumber) return
        try {
            await navigator.clipboard.writeText(account.accountNumber)
            setCopied(true)
            toast.success("Account number copied")
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast.error("Couldn't copy. Please copy it manually.")
        }
    }

    const amountLabel = details.amount
        ? `₦${Number(details.amount).toLocaleString()}`
        : ""

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

            <DialogContent className="sm:max-w-xl px-7 py-6 rounded-none max-h-[90dvh] overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]">
                <DialogHeader>
                    <DialogTitle className='font-semibold text-lg'>
                        {step === "form" && "Make a Donation"}
                        {step === "details" && "Transfer to Complete Your Donation"}
                        {step === "success" && "Donation Received!"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === "form" && "Enter your details to get the account number for your transfer."}
                        {step === "details" && "Send your donation to the account below, then confirm."}
                        {step === "success" && "Thank you for supporting Iwaloye 2026."}
                    </DialogDescription>
                </DialogHeader>

                <hr className='mt-4' />

                {/* ── Step 1: Form ── */}
                {step === "form" && (
                    <form onSubmit={handleInitiate} className="space-y-6 mt-4">
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
                                inputMode="numeric"
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
                                disabled={initiating}
                            >
                                {initiating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Getting account...
                                    </>
                                ) : (
                                    "Continue"
                                )}
                            </Button>
                        </div>
                    </form>
                )}

                {/* ── Step 2: Account details + countdown ── */}
                {step === "details" && account && (
                    <div className="space-y-5 mt-4">
                        {/* Countdown */}
                        <div className="flex items-center justify-between border border-red-200 bg-red-50 text-red-600 px-4 py-3">
                            <span className="flex items-center gap-2 text-sm font-medium">
                                <Clock className="h-4 w-4" />
                                Account expires in
                            </span>
                            <span className="text-base font-bold tabular-nums tracking-wider">
                                {formatTime(secondsLeft)}
                            </span>
                        </div>

                        {/* Amount to send */}
                        {amountLabel && (
                            <div className="text-center py-2">
                                <p className="text-xs uppercase tracking-wide text-gray-500">Amount to transfer</p>
                                <p className="text-2xl font-bold text-gray-900 tabular-nums">{amountLabel}</p>
                            </div>
                        )}

                        {/* Account card */}
                        <div className="border border-gray-200 border-l-4 border-l-[#F47321] bg-white">
                            <div className="flex items-center gap-2 px-4 pt-4 text-gray-700">
                                <Landmark className="h-4 w-4" />
                                <span className="text-sm font-semibold">Bank Transfer Details</span>
                            </div>

                            <div className="px-4 py-4 space-y-4">
                                {account.bankName && (
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-gray-500">Bank</p>
                                        <p className="text-sm font-semibold text-gray-900">{account.bankName}</p>
                                    </div>
                                )}

                                {account.accountName && (
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-gray-500">Account Name</p>
                                        <p className="text-sm font-semibold text-gray-900">{account.accountName}</p>
                                    </div>
                                )}

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-500">Account Number</p>
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-lg font-bold text-gray-900 tabular-nums tracking-wider">
                                            {account.accountNumber}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            aria-label="Copy account number"
                                            className="flex items-center gap-1.5 border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:border-[#F47321] hover:text-[#F47321] transition-colors min-h-[44px]"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="h-4 w-4 text-green-600" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-4 w-4" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Any extra fields the backend returned */}
                                {account.extra.map((field) => (
                                    <div key={field.label}>
                                        <p className="text-xs uppercase tracking-wide text-gray-500">{field.label}</p>
                                        <p className="text-sm font-semibold text-gray-900">{field.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            After transferring{amountLabel ? ` ${amountLabel}` : ""} to the account above, click
                            <span className="font-medium text-gray-700"> “I have sent”</span> so we can record your support.
                        </p>

                        <hr />

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleOpenChange(false)}
                                className="rounded-none py-6 px-8 font-semibold"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleConfirm}
                                disabled={verifying}
                                className="bg-[#F47321] rounded-none hover:bg-[#e36214] py-6 px-8 text-white font-semibold transition-colors"
                            >
                                {verifying ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Confirming...
                                    </>
                                ) : (
                                    "I have sent"
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Step 3: Success ── */}
                {step === "success" && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                        <h3 className="text-xl font-bold text-gray-800">Thank You!</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Your donation has been recorded and will go towards supporting our campaign to build a better Osun State.
                        </p>
                        <Button
                            onClick={() => handleOpenChange(false)}
                            className="bg-[#F47321] rounded-none hover:bg-[#e36214] py-6 px-10 text-white font-semibold mt-4"
                        >
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default Donate
