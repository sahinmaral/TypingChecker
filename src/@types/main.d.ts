import { ThemeStatus } from "../config/enums";

export type WordListProps = {
  words: string[];
  wordCountObject: WordCountObject;
};

export type WordCountObject = {
  totalWordCount: number;
  correctWordCount: number;
  wrongWordCount: number;
};

export type GeneratedWordType = {
  word: string;
  status: WordStatus;
  id: string;
};

export type ThemeContextType = {
  currentTheme: ThemeStatus;
  saveTheme: (newTheme: ThemeStatus) => void;
};
