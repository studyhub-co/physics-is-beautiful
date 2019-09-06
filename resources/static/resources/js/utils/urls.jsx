
export function slugify (text, separator) {
  text = text.toString().toLowerCase().trim()

  const sets = [
    {to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶА]'},
    {to: 'c', from: '[ÇĆĈČС]'},
    {to: 'd', from: '[ÐĎĐÞД]'},
    {to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆЕ]'},
    {to: 'g', from: '[ĜĞĢǴГ]'},
    {to: 'h', from: '[ĤḦХ]'},
    {to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊИ]'},
    {to: 'j', from: '[ĴЖ]'},
    {to: 'ij', from: '[ĲИ]'},
    {to: 'k', from: '[ĶК]'},
    {to: 'l', from: '[ĹĻĽŁЛ]'},
    {to: 'm', from: '[ḾМ]'},
    {to: 'n', from: '[ÑŃŅŇН]'},
    {to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠО]'},
    {to: 'oe', from: '[ŒЁ]'},
    {to: 'p', from: '[ṕП]'},
    {to: 'r', from: '[ŔŖŘР]'},
    {to: 's', from: '[ßŚŜŞŠС]'},
    {to: 't', from: '[ŢŤТТ]'},
    {to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯУ]'},
    {to: 'w', from: '[ẂŴẀẄВ]'},
    {to: 'x', from: '[ẍХ]'},
    {to: 'y', from: '[ÝŶŸỲỴỶỸУ]'},
    {to: 'z', from: '[ŹŻŽЗ]'},
    {to: '-', from: '[·/_,:\']'}
  ]

  sets.forEach(set => {
    text = text.replace(new RegExp(set.from, 'gi'), set.to)
  })

  text = text.toString().toLowerCase()
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/&/g, '-and-')       // Replace & with 'and'
    .replace(/[^\w\-^.]+/g, '')     // Remove all non-word chars (except periods)
    .replace(/\--+/g, '-')        // Replace multiple - with single -
    .replace(/^-+/, '')           // Trim - from start of text
    .replace(/-+$/, '')          // Trim - from end of text

  if ((typeof separator !== 'undefined') && (separator !== '-')) {
    text = text.replace(/-/g, separator)
  }

  return text
}
