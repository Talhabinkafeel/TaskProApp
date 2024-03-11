import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {BackBtn, Header, Row} from "../../utils/sharedStyles";
import {Icon, Input, Text} from "../../components";
import {axios} from "../../config";
import {Head} from "../Messages/styles";
import styled from "styled-components/native";

const Search = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const onSearch = React.useCallback(async () => {
    if (search.length > 2) {
      const res = await axios.get('/project/search?q=' + search);
      setOptions(res.data.map(item => ({label: item.name, value: item._id})));
    }
  }, [search]);

  React.useEffect(() => {
    onSearch()
  }, [search]);

  return (
    <>
      <Header>
        <Row>
          <BackBtn onPress={() => navigation.goBack()}><Icon name="arrow-left"/></BackBtn>
          <Text size="title">Search</Text>
        </Row>
      </Header>
      <Head style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, paddingBottom: 10}}>
        <Icon name="search" style={{marginRight: 15}}/>
        <Input placeholder="Search..." value={search} onChange={setSearch} style={{flex: 1, marginTop: 0, borderWidth: 0}}/>
      </Head>
      <FlatList
        data={options}
        keyExtractor={item => item.value}
        contentContainerStyle={{paddingTop: 25}}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => {navigation.goBack(); navigation.navigate('Project', {screen: 'Board', params: {id: item.value}})}}>
            <ListItem><Text size="medium">{item.label}</Text></ListItem>
          </TouchableOpacity>
        }
      />
    </>
  )
};

const ListItem = styled.View`
  height: 60px;
  justify-content: center;
  border-bottom-width: 1px;
  padding-horizontal: 25px;
  border-color: ${({theme}) => theme.border};
`;

export default Search;
