import React from 'react';
import {View, FlatList, Modal} from "react-native";
import {BackBtn, Container, Header, Row} from "../../utils/sharedStyles";
import {Button, EmptyState, Icon, Input, ProjectLogo, Spinner, TaskCard, Text} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {getProject, newTask, updateTaskList} from "./actions";
import {BoardHead, Dot, FloatBtn, TabItem, Tabs} from "./styles";
import {getTemptId} from "../../utils/helpers";

const ProjectBoard = (props) => {
  const [board, setBoard] = React.useState(1);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState('');
  const {loading, data} = useSelector(s => s.project.project);
  const taskList = useSelector(s => s.project.taskList);
  const taskDetail = useSelector(s => s.project.taskDetail.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProject({id: props.route.params.id}));
  }, []);

  React.useEffect(() => {
    if (taskDetail) dispatch(updateTaskList(taskDetail));
  }, [taskDetail]);

  const createTask = React.useCallback(() => {
    const task = {_id: getTemptId(), board, title: taskTitle, order: taskList[board] ? taskList[board].length : 0};
    dispatch(newTask(task));
    setTaskTitle('');
    setModalVisible(false);
  }, [taskTitle, board, taskList]);

  const menuItems = React.useMemo(() =>
    [{id: 1, label: 'Todo'}, {id: 2, label: 'Progress'}, {id: 3, label: 'Review'}, {id: 4, label: 'Done'}]);

  const taskListData = React.useMemo(() =>
    taskList.filter(t => t.board === board).sort((a, b) => a.order - b.order), [board, taskList]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Row>
          <BackBtn onPress={props.navigation.goBack}><Icon name="arrow-left"/></BackBtn>
          <Row>
            <ProjectLogo src={data.image} size={40}/>
            <Text size="title" weight={600} style={{marginLeft: 10}}>{data.name}</Text>
          </Row>
        </Row>
      </Header>
      <BoardHead>
        <Text size="big" weight="800">Boards</Text>
        <Tabs>
          {menuItems.map(item =>
            <TabItem key={item.id} onPress={() => setBoard(item.id)}>
              <Text size="medium" weight="500" primary={item.id === board}>{item.label}</Text>
              {item.id === board ? <Dot/> : null}
            </TabItem>
          )}
        </Tabs>
      </BoardHead>
      {loading ? <Spinner/> :
        <>
          <FlatList
            data={taskListData}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{padding: 25}}
            renderItem={({item}) => <TaskCard task={item}/>}
            ListEmptyComponent={() => <EmptyState size={85} style={{marginTop: 30}}/>}
          />
          <FloatBtn onPress={() => setModalVisible(true)}><Icon name="plus" color="#fff" size={28}/></FloatBtn>
        </>
      }
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animation="slide">
        <Header>
          <Row>
            <BackBtn onPress={() => setModalVisible(false)}><Icon name="close"/></BackBtn>
            <Text size="title">New Task</Text>
          </Row>
        </Header>
        <Container style={{paddingTop: 0}}>
          <Input placeholder="New task" value={taskTitle} onChange={setTaskTitle}/>
          <Button title="Add Task" disabled={!taskTitle} onPress={createTask} style={{marginTop: 20}}/>
        </Container>
      </Modal>
    </View>
  )
};

export default ProjectBoard;
