import { AiOutlineEnvironment, AiOutlineMessage, AiOutlineBook } from "react-icons/ai"; 

const highlights = [
  {
    icon: <AiOutlineEnvironment className="text-cyan-500 w-8 h-8" />,
    title: "Explore Campus",
    description: "Discover prominent places, events, and the hidden gems around KUET to make your campus life vibrant."
  },
  {
    icon: <AiOutlineMessage className="text-amber-400 w-8 h-8" />,
    title: "Share Experiences",
    description: "Share your random thoughts, experiences, or tips with your batchmates and inspire others."
  },
  {
    icon: <AiOutlineBook className="text-green-400 w-8 h-8" />,
    title: "Subject Reviews & Help",
    description: "Get or give guidance on subjects, courses, and projects — learn and help your peers grow academically."
  }
];

const HighLight = () => {
  return (
    <div className="w-full py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-slate-800/50 backdrop-blur-md rounded-xl p-6 hover:scale-105 transform transition duration-300 shadow-lg"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
            <p className="text-center text-slate-300 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighLight;
