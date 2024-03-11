import React from 'react';
import {View} from 'react-native';
import {BackBtn, Header, Row, Spacer} from "../../utils/sharedStyles";
import {useDispatch, useSelector} from "react-redux";
import {Icon, Input, ListMenu, MemberList, Spinner, Tag, Text} from "../../components";
import {FooterItem} from "../../components/TaskCard/styles";
import {EditBtns, Label, LabelContainer, SaveBtn} from "./styles";
import {getTask, updateTask} from "../Project/actions";
import {Wrapper} from "./styles";
import {moment} from "../../utils/moment";
import TodoSection from "./TodoSection";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AttachmentSection from "./AttachmentSection";
import CommentSection from "./CommentSection";
import {theme} from "../../config/theme";

const TaskDetail = ({route, navigation}) => {
  const [title, setTitle] = React.useState('');
  const [titleEdit, setTitleEdit] = React.useState(false);
  const [desc, setDesc] = React.useState('');
  const [descEdit, setDescEdit] = React.useState(false);
  const [descEdited, setDescEdited] = React.useState(false);
  const [descHeight, setDescHeight] = React.useState(100);
  const {loading, data} = useSelector(s => s.project.taskDetail);
  const {members, endDate, comments, attachments, tags} = data || {};
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTask(route.params.id));
  }, []);

  React.useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDesc(data.desc);
    }
  }, [data]);

  const updateTitle = React.useCallback(() => {
    if (title) {
      updateData(() => ({title}));
      setTitleEdit(false);
    }
  }, [title]);

  const updateData = React.useCallback((newValue, finalData) => {
    dispatch(updateTask({data: newValue(data), finalData}));
  }, [data]);

  return (
    <Wrapper>
      {loading || !data ? <Spinner/>:
        <View style={{flex: 1}}>
          <Header>
            <Row>
              <BackBtn onPress={navigation.goBack}><Icon name="arrow-left"/></BackBtn>
              <View style={{width: '80%'}}>
                {!titleEdit ? <Text onPress={() => setTitleEdit(true)} size="title" numberOfLines={1}>{data.title}</Text> :
                  <Input autoFocus placeholder="Title" value={title} onChange={setTitle} onSubmitEditing={updateTitle}
                         style={{...theme.smallInput, marginTop: 0}}/>}
              </View>
            </Row>
            <ListMenu task={data} updateData={updateData} goBack={navigation.goBack}/>
          </Header>
          <KeyboardAwareScrollView contentContainerStyle={{padding: 25, paddingTop: 10}}>
            {members?.length || endDate || comments?.length || attachments?.length ?
              <Row style={{justifyContent: 'space-between'}}>
                {!!members?.length ? <MemberList members={members} size={40}/> : <View/>}
                <Row>
                  {endDate ? <FooterItem>
                    <Icon color="#878FA6" name="time" size={15}/>
                    <Text color="#878FA6" style={{marginLeft: 3}}>{moment(endDate).format('DD MMM')}</Text>
                  </FooterItem> : null}
                  {comments?.length ? <FooterItem>
                    <Icon color="#878FA6" name="comments"/>
                    <Text color="#878FA6" style={{marginLeft: 3}}>{comments.length}</Text>
                  </FooterItem> : null}
                  {attachments?.length ? <FooterItem>
                    <Icon color="#878FA6" name="attachment"/>
                    <Text color="#878FA6" style={{marginLeft: 3}}>{attachments.length}</Text>
                  </FooterItem> : null}
                </Row>
              </Row> : null
            }
            {!!tags?.length && <Row style={{marginTop: 20, marginBottom: -5}}>
              {tags.map(tag => <Tag key={tag._id} color={tag.color} title={tag.name}/>)}
            </Row>}
            <LabelContainer><Icon name="description"/><Label>Description</Label></LabelContainer>
            {descEdit || !desc?.replace(/ /g, '') ?
              <View style={{height: descHeight}}>
                <Input
                  multiline
                  value={desc}
                  autoFocus={descEdit}
                  placeholder="Add a description..."
                  onChange={val => {setDescEdit(true); setDesc(val); setDescEdited(true)}}
                  onContentSizeChange={e => {
                    const height = e.nativeEvent.contentSize.height;
                    if (descEdited || descEdit) setDescHeight(height > 100 ? height : 100)
                  }}
                  style={{height: descHeight, marginTop: 5}}
                />
                {descEdited && <EditBtns>
                  <SaveBtn close onPress={() => {setDesc(data.desc); setDescEdited(false); setDescEdit(false)}}><Icon name="close" size={13}/></SaveBtn>
                  <SaveBtn onPress={() => {setDescEdit(false); updateData(() => ({desc}))}}><Icon color="#fff" name="edit" size={14}/></SaveBtn>
                </EditBtns>}
              </View>
              : <Text style={{marginTop: 10}} onPress={() => setDescEdit(true)}>{desc}</Text>
            }
            <TodoSection todo={data.todoGroup}/>
            <AttachmentSection task={data}/>
            <CommentSection task={data}/>
            <Spacer style={{height: 50}}/>
          </KeyboardAwareScrollView>
        </View>
      }
    </Wrapper>
  )
};

export default TaskDetail;
