import React from 'react';
import {View} from 'react-native';
import {CardContainer, CardImage, FooterItem} from "./styles";
import {Row} from "../../utils/sharedStyles";
import {Icon, MemberList, Progress, Tag, Text} from "../index";
import {fixImgPath} from "../../utils/helpers";
import {moment} from "../../utils/moment";
import {navigate} from "../../config/Navigator";

const TaskCard = ({task}) => {
  const {members, endDate, comments, attachments, tags, todoGroup} = task;
  const image = attachments?.find(item => item.type?.includes('image'))?.src;
  const progress = React.useMemo(() => {
    if (todoGroup?.length) {
      let total = 0;
      let checked = 0;
      todoGroup.forEach(t => {total += t.list.length; t.list.forEach(l => {if (l.checked) checked += 1})});
      return (checked / total);
    }
  }, [todoGroup]);
  return (
    <CardContainer onPress={() => navigate('TaskDetail', {id: task._id})}>
      <Text size="medium">{task.title}</Text>
      {image && <CardImage source={{uri: fixImgPath(image)}}/>}
      {!!progress && <View style={{marginVertical: 10, marginBottom: 5}}><Progress progress={progress} color="#48B990"/></View>}
      {!!tags?.length && <Row style={{marginTop: 10}}>
        {tags.map(tag => <Tag key={tag._id} color={tag.color} title={tag.name}/>)}
      </Row>}
      {members?.length || endDate || comments?.length || attachments?.length ?
        <Row style={{justifyContent: 'space-between', paddingTop: 10}}>
          {!!members?.length ? <MemberList members={members} size={35}/> : <View/>}
          <Row>
            {endDate ? <FooterItem>
              <Icon color="#878FA6" name="time" size={15}/>
              <Text color="#878FA6" style={{marginLeft: 3}}>{moment(endDate).format('DD MMM')}</Text>
              </FooterItem> : null}
            {comments?.length ? <FooterItem>
              <Icon color="#878FA6" name="comments"/>
              <Text color="#878FA6">{comments.length}</Text>
            </FooterItem> : null}
            {attachments?.length ? <FooterItem>
              <Icon color="#878FA6" name="attachment"/>
              <Text color="#878FA6">{attachments.length}</Text>
            </FooterItem> : null}
          </Row>
        </Row> : null
      }
    </CardContainer>
  )
};

export default TaskCard;
