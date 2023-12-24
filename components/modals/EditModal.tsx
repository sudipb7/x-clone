import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";

import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useModal } from "@/hooks/use-modal-store";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "edit";

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setLocation(currentUser?.location);
    setProfession(currentUser?.profession);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profession,
    currentUser?.location,
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profession,
        location,
        coverImage,
        profileImage,
      });

      mutateFetchedUser();

      toast.success("Profile updated");

      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    username,
    bio,
    coverImage,
    profession,
    profileImage,
    location,
    mutateFetchedUser,
    onClose,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <ImageUpload
        value={profileImage || ""}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage || ""}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
      <Input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        disabled={isLoading}
      />
      <Input
        placeholder="Profession"
        onChange={(e) => setProfession(e.target.value)}
        value={profession}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      size="lg"
      title="Edit your profile"
      actionLabel="Save Changes"
      disabled={isLoading}
      onSubmit={onSubmit}
      body={bodyContent}
      isOpen={isModalOpen}
      onClose={onClose}
      showLogo
      showCloseButton
    />
  );
};

export default EditModal;
