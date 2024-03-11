import React from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {Avatar, Button, Icon, Input, Text} from "../../components";
import {moment} from "../../utils/moment";
import {fixImgPath, getExt, getTemptId, isImg, openFile} from "../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import {createComment, deleteComment, deleteCommentAttachment, updateComment} from "../Project/actions";
import {Row} from "../../utils/sharedStyles";
import {AttachmentImage, CommentBubble, CommentItem, EditBtns, FileView, Label, LabelContainer, SaveBtn} from "./styles";
import ImagePreview from "../../components/ImagePreview";
import {WINDOW_WIDTH} from "../../config/theme";
import MenuPopup from "../../components/MenuPopup";

const CommentSection = ({task}) => {
  const [comment, setComment] = React.useState('');
  const [inputHeight, setInputHeight] = React.useState(65);
  const user = useSelector(s => s.auth.user.data);
  const dispatch = useDispatch();

  const addComment = React.useCallback(e => {
    const finalData = {content: comment, task: task._id};
    const data = {user, _id: getTemptId(), content: comment, createdAt: new Date()};
    dispatch(createComment({finalData, data}));
    setComment('');
    e.stopPropagation();
  }, [comment, task, user]);

  const updateCommentFunc = React.useCallback((id, content) => {
    dispatch(updateComment({id, data: {content}}));
  }, []);

  const deleteCommentFunc = React.useCallback(id => {
    dispatch(deleteComment(id));
  }, [task.comments]);

  const deleteCommentFile = React.useCallback((commentId, fileId) => {
    dispatch(deleteCommentAttachment({comment: commentId, attachmentId: fileId}));
  }, [task.comments]);

  return (
    <View>
      <LabelContainer><Icon name="comments"/><Label>Comments</Label></LabelContainer>
      <Row style={{alignItems: 'flex-start'}}>
        <Avatar src={user.avatar} firstName={user.firstName} style={{marginTop: 14}} />
        <View style={{height: inputHeight, width: WINDOW_WIDTH - 95, marginLeft: 10, marginBottom: 25}}>
          <Input
            multiline
            value={comment}
            onChange={setComment}
            placeholder="Type a comment..."
            style={{height: inputHeight, marginTop: 15}}
            onContentSizeChange={e => {
              const height = e.nativeEvent.contentSize.height;
              if (comment) setInputHeight(height > 65 ? height : 65);
              else setInputHeight(65);
            }}
          />
          {comment && <EditBtns style={{bottom: -5}}>
            <SaveBtn close onPress={() => {setComment('')}}><Icon name="close" size={13}/></SaveBtn>
            <SaveBtn onPress={addComment}><Icon color="#fff" name="edit" size={14}/></SaveBtn>
          </EditBtns>}
        </View>
      </Row>
      {task.comments && [...task.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(comment =>
        <CommentRenderItem
          key={comment._id}
          comment={comment}
          user={user}
          updateComment={updateCommentFunc}
          deleteComment={deleteCommentFunc}
          deleteCommentFile={deleteCommentFile}
        />
      )}
    </View>
  );
};

const CommentRenderItem = ({comment, user, updateComment, deleteComment}) => {
  const [edit, setEdit] = React.useState(false);
  const [text, setText] = React.useState(comment.content);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [previewVisible, setPreviewVisible] = React.useState(false);

  const updateItem = React.useCallback(e => {
    updateComment(comment._id, text);
    setEdit(false);
    e.stopPropagation()
  }, [text]);

  const imageAttachments = React.useMemo(() => comment.attachments?.filter(item => item.type.includes('image')), [comment.attachments]);

  return (
    <CommentItem>
      <Row style={{alignItems: 'flex-start'}}>
        <View style={{marginRight: 10, marginTop: 2}}>
          <Avatar src={comment.user.avatar} firstName={comment.user.firstName}/>
        </View>
        <View style={{width: WINDOW_WIDTH - 95, marginBottom: 3}}>
          <Row style={{marginBottom: 5, justifyContent: 'space-between'}}>
            <Row>
              <Text style={{marginRight: 10}}>{comment.user.firstName}</Text>
              <Text size="small" color="#878FA6">{moment(comment.createdAt).fromNow()}</Text>
            </Row>
            {comment.user._id === user._id ?
              <Row style={{paddingRight: 4}}>
                <MenuPopup
                  triggerButton={<Icon name="dots-horizontal" size={16}/>}
                  items={[
                    {value: 1, label: 'Edit', onPress: () => setEdit(true)},
                    {value: 2, label: 'Delete', onPress: () => deleteComment(comment._id)}
                  ]}
                />
              </Row> : null
            }
          </Row>
          {edit ?
            <View>
              <Input placeholder="Type a comment..." value={text} onChange={setText} multiline autoFocus/>
              <Row style={{justifyContent: 'flex-end', marginTop: 15}}>
                <Text onPress={() => {setText(comment.content); setEdit(false)}}>Cancel</Text>
                <Button disabled={!text} onPress={updateItem} title="Save" fontSize={13} style={{width: 75, height: 38, marginLeft: 15}}/>
              </Row>
            </View>
            :
            <CommentBubble>
              <Text>{comment.content}</Text>
              {!!comment.attachments?.length && <ScrollView horizontal style={{marginTop: 10}}>
                <Row>
                  {comment.attachments.map(file =>
                    <View key={file._id}>
                      <TouchableOpacity onPress={() => {setImageIndex(imageAttachments.findIndex(a => a._id === file._id)); setPreviewVisible(true)}}>
                        {isImg(file) ?
                          <AttachmentImage source={{uri: fixImgPath(file.src)}}/>
                          :
                          <FileView onPress={() => openFile(file.src, file.type)}><Text>{getExt(file.type)}</Text></FileView>
                        }
                      </TouchableOpacity>
                    </View>
                  )}
                </Row>
              </ScrollView>}
            </CommentBubble>
          }
        </View>
      </Row>
      {imageAttachments?.length > 0 &&
      <ImagePreview
        images={imageAttachments.map(t => ({uri: fixImgPath(t.src)}))}
        onClose={() => setPreviewVisible(false)}
        visible={previewVisible}
        index={imageIndex}
      />
      }
    </CommentItem>
  )
};

export default CommentSection;
