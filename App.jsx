import {
  FlatList,
  TextInput,
  View,
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContactCard from './Component/ContactCard';

// i make seperate file to make clean my code, in this file  having styling and dummy array
import {commonStyles, contacts} from './Component/styles/commonStyles';

const App = () => {
  // useState is used to here to avoid direct mutation
  const [search, setSearch] = useState('');
  const [sortedContacts, setSortedContacts] = useState([]);
  const [sortData, setSortData] = useState(false);

  // functional component
  const ContactNotfound = () => (
    <View>
      <Text style={commonStyles.notFound}>No contacts found</Text>
    </View>
  );

  // first  of all  i use here useEffect because of that when ever i put text into inputText field, and press the to set sorting into ascending or descending that why we need a useEffect put the 2 states in dev dependency is that search or sortData when ever it changes it refresh setState that means update data. Then simply implement here filter its returning a new array without using const keyword, i use let here because that then i again apply prebuilt method of js sorting then use comparing method to sorting array  then set into setState
  useEffect(() => {
    let filterData = contacts.filter(
      item =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.jobTitle
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        item.phone.includes(search) ||
        item.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );

    filterData.sort((a, b) => {
      if (sortData) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedContacts(filterData);
  }, [search, sortData]);

  return (
    <SafeAreaView style={commonStyles.bg}>
      <TextInput
        style={commonStyles.inputStyle}
        value={search}
        onChangeText={e => setSearch(e)}
      />
      <View>
        <Text style={commonStyles.mainTitle}>Contact list</Text>
        <View style={commonStyles.btn}>
          <Button
            title="Sort the contact"
            onPress={() => setSortData(!sortData)}
          />
        </View>
      </View>

      {/* FlastList is the prebuild syntax method given by react native, so its is used iterate and render the data like map but provide more features then map */}
      <FlatList
        data={sortedContacts}
        renderItem={({item}) => (
          // This is the ContactCard functional component. I’m passing props to it to make the component more readable and reusable.
          <ContactCard item={item} />
        )}
        ListEmptyComponent={<ContactNotfound />}
      />
    </SafeAreaView>
  );
};

export default App;
