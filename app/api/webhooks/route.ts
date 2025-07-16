import { createOrUpdateUser, deleteUser } from '@/app/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)
        const eventType = evt?.type;
        
        if (eventType === 'user.created' || eventType === 'user.updated') {
            const { id, first_name, last_name, image_url, email_addresses, username } = evt?.data;
            try {
                const user = await createOrUpdateUser(
                    id ?? '',
                    first_name ?? '',
                    last_name ?? '',
                    image_url ?? '',
                    email_addresses[0].email_address ?? '',
                    username ?? ''
                )
                if(user && eventType === 'user.created') {
                    try {
                        await clerkClient.users.updateUserMetadata(id, {
                            publicMetadata: {
                            userMongoId: user._id,
                            isAdmin: user.isAdmin,
                            },
                        });
                    }
                    catch(error){
                        console.log('Error updating user metadata:', error);
                    }
                }
            } catch (err) {
                console.error('Error verifying webhook:', err)
                return new Response('Error verifying webhook', { status: 400 })
            }
        }
        if (eventType === 'user.deleted') {
            const { id } = evt?.data;
            try {
                if(id)
                    await deleteUser(id);
                return new Response('id not found', { status: 400 })
            } catch (error) {
                console.log('Error deleting user:', error);
                return new Response('Error occured', {status: 400,});
            }
        }
        return new Response('', { status: 200 });

    } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
    }
}