export const sundaRecipes = [
    {
        originalId: 1,
        name: "Nasi Liwet Sunda",
        description: "Nasi gurih yang dimasak dengan sersan, rempah, dan ikan asin, khas tradisi Sunda.",
        image: "https://cdn.dummyjson.com/recipe-images/1.webp", // Will act as placeholder
        difficulty: "Medium",
        prepTimeMinutes: 30,
        cookTimeMinutes: 45,
        rating: 4.8,
        tags: ["Main Course", "Traditional"]
    },
    {
        originalId: 2,
        name: "Karedok",
        description: "Salad sayuran mentah dengan bumbu kacang yang lezat dan segar.",
        image: "https://cdn.dummyjson.com/recipe-images/2.webp",
        difficulty: "Easy",
        prepTimeMinutes: 15,
        cookTimeMinutes: 0,
        rating: 4.7,
        tags: ["Side Dish", "Vegetarian"]
    },
    {
        originalId: 3,
        name: "Lotek",
        description: "Sayuran rebus dengan bumbu kacang, mirip gado-gado tapi lebih manis dan kencur terasa.",
        image: "https://cdn.dummyjson.com/recipe-images/3.webp",
        difficulty: "Easy",
        prepTimeMinutes: 20,
        cookTimeMinutes: 10,
        rating: 4.6,
        tags: ["Side Dish", "Vegetarian"]
    },
    {
        originalId: 4,
        name: "Pepes Ikan",
        description: "Ikan yang dibumbui rempah lengkap dan dibungkus daun pisang, dikukus hingga Iembut.",
        image: "https://cdn.dummyjson.com/recipe-images/4.webp",
        difficulty: "Hard",
        prepTimeMinutes: 40,
        cookTimeMinutes: 60,
        rating: 4.9,
        tags: ["Main Course", "Seafood"]
    },
    {
        originalId: 5,
        name: "Sayur Asem",
        description: "Sayur berkuah dengan rasa asam segar dari asam jawa, berisi jagung, melinjo, dan labu siam.",
        image: "https://cdn.dummyjson.com/recipe-images/5.webp",
        difficulty: "Medium",
        prepTimeMinutes: 15,
        cookTimeMinutes: 30,
        rating: 4.8,
        tags: ["Soup", "Traditional"]
    },
    {
        originalId: 6,
        name: "Lalapan + Sambal Terasi",
        description: "Aneka sayuran segar yang disajikan dengan sambal terasi khas yang pedas menggigit.",
        image: "https://cdn.dummyjson.com/recipe-images/6.webp",
        difficulty: "Easy",
        prepTimeMinutes: 10,
        cookTimeMinutes: 5,
        rating: 5.0,
        tags: ["Side Dish", "Spicy"]
    },
    {
        originalId: 7,
        name: "Soto Bandung",
        description: "Soto daging sapi bening dengan pelengkap lobak dan kacang kedelai goreng.",
        image: "https://cdn.dummyjson.com/recipe-images/7.webp",
        difficulty: "Medium",
        prepTimeMinutes: 25,
        cookTimeMinutes: 90,
        rating: 4.7,
        tags: ["Soup", "Main Course"]
    },
    {
        originalId: 8,
        name: "Empal Gentong",
        description: "Daging sapi yang dimasak dalam gentong tanah liat dengan kuah santan gurih.",
        image: "https://cdn.dummyjson.com/recipe-images/8.webp",
        difficulty: "Hard",
        prepTimeMinutes: 30,
        cookTimeMinutes: 120,
        rating: 4.8,
        tags: ["Main Course", "Traditional"]
    }
];

// Helper Function to transform API data to Sundanese data
export function mapToSunda(apiRecipe) {
    const sunda = sundaRecipes.find(r => r.originalId === apiRecipe.id);
    // Only return if it's in our Sunda list
    if (sunda) {
        return {
            ...apiRecipe, // Keep original ID and other props as fallback
            name: sunda.name,
            description: sunda.description,
            image: apiRecipe.image, // Use the real image from API
            cuisine: "Sundanese",
            difficulty: sunda.difficulty,
            prepTimeMinutes: sunda.prepTimeMinutes,
            cookTimeMinutes: sunda.cookTimeMinutes,
            rating: sunda.rating,
            tags: sunda.tags,
            isSunda: true
        };
    }
    return null;
}

export function getSundaRecipes(allApiRecipes) {
    return allApiRecipes
        .map(mapToSunda)
        .filter(Boolean); // Only keep the ones we mapped
}

