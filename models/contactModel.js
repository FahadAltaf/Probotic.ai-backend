const PrismaService = require("../config/service");
const prismaService = new PrismaService();

const fetchContacts = async (req) => {
    const { organizationId, page = 1, pageSize = 10, search } = req.body;
    try {
        const options = {
            whereConditions: [
                { fieldName: 'orgnization_id', fieldValue: organizationId }
            ],
            searchFields: ['name', 'first_name', 'last_name', 'emails', 'phones'],
            searchValue: search,
            page,
            pageSize,
            orderBy: { field: 'created_at', direction: 'DESC' }
        };

        const result = await prismaService.findManyWithPaginationAndSearch('contacts', options);
        
        return {
            contacts: result.results,
            totalCount: result.totalCount,
            page: result.page,
            pageSize: result.pageSize,
            totalPages: result.totalPages
        };
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw new Error('Failed to fetch contacts');
    }
};

module.exports = {
    fetchContacts
};
