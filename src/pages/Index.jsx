import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const CatBreed = ({ name, description }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-lg">{description}</CardDescription>
    </CardContent>
  </Card>
);

const catImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
];

const catStats = [
  { name: "Indoor", value: 60 },
  { name: "Outdoor", value: 40 },
];

const COLORS = ["#0088FE", "#00C49F"];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes." },
    { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance." },
    { name: "Persian", description: "Characterized by their round face and short muzzle." },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality." },
    { name: "Sphynx", description: "Distinctive for its lack of coat (fur)." },
  ];

  const filteredBreeds = catBreeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">Feline Fascination</h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <img
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-xl text-gray-700 mb-4">
              Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
              independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
              characteristics and personalities.
            </p>
            <h2 className="text-3xl font-semibold mb-4">Popular Cat Breeds</h2>
            <Input
              type="text"
              placeholder="Search cat breeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            {filteredBreeds.map((breed, index) => (
              <CatBreed key={index} name={breed.name} description={breed.description} />
            ))}
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Cat Statistics</h2>
            <Card className="p-4">
              <CardTitle className="mb-4">Indoor vs Outdoor Cats</CardTitle>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={catStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {catStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
