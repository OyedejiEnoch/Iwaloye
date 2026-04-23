import Image from 'next/image'

const members = [
    { name: "Dr Najeem Folasayo Salaam", role: "Governorship Candidate", image: "portrait.png" },
    { name: "Yemisi Temitope Agiri", role: "Deputy Governorship Candidate", image: "portrait2.jpeg" },
    { name: "Hon Prince Segun Olanibi", role: "Campaign Director General", image: "imageHolder.png" },
    { name: "Hon Abdulhakeem Olaoye", role: "Campaign Director, Osun Central", image: "imageHolder.png" },
    { name: "Hon Gbenga Ogunkanmi", role: "Campaign Director, Osun West", image: "imageHolder.png" },
    { name: "Hon Prince Sikiru Ayedun", role: " Campaign Director, Osun East", image: "imageHolder.png" },

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

const MembersPage = () => {
    return (
        <div className="min-h-screen bg-white pt-10">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-sans  text-gray-900 tracking-wide uppercase">
                        MEMBERS
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base font-light">
                        "Be more than a supporter. Be part of the movement."
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {members.map((member, index) => (
                        <MemberCard key={index} {...member} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MembersPage