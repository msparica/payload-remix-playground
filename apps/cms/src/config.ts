import path from 'path';
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config';
import Users from './collections/Users';
import { Payload } from 'payload';
import { seedPages, seedUsers } from './seed/index';
import Media from './collections/Media';
import Pages from './collections/Pages';

const MONGODB_URL = process.env.MONGODB_URL ?? "";

const config = buildConfig({
    admin: {
        user: Users.slug,
		bundler: webpackBundler(),
		webpack: (config) => {
			config.entry = {
				main: [
					// hot reload not working for some reason
					// path.resolve(__dirname, '../../../node_modules/.pnpm/webpack-hot-middleware@2.25.4/node_modules/webpack-hot-middleware/client.js') + '?path=/admin/__webpack_hmr',
					path.resolve(__dirname, '../node_modules/payload/dist/admin')
				]
			};
			
			return config;
		},
    },
    collections: [Users, Media, Pages],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'payload-schema.graphql'),
    },
    onInit: async (payload: Payload) => {
        if (process.env.NODE_ENV === 'development') {
            await seedUsers(payload);
            await seedPages(payload);
        }
    },
	editor: slateEditor({}),
	db: mongooseAdapter({
		url: MONGODB_URL,
	}),
});

export default config;
