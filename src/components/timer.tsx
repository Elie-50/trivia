import { Progress } from "./ui/progress"
import { CheckCheckIcon, TimerIcon } from "lucide-react";
import { useQuestionStore } from "@/store/useQuestion";

interface Props {
	currentValue: number;
	maxValue: number;
}

function Timer({ currentValue, maxValue }: Props) {
	const { questions } = useQuestionStore();
	const getColor = ():string => {
		if (currentValue > 75) return '#00ff00';
		else if (currentValue > 25) return '#ffff00';
		else return '#ff0000';
	}

	const score = questions.reduce((acc, q) => {
    return acc + (q.selected === q.correct_answer ? 1 : 0);
  }, 0);

	const backgroundColor = getColor();
	return (
		<div className="flex flex-col gap-2 fixed w-full px-4 z-20 bg-background py-4 top-0">
			<div className="flex flex-row gap-2">
				{currentValue > 0 ?
					<>
						<TimerIcon />
						<span>{(maxValue * (currentValue / 100)).toFixed(2) } seconds left</span>
					</>
					:
					<div className="flex flex-col">
						<div className="flex flex-row gap-2">
							<CheckCheckIcon />
							<p className="text-lg font-bold">Correct answers: {score}</p>
						</div>
						<p>Score: {(score / questions.length * 100).toFixed(0)}%</p>
					</div>
				}
				
			</div>
			<Progress backgroundColor={backgroundColor} value={currentValue} />
		</div>
	)
}

export default Timer
