import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {fixImgPath, getExt, humanFileSize, mapFileData, openFile} from "../../utils/helpers";
import {moment} from "../../utils/moment";
import {Button, Icon, Text} from "../../components";
import {useDispatch} from "react-redux";
import {createTaskAttachment, deleteTaskAttachment} from "../Project/actions";
import {Row} from "../../utils/sharedStyles";
import {AttachmentImage, BtnContainer, FileView, Label, LabelContainer} from "./styles";
import ImagePreview from "../../components/ImagePreview";
import DocumentPicker from 'react-native-document-picker';
import {WINDOW_WIDTH} from "../../config/theme";
import MenuPopup from "../../components/MenuPopup";

const AttachmentSection = ({task}) => {
  const [imageIndex, setImageIndex] = React.useState(0);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const dispatch = useDispatch();

  const addAttachment = React.useCallback(async () => {
    try {
      const files = await DocumentPicker.pick({type: [DocumentPicker.types.allFiles],});
      const newFiles = files.map(file => ({...mapFileData(file), createdAt: new Date()}));
      dispatch(createTaskAttachment({data: newFiles, finalData: files, task: task._id}));
    } catch (e) {}
  }, [task._id]);

  const removeAttachment = React.useCallback(id => {
    dispatch(deleteTaskAttachment({task: task._id, attachment: id}));
  }, [task._id]);

  const imageAttachments = React.useMemo(() => task.attachments?.filter(item => item.type.includes('image')), [task.attachments]);

  if (task.attachments?.length) {
    return (
      <View>
        <LabelContainer><Icon name="attachment"/><Label>Attachments</Label></LabelContainer>
        {task.attachments.map((item, i) => <Row key={item._id} style={{marginTop: 15}}>
          {item.type === 'image/png' || item.type === 'image/jpeg' ?
            <TouchableOpacity onPress={() => {setImageIndex(imageAttachments.findIndex(a => a._id === item._id)); setPreviewVisible(true)}}>
              <AttachmentImage source={{uri: fixImgPath(item.src)}}/>
            </TouchableOpacity>
            :
            <FileView onPress={() => openFile(item.src, item.type)}>
              <Text>{getExt(item.type)}</Text>
            </FileView>
          }
          <View style={{width: WINDOW_WIDTH - 195, marginRight: 25}}>
            <Text numberOfLines={1}>{item.name}</Text>
            <Text>{humanFileSize(item.size)} - {moment(item.createdAt).format('DD MMM')}</Text>
          </View>
          <MenuPopup
            triggerButton={<Icon name="dots-vertical" size={14}/>}
            items={[
              {value: 1, label: 'Delete', onPress: () => removeAttachment(item._id)}
            ]}
          />
        </Row>)}
        <BtnContainer>
          <Button fontSize={13} style={{width: 75, height: 38}} transparent onPress={addAttachment} title="New Item"/>
        </BtnContainer>
        <ImagePreview
          images={imageAttachments.map(t => ({uri: fixImgPath(t.src)}))}
          onClose={() => setPreviewVisible(false)}
          visible={previewVisible}
          index={imageIndex}
        />
      </View>
    );
  }
  else return null;
};

export default AttachmentSection;
