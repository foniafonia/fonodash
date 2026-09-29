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
