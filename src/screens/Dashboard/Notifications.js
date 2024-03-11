import React from 'react';
import {FlatList} from 'react-native';
import {BackBtn, Header, Row} from "../../utils/sharedStyles";
import {EmptyState, Icon, Text} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {ListItem} from "./styles";
import {setNotificationsSeen} from "./actions";

const Notifications = ({navigation}) => {
  const notifications = useSelector(s => s.auth.user.data.notifications);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setNotificationsSeen({ids: notifications.filter(n => !n.seen).map(n => n._id)}));
  }, []);

  return (
    <>
      <Header>
        <Row>
          <BackBtn onPress={() => navigation.goBack()}><Icon name="arrow-left"/></BackBtn>
          <Text size="title">Notifications</Text>
        </Row>
      </Header>
      {!notifications?.length ?
        <EmptyState/>
        :
        <FlatList
          contentContainerStyle={{paddingTop: 25}}
          data={notifications.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
          keyExtractor={item => item._id}
          renderItem={({item}) => <ListItem><Text>{item.title}</Text></ListItem>}
        />
      }
    </>
  )
};

export default Notifications;
