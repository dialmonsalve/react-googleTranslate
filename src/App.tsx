import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";

import "./App.css";
import { useTranslateReducer } from "./hooks/useTranslateReducer";
import { AUTO_LANGUAGE } from "./constant";
import { ArrowsIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
	const {
		loading,
		fromLanguage,
		toLanguage,
		fromText,
		result,
		interchangeLanguages,
		setFromLanguage,
		setToLanguage,
		setFromText,
		setResults,
	} = useTranslateReducer();

	const debouncedFromText = useDebounce({ value: fromText, delay: 300 });

	useEffect(() => {
		if (debouncedFromText === "") return;
		translate({ fromLanguage, toLanguage, text: debouncedFromText })
			.then((result) => {
				if (result === null) return;
				setResults(result);
			})
			.catch(() => {
				setResults("Error");
			});
	}, [debouncedFromText, fromLanguage, toLanguage]);

	return (
		<Container fluid>
			<h1>Translate</h1>
			<Row>
				<Col xs="auto">
					<Stack gap={2}>
						<LanguageSelector
							type="from"
							value={fromLanguage}
							onChange={setFromLanguage}
						/>
						<TextArea type="from" value={fromText} onChange={setFromText} />
					</Stack>
				</Col>
				<Col>
					<Button
						variant="link"
						type="button"
						disabled={fromLanguage === AUTO_LANGUAGE}
						onClick={interchangeLanguages}
					>
						<ArrowsIcon />
					</Button>
				</Col>

				<Col xs="auto">
					<Stack gap={2}>
						<LanguageSelector
							type="to"
							value={toLanguage}
							onChange={setToLanguage}
						/>
						<TextArea
							type="to"
							value={result}
							onChange={setResults}
							loading={loading}
						/>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
