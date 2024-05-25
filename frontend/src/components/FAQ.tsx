import { useState } from "react";
import { faqs } from "../data/faqs";
import { QACollapse } from "./QACollapse";

export const Faq = () => {
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

    const handleExpanderClick = (id: string) => {
        setExpandedFaq((prev) => (prev === id ? null : id));
    };

    return (
        <section id="faqs" className="grid grid-cols-12 pb-10">
            <div className="col-start-3 col-end-11 flex text-white flex-col items-center gap-10 my-20">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8">
                    FAQs
                </h1>
                {faqs.map((faq) => (
                    <QACollapse
                        id={faq.question}
                        key={faq.question}
                        question={faq.question}
                        answer={faq.answer}
                        isExpanded={expandedFaq === faq.question}
                        onClick={handleExpanderClick}
                    />
                ))}
            </div>
        </section>
    );
};
