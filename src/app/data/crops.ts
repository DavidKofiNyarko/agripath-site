// Crops data for AgriPath investment platform
export interface Crop {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
  unit: string;
  roi: string;
  roiValue: string;
  duration: string;
  unitsSold: string;
  totalUnits: string;
  status: 'Available' | 'Coming soon';
  description: string;
  about: string;
  benefits: string[];
  maturityTime?: string;
}

export const crops: Crop[] = [
  {
    id: 1,
    name: "Tomatoes",
    slug: "tomatoes",
    image: "/crops/Tomatoes.png",
    price: "GHS 3,000",
    unit: "per Unit",
    roi: "ROI: 15-20%",
    roiValue: "15-20%",
    duration: "3-4 Months",
    unitsSold: "3,295",
    totalUnits: "5,000",
    status: "Available",
    description: "Invest in our high-yield tomato farming project",
    about: "Tomatoes remain a staple crop with consistent market demand, making them an excellent investment choice. Tomatoes are one of the most consumed vegetables worldwide, with high demand from households, food processors, and export markets. Investing in tomato farming guarantees strong market positioning and attractive returns.",
    benefits: [
      "Tomatoes are essential for sauces, stews, and processed foods.",
      "High consumer demand leads to steady price stability.",
      "6-Monthly Returns",
      "Eco-Friendly Farming",
      "Sustainability and Biodiversity",
      "Green Agriculture Practices"
    ],
    maturityTime: "2027-09-30"
  },
  {
    id: 2,
    name: "Yellow Maize",
    slug: "yellow-maize",
    image: "/crops/Maize.png",
    price: "GHS 3,000",
    unit: "per Unit",
    roi: "ROI: 15-20%",
    roiValue: "15-20%",
    duration: "4-5 Months",
    unitsSold: "2,760",
    totalUnits: "4,000",
    status: "Available",
    description: "Invest in our sustainable maize farming project",
    about: "Yellow maize is a staple food in many African countries and has consistent demand in both local and international markets. Our maize farming projects use sustainable practices and high-yield varieties to maximize returns for investors.",
    benefits: [
      "Strong demand from both human consumption and animal feed markets",
      "Drought-resistant varieties for reliable harvests",
      "6-Monthly Returns",
      "Eco-Friendly Farming",
      "Sustainability and Biodiversity",
      "Green Agriculture Practices"
    ],
    maturityTime: "2027-10-15"
  },
  {
    id: 3,
    name: "Chilli Pepper",
    slug: "chilli-pepper",
    image: "/crops/Chilli peppers.png",
    price: "GHS 3,000",
    unit: "per Unit",
    roi: "ROI: 15-20%",
    roiValue: "15-20%",
    duration: "3-4 Months",
    unitsSold: "1,850",
    totalUnits: "3,500",
    status: "Coming soon",
    description: "Invest in our spicy chilli pepper farming project",
    about: "Chilli peppers are in high demand for local cuisine and export markets. Our chilli pepper farms use sustainable practices to grow high-quality, spicy varieties that command premium prices in the market.",
    benefits: [
      "High-value crop with strong export potential",
      "Multiple harvests per season for improved yield",
      "Quarterly Returns",
      "Eco-Friendly Farming",
      "Sustainability and Biodiversity",
      "Green Agriculture Practices"
    ],
    maturityTime: "2027-11-20"
  },
  {
    id: 4,
    name: "Okro",
    slug: "okro",
    image: "/crops/okro.png",
    price: "GHS 3,000",
    unit: "per Unit",
    roi: "ROI: 15-20%",
    roiValue: "15-20%",
    duration: "2-3 Months",
    unitsSold: "1,200",
    totalUnits: "2,500",
    status: "Available",
    description: "Invest in our nutritious okro farming project",
    about: "Okro (okra) is a nutritious vegetable with high demand in local markets. Our okro farming projects focus on organic cultivation methods that enhance crop quality and yield.",
    benefits: [
      "Quick growing cycle allows for multiple harvests per year",
      "Low maintenance crop with good market demand",
      "6-Monthly Returns",
      "Eco-Friendly Farming",
      "Sustainability and Biodiversity",
      "Green Agriculture Practices"
    ],
    maturityTime: "2027-08-10"
  },
  {
    id: 5,
    name: "Pepper",
    slug: "pepper",
    image: "/crops/pepper.png",
    price: "GHS 3,000",
    unit: "per Unit",
    roi: "ROI: 15-20%",
    roiValue: "15-20%",
    duration: "3-4 Months",
    unitsSold: "2,100",
    totalUnits: "3,000",
    status: "Available",
    description: "Invest in our versatile pepper farming project",
    about: "Bell peppers are versatile vegetables used in various cuisines worldwide. Our pepper farming projects utilize modern farming techniques to maximize yield and quality.",
    benefits: [
      "High-value crop with consistent market demand",
      "Variety of pepper types grown to diversify market options",
      "6-Monthly Returns",
      "Eco-Friendly Farming",
      "Sustainability and Biodiversity",
      "Green Agriculture Practices"
    ],
    maturityTime: "2027-09-05"
  },
  {
    id: 6,
    name: "Sweet Potatoes",
    slug: "sweet-potatoes",
    image: "/crops/Potato.png",
    price: "GHS 3,000",
    unit: "per Unit",
    roi: "ROI: 15-20%",
    roiValue: "15-20%",
    duration: "4-5 Months",
    unitsSold: "980",
    totalUnits: "2,000",
    status: "Coming soon",
    description: "Invest in our nutritious sweet potato farming project",
    about: "Sweet potatoes are nutrient-rich root vegetables with growing demand in health-conscious markets. Our sweet potato farms focus on growing high-yield, nutritious varieties.",
    benefits: [
      "Long shelf life reduces post-harvest losses",
      "Growing popularity in export markets",
      "Annual Returns",
      "Eco-Friendly Farming",
      "Sustainability and Biodiversity",
      "Green Agriculture Practices"
    ],
    maturityTime: "2028-01-15"
  },
  {
    id: 7,
    name: "Rice",
    slug: "rice",
    image: "/crops/rice.png",
    price: "GHS 3,000",
    unit: "per Unit",
    roi: "ROI: 15-20%",
    roiValue: "15-20%",
    duration: "4-6 Months",
    unitsSold: "1,500",
    totalUnits: "3,000",
    status: "Coming soon",
    description: "Invest in our essential rice farming project",
    about: "Rice is a staple food for billions of people worldwide. Our rice farming projects use sustainable irrigation and cultivation methods to produce high-quality rice varieties.",
    benefits: [
      "Consistent demand across all economic conditions",
      "Government support programs for rice cultivation",
      "Annual Returns",
      "Eco-Friendly Farming",
      "Sustainability and Biodiversity",
      "Green Agriculture Practices"
    ],
    maturityTime: "2028-02-10"
  },
  {
    id: 8,
    name: "Ginger",
    slug: "ginger",
    image: "/crops/ginger.png",
    price: "GHS 3,000",
    unit: "per Unit",
    roi: "ROI: 15-20%",
    roiValue: "15-20%",
    duration: "9-10 Months",
    unitsSold: "800",
    totalUnits: "1,500",
    status: "Coming soon",
    description: "Invest in our aromatic ginger farming project",
    about: "Ginger is a high-value spice with applications in food, beverages, and medicinal products. Our ginger farming projects focus on organic cultivation of premium varieties.",
    benefits: [
      "High value per weight makes it profitable despite longer growing cycle",
      "Strong export potential to international markets",
      "Annual Returns",
      "Eco-Friendly Farming",
      "Sustainability and Biodiversity",
      "Green Agriculture Practices"
    ],
    maturityTime: "2028-06-20"
  }
];

export const getCropBySlug = (slug: string): Crop | undefined => {
  return crops.find(crop => crop.slug === slug);
};

export const getRelatedCrops = (currentSlug: string, limit: number = 5): Crop[] => {
  return crops
    .filter(crop => crop.slug !== currentSlug)
    .slice(0, limit);
}; 