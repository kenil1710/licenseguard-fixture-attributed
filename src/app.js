import slugify from '../vendor/slugify.js';

const posts = new Map();

export function addPost(title, body) {
	const slug = slugify(title);
	if (posts.has(slug)) {
		throw new Error(`A post called "${title}" already exists`);
	}
	const post = {slug, title, body, createdAt: new Date().toISOString(), views: 0};
	posts.set(slug, post);
	return post;
}

export function viewPost(slug) {
	const post = posts.get(slug);
	if (!post) {
		return undefined;
	}
	post.views += 1;
	return {...post};
}

export function listPosts({sortBy = 'createdAt', limit = 10} = {}) {
	const all = [...posts.values()];
	all.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : a[sortBy] > b[sortBy] ? -1 : 0));
	return all.slice(0, limit).map(({slug, title, views}) => ({slug, title, views}));
}

export function removePost(slug) {
	return posts.delete(slug);
}
