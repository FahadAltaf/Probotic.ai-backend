const { clerkClient } = require("@clerk/clerk-sdk-node");
const PrismaService = require("../config/service");
const prismaService = new PrismaService();


const insertOrganization = async (data) => {
    try {
        const clerkOrg = await clerkClient.organizations.createOrganization({
            name: `${data.first_name}'s Organization`,
            createdBy: data.id
        });
        const orgPayload = {
            name: `${data.first_name} ${data.last_name}`.trim(),
            email: data.email_addresses?.[0]?.email_address || null,
            phone: data.phone_numbers?.[0]?.phone_number || null,
            address: "",
            id: clerkOrg.id,
            created_at: new Date(),
        }

     
        Object.keys(orgPayload).forEach(key => {
            if (data[key] === undefined) {
                delete data[key];
            }
        });

        return  await prismaService.insert('orgnizations', orgPayload);
    } catch (error) {
        console.error('Error inserting organization:', error);
        throw new Error('Failed to insert organization');
    }
};

const getOrgnizations = async (req) => {
    try {

    } catch (error) {
        console.error('Error get organization:', error);
        throw new Error('Failed to get organization');
    }
};

module.exports = { insertOrganization, getOrgnizations };
