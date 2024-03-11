import React from 'react';
import {Wrapper, Content, Footer} from "./styles";
import {Text, ProjectLogo} from "../index";
import MemberList from "../MemberList";
import {moment} from "../../utils/moment";
import {navigate} from "../../config/Navigator";

const ProjectCard = ({item: {name, image, members, createdAt, _id}}) => {
  return (
    <Wrapper onPress={() => navigate('Project', {screen: 'Board', params: {id: _id}})}>
      <ProjectLogo src={image} size={55}/>
      <Content>
        <Text numberOfLines={1} size="medium" weight={400} style={{marginBottom: 7}}>{name}</Text>
        <Footer>
          <MemberList members={members}/>
          <Text>{moment(createdAt).format('DD MMM yyyy')}</Text>
        </Footer>
      </Content>
    </Wrapper>
  )
};

export default ProjectCard;
