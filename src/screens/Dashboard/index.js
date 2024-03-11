import React from 'react';
import {View, FlatList, Modal} from "react-native";
import Header from "../../components/Header";
import {GraphItem, HeadContainer, Row, Scroll, Menu, MenuItem} from "./styles";
import {Button, EmptyState, Icon, Input, Progress, ProjectCard, Text} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/Spinner";
import {getUser} from "../Login/actions";
import {createProject, getProjects} from "./actions";
import {FloatBtn} from "../Project/styles";
import {BackBtn, Container, Spacer, Header as HeaderComp} from "../../utils/sharedStyles";
import {onNotificationOpened} from "../../config/NotificationService";

const Dashboard = ({navigation}) => {
  const [tab, setTab] = React.useState(1);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [projectName, setProjectName] = React.useState('');
  const projects = useSelector(s => s.dashboard.projects);
  const user = useSelector(s => s.auth.user);
  const dispatch = useDispatch();
  const statistics = React.useMemo(() => {
    if (user.data.tasks) {
      const total = user.data.tasks.length;
      const todoSize = user.data.tasks.filter(t => t.board !== 4).length;
      const doneSize = user.data.tasks.filter(t => t.board === 4).length;
      return {
        todoSize, doneSize,
        todo: parseFloat((todoSize / total).toFixed(1).replace('.0', '')),
        done: parseFloat((doneSize / total).toFixed(1).replace('.0', ''))
      }
    }
  }, [user.data.tasks]);

  React.useEffect(() => {
    dispatch(getUser());
    dispatch(getProjects());
  }, []);

  React.useEffect(() => {
    onNotificationOpened(data => {
      if (data?.additionalData?.conversationId)
        navigation.navigate('Chat', {conversation: {_id: data.additionalData.conversationId}, noInitialData: true});
    });
  }, [user.data._id]);

  const createProjectFunc = React.useCallback(() => {
    dispatch(createProject({name: projectName}));
    setModalVisible(false);
    setProjectName('');
  }, [projectName]);

  return (
    <View style={{flex: 1}}>
      <Header/>
      {!user.data._id ? <Spinner/> :
        <>
          <HeadContainer>
            <Scroll>
              <Row>
                <GraphItem>
                  <View>
                    <Text size="small" weight={500}>Tasks Todo</Text>
                    <Text size="large">{statistics?.todoSize}</Text>
                  </View>
                  <Progress circle progress={statistics?.todo || 0}/>
                </GraphItem>
                <GraphItem>
                  <View>
                    <Text size="small" weight={500}>Tasks Done</Text>
                    <Text size="large">{statistics?.doneSize}</Text>
                  </View>
                  <Progress circle progress={statistics?.done || 0}/>
                </GraphItem>
                <GraphItem style={{width: 100}}>
                  <View>
                    <Text size="small" weight={500}>Members</Text>
                    <Text size="large">{user.data.contacts.length}</Text>
                  </View>
                </GraphItem>
              </Row>
            </Scroll>
            <Menu>
              <MenuItem onPress={() => setTab(1)} active={tab === 1}><Text>Active</Text></MenuItem>
              <MenuItem onPress={() => setTab(2)} active={tab === 2}><Text>Archived</Text></MenuItem>
            </Menu>
          </HeadContainer>
          <FlatList
            data={projects.data.filter(p => tab === 1 ? !p.archived : p.archived).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
            contentContainerStyle={{padding: 25}}
            keyExtractor={item => item._id}
            onRefresh={() => dispatch(getProjects())}
            refreshing={projects.loading}
            renderItem={({item}) => <ProjectCard item={item}/>}
            ListEmptyComponent={() => <EmptyState size={85} style={{marginTop: 30}}/>}
          />
          <FloatBtn onPress={() => setModalVisible(true)}><Icon name="plus" color="#fff" size={28}/></FloatBtn>
        </>
      }
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animation="slide">
        <HeaderComp>
          <Row>
            <BackBtn onPress={() => setModalVisible(false)}><Icon name="close"/></BackBtn>
            <Text size="title">New Project</Text>
          </Row>
        </HeaderComp>
        <Container>
          <Input placeholder="Project name" value={projectName} onChange={setProjectName} style={{marginTop: 0}}/>
          <Spacer/>
          <Button title="Create Project" disabled={!projectName} onPress={createProjectFunc}/>
        </Container>
      </Modal>
    </View>
  )
};

export default Dashboard;
