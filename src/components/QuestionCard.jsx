import { ArrowLeft } from "lucide-react";

function QuestionCard({
    step,
    icon,
    question,
    options,
    selectedOption,
    onSelect,
    onNext,
    onBack,
}) {
    return (
        <div className="relative w-full max-w-xl mx-auto bg-white rounded-2xl px-6 pt-16 pb-8 shadow-md text-center">

            {/* BACK BUTTON */}
            <button
                onClick={onBack}
                className="absolute top-6 left-6 text-gray-400 hover:text-[#1D3557]"
            >
                <ArrowLeft size={20} />
            </button>

            {/* FLOATING ICON */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100">
                    {icon}
                </div>
            </div>

            {/* QUESTION */}
            <h2 className="text-[22px] font-medium text-[#1D3557] mb-8 leading-snug">
                {question}
            </h2>

            {/* OPTIONS */}
            <div className="space-y-3 mb-8">
                {options.map((opt) => {
                    const isSelected = selectedOption === opt;

                    return (
                        <button
                            key={opt}
                            onClick={() => onSelect(opt)}
                            className={`w-full flex items-center px-4 py-3 rounded-full transition-all duration-200 border
                            
                            ${isSelected
                                    ? "border-[#004E7C] bg-[#E6F4FF]"
                                    : "border-gray-200 bg-white hover:bg-gray-50"
                                }
                            `}
                        >
                            {/* DOT */}
                            <div
                                className={`w-5 h-5 rounded-full mr-4 transition-all
                                ${isSelected
                                        ? "bg-[#004E7C]"
                                        : "bg-[#D6EFFF]"
                                    }`}
                            />

                            {/* TEXT */}
                            <span
                                className={`text-base
                                ${isSelected
                                        ? "text-[#004E7C] font-medium"
                                        : "text-gray-500"
                                    }`}
                            >
                                {opt}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* NEXT BUTTON */}
            <button
                onClick={onNext}
                disabled={!selectedOption}
                className={`w-full py-3 rounded-full text-lg font-medium transition-all
                ${selectedOption
                        ? "bg-[#004E7C] text-white hover:bg-[#003656]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
            >
                Next
            </button>

            {/* STEP */}
            <p className="mt-5 text-xs text-gray-300">
                Step {step} of 5
            </p>
        </div>
    );
}

export default QuestionCard;