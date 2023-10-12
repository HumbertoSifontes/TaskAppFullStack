import { useRef, useState } from 'react';
import { useForm } from '../../hooks/useform';
import ButtonEdit from './button_edit';

const UpdateTask = ({ task, handleUpdateTask }) => {
	const { updateDescription, onInputChange } = useForm({
		updateDescription: task.description,
	});

	const [disabled, setDisabled] = useState(true);
	const focusInputRef = useRef();

	const onSubmitUpdate = e => {
		e.preventDefault();

		const id = task.id;
		const description = updateDescription;

		handleUpdateTask(id, description);

		setDisabled(!disabled);

		focusInputRef.current.focus();
	};

	return (
		<form onSubmit={onSubmitUpdate}>
			<input
				type='text'
				className={`input-update ${task.done ? 'text-decoration-dashed' : ''}`}
				name='updateDescription'
				value={updateDescription}
				onChange={onInputChange}
				readOnly={disabled}
				ref={focusInputRef}
			/>
            <ButtonEdit/>
		</form>
	);
};
export default UpdateTask