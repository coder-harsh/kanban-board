import { Avatar, AvatarBadge } from "@chakra-ui/react";
const Avtar = () => {
    const onlineStatus = true;
    const userEmail = localStorage.getItem('userEmail');
    return (
        <Avatar name={userEmail} size="sm">
            <AvatarBadge
                boxSize="1.25em"
                bg={onlineStatus ? "green.500" : "tomato"}
            />
        </Avatar>
    );
};
export default Avtar;