import type { CollectionConfig } from 'payload/types';
import { authenticatedAndAdmin, authenticatedAndContentManager } from '../access/index';

export const usersSlug = 'users';
const Users: CollectionConfig = {
    slug: usersSlug,
    auth: true,
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: authenticatedAndAdmin,
        admin: authenticatedAndContentManager,
        create: authenticatedAndAdmin,
        delete: authenticatedAndAdmin,
        update: authenticatedAndAdmin,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'Content Manager',
                    value: 'content-manager',
                },
                {
                    label: 'User',
                    value: 'user',
                },
            ],
        },
    ],
};

export default Users;
