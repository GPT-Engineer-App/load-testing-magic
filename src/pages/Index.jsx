import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CatBreed = ({ name, description }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const Index = () => {
  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes." },
    { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance." },
    { name: "Persian", description: "Characterized by their round face and short muzzle." },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">All About Cats</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
          alt="A cute cat"
          className="mx-auto object-cover w-full h-[400px] rounded-lg mb-8"
        />
        <p className="text-xl text-gray-700 mb-8">
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
          independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
          characteristics and personalities.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Popular Cat Breeds</h2>
        {catBreeds.map((breed, index) => (
          <CatBreed key={index} name={breed.name} description={breed.description} />
        ))}
      </div>
    </div>
  );
};

export default Index;
