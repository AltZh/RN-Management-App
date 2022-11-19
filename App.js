import React, {useRef, useState} from "react";
import { Animated, FlatList, ScrollView, Text, View, Image, StyleSheet, StatusBar, Dimensions, Pressable} from "react-native";

const SCREEN_HEIGHT = Dimensions.get('screen').height
const SCREEN_WIDTH  = Dimensions.get('screen').width


const division = SCREEN_WIDTH / 27

const Footer = () => {
  return (
    <View style={{ padding: division * 5, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center'}}>
      <Text>The end</Text>
    </View>
  )
}

const Header = ({dateTitle}) => {
  return (
    <View style={styles.mainHeader}>
      <View style={styles.titleAvatar}>
        <View style={styles.dataCont}>
          <Text style={{color: '#aaa', fontSize: division, paddingBottom: division / 2}}>November 11, 2022</Text>
          <Text  style={{color: '#333', fontSize: division * 3, fontWeight: '700'}}>{ dateTitle }</Text>
        </View>
        <View style={styles.profile}>
          <Image style={styles.profileImage}/>
        </View>
      </View>
    </View>
  )

}

const DaysSelector = ({selectedDay, selectDay}) => {

  const days = [ 
    {key: 1, date: 11, weekDay: 'Пт'},
    {key: 2, date: 12, weekDay: 'Сб'},
    {key: 3, date: 13, weekDay: 'Вс'},
    {key: 4, date: 14, weekDay: 'Пн'},
    {key: 5, date: 15, weekDay: 'Вт'},
    {key: 6, date: 16, weekDay: 'Ср'},
    {key: 7, date: 17, weekDay: 'Чт'},
  ]

  return (
    <View style={{ paddingHorizontal: division, backgroundColor: '#fff', paddingBottom: division * 1, }}>
      <FlatList 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={days}
          renderItem={
            ({item}) => (
              <Pressable onPress={()=>{ selectDay(item) }}>
                  
                <View style={[styles.weekDay, { backgroundColor: selectedDay.key == item.key ? '#333' : null }]}>
                  <Text style={{ color: selectedDay.key == item.key ? 'white' : 'black' }}>{item.date}</Text>
                  <Text style={{ color: selectedDay.key == item.key ? 'white' : 'black' }}>{item.weekDay}</Text>
                  <Text style={{ color: selectedDay.key == item.key ? 'white' : 'white' }}>•</Text>
                </View>
              </Pressable>
            )
          }
        />
    </View>
  )
}

const events = {
  '14': { 
    date: 1, 
    list: [
      {key: 0},
      {key: 1, title: 'Meeting', description: 'Discussions and stuff', time: '9:00 AM'}, 
      {key: 2, title: 'Icon Set', description: 'Edit Icon sets for the next week', time: '9:00 AM'}, 
      {key: 3, title: 'Icon Set', description: '', time: '9:00 AM'}, 
      {key: 4, title: 'Icon Set', description: '', time: '9:00 AM'}, 
      {key: 5, title: 'Icon Set', description: '', time: '9:00 AM'}, 
      {key: 6, title: 'Icon Set', description: '', time: '9:00 AM'}, 
      {key: 7, title: 'Icon Set', description: '', time: '9:00 AM'}, 
      {key: 8, title: 'Icon Set', description: '', time: '9:00 AM'}
    ]
  },
  '13': { 
    date: 1, 
    list: [
      {key: 0},
      {key: 1, title: 'Meeting 13', description: 'Discussions and stuff', time: '9:00 AM'}, 
      {key: 2, title: 'Icon Set', description: 'Edit Icon sets for the next week', time: '9:00 AM'}, 
      {key: 3, title: 'Icon Set', description: 'Going to learn computer science', time: '9:00 AM'}, 
    ]
  }
}

const renderEvent = ({item, index, selectDay, selectedDay, selectEvent, selectedEvent, scrollY,}) => {

  let itemHeight = division * 8
  let posY = division * 10 * 0 + division * 6.5 * 0 + index * itemHeight
  
  const localScale = scrollY.interpolate({
    inputRange: [-1, 0, index * itemHeight, (index + 2)* itemHeight],
    outputRange: [ 1, 1, 1, .7],
    extrapolate: 'clamp'
  })
   
  if (item.key == 0){
    return <View><DaysSelector selectDay={selectDay} selectedDay={selectedDay}/></View>
  } else {
    return (
    <Animated.View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: division, height: division * 8}}>
      <View style={{ flexDirection:'column', alignItems: 'center', width: division * 3, marginRight: division  }}>
        <View style={{width: division + 2, borderRadius: division, borderWidth: 1, borderColor: '#000' }}>
          <View style={{ backgroundColor: '#333', height: division, width: division, borderRadius: division, borderWidth: 2, borderColor: '#fff' }}></View>
        </View>
        <View style={{ width: 2, flex: 1, backgroundColor:  '#333' }}></View>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable onPress={()=>{ selectEvent(item) }}>
          <Animated.View style={{ backgroundColor: selectedEvent == item ? '#333' : '#fff', marginBottom: division, padding: division, borderRadius: division, transform: [{ scale: localScale}] }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: selectedEvent == item ? '#aaa' : '#333', fontSize: division * 1.5}}>{ item.title }</Text>
                <View style={{display: selectedEvent == item ? 'flex' : 'none'}}>

                <Text style={{ color: selectedEvent == item ? '#fff' : '#aaa', fontSize: division, paddingTop: division}}>{ item.description }</Text>
                </View>
              </View>
              <View style={{ }}>
                <Text style={{ color: selectedEvent == item ? '#fff' : '#aaa', fontSize: division }}>{ item.time }</Text>
              </View>      
            </View>      
          </Animated.View>
        </Pressable>
      </View>
    </Animated.View>
    )
}
}

const App = () => {

  const scrollY = useRef(new Animated.Value(0)).current

  // const fadeIn = () => {
  //   Animated.sequence([

  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 100,
  //     }),

  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 200,
  //     }),


  //   ]).start()
  // }

  const [dateTitle, setDateTitle] = useState('Today') 
  const [selectedDay, setSelectedDay] = useState({key: 4, date: 14, weekDay: 'Пн'})
  const [selectedEvent, setSelectedEvent] = useState(null)

  const selectDay = (item) => {
    setSelectedDay(item)
  }
  
  const selectEvent = (item) => {
    setSelectedEvent(item)
   
  }


  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor="#fff"/>
      <Animated.FlatList 
        contentContainerStyle={{  }}
        ListHeaderComponent={<Header dateTitle={dateTitle} />}
        stickyHeaderIndices={[1]}
        data={events[selectedDay.date].list}
        renderItem={({item, index})=> renderEvent({item, index, selectDay, selectedDay, selectEvent, selectedEvent, scrollY})}
        ListFooterComponent={<Footer />}
        //onScroll={ event => {scrollY.setValue(event.nativeEvent.contentOffset.y); console.log(scrollY)}}
        onScroll={Animated.event( [{
          nativeEvent: {
            contentOffset : {
              y : scrollY
            }
          }
        }], {useNativeDriver: true} )}
      />
    </>

  )

}

const styles = StyleSheet.create({

  mainHeader: {
    paddingHorizontal: division,
    paddingTop: division * 1,
    //paddingBottom: division * 1,
    backgroundColor: '#fff',
    height: division * 10
  },

  titleAvatar: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileImage: { 
    width: division * 4, 
    height: division * 4, 
    borderRadius: division * 2,
    backgroundColor: '#bbb', 
  },

  weekDay: {
    width: (SCREEN_WIDTH - division * 2 - 3 * 7 * 2) / 7,
    height: division * 5.5,
    borderRadius: 50,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f00',
  },

})

export default App