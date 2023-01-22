type FormFieldProps = {
	labelName: string;
	type: string;
	name: string;
	placeholder: string;
	value: string;
	isSurpriseMe?: boolean;
	handleChange: (e: any) => void;
	handleSurpriseMe?: (e: any) => void;
};

function FormField({
	labelName,
	type,
	value,
	name,
	placeholder,
	handleChange,
	isSurpriseMe,
	handleSurpriseMe,
}: FormFieldProps) {
	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<label htmlFor={name} className="block text-sm font-medium text-gray-900">
					{labelName}
				</label>
				{isSurpriseMe && (
					<button
						type="button"
						onClick={handleSurpriseMe}
						className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
					>
						Surprise Me
					</button>
				)}
			</div>
			<input
				type={type}
				id={name}
				name={name}
				className="border-gray-300 border bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				required
			/>
		</div>
	);
}

export default FormField;
