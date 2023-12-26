import { useReducer } from "react";
import type { State, Action, Language, FromLanguage } from "../types";
import { AUTO_LANGUAGE } from "../constant";

const initialState: State = {
	fromLanguage: "auto",
	toLanguage: "en",
	fromText: "",
	result: "",
	loading: false,
};

function reducer(state: State, action: Action) {
	switch (action.type) {
		case "INTERCHANGE_LANGUAGES":
			if (state.fromLanguage === AUTO_LANGUAGE) return state;
			return {
				...state,
				fromLanguage: state.toLanguage,
				toLanguage: state.fromLanguage,
			};

		case "SET_FROM_LANGUAGE":
			return {
				...state,
				loading: true,
				fromLanguage: action.payload,
			};

		case "SET_TO_LANGUAGE":
			return {
				...state,
				toLanguage: action.payload,
			};

		case "SET_RESULT":
			return {
				...state,
				loading: false,
				result: action.payload,
			};

		case "SET_FROM_TEXT":
			return {
				...state,
				loading: true,
				fromText: action.payload,
				result: "",
			};

		default:
			return state;
	}
}

export function useTranslateReducer() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { fromLanguage, fromText, loading, result, toLanguage } = state;

	const interchangeLanguages = () => {
		dispatch({ type: "INTERCHANGE_LANGUAGES" });
	};

	const setFromLanguage = (payload: FromLanguage) => {
		dispatch({ type: "SET_FROM_LANGUAGE", payload });
	};

	const setToLanguage = (payload: Language) => {
		dispatch({ type: "SET_TO_LANGUAGE", payload });
	};

	const setFromText = (payload: string) => {
		dispatch({ type: "SET_FROM_TEXT", payload });
	};

	const setResults = (payload: string) => {
		dispatch({ type: "SET_RESULT", payload });
	};

	return {
		fromLanguage,
		fromText,
		loading,
		result,
		toLanguage,
		interchangeLanguages,
		setFromLanguage,
		setToLanguage,
		setFromText,
		setResults,
	};
}
