import { useQuery } from "@tanstack/react-query"
import { ScrollView, View } from "react-native"
import { cityDetails } from "../../services/city/city-details"
import { Text } from "@rneui/themed"
import { RouteProp, useRoute } from "@react-navigation/native"
import { TRootStackParamList } from "../../routes/AppStack"
import * as S from './styles'
import { Marker } from "react-native-maps"

export const CityDetails = () => {
    const route = useRoute<RouteProp<TRootStackParamList, "CityDetails">>();
    
    const {data, isLoading} = useQuery({
        queryKey: ['city-details', route.params.externalId],
        queryFn: async() => cityDetails(route.params.externalId),
        staleTime: 1000 * 60 * 5,
    })

  return (
    <ScrollView>
        {isLoading && <Text>Carregando...</Text>}
        {!isLoading && data && (
            <S.Container>
            <S.Header>
              <S.Title style={{ color: "#00BFFF" }}>Pontos turísticos {data.name}</S.Title>
              <S.Subtitle>País: {data.country}</S.Subtitle>
      
              <S.DescriptionBox>
                <S.DescriptionText>
                  {data.description}. {data.spendingLevel.toUpperCase()}
                </S.DescriptionText>
              </S.DescriptionBox>
            </S.Header>
      
            {data.Place.map(({ name, description }) => (
              <S.PlaceCard key={name}>
                <S.PlaceTitle style={{ color: "#00BFFF" }}>{name}</S.PlaceTitle>
                <S.PlaceDescription>{description}</S.PlaceDescription>
              </S.PlaceCard>
            ))}
      
            <S.MapContainer>
              <S.StyledMap
                initialRegion={{
                  latitude: Number(data.latitude),
                  longitude: Number(data.longitude),
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                {data.Place.map(({ description, latitude, longitude, name }) => (
                  <Marker
                    key={name}
                    coordinate={{
                      latitude: Number(latitude),
                      longitude: Number(longitude),
                    }}
                    title={name}
                    description={description}
                  />
                ))}
              </S.StyledMap>
            </S.MapContainer>
          </S.Container>
      
        )}
    </ScrollView>
  )
}
