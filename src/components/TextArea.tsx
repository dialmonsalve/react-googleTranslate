import { Form } from "react-bootstrap";

interface Props {
	type: string;
	loading?: boolean;
	onChange: (value: string) => void;
	value: string;
}

const commonStyles = { border: 0, height: "200px" };

const getPlaceholder = ({
	type,
	loading,
}: { type: string; loading?: boolean }) => {
	if (type === "from") return "Introducir texto";
	if (loading === true) return "Cargando...";
	return "Traducción";
};

export const TextArea = ({ type, loading, value, onChange }: Props) => {
	const styles =
		type === "from"
			? commonStyles
			: { ...commonStyles, backgroundColor: "#f5f5f5" };

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event.target.value);
	};

	return (
		<Form.Control
			autoFocus={type === "from"}
			as="textarea"
      disabled={type === 'to'}
			placeholder={getPlaceholder({ type, loading })}
			style={styles}
			value={value}
			onChange={handleChange}
		/>
	);
};
