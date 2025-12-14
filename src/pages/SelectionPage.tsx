import { useState } from "react";
import CategorySelector from "@/components/category-selector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategoryStore } from "@/store/useCategory";
import { useNavigate } from "react-router-dom";
import type { Type, Difficulty } from "@/store/useQuestion";

interface FormData {
  amount: number;
  category: number;
  difficulty: Difficulty;
  type: Type;
  timer: number;
}

function SelectionPage() {
  const { selectedCategory } = useCategoryStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    amount: 10,
    category: selectedCategory,
    difficulty: "any",
    type: "any",
    timer: 60,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({ ...formData, [name]: value });
  };

  const startTrivia = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    const { amount, category, type, timer, difficulty } = formData;
    navigate(`/quiz/?amount=${amount}&category=${category}&type=${type}&difficulty=${difficulty}&timer=${timer}`);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center">Trivia</h1>
      <h3 className="text-2xl text-center text-muted-foreground mt-4">
        Please fill in the following options
      </h3>

      <section id="trivia-options" className="my-6">
        <form onSubmit={startTrivia} className="gap-4 flex flex-col p-4">
          {/* Number of Questions */}
          <div className="flex flex-col">
            <label htmlFor="amount">Number of questions</label>
            <Input
              id="amount"
              type="number"
              placeholder="10"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          {/* Category Selector */}
          <div className="flex flex-col">
            <CategorySelector onSelectChanged={(value) => setFormData({ ...formData, category: value })} />
          </div>

          {/* Difficulty */}
          <div className="flex flex-col">
            <label htmlFor="difficulty">Difficulty</label>
            <Select
              value={formData.difficulty}
              onValueChange={(value: Difficulty) => setFormData({ ...formData, difficulty: value })}
            >
              <SelectTrigger className="mt-2 p-2 border rounded-md">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question Type */}
          <div className="flex flex-col">
            <label htmlFor="type">Question Type</label>
            <Select
              value={formData.type}
              onValueChange={(value: Type) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="mt-2 p-2 border rounded-md">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
                <SelectItem value="boolean">True/False</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timer */}
          <div className="flex flex-col">
            <label htmlFor="timer">Timer (in seconds)</label>
            <Input
              id="timer"
              type="number"
              name="timer"
              placeholder="30"
              value={formData.timer}
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-6 px-4 py-2 bg-chart-1 text-white rounded-md hover:bg-chart-1/80">
            Start Trivia
          </Button>
        </form>
      </section>
    </div>
  );
}

export default SelectionPage;
