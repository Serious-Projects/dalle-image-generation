import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../data/constants';

export function getRandomPrompt(prompt: string): string {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];
	if (randomPrompt === prompt) {
		return getRandomPrompt(prompt);
	}
	return randomPrompt;
}

export function downloadImage(id: string, photo: string) {
	FileSaver.saveAs(photo, `download-${id}.jpg`);
}
