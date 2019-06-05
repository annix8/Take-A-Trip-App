const cityData = [
    {
        city: "Sofia",
        places: [
            { name: "Saint Alexander Nevsky Cathedral", address: "pl. Sveti Aleksandar Nevski, 1000 Sofia Center, Sofia", imgs: ["/images/nevski-cathedral-1.jpg", "/images/nevski-cathedral-2.jpg"] },
            { name: "National Palace of Culture", address: "Sofia 10", imgs: [] },
            { name: "Zoo", address: "Sofia Hladilnika", imgs: [] }
        ],
        country: "Bulgaria"
    },
    {
        city: "Pernik",
        places: [
            { name: "Palace of Culture", address: "Pernik center", imgs: [] },
            { name: "Minyor Pernik Stadium", address: "Pernik 52", imgs: [] },
            { name: "Pernik park", address: "Pernik 50", imgs: [] }
        ],
        country: "Bulgaria"
    },
    {
        city: "Burgas",
        places: [
        ],
        country: "Bulgaria"
    }
];

module.exports = {
    cityData: cityData
}