import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {getTemptId} from "../../utils/helpers";
import {useDispatch} from "react-redux";
import {createTaskTodo, deleteTaskTodo, deleteTodoGroup, updateTaskTodo, updateTodoGroup} from "../Project/actions";
import {Row} from "../../utils/sharedStyles";
import {BtnContainer, Label, LabelContainer} from "./styles";
import {Button, Checkbox, Icon, Input, Progress, Text} from "../../components";
import {theme, WINDOW_WIDTH} from "../../config/theme";
import MenuPopup from "../../components/MenuPopup";

const TodoSection = ({todo}) => {
  if (todo) return todo.map(todo => <TodoList key={todo._id} todo={todo}/>);
  else return null;
};

export default TodoSection;

const TodoList = ({todo}) => {
  const [title, setTitle] = React.useState(todo.title);
  const [titleEdit, setTitleEdit] = React.useState(false);
  const [newTodoTxt, setNewTodoTxt] = React.useState('');
  const [inputVisible, setInputVisible] = React.useState(false);
  const dispatch = useDispatch();

  const updateGroupTitle = React.useCallback(() => {
    if (!title) return;
    dispatch(updateTodoGroup({id: todo._id, title}));
    setTitleEdit(false);
  }, [todo._id, title]);

  const updateTodo = React.useCallback((todoId, itemId, value) => {
    dispatch(updateTaskTodo({todoGroupId: todoId, todoId: itemId, data: value}));
  }, []);

  const addTodo = React.useCallback(todoId => {
    if (!newTodoTxt) return;
    const newItem = {_id: getTemptId(), text: newTodoTxt};
    dispatch(createTaskTodo({todoGroupId: todoId, ...newItem}));
    setNewTodoTxt('');
    setInputVisible(false)
  }, [newTodoTxt]);

  const deleteTodo = React.useCallback((todoId, itemId) => {
    dispatch(deleteTaskTodo({groupId: todoId, todoId: itemId}));
  }, []);

  const deleteTodoList = React.useCallback((todoId) => {
    dispatch(deleteTodoGroup(todoId))
  }, []);

  const onKeyDown = React.useCallback((e, todoId) => {
    if (e.key === 'Enter') {
      if (todoId) addTodo(todoId);
      else updateGroupTitle();
    }
  }, [newTodoTxt, title]);

  return (
    <View key={todo._id}>
      <Row>
        <LabelContainer>
          <Icon name="todo"/>
          {titleEdit ?
            <Input placeholder="Title..." value={title} onChange={setTitle} onKeyDown={e => onKeyDown(e, false)} onBlur={updateGroupTitle} autoFocus/> :
            <Label onClick={() => setTitleEdit(true)}>{todo.title}</Label>
          }
          <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => deleteTodoList(todo._id)}><Icon name="delete" size={15}/></TouchableOpacity>
        </LabelContainer>
      </Row>
      {!!todo.list.length ?
        <View style={{marginTop: 5}}>
          <Progress progress={todo.list.filter(l => l.checked).length / todo.list.length} color="#48B990" width={WINDOW_WIDTH - 50}/>
        </View> : null
      }
      <View>
        {todo.list.map(item =>
          <TodoItem key={item._id} item={item} todoId={todo._id} updateTodo={updateTodo} deleteTodo={() => deleteTodo(todo._id, item._id)}/>
        )}
      </View>
      {inputVisible ?
        <View>
          <Input placeholder="New todo" value={newTodoTxt} onChange={setNewTodoTxt} autoFocus style={theme.smallInput}/>
          <BtnContainer>
            <Row>
              <TouchableOpacity onPress={() => setInputVisible(false)}><Text>Cancel</Text></TouchableOpacity>
              <Button onPress={() => addTodo(todo._id)} title="Add" fontSize={13} style={{width: 75, height: 38, marginLeft: 15}}/>
            </Row>
          </BtnContainer>
        </View>
        :
        <BtnContainer>
          <Button fontSize={13} style={{width: 75, height: 38}} transparent onPress={() => setInputVisible(true)} title="New Item"/>
        </BtnContainer>
      }
    </View>
  )
};

export const TodoItem = ({item, todoId, updateTodo, deleteTodo}) => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [text, setText] = React.useState(item.text);

  const updateData = React.useCallback(val => {
    updateTodo(todoId, item._id, val)
  }, [item, todoId, updateTodo, text]);

  const updateText = React.useCallback(() => {
    if (text) {
      updateData({text});
      setInputVisible(false);
    }
  }, [text]);

  return (
    <Row style={{marginTop: 15}}>
      <Checkbox value={item.checked} onChange={checked => updateData({checked})}/>
      <View style={{width: WINDOW_WIDTH - 90}}>
        {!inputVisible ?
          <Row style={{justifyContent: 'space-between', width: '100%'}}>
            <Text style={{width: '90%'}}>{item.text}</Text>
            <MenuPopup
              triggerButton={<View style={{paddingLeft: 10}}><Icon name="dots-vertical" size={14} style={{marginRight: 3}}/></View>}
              items={[
                {value: 1, label: 'Edit', onPress: () => setInputVisible(true)},
                {value: 2, label: 'Delete', onPress: deleteTodo}
              ]}
            />
          </Row>
          :
          <Input
            placeholder="Todo..."
            value={text}
            onChange={setText}
            onSubmitEditing={updateText}
            style={{...theme.smallInput, marginTop: 0}}
            autoFocus
          />
        }
      </View>
    </Row>
  )
};
