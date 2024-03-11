import React from 'react';
import {Alert, View} from "react-native";
import {Button, Icon, Input, ProjectLogo, Switch, Text} from "../../components";
import {Header, Card, BackBtn, Row, Spacer} from "../../utils/sharedStyles";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from "react-redux";
import {archiveProject, deleteProject, unarchiveProject} from "../Dashboard/actions";
import {leaveProject, muteProject, updateProject, updateProjectLogo} from "./actions";
import {ProfileHead} from "../Dashboard/styles";
import {getImageFromLibrary} from "../../utils/imagePicker";

const ProjectSettings = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [uploadedImage, setUploadedImage] = React.useState('');
  const userId = useSelector(s => s.auth.user.data._id);
  const project = useSelector(s => s.project.project.data);
  const isMuted = React.useMemo(() => project.mutedBy?.includes(userId), [project, userId]);
  const isAdmin = React.useMemo(() => project.members?.find(m => m.user._id === userId).role === 1, [project, userId]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setName(project.name);
    setUploadedImage(project.image);
  }, [project]);

  const uploadLogo = React.useCallback(async () => {
    const image = await getImageFromLibrary();
    if (image?.uri) {
      setUploadedImage(image.uri);
      dispatch(updateProjectLogo({file: image, _id: project._id}));
    }
  }, [uploadedImage, project._id]);

  const removeProject = React.useCallback(() => {
    Alert.alert(
      'Are you sure to delete this project?',
      '',
      [{text: "Cancel", style: "cancel"}, {text: "OK", onPress: () => {
          navigation.navigate('Home');
          dispatch(deleteProject(project._id));
        }}]
    );
  }, [project._id]);

  const leaveProjectFunc = React.useCallback(() => {
    Alert.alert(
      'Are you sure to quit this project?',
      '',
      [{text: "Cancel", style: "cancel"}, {text: "OK", onPress: () => {
          dispatch(leaveProject(project._id));
          navigation.navigate('Home');
        }}]
    );
  }, [project._id]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Row>
          <BackBtn onPress={() => navigation.goBack()}><Icon name="arrow-left"/></BackBtn>
          <Text size="title">Settings</Text>
        </Row>
      </Header>
      <KeyboardAwareScrollView contentContainerStyle={{padding: 25}}>
        <Card>
          <ProfileHead onPress={uploadLogo}>
            <ProjectLogo src={uploadedImage} size={70}/>
          </ProfileHead>
          <Input placeholder="Project name" value={name} onChange={setName}/>
          <Spacer/>
          <Row>
            <Switch value={isMuted} onChange={checked => dispatch(muteProject({_id: project._id, mute: checked}))}/>
            <Text style={{marginLeft: 8}}>Mute notifications</Text>
          </Row>
          <Spacer/>
          <Button title="Update" onPress={() => dispatch(updateProject({_id: project._id, name}))} disabled={!name}/>
          <Spacer/>
          {project.archived ? <Button title="Unarchive" onPress={() => dispatch(unarchiveProject(project._id))} warning/>:
            <Button title="Archive" onPress={() => dispatch(archiveProject(project._id))} warning/>
          }
          {isAdmin && <Button title="Delete Project" onPress={removeProject} style={{marginTop: 10}} danger/>}
          {!isAdmin && <Button title="Quit Project" onPress={leaveProjectFunc} style={{marginTop: 10}} danger/>}
        </Card>
      </KeyboardAwareScrollView>
    </View>
  )
};

export default ProjectSettings;
