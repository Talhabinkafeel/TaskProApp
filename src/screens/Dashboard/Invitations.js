import React from 'react';
import {View, FlatList} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Icon, ProjectLogo, Spinner, Text} from "../../components";
import {acceptInvitation, declineInvitation, getInvitations} from "./actions";
import {BackBtn, Header, Link, Row} from "../../utils/sharedStyles";
import {ListItem} from "./styles";
import EmptyState from "../../components/EmptyState";

const Invitations = ({navigation}) => {
  const invitations = useSelector(s => s.dashboard.invitations);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInvitations());
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Row>
          <BackBtn onPress={navigation.goBack}><Icon name="arrow-left"/></BackBtn>
          <Text size="large">Invitations</Text>
        </Row>
      </Header>
      {invitations.loading ? <Spinner/> :
        !invitations.data.length ? <EmptyState/> :
        <FlatList
          data={invitations.data}
          contentContainerStyle={{padding: 25}}
          keyExtractor={item => item._id}
          renderItem={({item}) =>
            <ListItem>
              <Row>
                <ProjectLogo src={item.project?.image} size={45}/>
                <Text numberOfLines={1} size="medium" style={{marginLeft: 15, width: '60%'}}>{item.project?.name}</Text>
              </Row>
              <Row>
                <Link onPress={() => dispatch(acceptInvitation(item._id))}><Icon name="chevron-up" color="#27ae60"/></Link>
                <Link style={{marginLeft: 20}} onPress={() => dispatch(declineInvitation(item._id))}><Icon name="close" color="#e74c3c"/></Link>
              </Row>
            </ListItem>
          }
        />
      }
    </View>
  );
};

export default Invitations;
