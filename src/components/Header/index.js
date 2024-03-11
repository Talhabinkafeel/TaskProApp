import React from 'react';
import {Btn, Container, Right} from './styles';
import {Icon, Text} from "../index";
import Avatar from "../Avatar";
import {useSelector} from "react-redux";
import {navigate} from "../../config/Navigator";

const Header = ({title}) => {
  const user = useSelector(s => s.auth.user.data);
  return (
    <Container>
      <Text size="large" weight={600}>{title || 'Projects'}</Text>
      <Right>
        <Btn onPress={() => navigate('Search')}><Icon name="search"/></Btn>
        <Btn onPress={() => navigate('Notifications')}><Icon name="notification" size={25}/></Btn>
        <Btn onPress={() => navigate('Profile')}><Avatar src={user.avatar} firstName="Batu"/></Btn>
      </Right>
    </Container>
  );
};

export default Header;
