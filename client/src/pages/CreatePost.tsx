import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { FormField, Loader } from '../components';
import { getRandomPrompt } from '../utils';

type FormData = {
	name: string;
	prompt: string;
	photo: string;
};

function CreatePost() {
	const navigate = useNavigate();
	const [form, setForm] = useState<FormData>({ name: '', prompt: '', photo: '' });
	const [generatingImg, setGeneratingImg] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const generateImage = async (e: MouseEvent) => {
		if (form.prompt) {
			try {
				setGeneratingImg(true);
				const response = await fetch('http://localhost:8080/api/v1/dalle', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ prompt: form.prompt }),
				});
				const data = await response.json();
				if (data.name !== 'Error') {
					const photoBlob = `data:image/jpeg;base64,${data.photo}`;
					setForm((prev) => ({ ...prev, photo: photoBlob }));
				} else {
					console.log(data);
				}
			} catch (err) {
				alert(err);
			} finally {
				setGeneratingImg(false);
			}
		} else {
			alert('Please enter a prompt');
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (form.prompt && form.photo) {
			setLoading(true);
			try {
				const response = await fetch('http://localhost:8080/api/v1/post', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(form),
				});
				const data = await response.json();
				console.log(data);
				navigate('/');
			} catch (err) {
				alert(err);
			} finally {
				setLoading(false);
			}
		} else {
			alert('Please enter a prompt and generate image');
		}
	};

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
	};

	const handleSurpriseMe = (e: MouseEvent) => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	};

	return (
		<section className="mx-auto max-w-7xl">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
				<p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
					Create imaginative and visually stunning images through by DALL-E AI and share them with the community
				</p>
			</div>

			<form className="max-w-3xl mt-16" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-5">
					<FormField
						labelName="Your Name"
						type="text"
						name="name"
						placeholder="John Doe"
						value={form.name}
						handleChange={handleChange}
					/>

					<FormField
						labelName="Prompt"
						type="text"
						name="prompt"
						placeholder="A plush toy robot sitting against a yellow wall"
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>

					<div className="relative flex items-center justify-center w-64 h-64 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
						{form.photo ? (
							<img src={form.photo} alt={form.prompt} className="object-contain w-full h-full" />
						) : (
							<img src={preview} alt="preview" className="object-contain w-9/12 h-9/12 opacity-40" />
						)}

						{generatingImg && (
							<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
								<Loader />
							</div>
						)}
					</div>
				</div>

				<div className="flex gap-5 mt-5">
					<button
						type="button"
						onClick={generateImage}
						className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-green-900 disabled:text-gray-300"
						disabled={generatingImg}
					>
						{generatingImg ? 'Generating...' : 'Generate'}
					</button>
				</div>

				<div className="mt-10">
					<p className="mt-2 text-[#666e75] text-[14px]">
						Once you have created the image you want, you can share it with others in the community
					</p>
					<button
						type="submit"
						className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5"
					>
						{loading ? 'Sharing...' : 'Share with the community'}
					</button>
				</div>
			</form>
		</section>
	);
}

export default CreatePost;
