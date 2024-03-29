type Currency = {
    id: number;
    name: string;
    value: number;
    symbol: string;
};

export const currencies: Array<Currency> = [
    {
        id: 1,
        name: "USD",
        value: 1,
        symbol: "$",
    },
    {
        id: 2,
        name: "EUR",
        value: 0.85,
        symbol: "€",
    },
    {
        id: 3,
        name: "GBP",
        value: 0.72,
        symbol: "£",
    },
    {
        id: 4,
        name: "JPY",
        value: 110.91,
        symbol: "¥",
    },
    {
        id: 5,
        name: "AUD",
        value: 1.29,
        symbol: "A$",
    },
];
