import { useEffect } from "react";
import { useQuestionStore, type Difficulty, type Params, type Type } from "@/store/useQuestion";
import { useCategoryStore } from "@/store/useCategory";
import QuestionCard from "@/components/question-card";
import Loading from "./Loading";

interface QuestionsListProps {
  amount: number;
  category?: number;
  difficulty?: Difficulty;
  type?: Type;
	time: number;
}

const QuestionsList = ({ amount, category, difficulty, type, time }: QuestionsListProps) => {
  const { questions, loading, error, fetchQuestions } = useQuestionStore();
	const { categories, fetchCategories } = useCategoryStore();

	useEffect(() => {
		if (categories.length == 0) {
			fetchCategories();
		}
	}, [categories.length, fetchCategories])

  useEffect(() => {
		let cat: number | undefined = category;

		if (categories.length == 0) {
			return;
		}

		if (cat == undefined) {
			cat = 1;
		}

    const params: Params = {
			amount
    };
		
		if (cat == 0) {
			cat = Math.round(Math.random() * (categories.length - 2)) + 2;
		}

		if (difficulty != 'any') {
			params.difficulty = difficulty;
		}

		if (type != 'any') {
			params.type = type
		}

		if (cat >= 9) {
			params.category = cat;
		}

    fetchQuestions(params);
  }, [amount, category, difficulty, type, fetchQuestions, categories.length]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="mt-10 text-center text-3xl text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 mb-4 mt-10">
      {questions.map((question, index) => (
        <QuestionCard time={time} key={index} questionData={question} />
      ))}
    </div>
  );
};

export default QuestionsList;
