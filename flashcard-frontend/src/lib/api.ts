export interface Answer {
    text: string;
    isCorrect: boolean;
}

export type Question = {
    id?: string;
    question: string;
    categoryId: string;
    answers: Answer[];
};

// Replace with your actual backend URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Fetch all questions
export async function fetchQuestions(): Promise<Question[]> {
    const res = await fetch(`${API_BASE}/questions`);
    if (!res.ok) throw new Error('Failed to fetch questions');
    return res.json();
}

// Add a new question
export async function addQuestion(question: Question): Promise<Question> {
    const res = await fetch(`${API_BASE}/add-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question),
    });
    if (!res.ok) throw new Error('Failed to add question');
    return res.json();
}

// Fetch questions by category
export async function fetchQuestionsByCategory(category: string): Promise<Question[]> {
    const res = await fetch(`${API_BASE}/questions-by-category?categoryId=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Failed to fetch questions by category');
    return res.json();
}

export async function fetchCategories(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export async function addCategory(name: string, description: string, imageUrl: string): Promise<void> {
    const res = await fetch(`${API_BASE}/add-category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, imageUrl }),
    });
    if (!res.ok) throw new Error('Failed to add category');
}
