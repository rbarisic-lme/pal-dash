/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.id === 'hello-world') {
		return {
			title: 'Hello world!',
			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
		};
	}

}