'use client'

import { useState, useRef } from 'react'
import { Users, Calendar, Laptop, } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useGetAllLgasQuery, useGetAllPollingUnitsQuery, useGetAllWardsQuery, useRegisterMemberMutation } from '@/redux/api/membershipApi'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Faq from '@/components/landing/Faq'
import { toast } from "sonner"

gsap.registerPlugin(ScrollTrigger)

const Benefits = [
  {
    icon: Users,
    title: "Shape Policy",
    desc: "Influence party decisions and help shape our policy agenda for the future.",
    iconImage: "/icons/membersIcon1.png"
  },
  {
    icon: Calendar,
    title: "Exclusive Updates",
    desc: "Be the first to know, get direct update from the campaign team.",
    iconImage: "/icons/membersIcon2.png"
  },
  {
    icon: Laptop,
    title: "Make an Impact",
    desc: "Work directly with community leaders and make real change happen.",
    iconImage: "/icons/membersIcon3.png"
  }
]

const MembershipPage = () => {
  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    state: "Osun",
    lga: "", // will store ID for queries
    ward: "", // will store ID for queries
    polling_unit: "", // will store ID for queries
    country: "Nigeria",
    disability: false
  })

  // Mutations/Queries
  const [registerMember, { isLoading: isRegistering }] = useRegisterMemberMutation()
  const { data: lgas } = useGetAllLgasQuery(null)
  const { data: wards } = useGetAllWardsQuery(details.lga, { skip: !details.lga })
  const { data: pollingUnits } = useGetAllPollingUnitsQuery(details.ward, { skip: !details.ward })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setDetails(prev => {
      const newState = { ...prev, [name]: value }
      // Reset dependent fields
      if (name === 'lga') {
        newState.ward = ""
        newState.polling_unit = ""
      } else if (name === 'ward') {
        newState.polling_unit = ""
      }
      return newState
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    setDetails(prev => ({
      ...prev,
      [name]: name === 'disability' ? value === 'Yes' : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const phoneRegex = /^\+234\d{10}$/;
    if (!phoneRegex.test(details.phone)) {
      toast.error("Phone number must be in format +2341234567890");
      return;
    }

    const dobDate = new Date(details.dob);
    const today = new Date();
    if (dobDate >= today) {
      toast.error("Date of birth must be before today");
      return;
    }

    if (!details.gender || !details.lga || !details.ward || !details.polling_unit) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Find names from IDs for the payload
      const lgaName = lgas?.find((l: any) => l.id.toString() === details.lga)?.name || "";
      const wardName = wards?.find((w: any) => w.id.toString() === details.ward)?.name || "";
      const puName = pollingUnits?.find((p: any) => p.id.toString() === details.polling_unit)?.name || "";

      const payload = {
        ...details,
        lga: lgaName,
        ward: wardName,
        polling_unit: puName,
      };

      console.log("Submitting Member:", payload);
      await registerMember(payload).unwrap();

      toast.success("Membership registration successful!");
      // Reset form or redirect
      setDetails({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        state: "Osun",
        lga: "",
        ward: "",
        polling_unit: "",
        country: "Nigeria",
        disability: false
      });
    } catch (err: any) {
      console.error("Registration Error:", err);
      toast.error(err?.data?.message || "Registration failed. Please try again.");
    }
  }

  useGSAP(() => {
    // Header reveal
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out"
    })

    // Benefits reveal
    gsap.from(".benefit-card", {
      scrollTrigger: {
        trigger: ".benefits-grid",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out"
    })

    // Form reveal
    gsap.from(".form-section", {
      scrollTrigger: {
        trigger: ".form-section",
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power2.out"
    })

  }, { scope: container })


  return (
    <main ref={container} className="min-h-screen bg-white pt-20 pb-20 overflow-hidden">
      <div className=" mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-18">
          <h1 className="text-4xl md:text-5xl lg:text-[100px] font-sans text-gray-900 mb-4 uppercase tracking-tight">MEMBERSHIP</h1>
          <p className="text-black/70 text-[20px] font-gentium">“Be more than a supporter. Be part of the movement.”</p>
        </div>

        {/* Members Benefits */}
        <section className="mb-24">
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="w-[7px] h-[7px] bg-[#F47321]"></span>
            <h2 className="text-2xl font-bold text-gray-900 font-sans">Members Benefits</h2>
          </div>

          <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {Benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-card flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300">
                  <Image src={benefit.iconImage} alt='icon' width={60} height={60} />
                  {/* <benefit.icon className="text-[#F47321]" size={48} strokeWidth={1} /> */}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Banner Section */}
        <div className="mb-32 w-full hidden md:block">
          <div className="relative w-full aspect-[16/9] md:aspect-[40/13] overflow-hidden rounded-sm shadow-lg">
            <Image
              src="/assets/bannerImage.png"
              alt="Membership Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Join Today Form */}
        <section className="form-section mb-32 max-w-5xl mx-auto px-4 py-12 rounded-sm">
          <div className="flex items-center justify-center gap-2 mb-16">
            <span className="w-[7px] h-[7px] bg-[#F47321]"></span>
            <h2 className="text-2xl font-bold text-gray-900 font-sans">Join Today</h2>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">First Name</label>
                <input
                  type="text"
                  name='first_name'
                  value={details.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Last Name</label>
                <input
                  type="text"
                  name='last_name'
                  value={details.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all"
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Email address</label>
                <input
                  type="email"
                  name='email'
                  value={details.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all"
                />
              </div>

              {/* Gender */}
              <div className="col-span-1 md:col-span-2 space-y-4">
                <label className="text-xs font-bold text-gray-600 block">Gender</label>
                <div className="flex flex-wrap gap-8">
                  {['Male', 'Female', 'Prefer not to say'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-[#F47321] transition-all">
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={details.gender === option}
                          onChange={() => handleRadioChange('gender', option)}
                          className="peer absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="w-2.5 h-2.5 bg-black rounded-full scale-0 peer-checked:scale-100 transition-all"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  name='dob'
                  value={details.dob}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all"
                />
              </div>
              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Phone Number</label>
                <input
                  type="text"
                  name='phone'
                  value={details.phone}
                  onChange={handleChange}
                  placeholder="+2348012345678"
                  className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all"
                />
              </div>

              {/* Disabled */}
              <div className="col-span-1 md:col-span-2 space-y-4">
                <label className="text-xs font-bold text-gray-600 block">Are you Disabled</label>
                <div className="flex gap-8">
                  {['No', 'Yes'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-[#F47321] transition-all">
                        <input
                          type="radio"
                          name="disability"
                          value={option}
                          checked={option === 'Yes' ? details.disability : !details.disability}
                          onChange={() => handleRadioChange('disability', option)}
                          className="peer absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="w-2.5 h-2.5 bg-black rounded-full scale-0 peer-checked:scale-100 transition-all"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Country of residence */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-600">Country of residence</label>
                <Select
                  value={details.country}
                  onValueChange={(val) => handleSelectChange('country', val)}
                >
                  <SelectTrigger className="w-full h-14 px-4 rounded-none border-gray-100 bg-white text-sm text-gray-700 outline-none focus:border-[#F47321] transition-all appearance-none cursor-pointer shadow-sm">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='space-y-4'>
                      <SelectLabel>Country</SelectLabel>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">State</label>
                <Select
                  value={details.state}
                  onValueChange={(val) => handleSelectChange('state', val)}
                >
                  <SelectTrigger className="w-full h-14 px-4 rounded-none border-gray-100 bg-white text-sm text-gray-400 outline-none focus:border-[#F47321] transition-all appearance-none cursor-pointer shadow-sm">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='space-y-4'>
                      <SelectLabel>State</SelectLabel>
                      <SelectItem value="Osun">Osun</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* LGA */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">LGA</label>
                <Select
                  value={details.lga}
                  onValueChange={(val) => handleSelectChange('lga', val)}
                >
                  <SelectTrigger className="w-full h-14 px-4 rounded-none border-gray-100 bg-white text-sm text-gray-400 outline-none focus:border-[#F47321] transition-all appearance-none cursor-pointer shadow-sm">
                    <SelectValue placeholder="Select Local government" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='space-y-4'>
                      <SelectLabel>LGA</SelectLabel>
                      {lgas?.map((lga: any) => (
                        <SelectItem key={lga.id} value={lga.id.toString()}>{lga.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Ward */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Ward</label>
                <Select
                  value={details.ward}
                  onValueChange={(val) => handleSelectChange('ward', val)}
                  disabled={!details.lga}
                >
                  <SelectTrigger className="w-full h-14 px-4 rounded-none border-gray-100 border bg-white text-sm text-gray-400 outline-none focus:border-[#F47321] transition-all appearance-none cursor-pointer shadow-sm">
                    <SelectValue placeholder="Select Ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='space-y-4'>
                      <SelectLabel>Ward</SelectLabel>
                      {wards?.map((ward: any) => (
                        <SelectItem key={ward.id} value={ward.id.toString()}>{ward.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Movement */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Polling Unit</label>
                <Select
                  value={details.polling_unit}
                  onValueChange={(val) => handleSelectChange('polling_unit', val)}
                  disabled={!details.ward}
                >
                  <SelectTrigger className="w-full h-14 px-4 border rounded-none border-gray-100 bg-white text-sm text-gray-400 outline-none focus:border-[#F47321] transition-all appearance-none cursor-pointer shadow-sm">
                    <SelectValue placeholder="Select Polling Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='space-y-4'>
                      <SelectLabel>Polling unit</SelectLabel>
                      {pollingUnits?.map((pu: any) => (
                        <SelectItem key={pu.id} value={pu.id.toString()}>{pu.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex ">
              <button
                type="submit"
                disabled={isRegistering}
                className="w-full max-w-lg p-4 bg-[#F47321] text-white font-bold uppercase text-sm tracking-widest transition-all mt-8 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRegistering ? "REGISTERING..." : "REGISTER"}
              </button>
            </div>
          </form>
        </section>

        {/* FAQ Section */}
        <Faq />

      </div>
    </main>
  )
}

export default MembershipPage
