import instance from "@/lib/axios/instance";

const userServices = {
    getAllUsers: () => instance.get('/api/users'),
}

export default userServices

