/**
 * Genera un MP3 por cada palabra de los bancos de FONEMAS (index.html) con
 * Piper. Mismo método y misma voz que FonoMundos, para que suene igual en
 * todos los materiales de Fönia (ver ~/Developer/voz-logopedia/LEEME.md).
 *
 * Uso: node scripts/generar-voz.mjs /ruta/es_ES-sharvard-medium.onnx
 *
 * Voz: es_ES-sharvard-medium, hablante 1 (femenino, España),
 * --length-scale 1.35. CC-BY 3.0 (Open Home Foundation / Universidad de
 * Edimburgo) — se cita en index.html.
 */
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')
const MODELO = process.argv[2]
const HABLANTE = '1'
const VELOCIDAD = '1.35'
const DESTINO = join(RAIZ, 'voz')
const TMP = join(RAIZ, '.voz-tmp')

if (!MODELO || !existsSync(MODELO)) {
  console.error('Falta el modelo. Uso: node scripts/generar-voz.mjs /ruta/es_ES-sharvard-medium.onnx')
  process.exit(1)
}

/** El mismo banco de palabras que index.html (FONEMAS), sacado a mano: es
 * una lista fija y corta, no hace falta ejecutar el juego para sacarla. */
const FONEMAS = {
  r: ['RANA','RATÓN','CARRO','PERRO','GORRA','TORRE','RUEDA','ROPA','REGALO','GORRO'],
  s: ['SOL','CASA','MESA','OSO','SOPA','VASO','ROSA','PISO','SEIS','SAPO'],
  l: ['LUNA','PELO','SAL','LOBO','PALA','LECHE','LIMÓN','SILLA','VELA','LORO'],
  k: ['CAMA','COCHE','CUNA','QUESO','COMETA','VACA','COCO','CANGURO','QUINCE','CUBO'],
  ch: ['CHOCOLATE','NOCHE','CHICO','MOCHILA','LECHUGA','CUCHARA','CHAQUETA','OCHO','CHAPA','COCHE'],
}
const palabras = [...new Set(Object.values(FONEMAS).flat())]

export const claveDe = (texto) =>
  createHash('sha1').update(texto.trim().toLocaleLowerCase('es-ES')).digest('hex').slice(0, 16)

mkdirSync(DESTINO, { recursive: true })
mkdirSync(TMP, { recursive: true })

const indice = {}
let hechos = 0, saltados = 0

for (const palabra of palabras) {
  const clave = claveDe(palabra)
  indice[palabra] = clave
  const mp3 = join(DESTINO, `${clave}.mp3`)
  if (existsSync(mp3)) { saltados++; continue }

  const wav = join(TMP, `${clave}.wav`)
  execFileSync('python3', [
    '-m', 'piper', '-m', MODELO, '-s', HABLANTE, '--length-scale', VELOCIDAD, '-f', wav,
  ], { input: palabra, encoding: 'utf8' })

  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', wav,
    '-ar', '22050', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k', mp3,
  ])

  hechos++
}

rmSync(TMP, { recursive: true, force: true })
writeFileSync(join(RAIZ, 'voz/indice.json'), JSON.stringify(indice) + '\n')

console.log(`Generados : ${hechos}`)
console.log(`Ya estaban: ${saltados}`)
console.log(`Índice    : voz/indice.json (${Object.keys(indice).length} palabras)`)
