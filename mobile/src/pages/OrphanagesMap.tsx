import React, { useState }from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import mapMarker from '../images/mapMarker.png'

import api from '../services/api'

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude:number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  const navigation = useNavigation()

  useFocusEffect (() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }) 

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id })
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition')
  }
  
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -25.4459194,
          longitude: -49.2647987,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }} >
      
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y:0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }} >   
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}

      </MapView>  
      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
              <Feather name="plus" size={20} color="#FFF" />
          </RectButton>
      </View>  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.60,
    shadowRadius: 3.84,
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius:20,
    height:56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.60,
    shadowRadius: 3.84,

  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  }


})
