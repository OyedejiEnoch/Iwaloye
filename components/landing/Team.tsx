import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronsRight } from "lucide-react";
import NewButton from "../NewButton";

const members = [
    { name: "Dr Najeem Folasayo Salaam", role: "Governorship Candidate", image: "portrait.png" },
    { name: "Yemisi Temitope Agiri", role: "Deputy Governorship Candidate", image: "portrait2.jpeg" },
    { name: "Hon Prince Segun Olanibi", role: "Campaign Director General", image: "imageHolder.png" },
    { name: "Hon Abdulhakeem Olaoye", role: "Campaign Director, Osun Central", image: "imageHolder.png" },

]

const MemberCard = ({ name, role, image }: { name: string; role: string, image: string }) => (
    <div className="flex flex-col border border-gray-100 p-1 bg-white hover:shadow-sm transition-shadow">
        <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
            <Image
                src={`/assets/${image}`}
                alt={name}
                fill
                className="object-cover"
            />
        </div>
        <div className="py-6 text-center space-y-1">
            <h3 className="font-bold text-gray-900 text-sm md:text-base">
                {name}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">
                {role}
            </p>
        </div>
    </div>
)

const Team = () => {
    return (
        <section className='py-16 md:py-22 bg-white overflow-hidden'>
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-16 md:mb-24 space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-[70px] font-sans font-semibold text-gray-900 tracking-wide uppercase">
                        Meet the campaign team
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base font-light">
                        “Leaders, strategists, and volunteers united to drive meaningful change.”
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {members.map((member, index) => (
                        <MemberCard key={index} {...member} />
                    ))}
                </div>
            </div>

            <div className='mt-8 md:mt-20 flex justify-center'>

                {/* <NewButton text='View All' link='/team' className="w-[225px] h-[60px] bg-black text-white" hoverBgClass="bg-white border border-black" hoverTextClass="group-hover:text-black" /> */}
            </div>
        </section>
    )
}

export default Team