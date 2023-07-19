import { WordCountObject } from "./main";

export type WordInputProps = {
  words: string[];
  wordCountObject : WordCountObject,
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setWordCountObject: React.Dispatch<React.SetStateAction<WordCountObject>>;
  gameStarted: boolean;
};
