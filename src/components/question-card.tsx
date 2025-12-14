import type { Question } from '@/store/useQuestion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from './ui/button';
import { useState } from 'react';

interface QuestionCardProps {
  questionData: Question;
	time: number;
}

const QuestionCard = ({ questionData, time }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerClick = (answer: string) => {
    // Prevent changing answer after selection
    if (isAnswered || time <= 0) return;

    setSelectedAnswer(answer);
		questionData.selectAnswer(answer);
    setIsAnswered(true);
    setIsCorrect(answer === questionData.correct_answer);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg">
      <CardHeader>
        <p className="text-xl font-bold text-center mb-2">
          {questionData.decodeEntities(questionData.category)}
        </p>
        <p className="text-md text-center text-muted-foreground">
          {questionData.displayPrompt()}
        </p>
				<p className="text-sm text-center text-muted-foreground capitalize">
          {questionData.difficulty}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4 text-center">{questionData.decodeEntities(questionData.question)}</p>
        <div className="space-y-3">
          {questionData.answers.map((answer, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`w-full bg-input text-foreground hover:bg-background/30
								${(selectedAnswer === answer && !isCorrect && 'bg-red-500 hover:bg-red-500' )}
								${isAnswered && answer == questionData.correct_answer && 'bg-green-500 hover:bg-green-500'}
								hover:cursor-pointer`}
            >
							<span>{questionData.decodeEntities(answer)}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
