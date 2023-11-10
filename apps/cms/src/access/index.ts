import type { PayloadRequest, Where } from 'payload/types';

export const authenticatedAndContentManager = ({ req: { user } }: {req: PayloadRequest}) =>
	!!user && ['admin', 'content-manager'].includes(user?.role);

export const authenticatedAndAdmin = ({ req: { user } }: {req: PayloadRequest}) =>
    !!user && ['admin'].includes(user?.role);

export const pageIsPublic = (): Where => ({
    public: {
        equals: true,
    },
});
