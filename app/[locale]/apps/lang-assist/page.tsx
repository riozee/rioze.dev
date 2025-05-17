import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Language Assistant',
	description: 'A tool to assist with language learning',
};

export default function LangAssistPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-4">Language Assistant</h1>
			<p>Welcome to the Language Assistant app. This tool helps you learn new languages.</p>
		</div>
	);
}
