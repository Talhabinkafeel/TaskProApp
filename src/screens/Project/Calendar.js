import React from 'react';
import {View, Modal, FlatList, TouchableOpacity} from "react-native";
import {Agenda} from 'react-native-calendars';
import {useDispatch, useSelector} from "react-redux";
import {moment} from "../../utils/moment";
import {updateProjectCalendar} from "./actions";
import {capitalizeFirstLetter, isDatesSame} from "../../utils/helpers";
import {Button, Icon, Input, Text} from "../../components";
import {CalendarCard, CalendarContainer, Divider} from "./styles";
import {FloatButton} from "../Messages/styles";
import {BackBtn, Container, Header, Row} from "../../utils/sharedStyles";
import MenuPopup from "../../components/MenuPopup";
import {badgeColors} from "../../components/Badge";
import {SelectBtn} from "../../components/ListMenu";
import {MenuProvider} from "react-native-popup-menu";
import {getTheme} from "../../config/theme";

const ProjectCalendar = () => {
  const [data, setData] = React.useState({});
  const [text, setText] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [dayData, setDayData] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const project = useSelector(s => s.project.project.data) || [];
  const dispatch = useDispatch();
  const theme = getTheme();

  React.useEffect(() => {
    setData({...project.calendar.reduce((accumulator, value) =>
        ({
          ...accumulator, [moment(value.date).format('YYYY-MM-DD')]: value.notes.map(n => ({...n,
            date: moment(value.date).format('YYYY-MM-DD')}))
        }), {})
    });
  }, [project.calendar]);

  const updateCalendar = React.useCallback(data => {
    dispatch(updateProjectCalendar({_id: project._id, data}));
  }, [project._id]);

  const appendNote = React.useCallback(() => {
    const note = {status, text};
    setDayData(s => ({...s, notes: [...s.notes, note]}));
    setText('');
    setStatus('');
    let newData = [...project.calendar];
    const index = project.calendar.findIndex(d => isDatesSame(d.date, dayData.date));
    if (index > -1) newData = newData.map((d, i) => i === index ? {...d, notes: [...d.notes, note]} : d);
    else newData.push({date: dayData.date, notes: [note]});
    updateCalendar(newData);
  }, [text, status, dayData, project.calendar]);

  const removeNote = React.useCallback((noteIndex) => {
    let newData = [...project.calendar];
    const index = newData.findIndex(d => isDatesSame(d.date, dayData.date));
    if (index > -1) newData = newData.map((d, i) => i === index ? {...d, notes: d.notes.filter((n, i) => i !== noteIndex)} : d);
    setDayData(s => ({...s, notes: s.notes.filter((n, i) => i !== noteIndex)}));
    updateCalendar(newData);
  }, [project.calendar, dayData]);

  const onItemClick = React.useCallback(date => {
    const item = data[date];
    setDayData({notes: item || [], date: date});
  }, [data]);

  const agendaTheme = React.useMemo(() => {
    return {
      calendarBackground: theme.mode === 'dark' ? theme.bg2 : '#fff',
      dayTextColor: theme.txt,
      agendaKnobColor: theme.primary
    };
  }, []);

  return (
    <>
      <CalendarContainer/>
      <Agenda
        items={data}
        selected={selectedDate}
        theme={{...agendaTheme}}
        onDayPress={day => setSelectedDate(day.dateString)}
        onDayChange={day => setSelectedDate(day.dateString)}
        renderList={(listProps) => {
          const items = listProps.items[moment(selectedDate).format('YYYY-MM-DD')];
          return (
            <View style={{flexDirection: 'row', padding: 25, height: '100%', backgroundColor: theme.bg}}>
              <View style={{opacity: 0.7, marginRight: 15}}>
                <Text size="big" weight="200">{moment(selectedDate).format('DD')}</Text>
                <Text size="medium" weight="300">{moment(selectedDate).format('ddd')}</Text>
              </View>
              <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                  <CalendarCard
                    style={(item.status && item.status !== 'default') ? ({backgroundColor: badgeColors[item.status]?.color}) : {}}
                    onPress={() => onItemClick(item.date)}
                  >
                    <Text color={item.status && item.status !== 'default' ? '#fff' : ''}>{item.text}</Text>
                  </CalendarCard>
                }
              />
            </View>
          )
        }}
      />
      <FloatButton onPress={() => onItemClick(selectedDate)}><Icon name="plus" size={28} color="#fff"/></FloatButton>
      <Modal visible={!!dayData} onRequestClose={() => setDayData(null)}>
        <MenuProvider skipInstanceCheck>
          <Header>
            <Row>
              <BackBtn onPress={() => setDayData(null)}><Icon name="close"/></BackBtn>
              <Text size="title">{moment(dayData?.date).format('YYYY-MM-DD')}</Text>
            </Row>
          </Header>
          {dayData && <Container>
            <Row>
              <Input placeholder="Note" value={text} onChange={setText} style={{flex: 1, marginTop: 0}}/>
              <MenuPopup
                triggerButton={<SelectBtn selected={status}><Text color={!status ? '#8B8A8A' : ''}>{capitalizeFirstLetter(status) || 'Status'}</Text></SelectBtn>}
                items={Object.keys(badgeColors).map(status => ({value: status, label: capitalizeFirstLetter(status), onPress: () => setStatus(status)}))}
              />
            </Row>
            <Button title="Add Note" style={{marginTop: 15}} disabled={!text} onPress={appendNote}/>
            <Divider/>
            <FlatList
              data={dayData.notes}
              renderKeyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) =>
                <CalendarCard style={(item.status && item.status !== 'default') ? ({backgroundColor: badgeColors[item.status]?.color}) : {}} activeOpacity={1}>
                  <Row style={{justifyContent: 'space-between', width: '100%'}}>
                    <Text color={item.status && item.status !== 'default' && '#fff'}>{item.text}</Text>
                    <TouchableOpacity onPress={() => removeNote(index)}>
                      <Icon name="delete" color={item.status && item.status !== 'default' && '#fff'}/>
                    </TouchableOpacity>
                  </Row>
                </CalendarCard>
              }
            />
          </Container>}
        </MenuProvider>
      </Modal>
    </>
  )
};

export default ProjectCalendar;
