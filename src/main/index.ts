import './config/module-alias'
import { AmmountOfSongsPerArtist } from '@/domain/contracts'
import { makeLoadAndSaveMusicsByArtists } from '@/main/factories/domain/use-cases/load-music-by-artist'

// nomes salvos no servidor do site vagalume.com

const artistsVagalumeUrl: AmmountOfSongsPerArtist = {
  'rio-negro-e-solimoes': 30,
  'paula-fernandes': 20,
  'milionario-e-jose-rico': 30,
  'xiru-missioneiro': 30,
  'marilia-mendonca': 20,
  'chitaozinho-e-xororo': 30,
  'mano-lima': 30,
  'joao-paulo-e-daniel': 30,
  'barrerito': 30,
  'chiquito-e-bordoneio': 30,
  'felipe-e-falcao': 30,
  'porca-veia': 30,
  'os-federais': 30,
  'maiara-e-maraisa': 30,
  'eduardo-costa': 30,
  'zeze-di-camargo-e-luciano': 30,
  'ze-neto-e-cristiano': 30,
  'edson-e-hudson': 30,
  'os-monarcas': 30,
  'cesar-oliveira-e-rogerio-mello': 30,
  'cesar-menotti-fabiano': 30,
  'renato-teixeira': 30,
  'michel-telo': 30,
  'christian-ralf': 30,
  'chico-rey-e-parana': 30,
  'bruno-e-marrone': 30,
  'leandro-leonardo': 30,
  'lindomar-castilho': 30,
  'waldick-soriano': 30,
  'odair-jose': 30,
  'teixeirinha': 30,
  'gildo-de-freitas': 30,
  'os-serranos': 30,
  'joao-luiz-correa': 30,
  'os-bertussi': 30,
  'gaucho-da-fronteira': 30,
  'joao-mineiro-e-marciano': 30,
  'banda-san-marino': 30,
  'lorena-e-rafaela': 30,
  'naiara-azevedo': 30,
  'amado-batista': 50,
  'di-paullo-e-paulino': 30,
  'marciano': 30
}

const initApp = async (): Promise<void> => {
  const loadAndSaveMusicsByArtists = makeLoadAndSaveMusicsByArtists()
  await loadAndSaveMusicsByArtists.loadAndSaveAllMusics(artistsVagalumeUrl)
}

void initApp()
