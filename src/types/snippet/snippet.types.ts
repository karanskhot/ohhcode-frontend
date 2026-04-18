import { Page } from './page.types';

export type SnippetAnalysis = {
  isValid: boolean;

  meta: {
    title: string;
    tags: string[];
    difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'AMBITIOUS';
    language: 'ENGLISH' | 'HINDI' | 'MARATHI' | 'HINGLISH' | 'SPANISH';
    codeLanguage: 'Java' | 'Python' | 'C' | 'C++' | 'JavaScript' | 'Unknown';
  };

  code: {
    extracted: string;
  };

  recall: {
    summary: string[];
    recognitionSignals: string[];
    whenToUse: string[];
  };

  complexity: {
    time: string;
    space: string;
  };

  practice: {
    relatedProblems: string[];
    selfCheckQuestions: string[];
    interviewFollowUps: string[];
  };
};

export type Snippet = {
  id: string;
  title: string;
  url: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HIGH' | 'AMBITIOUS';
  status: 'UPLOADED' | 'ANALYZED' | 'ANALYZING' | 'FAILED';
  language: 'ENGLISH' | 'HINDI' | 'MARATHI' | 'HINGLISH' | 'SPANISH';
  tags: string[];
  important: boolean;
  memoryNotes?: string;
  analysis?: SnippetAnalysis | null;
  createdAt: string;
  updatedAt: string;
  lastAnalyzedAt?: string | null;
};

export type SnippetPage = Page<Snippet>;

export type SnippetCreateResponse = {
  message: string;
  snippetId: string;
};

export type SnippetAnalysisResponse = {
  snippetId: string;
  status: string;
  message: string;
};

export type SnippetAnalysisInput = {
  language: string;
};
