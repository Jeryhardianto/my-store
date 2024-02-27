import Modal from "@/pages/components/ui/Modal";
import Select from "@/pages/components/ui/Select";
import Button from "@/pages/components/ui/button";
import Input from "@/pages/components/ui/input";
import userServices  from "@/services/user";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const form: any = e.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(updatedUser.id, data);

    if (result) {
      setIsLoading(false);
      setUpdatedUser({});

      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);

    } else {
      setIsLoading(false);
    }


  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          type="text"
          placeholder="Fullname"
          name="fullname"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          type="number"
          placeholder="Phone"
          name="phone"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Admin", value: "admin" },
            { label: "Member", value: "member" },
          ]}
        />
        <Button type="submit"> Update User </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;


