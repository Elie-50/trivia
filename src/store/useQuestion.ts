import { create } from "zustand";
import axios, { isAxiosError } from "axios";
import he from 'he'

export type Difficulty = "easy" | "medium" | "hard" | "any";
export type Type = "multiple" | "boolean" | "any";

export type QuestionType = {
	type: Omit<Type, 'any'>;
	difficulty: Omit<Difficulty, 'any'>;
	category: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

export type Params = {
	type?: Type;
	difficulty?: Difficulty;
	amount: number;
	category?: number;
}

export class Question {
  answers: string[];
	type: Omit<Type, 'any'>;
	difficulty: Omit<Difficulty, 'any'>;
	category: string;
	question: string;
	correct_answer: string;
	selected: string = '';

  constructor(question: QuestionType) {
    // Combine the correct answer with the incorrect answers
    const allAnswers = [...question.incorrect_answers, question.correct_answer];

    // Shuffle the answers using the Fisher-Yates algorithm
    this.answers = this.shuffle(allAnswers);
		this.type = question.type;
		this.difficulty = question.difficulty;
		this.category = question.category;
		this.question = question.question;
		this.correct_answer = question.correct_answer;
  }

  // Fisher-Yates shuffle algorithm
  private shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index
      const j = Math.floor(Math.random() * (i + 1));
      
      // Swap the elements at i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

	public selectAnswer(answer: string) {
		this.selected = answer;
	}

	public displayPrompt(): string {
		if(this.type == 'boolean') {
			return 'True or False';
		} else {
			return 'Select the correct answer';
		}
	}

	public decodeEntities(text: string): string {
    return he.decode(text);
  }
}

interface QuestionStore {
	questions: Question[];
	loading: boolean;
	error: string | null;
	fetchQuestions: (params: Params) => Promise<void>;
}

export const useQuestionStore = create<QuestionStore>((set) => ({
	questions: [],
	loading: false,
	error: null,
	async fetchQuestions(params) {
		console.log("I AM CALLED");
    set({ loading: true, error: null });

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const response = await axios.get('https://opentdb.com/api.php', { params });
        const data = response.data;

        if (data.response_code !== 0) {
          set({ error: 'Error fetching questions', loading: false });
          return;
        }

        const questions: Question[] = data.results.map((question: QuestionType) => new Question(question));

        set({ questions, loading: false });
        return;
      } catch (error: unknown) {
        if (isAxiosError(error) && error.response?.status === 429) {
          retries++;
          const waitTime = Math.pow(2, retries) * 1000;
          console.log(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
          await delay(waitTime);
        } else {
          if (isAxiosError(error)) {
            set({ error: `Axios Error: ${error.message}`, loading: false });
          } else {
            set({ error: 'Unexpected error occurred', loading: false });
          }
          return;
        }
      }
    }

    set({ error: 'Max retries reached. Unable to fetch questions.', loading: false });
  },
}));