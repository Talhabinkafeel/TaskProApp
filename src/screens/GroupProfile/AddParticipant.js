import React from 'react';
import {Modal, View, SafeAreaView, FlatList} from 'react-native';
import {CreateHeader, LeftText, Input, Row, UserItem, UserName, MessageText, ModalContent, Checked, FloatButton, Head} from '../Messages/styles';
import debounce from 'lodash.debounce';
import {Icon, Text, Avatar} from "../../components";
import {axios} from "../../config";
import {useSelector} from "react-redux";
import {BackBtn, Container} from "../../utils/sharedStyles";

const AddParticipantsModal = ({visible, close, currentParticipants, addParticipants}) => {
  const [search, setSearch] = React.useState('');
  const [searchDb, setSearchDb] = React.useState('');
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const contacts = useSelector(state => state.auth.user.data.contacts);

  React.useEffect(() => {
    if (search.length > 1) {
      setData([]);
      searchData(searchDb);
    }
  }, [searchDb]);
  const searchData = React.useCallback(async (Search = search) => {
    if (Search) {
      const res = await axios.get('/user/search?q=' + Search);
      setData(res.data);
    }
  }, []);
  const debouncedSave = React.useCallback(debounce(nextValue => setSearchDb(nextValue), 1000), []);
  const handleChange = val => {setSearch(val); debouncedSave(val)};

  React.useEffect(() => {
    if (!visible) {
      searchData('');
      setSelected([]);
      setSearch('');
      setSearchDb('');
    }
  }, [visible]);

  const onItemClick = React.useCallback((item) => {
    if (selected.find(x => x._id === item._id))
      setSelected(state => state.filter(x => x._id !== item._id));
    else
      setSelected(state => [...state, item]);
  }, [selected]);

  const renderItem = React.useCallback(({item}, isGroup) => <UserItem key={item._id} onPress={() => onItemClick(item)}>
    <View style={{width: 40, height: 40, marginRight: 15}}>
      <Avatar src={item.avatar} firstName={item.firstName}/>
      {isGroup ? <Checked><Icon name="check" size={10} color="#fff"/></Checked> : null}
    </View>
    <View style={{top: -7}}>
      <UserName>{item.firstName} {item.lastName}</UserName>
      <MessageText>{item.email}</MessageText>
    </View>
  </UserItem>, [selected]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <ModalContent>
        <Head>
          <SafeAreaView>
            <CreateHeader>
              <BackBtn style={{marginLeft: 6}} onPress={close}><Icon name="close"/></BackBtn>
              <Text size="title">Add Participant</Text>
            </CreateHeader>
          </SafeAreaView>
          <Row>
            <View style={{top: 3}}>
              <LeftText><Icon name="search" size={18} themeColor="gray"/></LeftText>
            </View>
            <Input placeholder="Type a name or email" value={search} onChangeText={handleChange}/>
          </Row>
        </Head>
        <Container style={{paddingLeft: 0, paddingRight: 0}}>
          {selected.length ?
            <View>
              <Text style={{margin: 15}}>Participants</Text>
              {selected.map(item => renderItem({item}, true))}
            </View> : null
          }
          <FlatList
            data={(searchDb ? data : contacts)?.filter(x => !selected.find(y => (x._id === y._id)) && !currentParticipants.includes(x._id))}
            renderItem={renderItem}
            keyExtractor={(x, i) => i.toString()}
          />
        </Container>
        {selected.length > 0 ? <FloatButton onPress={() => addParticipants(selected)}><Icon name='plus' color="#fff" size={28}/></FloatButton> : null}
      </ModalContent>
    </Modal>
  )
};

export default AddParticipantsModal;
