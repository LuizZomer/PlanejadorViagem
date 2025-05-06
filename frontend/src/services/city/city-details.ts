import { api } from "../axios"

export const cityDetails = async(externalId: string): Promise<Omit<IFindPlaceByCityOutput, 'places' | 'city'> & {Place: IPlace[], name: string}> => {
    const res = await api.get(`/city/${externalId}`)
    console.log(res.data);
    
    return res.data
}