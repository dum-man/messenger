import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Button, TextInput } from "../../../../components";
import { updateUserProfile } from "../../api";
import { auth } from "../../../../firebase";
import useAppContext from "../../../../hooks/useAppContext";

const Form = styled.form`
  padding: 0 10px;
  @media (max-width: 768px) {
    margin-bottom: auto;
  }
`;

interface UserFormProps {
  selectedImage: string | null;
}

const UserForm: React.FC<UserFormProps> = ({ selectedImage }) => {
  const { setSetUserDataOpen } = useAppContext();

  const [currentUser] = useAuthState(auth);

  const displayNameRef = useRef<HTMLInputElement | null>(null);

  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formattedDisplayName = displayNameRef.current?.value;

    if (!currentUser) {
      return;
    }
    if (!formattedDisplayName) {
      toast.error("Username must be specified");
      return;
    }
    setUpdating(true);

    try {
      await updateUserProfile(selectedImage, formattedDisplayName, currentUser);
      setSetUserDataOpen(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setUpdating(false);
  };

  useEffect(() => {
    if (displayNameRef.current) {
      displayNameRef.current.value = currentUser?.displayName || "";
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <TextInput
        id="username"
        placeholder="Create username"
        maxLength={20}
        inputRef={displayNameRef}
      />
      <Button type="submit" loading={updating} variant="dark">
        Save
      </Button>
    </Form>
  );
};

export default UserForm;
