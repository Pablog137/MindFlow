export type FaqTypes = {
    question: string;
    answer: string;
};

export const faqs: Array<FaqTypes> = [
    {
        question: "Is your app free to use?",
        answer: "Yes, our app offers a free plan that includes access to all app features. Users on the free plan can create up to 5 pages and enjoy the same functionality as our premium plan users.",
    },
    {
        question:
            "What are the differences between the free and premium plans?",
        answer: "Our premium plan offers additional benefits such as unlimited pages, access to graphs and analytics, and priority customer support. While both plans provide access to all app features, upgrading to premium unlocks advanced capabilities and enhances your overall experience.",
    },
    {
        question: "Is my data secure with your app?",
        answer: "Absolutely. We take security and privacy seriously. All user data is encrypted and stored securely on our servers. We also regularly undergo security audits to ensure compliance with industry standards and best practices.",
    },
    {
        question: "What technologies did you use to build this app?",
        answer: "We utilized a combination of modern web technologies such as React for the frontend, Laravel for the backend, and MySQL for the database. This stack provides a robust foundation for our app's functionality and scalability.",
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes, we provide customer support to assist with any questions or issues you may encounter. Our support team is available via email during business hours and strives to respond to inquiries promptly.",
    },
];
