import { useState, useEffect } from 'react';
import Timer from '@/components/timer';
import { useLocation } from 'react-router-dom';
import QuestionsList from '@/components/questions-list';
import { useQuestionStore, type Difficulty, type Type } from "@/store/useQuestion";

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

function QuizPage() {
  const queryParams = useQueryParams();
  const amount = Number(queryParams.get('amount')) || 10;
  const category = Number(queryParams.get('category'));
  const type = queryParams.get('type') || 'any';
  const difficulty = queryParams.get('difficulty') || 'any';
  const timer = queryParams.get('timer');

  const { questions } = useQuestionStore();

  const initialTimerValue = timer ? parseFloat(timer) : 60;

  const [currentTimerValue, setCurrentTimerValue] = useState(initialTimerValue);

  const percentage = (currentTimerValue / initialTimerValue) * 100;

  useEffect(() => {
    if (questions.length == 0) {
      return;
    }

    let startTime: number;
    let lastUpdateTime: number = 0;
    let elapsedTime: number = 0;

    const smoothTimer = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      elapsedTime = timestamp - startTime;

      const timeLeft = initialTimerValue - elapsedTime / 1000;

      if (timeLeft > 0) {
        setCurrentTimerValue(timeLeft);
        lastUpdateTime = timestamp;
        requestAnimationFrame(smoothTimer);
      } else {
        setCurrentTimerValue(0);
      }
    };

    requestAnimationFrame(smoothTimer);

    return () => cancelAnimationFrame(lastUpdateTime);
  }, [initialTimerValue, questions]);

  return (
    <div>
      <h1>Trivia Questions</h1>
      <Timer maxValue={initialTimerValue} currentValue={percentage} />

      <QuestionsList
        time={currentTimerValue}
        amount={amount}
        category={category}
        difficulty={difficulty as Difficulty}
        type={type  as Type}
      />
    </div>
  );
}

export default QuizPage;
