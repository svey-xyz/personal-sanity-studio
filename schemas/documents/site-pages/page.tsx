import { defineType, defineField, useCurrentUser } from "sanity";

import { defaultPage } from './templates/defaultPage';
import { homePage } from './templates/homePage';

import { RiPagesFill } from 'react-icons/ri';

import { MdOutlineManageSearch } from 'react-icons/md'



import sanityClient from '@sanity/client';
import { BsRulers } from "react-icons/bs";
const client = sanityClient({
	projectId: 'hautfgiz',
	dataset: 'development',
	apiVersion: '2022-08-11', // use current UTC date - see "specifying API version"!
	useCdn: false, // `false` if you want to ensure fresh data
})

const pageTamples = [homePage, defaultPage]
for (const template of pageTamples) {
	template.hidden = ({ parent, value }) => parent?.pageType != template.name;
	template.group = 'pageContent';
}


export const page = defineType({
	title: "Pages",
	name: "page",
	type: 'document',
	icon: RiPagesFill,
	groups: [
		{
			name: 'pageSettings',
			title: 'Page Settings',
		},
		{
			name: 'pageContent',
			title: 'Page Content',
		},
	],
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			group: 'pageSettings',
			description: 'Title of the page for internal use.',
			validation: Rule => [
				Rule.required().error("Page needs a title!"),
			]
		}),
		defineField({
			name: 'Note',
			type: 'note',
			group: 'pageSettings',
			options: {
				icon: MdOutlineManageSearch,
				headline: 'Optimization Tip',
				message: <>The following fields are incredibly important for your SEO. You can read more <a href="https://developer.mozilla.org/en-US/docs/Glossary/SEO" target = "_blank" >here</ a >.</>,
				tone: 'caution'
			}
		}),
		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			group: 'pageSettings',
			description: 'Custom slugs are generally not recommended, use the generate option.',
			options: {
				source: 'title',
				slugify: input => input
					.toLowerCase()
					.replace(/\s+/g, '-')
					.slice(0, 200)
			},
			validation: Rule => Rule.required()
			
		}),
		defineField({
			title: 'Page Description',
			name: 'description',
			type: 'text',
			group: 'pageSettings',
			description: 'A concise description of the page, if none is provided this page will use the site wide descriptor.',
			validation: Rule => [
				Rule.min(45).warning("Try to be more descriptive."),
				Rule.max(200).warning("This may be too descriptive!")
			]
		}),
		defineField({
			title: 'Page Type',
			name: 'pageType',
			type: 'string',
			group: 'pageContent',
			options: {
				// layout: 'radio',
				list: [
					{ title: 'Home', value: 'homePage' },
					{ title: 'Blocks', value: 'defaultPage' },
				]
			}
		}),
		defaultPage,
		homePage
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare(value: any) {
			return {
				title: value.title,
				media: RiPagesFill
			}
		}
	}
});