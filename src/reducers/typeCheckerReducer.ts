import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { generate } from "random-words";
import { WordStatus } from "../config/enums";
import { uid } from "uid";
import { GeneratedWordType } from "../@types/main";


type KeyStrokeType = {
  correct: number;
  wrong: number;
  total: number;
};

export interface TypeCheckerState {
  generatedWords: GeneratedWordType[];
  timer: number;
  currentWord: string;
  isGameStarted: boolean;
  keyStrokes: KeyStrokeType;
  typedWord: string;
}


const initialState: TypeCheckerState = {
  generatedWords: generate(375).map((word) => {
    return { word: word, status: WordStatus.IDLE, id: uid(16) };
  }),
  timer: 60,
  isGameStarted: false,
  currentWord: "",
  keyStrokes: {
    correct: 0,
    wrong: 0,
    total: 0,
  },
  typedWord: "",
};

export const typeCheckerSlice = createSlice({
  name: "typeChecker",
  initialState,
  reducers: {
    decreaseTimer: (state) => {
      state.timer -= 1;
    },
    startGameStatus: (state) => {
      state.isGameStarted = true;
    },
    resetGameStatus: (state) => {
      state.timer = 60;
      state.isGameStarted = false;
      state.generatedWords = generate(375).map((word) => {
        return { word: word, status: WordStatus.IDLE, id: uid(16) };
      });
    },
    setCurrentWordAsCorrect: (state, action: PayloadAction<string>) => {
      let foundGeneratedWord = state.generatedWords.find(
        (generatedWord) => generatedWord.id === action.payload
      );
      if (foundGeneratedWord != undefined) {
        foundGeneratedWord.status = WordStatus.CORRECT;
        state.typedWord = "";
      }
    },
    setCurrentWordAsWrong: (state, action: PayloadAction<string>) => {
      let foundGeneratedWord = state.generatedWords.find(
        (generatedWord) => generatedWord.id === action.payload
      );
      if (foundGeneratedWord !== undefined) {
        foundGeneratedWord.status = WordStatus.WRONG;
        state.typedWord = "";
      }
    },
    setKeyStrokeAsCorrect: (state, action: PayloadAction<number>) => {
      state.keyStrokes.correct += action.payload;
      state.keyStrokes.total += action.payload;
    },
    setKeyStrokeAsWrong: (state, action: PayloadAction<number>) => {
      state.keyStrokes.wrong += action.payload;
      state.keyStrokes.total += action.payload;
    },
    setTypedWord: (state, action: PayloadAction<string>) => {
      state.typedWord = action.payload;
    },
  },
});

export const {
  decreaseTimer,
  startGameStatus,
  resetGameStatus,
  setCurrentWordAsCorrect,
  setCurrentWordAsWrong,
  setKeyStrokeAsCorrect,
  setKeyStrokeAsWrong,
  setTypedWord,
} = typeCheckerSlice.actions;

export const useTypeChecker = (state: RootState) => state.typeChecker;

export default typeCheckerSlice.reducer;
