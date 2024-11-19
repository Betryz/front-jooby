import { View, StyleSheet, Alert } from 'react-native';
import { useLoginStore } from '../stores/useLoginStore';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Footer() {
  const router = useRouter();

 

  return (
    <View style={styles.footer}>
             <AntDesign name="star" onPress={() => router.push('/reviews')} size={36} color="black" />
           <MaterialCommunityIcons     onPress={() => router.push('/favorite')}  name="movie-open-plus-outline" size={36} color="black" />
            
            
           <MaterialCommunityIcons onPress={() => router.push('/tables')} name="table-eye" size={36} color="black" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
    height: 60, 
    backgroundColor: '#ACCE91', 
    borderTopWidth: 1, 
    borderTopColor: '#d4d4d4',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '4rem'
  },
 
 
});
