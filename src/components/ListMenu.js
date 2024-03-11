import React from 'react';
import {Modal, FlatList, View, Alert} from 'react-native';
import styled from "styled-components/native";
import {Avatar, DatePicker, Icon, Input, Tag, Text, Button as Btn} from "./index";
import MenuPopup from "./MenuPopup";
import {BackBtn, Container, Header, Row} from "../utils/sharedStyles";
import {useDispatch, useSelector} from "react-redux";
import {createNotification} from "../screens/Dashboard/actions";
import {tagColors} from "./Tag";
import {capitalizeFirstLetter, getBoardList, getTemptId, mapFileData} from "../utils/helpers";
import DocumentPicker from "react-native-document-picker";
import {createTaskAttachment, createTodoGroup, deleteTask, updateTask} from "../screens/Project/actions";
import {MenuProvider} from 'react-native-popup-menu';
import {getTheme, IS_IOS, WINDOW_WIDTH} from "../config/theme";

const ListMenu = ({task, updateData, goBack}) => {
  const [actionType, setActionType] = React.useState('');
  const [state, setState] = React.useState({tagName: '', tagColor: '', todoTitle: '', dateVisible: false});
  const userId = useSelector(s => s.auth.user.data._id);
  const project = useSelector(s => s.project.project.data);
  const taskList = useSelector(s => s.project.taskList);
  const dispatch = useDispatch();
  const theme = getTheme();

  const addMember = React.useCallback(id => {
    const userItem = project.members.map(m => m.user).find(u => u._id === id);
    const finalData = {members: [...(task.members?.map(m => m._id)||[]), id]};
    updateData(s => ({members: [...(s.members||[]), userItem]}), finalData);
    if (userId !== id && !project.mutedBy?.includes(id))
      dispatch(createNotification({user: id, title: `You have been assigned to task "${task.title.substring(0, 10)}"`}));
  }, [task.members, userId, project]);

  const removeMember = React.useCallback(id => {
    const finalData = {members: task.members?.filter(m => m._id !== id).map(m => m._id)};
    updateData((s => ({members: s.members?.filter(m => m._id !== id)})), finalData);
  }, [task.members]);

  const addAttachment = React.useCallback(async () => {
    const files = await DocumentPicker.pick({type: [DocumentPicker.types.allFiles],});
    const newFiles = files.map(file => ({...mapFileData(file), createdAt: new Date()}));
    dispatch(createTaskAttachment({data: newFiles, finalData: files, task: task._id}));
  }, [task._id]);

  const addTodo = React.useCallback(() => {
    const newItem = {_id: getTemptId(), title: state.todoTitle, list: []};
    dispatch(createTodoGroup(newItem));
    setState(s => ({...s, todoTitle: ''}));
    setActionType('');
  }, [state.todoTitle]);

  const addTag = React.useCallback(() => {
    updateData(() => ({tags: [...(task.tags||[]), {_id: getTemptId(), name: state.tagName, color: state.tagColor}]}));
    setState(s => ({...s, tagName: '', tagColor: ''}));
  }, [state, task.tags]);

  const changeBoard = React.useCallback((newBoard) => {
    const newIndex = taskList.filter(t => !t.archived && t.board == newBoard).length;
    dispatch(updateTask({data: {board: newBoard, index: newIndex}}));
  }, [task]);

  const removeTask = React.useCallback(() => {
    Alert.alert(
      'Are you sure to delete this task?',
      '',
      [{text: "Cancel", style: "cancel"}, {text: "OK", onPress: () => {dispatch(deleteTask([task._id])); goBack()}}]
    );
  }, [task]);

  const isMember = React.useCallback(id => !!task.members?.find(m => m._id === id), [task.members]);

  const boardsList = getBoardList().map(t => ({...t, onPress: () => changeBoard(t.value)}));

  const modalTitle = React.useMemo(() => actionType === 'member' ? 'Members' : actionType === 'tags' ? 'Tags' :
    actionType === 'todo' ? 'New Todo List' : actionType === 'moveto' ? 'Move to' : '', [actionType]);

  return (
    <>
      <MenuPopup
        triggerButton={
          <Button>
            <Icon name="dots-vertical" size={18}/>
          </Button>
        }
        items={[
          {value: 1, label: 'Members', onPress: () => setActionType('member')},
          {value: 2, label: 'Tags', onPress: () => setActionType('tags')},
          {value: 3, label: 'Date', onPress: () => setState(s => ({...s, dateVisible: true}))},
          {value: 4, label: 'Attachment', onPress: addAttachment},
          {value: 5, label: 'Todo List', onPress: () => setActionType('todo')},
          {value: 6, label: 'Move to', onPress: () => setActionType('moveto')},
          {value: 7, label: 'Delete', onPress: removeTask}
        ]}
      />
      <Modal visible={!!actionType} onRequestClose={() => setActionType('')}>
        <MenuProvider skipInstanceCheck>
          <Header>
            <Row>
              <BackBtn onPress={() => setActionType('')}><Icon name="close"/></BackBtn>
              <Text size="title">{modalTitle}</Text>
            </Row>
          </Header>
          <ModalContent>
            {actionType === 'member' ?
              <FlatList
                data={project.members.slice().sort((a, b) => Number(isMember(b.user._id)) - Number(isMember(a.user._id)))}
                keyExtractor={item => item._id}
                renderItem={({item: {user}}) => {
                  return <ListItem onPress={() => !isMember(user._id) ? addMember(user._id) : removeMember(user._id)}>
                    <Row style={{justifyContent: 'flex-start'}}>
                      <Avatar src={user.avatar} size={40} firstName={user.firstName}/>
                      <View style={{marginLeft: 15}}>
                        <Text size="medium">{user.firstName} {user.lastName}</Text>
                        <Text style={{marginTop: 3}}>{user.email}</Text>
                      </View>
                    </Row>
                    {isMember(user._id) && <CheckMark><Icon name="check" size={16} color="#389e0d"/></CheckMark>}
                  </ListItem>;
                }}
              /> :
              actionType === 'tags' ?
                <Container style={{paddingTop: 0}}>
                  <Row style={{marginBottom: 15}}>
                    <Input placeholder="Tag name" value={state.tagName} onChange={tagName =>  setState(s => ({...s, tagName}))} style={{marginTop: 0, flex: 1}}/>
                    <MenuPopup
                      triggerButton={<SelectBtn selected={state.tagColor}><Text color={!state.tagColor ? '#8B8A8A' : ''}>{capitalizeFirstLetter(state.tagColor) || 'Color'}</Text></SelectBtn>}
                      items={Object.keys(tagColors).map(color => ({value: color, label: capitalizeFirstLetter(color), onPress: () => setState(s => ({...s, tagColor: color}))}))}
                    />
                    <AddBtn disabled={!state.tagName} onPress={addTag}><Icon name="check" color={theme.primary}/></AddBtn>
                  </Row>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    {(task.tags||[]).map(tag =>
                      <Tag key={tag._id} title={tag.name} color={tag.color}
                           remove={() => updateData(() => ({tags: task.tags.filter(t => t._id !== tag._id)}))}/>)}
                  </View>
                </Container> :
                actionType === 'todo' ?
                  <Container style={{paddingTop: 0}}>
                    <Input placeholder="Todo title" value={state.todoTitle} onChange={todoTitle => setState(s => ({...s, todoTitle}))}/>
                    <Btn title="Add Todo" onPress={addTodo} disabled={!state.todoTitle} style={{marginTop: 20}}/>
                  </Container>:
                  actionType === 'moveto' ?
                    <>
                      <MenuPopup
                        triggerButton={<SelectBtn style={{width: WINDOW_WIDTH - 30}}><Text>{boardsList.find(b => b.value == task.board).label}</Text></SelectBtn>}
                        items={boardsList}
                      />
                    </>
                    : null
            }
          </ModalContent>
        </MenuProvider>
      </Modal>
      <DatePicker
        open={state.dateVisible}
        close={() => setState(s => ({...s, dateVisible: false}))}
        value={task.endDate}
        onChange={date => updateData(() => ({endDate: date}))}/>
    </>
  )
};

export default ListMenu;

const Button = styled.View`
  background: ${({theme}) => theme.mode === 'dark' ? theme.bg3 : '#F4F6FC'};
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ListItem = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  background: ${({active}) =>  active ? '#F4F6FC' : 'transparent'};
  border-color: ${({theme}) => theme.border};
  border-bottom-width: 1px;
  height: 75px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 25px;
`;

const ModalContent = styled.View`
  flex: 1;
  padding-top: 25px;
  background-color: ${({theme}) =>  theme.bg};
`;

const CheckMark = styled.View`
  width: 50px;
  height: 50px;
  borderRadius: 30px;
  border-width: 1px;
  background-color: #f6ffed;
  border-color: #b7eb8f;
  justify-content: center;
  align-items: center;
`;

const AddBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  borderRadius: 30px;
  border-width: 1px;
  border-color: ${({theme}) => theme.primary};
  background-color: rgba(230, 247, 255, 0.7);
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export const SelectBtn = styled.View`
  background: ${({theme}) =>  theme.bg3};
  border-color: ${({theme}) => theme.border};
  justify-content: center;
  border-radius: 4px;
  margin-left: 15px; 
  padding-left: 15px; 
  border-width: 1px;
  height: ${IS_IOS ? 50 : 45}px;
  width: 100px;
`;
