const prisma = require("../config/prisma");

const fetchContacts = async (req) => {
    const { organizationId, userId, page = 1, pageSize = 10, search } = req.body;
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        let whereClause = {
            orgnization_id: organizationId,
        };

        if (search) {
            whereClause = {
                ...whereClause,
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { first_name: { contains: search, mode: 'insensitive' } },
                    { last_name: { contains: search, mode: 'insensitive' } },
                    { emails: { contains: search, mode: 'insensitive' } },
                    { phones: { contains: search, mode: 'insensitive' } },
                ]
            };
        }

        const [contacts, totalCount] = await Promise.all([
            prisma.contacts.findMany({
                where: whereClause,
                skip,
                take,
                orderBy: {
                    created_at: 'desc'
                }
            }),
            prisma.contacts.count({ where: whereClause })
        ]);

        return {
            contacts,
            totalCount,
            page,
            pageSize,
            totalPages: Math.ceil(totalCount / pageSize)
        };
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw new Error('Failed to fetch contacts');
    }
};

module.exports = {
    fetchContacts
};
