FonoDash: versión logopédica y educativa de Sucá Dash (block dash 3D), adaptada a sonidos del habla (r, s, l, k, ch, elegibles con `?fonema=`). En pruebas. Se juega en https://foniafonia.github.io/fonodash/

Origen: https://github.com/foniafonia/sucadash (no se toca; esta es una copia aparte).

## Voz

Las palabras se dicen en voz alta con audio pregenerado (`voz/`), no con el
sintetizador del dispositivo — así suena igual en todos los aparatos. Mismo
método, voz y velocidad que el resto de materiales de Fönia (ver
`~/Developer/voz-logopedia/LEEME.md`); para regenerarlas o añadir palabras,
`scripts/generar-voz.mjs`.

> Voz generada con Piper (Open Home Foundation), modelo es_ES-sharvard-medium,
> entrenado sobre el corpus de la Universidad de Edimburgo. Licencia CC-BY 3.0.

## Música

"Bonkers for Arcades" de Eric Matyas, soundimage.org (libre con crédito). La misma pista que Sucá Dash y FonoKart. Botón de música arriba a la derecha para silenciarla.

## Mejoras traídas del original (06/10/2026)

De `foniafonia/sucadash`, los cambios del 30/09 que no estaban en esta copia: los rivales buscan cajas y usan poderes, cada uno con su nivel y resistencia; dos bloques buenos por muro de palabras; 10 rivales, récord de oleadas, cuenta atrás 3-2-1 y salto de rescate; plancha en el segundo toque. No se trajeron los contadores anónimos de visitas.
