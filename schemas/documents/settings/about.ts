import { defineType, defineField } from "sanity";
import { emailValidation } from "../../components/validation/emailValidation";

export const about = defineType({
	title: 'About',
	name: 'about',
	type: 'document',
	fields: [
		defineField({
			title: 'Name',
			name: 'name',
			type: 'string'
		}),
		defineField({
			title: 'Description',
			name: 'description',
			description: 'A detailed about section.',
			type: 'array',
			of: [{ type: 'block' }]
		}),
		defineField({
			title: 'Curriculum Vitae',
			name: 'curriculumVitae',
			type: 'file'
		}),
		defineField({
			title: 'Avatar',
			name: 'avatar',
			type: 'image',
			description: 'Portrait orientation works best.'
		}),
		defineField({
			title: 'Email',
			name: 'email',
			type: 'string',
			validation: Rule => Rule.custom((formContact: string) => emailValidation(formContact))
		}),
		defineField({
			title: 'Phone Number',
			name: 'phoneNumber',
			type: 'string'
		}),
		defineField({
			title: 'Socials',
			name: 'social',
			description: 'A list of all related social media accounts. The first social is treated as the primary.',
			type: 'array',
			of: [{ type: 'socialSite' }]
		})
	]
})