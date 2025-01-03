import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date?: Date; //date eh opcional
}

export function Home(){
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddSkill(){
    const data = {
      id: String(new Date().getTime(),),
      name: newSkill,
    }

    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id!== id,
    ));
  }


  useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour < 12){
      setGreeting('Good Morning');
    }
    else if(currentHour >= 12 && currentHour < 18){
      setGreeting('Good Afternoon');
    }
    else {
      setGreeting('Good Evening');
    }

  }, [mySkills]) //verifica qualquer mudanca em myskill, quando ocorrer executa a funcao

  return(
    <>
      <View style={styles.container}>
        
        <Text style={styles.title}>Welcome, Daniel!</Text>

        <Text style={styles.greetings}>
          {greeting}
        </Text>

        <TextInput
        style={styles.input}
        placeholder='New Skill'
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
        />
        
        <Button onPress={handleAddSkill} title='Add'/>

        <Text style={[styles.title, {marginVertical:50}]}>
          My Skills
        </Text>

        

        {
        /*
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            mySkills.map(skill => (
              <SkillCard key={skill} skill={skill}/>
            ))
          }
        </ScrollView>
        esta eh outra maneira de fazer diferente do flatlist
        */
        }
        <FlatList
          data={mySkills}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SkillCard 
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
            />        
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical:70
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#fff',
  }
})