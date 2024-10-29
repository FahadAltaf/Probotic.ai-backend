const prisma = require("../config/prisma");
const { clerkClient } = require('@clerk/clerk-sdk-node');
const { insertOrganization } = require("../models/orgnizationModel");

const insertUser = async (webhookPayload) => {
    try {
        const data = webhookPayload;
        try {
            let user = await prisma.users.findUnique({
                where: { id: data.id }
            });
            if (!user) {
                const newOrg = await insertOrganization(data);
                user = await prisma.users.create({  
                    data: {
                        id: data.id,
                        name: `${data.first_name} ${data.last_name}`.trim(),
                        avatar: data.image_url,
                        organization_id: newOrg.id,
                        role: 'admin',
                    }
                });
                if (newOrg.id && data.id) {
                    try {
                        await clerkClient.organizations.updateOrganizationMembership({
                            organizationId: newOrg.id,
                            userId: data.id,
                            role: 'org:admin'
                        });
                        
                        await setActiveOrganization(data.id, newOrg.id);
                    } catch (clerkError) {
                        console.error('Error updating Clerk organization membership:', clerkError);
                        // Continue execution even if this fails
                    }
                }
            }
        } catch (prismaError) {
            console.error('Error creating/updating user in Prisma:', prismaError);
            throw new Error('Failed to create/update user in database');
        }
        return true;
    } catch (error) {
        console.error('Error inserting user and organization:', error);
        throw new Error('Failed to insert user and create organization');
    }
};

// Updated function to set the active organization and add metadata
const setActiveOrganization = async (userId, organizationId) => {
    try {
        await clerkClient.users.updateUser(userId, {
            lastActiveOrganizationId: organizationId,
            publicMetadata: {
                organizationId: organizationId
            }
        });
    } catch (error) {
        console.error('Error setting active organization:', error);
    }
};

const fetchUserById = async (req) => {
    try {
        const { userId } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({ message: 'failed to fetch user data' });
    }
};

module.exports = { insertUser, fetchUserById, setActiveOrganization };
