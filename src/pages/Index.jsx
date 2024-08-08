import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Info, Heart, X } from "lucide-react";

const CatBreed = ({ name, description, image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            {isOpen ? <X size={24} /> : <Info size={24} />}
          </div>
        </CardHeader>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent>
                <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
                <CardDescription className="text-lg">{description}</CardDescription>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

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

const catBreeds = [
  { 
    name: "Siamese", 
    description: "Known for their distinctive color points and blue eyes.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg"
  },
  { 
    name: "Maine Coon", 
    description: "One of the largest domesticated cat breeds with a distinctive physical appearance.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG"
  },
  { 
    name: "Persian", 
    description: "Characterized by their round face and short muzzle.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg"
  },
  { 
    name: "Bengal", 
    description: "Known for their wild appearance and energetic personality.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg"
  },
  { 
    name: "Sphynx", 
    description: "Distinctive for its lack of coat (fur).",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg"
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("breeds");
  const [likedBreeds, setLikedBreeds] = useState([]);

  useEffect(() => {
    const storedLikedBreeds = localStorage.getItem("likedBreeds");
    if (storedLikedBreeds) {
      setLikedBreeds(JSON.parse(storedLikedBreeds));
    }
  }, []);

  const toggleLikeBreed = (breedName) => {
    const updatedLikedBreeds = likedBreeds.includes(breedName)
      ? likedBreeds.filter(name => name !== breedName)
      : [...likedBreeds, breedName];
    setLikedBreeds(updatedLikedBreeds);
    localStorage.setItem("likedBreeds", JSON.stringify(updatedLikedBreeds));
  };

  const filteredBreeds = catBreeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-6 text-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Feline Fascination
        </motion.h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.img
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="stats">Cat Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="breeds">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold mb-4">Popular Cat Breeds</CardTitle>
                <CardDescription>
                  Cats come in various breeds, each with its unique characteristics and personalities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="Search cat breeds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                <AnimatePresence>
                  {filteredBreeds.map((breed, index) => (
                    <motion.div key={breed.name} layout>
                      <CatBreed {...breed} />
                      <Button
                        variant="outline"
                        className="mb-4"
                        onClick={() => toggleLikeBreed(breed.name)}
                      >
                        {likedBreeds.includes(breed.name) ? (
                          <Heart className="mr-2 h-4 w-4 fill-current" />
                        ) : (
                          <Heart className="mr-2 h-4 w-4" />
                        )}
                        {likedBreeds.includes(breed.name) ? "Unlike" : "Like"}
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold mb-4">Cat Statistics</CardTitle>
                <CardDescription>
                  Interesting facts and figures about our feline friends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4">Indoor vs Outdoor Cats</h3>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {likedBreeds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 mt-8">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold mb-4">Your Favorite Breeds</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {likedBreeds.map((breed) => (
                    <li key={breed} className="text-lg mb-2">{breed}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
