import React from 'react';
import {Avatar, Text} from "./index";
import styled from "styled-components/native";

const MemberList = ({members, size, max = 3}) => {
  const memberList = React.useMemo(() => members.map(m => m.user || m), [members]);
  return (
    <Wrapper>
      {memberList.slice(0, max).map((m, i) =>
        <Avatar key={m._id} size={size || 30} font="small" src={m.avatar} firstName={m.firstName} style={{marginLeft: i === 0 ? 0 : -12}}/>
      )}
      {members.length > max ? <Text style={{marginLeft: 5}}>+{members.length - max}</Text> : null}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default MemberList;
