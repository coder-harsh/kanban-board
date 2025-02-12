import { Avatar, AvatarBadge } from "@chakra-ui/react";
const Avtar = () => {
    const onlineStatus = true;
    const userName = localStorage.getItem('userName');
    return (
        <Avatar name={userName} size="sm">
            <AvatarBadge
                boxSize="1.25em"
                bg={onlineStatus ? "green.500" : "tomato"}
            />
        </Avatar>
    );
};
export default Avtar;